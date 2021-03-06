import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './AddSentence.scss';
import { db } from '../../../firebase';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import validation from '../../../utility/validation';

class Sentences extends Component {
    state = {
        sentence: {
            content: '',
            date: null,
            displayDate: null,
            type: null
        },
        sentenceMode: new Date().getDay() !== 0 ? 'normal' : 'review',
        normalControl: {
            valid: false,
            value: '',
            validation: {
                required: true
            }
        },
        reviewControls: {
            content: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '이번 주의 가장 잘한 일을 적어주세요'
                },
                label: '이번 주의 가장 잘한 일',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            fact: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '언제, 어디서, 누구와, 누구에게, 무엇을, 어떻게 쓴다'
                },
                label: '구체적으로 어떤 일이 있었는가?',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            cause: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '왜 잘한 일일까?, 정말 잘한 일인가 쓴다'
                },
                label: '정말로 잘한 일인가?',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            emotion: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '지금 솔직한 감정에 대해서 쓴다. (기쁘다, 뿌듯하다, 걱정이다, 슬프다, 화난다..)'
                },
                label: '솔직히 어떤 감정인가?',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            action : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '바로 내일부터 실천할 수 있는 간단한 일을 써본다.'
                },
                label: '내일부터 어떤 방법을 실천해볼까?',
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            }
        }
    }
    inputChangedHandler = ( event, controlName ) => {
        let updatedControls = {
            ...this.state.reviewControls,
            [controlName]: {
                ...this.state.reviewControls[controlName],
                value: event.target.value,
                valid: validation( event.target.value, this.state.reviewControls[controlName].validation),
                touched: true
            }
        };
        this.setState( { reviewControls: updatedControls } );
    }
    
    divChangeHandler = (event) => {
        let updatedControls = {
            ...this.state.normalControl,
            value: event.currentTarget.textContent,
            valid: validation(event.currentTarget.textContent, this.state.normalControl.validation)
        };
        this.setState( { normalControl: updatedControls } );
    }
    submitHandler = () => {
        const date = new Date();
        const displayDate = date.getFullYear()+'-'+("0" + (date.getMonth() + 1)).slice(-2)+'-'+("0" + date.getDate()).slice(-2);

        let sentence = {
            date: date,
            displayDate: displayDate,
            type: this.state.sentenceMode,
            userId: this.props.user.uid
        };
        if(this.state.sentenceMode === 'normal') {
            sentence = {
                ...sentence,
                content: this.state.normalControl.value,
            }
        }else{
            sentence = {
                ...sentence,
                content: this.state.reviewControls.content.value,
                fact: this.state.reviewControls.fact.value,
                cause: this.state.reviewControls.cause.value,
                emotion: this.state.reviewControls.emotion.value,
                action: this.state.reviewControls.action.value,
            }
        }
        db.doCreateSentence(this.props.user.uid, displayDate, sentence)
            .then(()=> {
                this.props.history.push('/sentences')
            })
    }
    cancleHandler = () => {
        this.props.history.goBack();
    }
    render() {
        let form = (<div 
            className={classes.InnerEdit} 
            contentEditable="true" 
            placeholder="잘한일을 입력해주세요"
            onKeyUp={this.divChangeHandler}></div>)
        if(this.state.sentenceMode === 'review'){
            const formElementArray = [];
            for (let key in this.state.reviewControls) {
                formElementArray.push({
                    id: key,
                    config: this.state.reviewControls[key]
                });
            }
            form = formElementArray.map(formElement => (
                <FormControl key={formElement.id} fullWidth margin="normal">
                    <InputLabel htmlFor={formElement.config.elementConfig.placeholder} error={!formElement.config.valid && formElement.config.touched}>{formElement.config.label}</InputLabel>
                    <Input 
                        type={formElement.config.elementConfig.type} 
                        value={formElement.config.value} 
                        onChange={(event) => this.inputChangedHandler(event, formElement.id)} 
                        error={!formElement.config.valid && formElement.config.touched} />
                </FormControl>
            ));
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return (
            <div>
                <h2 className={classes.Date}>{new Date().toLocaleDateString('ko-KR', options)}</h2>
                {form}
                <div className={classes.ButtonSet}>
                    <Button 
                        color="primary"
                        variant="raised" 
                        onClick={this.submitHandler}
                        disabled={((!this.state.reviewControls.fact.valid || !this.state.reviewControls.cause.valid || !this.state.reviewControls.emotion.valid || !this.state.reviewControls.action.valid) && this.state.sentenceMode === 'review') || (!this.state.normalControl.valid && this.state.sentenceMode === 'normal')}>저장</Button>
                    <Button variant="raised" onClick={this.cancleHandler}>취소</Button>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        addedSentence: state.sentence.addedSentence
    };
};

export default connect(mapStateToProps)(Sentences);