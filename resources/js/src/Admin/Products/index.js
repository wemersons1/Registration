import React, {useContext, useEffect, useState} from 'react';
import HeaderButtonPage from '../../Components/HeaderButtonPage';
import Context from '../../Hooks/Context';
import Spinner from "../../Components/Spinner";
import Card from "../../Components/Card";
import Message from "../../Components/Message";
import {Link} from 'react-router-dom';
import Container from '../../Components/Container';
import Filter from "../../Components/Filter";
import Input from "../../Components/Input";
import {Row, Col} from 'react-bootstrap';
import Select2 from '../../Components/Select2';
import {isObjectEmpty} from "../../Hooks/util";

const Products = () => {

    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [categoryChange, setCategoryChange] = useState({});

    const {token} = useContext(Context);

    useEffect(() => {
        axios.get('/api/v1/categories?all=1', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setAllCategories(response.data.map(category => {
                return {
                    value: category.id,
                    label: category.name
                }
            }))
        }).finally(() => setLoadingCategories(false));
    }, []);

    useEffect(() => {

        let params = {};
        name.length ? params['name'] = name : null;
        !isObjectEmpty(categoryChange) ? params['category_id'] = categoryChange.value : null;

        axios.get('/api/v1/products', {
            headers: {
                Authorization: `Bearer ${token}`
            }, params
        }).then(response => {

            setProducts(response.data.data.map(product => {
                return {
                    id: product.id,
                    image: product.image,
                    description: product.description ?? '',
                    name: product.name,
                    amount: parseFloat(product.amount).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                }
            }));

        }).finally(() => {
            setLoading(false);
        });
    }, [categoryChange, name]);

    const renderProducts = () => {

        return products.map((product, index) => {

            return (

                <Link key={index} to={`/products/${product.id}`}>
                    <Card
                        value={product.amount}
                        img={product.image}
                        title={product.name}
                        description={product.description}
                    />
                </Link>
            );
        });
    }

    if(loading || loadingCategories) return (<Spinner />);

    return (
        <div>
            <HeaderButtonPage
                to={'/products/create'}
                h1={'Produtos'}
                type={'store'}
                title={'Cadastrar'}
            />
            <Filter>
               <Row>
                   <Col lg={6}>
                       <Input
                           type={'text'}
                           label={'Nome'}
                           onChange={e => setName(e.target.value)}
                           value={name}
                       />
                   </Col>
                   <Col lg={6}>
                       <Select2
                            isClearable
                            label={'Categoria'}
                            options={allCategories  }
                            value={categoryChange}
                            onChange={value => setCategoryChange(value ?? {})}
                       />
                   </Col>
               </Row>
            </Filter>
            {
                products.length ?
                    <Container>
                        {renderProducts()}
                    </Container>
                    :
                    <Message type={'info'}>Nenhum produto cadastrado</Message>
            }
        </div>
    );
}

export default Products;
