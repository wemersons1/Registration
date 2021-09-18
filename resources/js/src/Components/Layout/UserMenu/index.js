import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {MdAccountCircle} from 'react-icons/md';
import {FiLogOut} from 'react-icons/fi';
import {RiLockPasswordLine} from 'react-icons/ri';
import {BsInfoCircle} from 'react-icons/bs';
import styles from './UserMenu.module.css';
import Context from '../../../Hooks/Context';

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const {signOut, user} = useContext(Context);
    const setShowMenuChange = e => {
        setShowMenu(!showMenu);
    }

    return (
        <div className={styles.UserMenu}>
            <button
                onClick={setShowMenuChange}
            ><MdAccountCircle/></button>
            {
                showMenu &&
                <ul>
                    <li onClick={e => setShowMenu(false)}>
                        <Link to={`/${user.role.name === 'Administrador' ? 'admin' : user.role.name === 'Consultor' ? 'consultant' : 'investor'}/my-account`}><BsInfoCircle className={'icon-left'}/>Minha conta</Link>
                    </li>
                    <li onClick={e => setShowMenu(false)}>
                        <Link to={`/${user.role.name === 'Administrador' ? 'admin' : user.role.name === 'Consultor' ? 'consultant' : 'investor'}/reset-password`}>
                            <RiLockPasswordLine className={'icon-left'}/>Redefinir senha
                        </Link>
                    </li>
                    <li onClick={e => setShowMenu(false)}>
                        <Link to={'/login'} onClick={signOut}>
                            <FiLogOut className={'icon-left'} />Sair
                        </Link>
                    </li>
                </ul>
            }
        </div>
    );
}

export default UserMenu;
