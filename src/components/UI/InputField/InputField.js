import React from 'react';
import classes from './InputField.scss';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const inputField = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement, classes.textField]

    switch(props.elementType) {
        case('input'):
            inputElement = <Input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} error={props.invalid && props.touched} />
            break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case('select'): 
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option => {
                            return <option key={option.value} value={option.value}>{option.displayName}</option>
                        })
                    }   
                </select>
            )
            break;
        default: 
            inputElement = <Input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
    }
    return(
        <FormControl>
            <InputLabel htmlFor={props.elementConfig.placeholder} error={props.invalid && props.touched}>{props.elementConfig.placeholder}</InputLabel>
            {inputElement}
        </FormControl>
    )
};

export default inputField;