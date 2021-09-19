import React, {useContext, useState} from 'react';
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css';
import Context from "../../../Hooks/Context";
import {NavLink} from "react-router-dom";
import {HiOutlineDocumentDuplicate} from 'react-icons/hi';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {RiLogoutCircleLine} from 'react-icons/ri';

const MenuBurger = () => {


    const [isOpen, setIsOpen] = useState(false);
    const {signOut} = useContext(Context);

    const setIsOpenChange = () => {
        setIsOpen(false);
    }

    const { user} = useContext(Context);

    let sidebar = null;

    if(user.role.name === 'admin') {
        sidebar =
         <>
             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/categories'}><HiOutlineDocumentDuplicate className={'mr-2'}/>Categorias</NavLink>

             <NavLink activeClassName={'link-active'} onClick={setIsOpenChange} to={'/products'}><AiOutlineShoppingCart className={'mr-2'}/>Produtos</NavLink>
         </>;

    }

    return (
        <>
            <Menu isOpen={isOpen} onStateChange={e => setIsOpen(e.isOpen)}>
                <h1>Logo</h1>
                <div>
                    {sidebar}
                    <button
                        onClick={signOut}
                        type={'button'}
                        style={{color: "black"}}
                    ><RiLogoutCircleLine className={'icon-left'}/>Sair</button>
                </div>
            </Menu>
        </>
    );
}

export default MenuBurger;
