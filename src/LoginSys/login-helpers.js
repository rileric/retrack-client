import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';

const myDebug = console.log;

const AuthNav = () => {
    const {isAuthenticated, user } = useAuth0();

    if(isAuthenticated) {
        myDebug(user);
    }
    
    return (
        <div className='login-out-btns'>
            {isAuthenticated ? <LogoutButton /> : <LoginButton /> }
        </div>
    );
};



export default AuthNav;