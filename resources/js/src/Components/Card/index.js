import React from 'react';
import styles from './Card.module.css';

const Card = ({title, img, description}) => {

    return (
        <div className={styles.Card}>
            <div className={styles.Img}>
                <img
                    alt={title}
                    src={img}
                />
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

export default Card;
