import React, {useContext} from 'react';
import Context from '../../Hooks/Context';
import Login from "../../Pages/Login";
import Admin from "../../Admin";

const Router = () => {

    const {user} = useContext(Context);

    if(user) {
        return (<Admin />);
    }

    return (<Login/>);
}

export default Router;
