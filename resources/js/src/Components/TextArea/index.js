import React from 'react';
import styles from './TextArea.module.css';

const TextArea = (props) => {

    return (
        <div className={styles.TextArea}>
            <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>

            <textarea
                className={styles[props.type] ?? styles.TextArea}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange}
                id={props.id}
                disabled={props.disabled}
                required={props.required}
            >{props.value || props.children}</textarea>
        </div>

    );
}

export default TextArea;
