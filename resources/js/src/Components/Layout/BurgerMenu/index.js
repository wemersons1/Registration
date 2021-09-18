import React, {useContext, useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css';
import Context from "../../../Hooks/Context";
import {NavLink} from "react-router-dom";
import {
    FaProjectDiagram, FaRegClone, FaNetworkWired, FaUsers, FaFileSignature,
} from "react-icons/fa";
import {GiPayMoney, GiReceiveMoney} from 'react-icons/gi';
import {GrDocumentConfig} from 'react-icons/gr';
import {HiOutlineDocumentReport} from 'react-icons/hi';

import Logo from "../../../System/Pages/Login/img/logo.png";

const MenuBurger = () => {

    const [isOpen, setIsOpen] = useState(false);

    const setIsOpenChange = () => {
        setIsOpen(false);
    }

    const { user} = useContext(Context);

    let sidebar = null;

    if(user.role.name === 'Administrador') {
        sidebar =
         <>
             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/home'}><HiOutlineDocumentReport className={'mr-2'}/>Home</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/consultants'}><FaNetworkWired className={'mr-2'}/>Consultores</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/clients'}><FaUsers className={'mr-2'}/>Clientes</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/contracts'}><FaFileSignature className={'mr-2'}/>Contratos</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/payments'}><GiPayMoney className={'mr-2'}/>Pagamentos</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/receives'}><GiReceiveMoney className={'mr-2'}/>Recebimentos</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/plans'}><FaProjectDiagram className={'mr-2'}/>Planos</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/admin/config'}><GrDocumentConfig className={'mr-2'}/>Config. Sistema</NavLink>

         </>;

    } else if(user.role.name === 'Consultor') {
        sidebar =
            <>
                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/home'}><HiOutlineDocumentReport className={'mr-2'}/>Home</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/clients'}><FaUsers className={'mr-2'}/>Clientes</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/contracts'}><FaFileSignature className={'mr-2'}/>Contratos</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/payments'}><GiPayMoney className={'mr-2'}/>Pagamentos</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/receives'}><GiReceiveMoney className={'mr-2'}/>Recebimentos</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/consultant/plans'}><FaProjectDiagram className={'mr-2'}/>Planos</NavLink>

            </>
    } else {
        sidebar =
            <>
                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/investor/home'}><HiOutlineDocumentReport className={'mr-2'}/>Home</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/investor/contracts'}><FaFileSignature className={'mr-2'}/>Contratos</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/investor/payments'}><GiPayMoney className={'mr-2'}/>Pagamentos</NavLink>

                <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/investor/receives'}><GiReceiveMoney className={'mr-2'}/>Recebimentos</NavLink>
            </>;
    }

    return (
        <>
            <Menu isOpen={isOpen} onStateChange={e => setIsOpen(e.isOpen)}>
                <img src={Logo} width={200}/>
                <div>
                    {sidebar}
                </div>
            </Menu>
        </>
    );
}

export default MenuBurger;
