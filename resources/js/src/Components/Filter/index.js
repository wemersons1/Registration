import React from 'react';
import styles from './Filter.module.css';
import {MdPlace} from 'react-icons/md';

const Filter = ({children}) => {

    return (
        <div className={styles.Filter}>
            <span>
                <MdPlace  className={styles.colorFilter}/> Filtros
            </span>
            {children}
        </div>
    );
}

export default Filter;
