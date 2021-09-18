import React from 'react';
import IntlCurrencyInput from "react-intl-currency-input"
import styles from './InputMoney.module.css';

const InputMoney = (props) => {

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

    )
}
export default InputMoney;
