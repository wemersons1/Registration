import React, {useState, useContext, useEffect} from 'react';
import Box from "../../../Components/Box";
import HeaderButtonPage from '../../../Components/HeaderButtonPage'
import {initialStateCategory} from '../util';
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

const Create = () => {

    const [textInput, setTextInput] = useState('');
    const [category, setCategory] = useState(initialStateCategory);

    const [sweetShow, setSweetShow] = useState(false);
    const [sweetType, setSweetType] = useState('success');
    const [sweetText, setSweetText] = useState('');
    const [sweetTitle, setSweetTitle] = useState('');
    const [success, setSuccess] = useState(false);
    const [send, setSend] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(true);

    const {token} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {

        if(id) {
            axios.get(`/api/v1/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setCategory({
                    name: response.data.name,
                    description: response.data.description ?? '',
                    image: ''
                });

                setTextInput(response.data.name_image);

            }).finally(() => setLoadingCategory(false));
        } else {
            setLoadingCategory(false);
        }

    }, [id]);

    const handlerSubmit = e => {
        e.preventDefault();
        setSend(true);

        let url = '/api/v1/categories';
        id ? url = `${url}/${id}?_method=PUT` : null;

        let formData = new FormData();

        formData.append('name', category.name);
        formData.append('description', category.description);
        formData.append('image', category.image);

        axios.post(url, formData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setSweetText(`Categoria ${id ? 'atualizada': 'cadastrada'} com sucesso`);
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
    }

    const onClose = e => {
        setSweetShow(false);
        if(success){
            history.goBack();
        }
    }

    const setCategoryChange = e => {
        if(e.target.name === 'image') {
            let file = e.target.files[0];

            setCategory({...category, [e.target.name]: file});

            setTextInput(file.name);

        } else {
            setCategory({...category, [e.target.name]: e.target.value})
        }
    }

    const deleteCategory = () => {
        axios.delete(`/api/v1/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            setSweetText('Categoria excluída com sucesso');
            setSweetTitle('Sucesso');
            setSweetType('success');
            setSuccess(true);
        }).catch(err => {
            setSweetText(err.response.data.message);
            setSweetTitle('Erro ao excluír categoria');
            setSweetType('error');
            setSuccess(false);
        }).finally(() => setSweetShow(true));
    }

    if(loadingCategory) return (<Spinner />);

    return (
       <div>
           <HeaderButtonPage type={'back'} />
           <h2>{id ? 'Detalhes da' :'Cadastro de' } categoria</h2>
           <form onSubmit={handlerSubmit}>
               <Box size={'smaller'}>
                    <Input
                        label={'Nome'}
                        required
                        value={category.name}
                        name={'name'}
                        onChange={setCategoryChange}
                        placeholder={'Nome da categoria...'}
                    />
                    <Input
                        label={'Imagem'}
                        type={'file'}
                        id={'image'}
                        name={'image'}
                        required
                        onChange={setCategoryChange}
                        textInput={textInput}
                    />
                    <TextArea
                        label={'Descrição'}
                        name={'description'}
                        value={category.description}
                        onChange={setCategoryChange}
                        placeholder={'Descrição ...'}
                    />
                    <Row>
                        <Col>
                            <Button><BiSave style={{fill: "white", marginRight: ".5rem"}}/>{send ? <Spinner size={'small'} /> : null}{id ? 'Salvar alterações' : 'Cadastrar'}</Button>
                        </Col>
                        {
                            id ?
                                <Col>
                                    <Button
                                        onClick={deleteCategory}
                                        type={'button'}
                                        style={'danger'}
                                    >Excluir</Button>
                                </Col> : null
                        }

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
