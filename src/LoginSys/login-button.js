import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import NavButton from '../NavButton/NavButton';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <NavButton
            tag='button'
            className='login-btn'
            onClick={() => loginWithRedirect()}
        >
            Log In
        </NavButton>
    );
};

export default LoginButton;