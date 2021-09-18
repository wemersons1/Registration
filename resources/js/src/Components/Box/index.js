import React from 'react';
import styles from './Box.module.css';

const Box = ({children, size, title}) => {

    return (
        <>
            <h2>{title}</h2>
            <div className={`${styles.Box} ${styles[size]}`}>
                {children}
            </div>
        </>

    );
}

export default Box;
