import React, {useContext} from 'react';
import styles from './Sidebar.module.css';
import {Link, NavLink,} from "react-router-dom";
import {GiDiploma, GiTeacher, GiHamburgerMenu} from 'react-icons/gi';
import {BiLogOut} from 'react-icons/bi';
import {FaChalkboardTeacher,FaRegClone} from 'react-icons/fa';
import {ImUserTie} from 'react-icons/im';
import {SiGooglescholar} from 'react-icons/si'
import Logo from '../../../System/Pages/Login/img/logo.png';
import Context from "../../../Hooks/Context";

const Sidebar = () => {

    const { signOut, user} = useContext(Context);

    let sidebar = null;

    if(user.role.name === 'Administrador') {
        sidebar =
            <ul>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/home'}><GiDiploma className={'mr-2'}/>Home</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/consultants'}><SiGooglescholar className={'mr-2'}/>Consultores</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/clients'}><SiGooglescholar className={'mr-2'}/>Clientes</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/contracts'}><GiTeacher className={'mr-2'}/>Contratos</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/payments'}><FaChalkboardTeacher className={'mr-2'}/>Pagamentos</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/receives'}><ImUserTie className={'mr-2'}/>Recebimentos</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={styles.LinkActive} to={'/admin/plans'}><FaRegClone className={'mr-2'}/>Planos</NavLink>
                </li>
                <li>
                    <button onClick={signOut}><BiLogOut className={'mr-2'} />Sair</button>
                </li>
          </ul>;

    } else if(user.role.name === 'Consultor') {
        sidebar =  <ul>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/home'}><GiDiploma className={'mr-2'}/>Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/clients'}><SiGooglescholar className={'mr-2'}/>Clientes</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/contracts'}><GiTeacher className={'mr-2'}/>Contratos</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/payments'}><FaChalkboardTeacher className={'mr-2'}/>Pagamentos</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/receives'}><ImUserTie className={'mr-2'}/>Recebimentos</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/consultant/plans'}><FaRegClone className={'mr-2'}/>Planos</NavLink>
            </li>
            <li>
                <button onClick={signOut}><BiLogOut className={'mr-2'} />Sair</button>
            </li>
        </ul>;
    } else {
        sidebar =  <ul>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/investor/home'}><GiDiploma className={'mr-2'}/>Home</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/investor/contracts'}><GiTeacher className={'mr-2'}/>Contratos</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/investor/payments'}><FaChalkboardTeacher className={'mr-2'}/>Pagamentos</NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.LinkActive} to={'/investor/receives'}><ImUserTie className={'mr-2'}/>Recebimentos</NavLink>
            </li>
            <li>
                <button onClick={signOut}><BiLogOut className={'mr-2'} />Sair</button>
            </li>
        </ul>;
    }

    return (
        <div className={styles.Sidebar}>
            <Link to={`/${user.role.name === 'Administrador' ? 'admin' :
                user.role.name === 'Consultor' ? 'consultant' : 'investor'}/home`}>
                <div className={styles.ImgLogo}>
                    <img src={Logo} />
                </div>

            </Link>
            <div className={styles.Hamburger}>
                <button><GiHamburgerMenu/></button>
            </div>
            <div className={styles.Menu}>
                {sidebar}
            </div>
        </div>
    );
}

export default Sidebar;
