import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './login-button';
import LogoutButton from './logout-button';


const AuthNav = () => {

    const {isAuthenticated } = useAuth0();

    return (
        <div className='AuthNav_btns'>
            {isAuthenticated ? <LogoutButton /> : <LoginButton /> }
        </div>
    );
};

export default AuthNav;

