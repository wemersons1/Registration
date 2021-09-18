import React from 'react';
import styles from './Button.module.css';
import {FaRegEdit} from 'react-icons/fa';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {RiDeleteBinLine, } from 'react-icons/ri';

const Button = (props) => {

    return (
        <div className={styles.Button}>
            <button
                onBlur={props.onBlur}
                onClick={props.onClick}
                type={props.type}
                value={props.value}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                className={`${props.className} ${props.style ? styles[props.style] : styles.default}`}
            >{props.style === 'save' ? <FaRegEdit className={'icon-left icon-white'}/> : props.style === 'danger' ?
                <RiDeleteBinLine className={'icon-left icon-white'}/> : props.style === 'reprove' ?
                    <AiOutlineCloseCircle className={'icon-left icon-white'}/> : null}{props.children}</button>
        </div>
    );
}

export default Button;
