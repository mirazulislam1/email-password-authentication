import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from './firebase/firebase.init';

const auth= getAuth(app)

const RegisterReactBootstrap = () => {
    const [passwordError, setPasswordError]= useState('');
    const [success, setSuccess] = useState(false);
    const handleRegister = event =>{
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('please provide at least two uppercase');
            return;
        }
        if(password.length < 6){
            setPasswordError('please should be at least 6 characters');
            return;
        }
        if(!/(?=.*[!@#$&*])/.test(password)){
            setPasswordError('please should be at least one special characters');
            return;
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);
            setSuccess(true);
            form.reset();
            verifyEmail();
            
        })
        .catch(error=>{
            console.error('error',error);
            setPasswordError(error.message)
        })

    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
        .then( () =>{
            alert('please check your email and verify')
        })
    }
    return (
        <div className='w-50 mx-auto'>
        <h3 className='text-success'>Please Register</h3>
        <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name='email' type="email" placeholder="Enter email" required />
         
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type="password" placeholder="Password" required />
        </Form.Group>
            {success && <p className='text-success'>user created successfully</p>}
            <p className='text-danger'>{passwordError}</p>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default RegisterReactBootstrap;