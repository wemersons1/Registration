import React, {useState} from 'react';
import InputMask from "react-input-mask";
import styles from './Input.module.css';
import {Col, Row} from 'react-bootstrap';
import IntlCurrencyInput from "react-intl-currency-input"
import {BsEye, BsEyeSlash} from 'react-icons/bs';

const Input = (props) => {

    const [icon, setIcon] = useState(<BsEye/>);

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
            number: {
                BRL: {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    };

     if(props.type === 'money') {
        return (

            <div className={styles.Input}>
                <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>
                <IntlCurrencyInput
                    currency="BRL"
                    config={currencyConfig}
                    required={props.required}
                    id={props.id}
                    onChange={props.onChange}
                    onKeyUp={props.onKeyUp}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    min={props.min}
                    className={styles.Input}
                    type={'string'}
                    value={props.value}
                    maxLength={props.maxLength}
                    disabled={props.disabled}
                />
            </div>
        );
    }

    else if(props.type === 'radio') {
        return (
            <div className={styles.Radio}>
                <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>
                <Row>
                    {
                        props.children.map(input => {
                           return (
                               <Col>
                                   {input}
                               </Col>
                           );
                        })
                    }

                </Row>
            </div>
        );
    }

    if(props.type === 'checkbox') {
        return (
            <div className={`${styles.checkBox} ${styles[props.style]}`}>
                <input
                    type={props.type}
                    value={props.value}
                    id={props.id}
                    onChange={props.onChange}
                    checked={props.checked}
                    name={props.name}
                />
                <label htmlFor={props.id}>
                    {props.label}
                </label>
            </div>
        );
    }


    return (
        <div className={styles.Input}>
            <label htmlFor={props.id}>{props.label} {props.required ? '*' : null}</label>
            <InputMask
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                id={props.id}
                min={props.min}
                max={props.max}
                minLength={props.minLength}
                maxLength={props.maxLength}
                onBlur={props.onBlur}
                required={props.required}
                type={props.type}
                defaultChecked={props.defaultChecked}
                checked={props.checked}
                mask={props.mask}
                disabled={props.disabled}
                step={props.step}
            />
        </div>
    );
}

export default Input;
