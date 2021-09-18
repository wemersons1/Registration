import React, {useState} from 'react';
import Context from './Context';

const ContextProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem('@Register:token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('@Register:user')));

    const signIn = async (email, password) => {

        const response = await axios.post('/api/login', {
            email,
            password
        });

        if(response.data) {
            setUser(response.data.user);
            localStorage.setItem('@Register:user', JSON.stringify(response.data.user));

            setToken(response.data.token);
            localStorage.setItem('@Register:token', response.data.token);
        }
    }

    const signOut = async () => {
        axios.delete('/api/logout', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).finally(() => {
            setUser(null);
            localStorage.clear();
        });
    }

    return (
        <Context.Provider value={{user, token, signIn, signOut}}>
            {children}
        </Context.Provider>
    );
}

export default ContextProvider;
