import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setisLoading]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailref.current.value;
    const enteredPassword = passwordref.current.value;
    setisLoading(true)

    if(isLogin) {

    }
    else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNgmjZ6lbRgU8TeM-YkpprB1uk9jhuNcg',{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken : true
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
      }).then((res) => {
        if(res.ok){

        }
        else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed'
            if(data&&data.error&&data.error.message){
              errorMessage = data.error.message 
            }
            alert(errorMessage)

            console.log(data)
          })
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailref} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            autoComplete='on'
            ref={passwordref}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'login' : 'create account'  }</button>
          {isLoading&&<p>sending request.........</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
