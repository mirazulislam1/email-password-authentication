import React from 'react';
import {getAuth} from 'firebase/auth'
import app from './firebase/firebase.init';

const auth = getAuth(app)
const handleRegister = (event)=>{
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log( email, password )
}
const handleEmailChange = event =>{
    console.log(event.target.value)
}
const handlePasswordChange = event =>{
    console.log(event.target.value)
}

const Registration = () => {
    return (
        <div>
            <form onSubmit={handleRegister}>
                <input onBlur={handleEmailChange} type="email" name="email" id="" placeholder='your email'/>
                <br />
                <input onBlur={handlePasswordChange} type="password" name="password" id="" placeholder='Enter your password'/>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;