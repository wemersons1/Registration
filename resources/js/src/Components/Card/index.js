import React from 'react';
import styles from './Card.module.css';

const Card = ({title, children, style, icon}) => {

    return (
        <div className={`${styles[style]} ${styles.Card}`}>
            <div className={styles.Info}>
                <h6>{title}</h6>
                <p>{children}</p>
            </div>
            {
                icon &&
                <div className={styles.Icon}>
                    {icon}
                </div>
            }

        </div>
    );
}

export default Card;
