import React, { Component } from 'react';
import classes from './Auth.scss';

import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/index';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import Spinner from '../../components/UI/Spinner/Spinner';
import validation from '../../utility/validation';

const styles = {
    googleBtn: {
        backgroundColor: '#D95040',
        color: "#FFFFFF"
    },
    facebookBtn: {
        backgroundColor: '#4967AD',
        color: "#FFFFFF"
    }
}


class Auth extends Component {
    state = {
        authMode: 'login',
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    equalTo: 'password'
                },
                touched: false
            }
        }
    }
    
    inputChangedHandler = ( event, controlName ) => {
        let updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: controlName === 'confirmPassword' ? 
                    validation( event.target.value, this.state.controls[controlName].validation, this.state.controls['password'].value ) : 
                    validation( event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        if(controlName === 'password'){
           updatedControls = {
               ...updatedControls,
               confirmPassword: {
                   ...this.state.controls.confirmPassword,
                    value: '',
                    touched: false
               }
           } 
        }
        this.setState( { controls: updatedControls } );
    }
    submitHandler = ( event ) => {
        event.preventDefault();
        const authData = {
            email:this.state.controls.email.value,
            password:this.state.controls.password.value
        };
        this.props.onTryAuth(authData, this.state.authMode);
    }
    changeAuthModeHandler = () => {
        this.setState({
            authMode: 'signup'
        })
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            if(this.state.authMode === 'signup'){
                formElementArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }else{
                if(key !== 'confirmPassword'){
                    formElementArray.push({
                        id: key,
                        config: this.state.controls[key]
                    }); 
                }
            }
        }
        let form = formElementArray.map(formElement => (
            <FormControl key={formElement.id} fullWidth margin="normal">
                <InputLabel htmlFor={formElement.config.elementConfig.placeholder} error={!formElement.config.valid && formElement.config.touched}>{formElement.config.elementConfig.placeholder}</InputLabel>
                <Input type={formElement.config.elementConfig.type} value={formElement.config.value} onChange={(event) => this.inputChangedHandler(event, formElement.id)} error={!formElement.config.valid && formElement.config.touched} />
            </FormControl>
        ));

        let submitButton = (
            <Button 
                color="primary"
                variant="raised"
                onClick={this.submitHandler}
                disabled={!this.state.controls.email.valid || !this.state.controls.password.valid || (!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup')}>SUBMIT</Button>
        );
        if(this.props.isLoading) {
            submitButton = (<Spinner />)
        }
        
        return (
            <div className={classes.Container}>
                <h1>{this.state.authMode === 'signup' ? 'SINGUP' : 'LOGIN'}</h1>
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    {form}
                    {submitButton}
                </form>
                { this.state.authMode === 'login' ?
                    <div className={classes.Text} onClick={this.changeAuthModeHandler}>
                        아직 가입하지 않으셨다면 가입해주세요
                    </div>
                    : null
                }
                <div className={classes.BtnWrapper}>
                    <Button fullWidth className={this.props.classes.facebookBtn} variant="raised">Facebook</Button>
                    <Button fullWidth className={this.props.classes.googleBtn} variant="raised">Google</Button>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Auth));