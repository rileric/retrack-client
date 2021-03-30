import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircleButton from '../CircleButton/CircleButton';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <CircleButton
            tag='button'
            className='login-btn'
            onClick={() => loginWithRedirect()}
        >
            Log In
        </CircleButton>
    );
};

export default LoginButton;