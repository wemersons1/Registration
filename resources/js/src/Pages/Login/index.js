import React, {useState, useContext} from 'react';
import styles from './Login.module.css';
import Input from '../../../src/Components/Input'
import Button from "../../../src/Components/Button";
import Context from '../../../src/Hooks/Context';
import Message from "../../../src/Components/Message";
import {useHistory} from 'react-router-dom';
import Spinner from "../../../src/Components/Spinner";

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();

    const { signIn } = useContext(Context);

    const handlerSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await signIn(email, password);
            setError(false);
            history.push('/');

        }catch (e) {

            setError(true);
        }
        setLoading(false);
    }

    return (
        <div className={styles.Login}>
            <form onSubmit={handlerSubmit}>
                <h1>Logo</h1>
                <Input
                    placeholder={'Email'}
                    label={'Email'}
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type={'email'}
                />
                <Input
                    placeholder={'Senha'}
                    label={'Senha'}
                    required
                    type={'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error ? <Message type={'error'}>Usuário ou senha incorretos</Message> : null}
                <Button>Entrar {loading ? <Spinner size={'small'} /> : null}</Button>
            </form>
        </div>
    );
}

export default Login;
