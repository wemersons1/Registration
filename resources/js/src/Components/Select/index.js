import React from 'react';
import styles from './Select.module.css';

const Select = (props) => {

    return (
        <div className={styles.Select}>
            <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                id={props.id}
                onBlur={props.onBlur}
                required={props.required}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
            >{props.children}</select>
        </div>
    );
}

export default Select;
