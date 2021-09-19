import React, {lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import BugerMenu from '../Components/Layout/BurgerMenu';

const Admin = () => {

    const Categories = lazy(() => import('./Categories'));
    const Category = lazy(() => import('./Categories/Create'));

    const container = {
      padding: "4.5rem 3rem",
    };

    return (
        <>
            <BugerMenu />
            <div style={container}>
                <Switch>

                    <Route path={'/categories/create'} render={() => <Category/>} />
                    <Route path={'/categories/:id'} render={() => <Category/>} />
                    <Route path={'/categories'} render={() => <Categories/>} />

                    <Redirect to={'/categories'} render={() => <Categories/>} />
                </Switch>
            </div>
        </>
    );
}

export default Admin;
