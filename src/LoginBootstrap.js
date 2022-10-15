import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from './firebase/firebase.init';

const auth = getAuth(app)

const LoginBootstrap = () => {
    const [success, setSuccess] = useState(false);
    const [useEmail, setUserEmail] = useState('');
    const  handleSubmit = event =>{
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
        .then( result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
        })
        .catch(error=>{
            console.error('error', error)
        })
    }
    const handleEmailBlur = event =>{
        const email = event.target.value;
        setUserEmail(email);
        console.log(email)
    }
    const handleForgetPassword= () =>{
        if(useEmail){
            alert('please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth,useEmail )
        .then( () =>{
            alert('password reset email sent')
        })
        .catch(error=>{
            console.error('error', error)
        })
    }
    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please login</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Email address</label>
            <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="your email" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
            <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Enter your password" required/>
          </div>
          <button className="btn btn-primary" type="submit">Login</button>
            </form>
            {success && <p>Successfully login</p>}
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p><small>Forget password? <button type="button" onClick={handleForgetPassword} class="btn btn-link">Please reset</button></small></p>
        </div>
    );
};

export default LoginBootstrap;
