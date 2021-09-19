import React, {useState, useContext, useEffect} from 'react';
import Box from "../../../Components/Box";
import HeaderButtonPage from '../../../Components/HeaderButtonPage'
import {initialStateProduct} from '../util';
import Input from "../../../Components/Input";
import TextArea from "../../../Components/TextArea";
import {BiSave} from 'react-icons/bi';
import Button from '../../../Components/Button';
import Context from '../../../Hooks/Context';
import SweetAlert from "../../../Components/SweetAlert";
import {useHistory} from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import {useParams} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Message from "../../../Components/Message";
import Select2 from '../../../Components/Select2';
import {isObjectEmpty} from "../../../Hooks/util";

const Create = () => {

    const [textInput, setTextInput] = useState('');
    const [product, setProduct] = useState(initialStateProduct);
    const [allCategories, setAllCategories] = useState([]);

    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const [success, setSuccess] = useState(false);
    const [send, setSend] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [categoryChange, setCategoryChange] = useState({});
    const [showMessageErrorCategory, setShowMessageErrorCategory] = useState(false);

    const {token} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();


    const getCategories = async () => {
        const categories = await axios.get('/api/v1/categories?all=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return categories.data;
    }
    useEffect(async () => {

        const categories = await getCategories();

        setAllCategories(categories.map(category => {
            return {
                label: category.name,
                value: category.id
            }
        }));

        if(id) {
            axios.get(`/api/v1/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {

                categories.forEach(product => {
                    if(product.id === response.data.category_id) {
                        setCategoryChange({
                            label: product.name,
                            value: product.id
                        });
                    }
                });

                setProduct({
                    name: response.data.name,
                    description: response.data.description ?? '',
                    image: '',
                    category_id: response.data.category_id,
                    amount: response.data.amount,
                    quantity: response.data.quantity
                });

                setTextInput(response.data.name_image);

            }).finally(() => setLoadingProduct(false));
        } else {
            setLoadingProduct(false);
        }

    }, [id]);

    const handlerSubmit = e => {
        e.preventDefault();

        if(!isObjectEmpty(categoryChange)) {
            setShowMessageErrorCategory(false);
            setSend(true);

            let url = '/api/v1/products';
            id ? url = `${url}/${id}?_method=PUT` : null;

            let formData = new FormData();

            formData.append('category_id', product.category_id);
            formData.append('name', product.name);
            formData.append('description', product.description);
            formData.append('image', product.image);
            formData.append('quantity', product.quantity);
            formData.append('amount', product.amount);

            axios.post(url, formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setSweetText(`Produto ${id ? 'atualizado': 'cadastrado'} com sucesso`);
                setSweetTitle('Sucesso');
                setSweetType('success');
                setSuccess(true);
            }).catch(err => {
                setSweetText(err.response.data.message);
                setSweetTitle('Erro');
                setSweetType('error');
                setSuccess(false);
            }).finally(() => {

                setSend(false);
                setSweetShow(true);
            });
        } else {
            setShowMessageErrorCategory(true);
        }
    }

    const onClose = e => {
        setSweetShow(false);
        if(success){
            history.goBack();
        }
    }

    const setProductChange = e => {
        if(e.target.name === 'image') {
            let file = e.target.files[0];

            setProduct({...product, [e.target.name]: file});

            setTextInput(file.name);

        } else {
            setProduct({...product, [e.target.name]: e.target.value})
        }
    }

    const deleteProduct = () => {
        axios.delete(`/api/v1/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setSweetText('Produto excluído com sucesso');
            setSweetTitle('Sucesso');
            setSweetType('success');
            setSuccess(true);
        }).catch(err => {
            setSweetText(err.response.data.message);
            setSweetTitle('Erro ao excluír produto');
            setSweetType('error');
            setSuccess(false);
        }).finally(() => setSweetShow(true));
    }

    if(loadingProduct) return (<Spinner />);

    if(!allCategories.length) return (<Message type={'info'}>Sem categoria cadastrada</Message>);

    return (
        <div>
            <HeaderButtonPage type={'back'} />
            <h2>{id ? 'Detalhes do' :'Cadastro de' } produto</h2>
            <form onSubmit={handlerSubmit}>
                <Box size={'smaller'}>
                    <Select2
                        label={'Categoria'}
                        options={allCategories}
                        value={categoryChange}
                        onChange={category => {
                            setProduct({...product, category_id: category.value});
                            setCategoryChange(category);
                        }}
                    />
                    {
                        showMessageErrorCategory ? <Message type={'error'}>Selecione uma categoria</Message> : null
                    }
                    <Input
                        label={'Nome'}
                        required
                        value={product.name}
                        name={'name'}
                        onChange={setProductChange}
                        placeholder={'Nome do produto...'}
                    />
                    <Input
                        label={'Imagem'}
                        type={'file'}
                        id={'image'}
                        name={'image'}
                        required
                        onChange={setProductChange}
                        textInput={textInput}
                    />
                    <Input
                        required
                        type={'money'}
                        label={'Valor'}
                        value={product.amount}
                        onChange={(event, value) => {

                            let e = {
                                target: {
                                    name: 'amount',
                                    value: value
                                }
                            }
                            setProductChange(e);
                        }}
                    />
                    <Input
                        required
                        type={'number'}
                        min={0}
                        name={'quantity'}
                        label={'Quantidade'}
                        value={product.quantity}
                        onChange={setProductChange}
                    />
                    <TextArea
                        label={'Descrição'}
                        name={'description'}
                        value={product.description}
                        onChange={setProductChange}
                        placeholder={'Descrição ...'}
                    />
                    <Row>
                        <Col>
                            <Button><BiSave style={{fill: "white", marginRight: ".5rem"}}/>{send ? <Spinner size={'small'} /> : null}{id ? 'Salvar alterações' : 'Cadastrar'}</Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={deleteProduct}
                                type={'button'}
                                style={'danger'}
                            >Excluir</Button>
                        </Col>
                    </Row>
                </Box>
            </form>

            <SweetAlert
                onConfirm={onClose}
                title={sweetTitle}
                type={sweetType}
                btnConfirmStyle={'success'}
                text={sweetText}
                show={sweetShow}
                confirmBtnText={'Ok'}
                closeOnClickOutside={false}
            />

        </div>
    );
}

export default Create;
