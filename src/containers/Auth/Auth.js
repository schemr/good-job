import React, { Component } from 'react';
import classes from './Auth.scss';

import { connect } from 'react-redux';
import { tryAuth } from '../../store/actions/index';

import InputField from '../../components/UI/InputField/InputField';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import validation from '../../utility/validation';

class Auth extends Component {
    state = {
        authMode: 'signup',
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
            authMode: 'login'
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
            <InputField
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        let submitButton = (
            <Button 
                btnType="Success" 
                disabled={!this.state.controls.email.valid || !this.state.controls.password.valid || (!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup')}>SUBMIT</Button>
        );
        if(this.props.isLoading) {
            submitButton = (<Spinner />)
        }
        
        return (
            <div className={classes.Container}>
                <h1>{this.state.authMode === 'signup' ? 'SINGUP' : 'LOGIN'}</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    {submitButton}
                </form>
                { this.state.authMode === 'signup' ?
                    <div onClick={this.changeAuthModeHandler}>
                        이미 가입하셨으면 로그인해주세요
                    </div>
                    : null
                }
                <Button btnType="Facebook">Facebook</Button>
                <Button btnType="Google">Google</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);