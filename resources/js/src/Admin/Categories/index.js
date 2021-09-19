import React, {useContext, useEffect, useState} from 'react';
import HeaderButtonPage from '../../Components/HeaderButtonPage';
import Context from '../../Hooks/Context';
import Spinner from "../../Components/Spinner";
import Card from "../../Components/Card";
import Message from "../../Components/Message";
import {Link} from 'react-router-dom';
import Container from '../../Components/Container';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const {token} = useContext(Context);

    useEffect(() => {
        axios.get('/api/v1/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
    }, []);

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
