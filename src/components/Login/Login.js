import React, { useEffect, useState, useReducer, useContext, useRef} from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (State, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: State.value, isValid: State.value.includes('@')};
  }
  return {value: '', isValid: false};
};
const passwordReducer = (State, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: State.value, isValid: State.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
});

const[passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: '',
  isValid: null,
});

const authctx = useContext(AuthContext);

const emailInputRef = useRef();
const passwordInputRef = useRef();

const {isValid: emailIsValid} = emailState;
const {isValid: passwordIsValid} = passwordState;

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('setting form validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
  //     );
  //   }, 500);
  //   return () => {
  //     console.log('cleanup');
  //     clearTimeout(identifier);
  //   }
//}, [enteredEmail, enteredPassword, enteredCollege])

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
             event.target.value.includes('@') && event.target.value.trim().length > 6 && enteredCollege.trim().length > 0
       );
 };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
         emailState.isValid && event.target.value.trim().length > 6 && event.target.value.trim().length > 0
         );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && event.target.value.trim().length > 0
           );

  };

  const validateEmailHandler = () => {
   // setEmailIsValid(emailState.isValid);
   dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
    authctx.onLogin(emailState.value, passwordState.value, enteredCollege);
    }
    else if(!emailIsValid){
       emailInputRef.current.focus();
    }else{
      passwordInputRef.current.focus();
    }

    }
  

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref={emailInputRef}
        id="email" 
        label="E-Mail" 
        type="email" 
        isValid={emailIsValid} 
        value={emailState.value} 
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        />

      <Input 
        ref={passwordInputRef}
        id="password" 
        label="Password" 
        type="password" 
        isValid={passwordIsValid} 
        value={passwordState.value} 
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        />


        <div
          className={`${classes.control} ${
            passwordState === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )};


export default Login;
