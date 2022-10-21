import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailreducer = (state, action) => {
  if (action.type === "ADD_EMAIL"){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === "VALIDATE_EMAIL"){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: "", isValid: false};
}

const passwordReducer = (state, action) => {
  if (action.type === "ADD_PASSWORD"){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === "VALIDATE_PASSWORD"){
    return {value: state.val, isValid: state.val.trim().length > 6}
  }
  return {value: "", isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailreducer, {
    value: "",
    isValid: null,
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

 

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "ADD_EMAIL", val: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "ADD_PASSWORD", val: event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "VALIDATE_EMAIL"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "VALIDATE_PASSWORD"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
