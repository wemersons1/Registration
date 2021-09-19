import React, {useContext, useEffect, useState} from 'react';
import HeaderButtonPage from '../../Components/HeaderButtonPage';
import Context from '../../Hooks/Context';
import Spinner from "../../Components/Spinner";
import Card from "../../Components/Card";
import Message from "../../Components/Message";
import {Link} from 'react-router-dom';
import Container from '../../Components/Container';
import Filter from "../../Components/Filter";
import {Col, Row} from "react-bootstrap";
import Input from "../../Components/Input";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(true);
    const {token} = useContext(Context);

    useEffect(() => {
        let params = {};
        name.length ? params['name'] = name : null;

        axios.get('/api/v1/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }, params
        }).then(response => {

            setCategories(response.data.data.map(category => {
                return {
                    id: category.id,
                    image: category.image,
                    description: category.description ?? '',
                    name: category.name
                }
            }));

        }).finally(() => {
            setLoading(false);
        });
    }, [name]);

    const renderCategories = () => {

        return categories.map((category, index) => {

            return (

                <Link key={index} to={`/categories/${category.id}`}>
                    <Card
                        img={category.image}
                        title={category.name}
                        description={category.description}
                    />
                </Link>
            );
        });
    }

    if(loading) return (<Spinner />);

    return (
        <div>
            <HeaderButtonPage
                to={'/categories/create'}
                h1={'Categorias'}
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
                </Row>
            </Filter>
            {
                categories.length ?
                    <Container>
                        {renderCategories()}
                    </Container>
                    :
                    <Message type={'info'}>Nenhuma categoria cadastrada</Message>
            }
        </div>
    );
}

export default Categories;
