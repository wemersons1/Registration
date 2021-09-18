import React, {Suspense} from 'react';
import ContextProvider from "../Hooks/ContextProvider";
import {
    BrowserRouter
} from "react-router-dom";
import Router from "./Router";
import Spinner from "../Components/Spinner";

const Routes = () => {

    return (
        <Suspense fallback={<Spinner/>}>
            <ContextProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ContextProvider>
        </Suspense>
    );
}

export default Routes;
