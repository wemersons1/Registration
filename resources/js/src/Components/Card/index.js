import React from 'react';
import styles from './Card.module.css';

const Card = ({title, img, value}) => {

    return (
        <div className={styles.Card}>
            {
                value ?  <h3>{value}</h3> : null
            }

            <h4>{title.toUpperCase()}</h4>

            <div className={styles.Img}>
                <img
                    alt={title}
                    src={img}
                />
            </div>

        </div>
    );
}

export default Card;
