import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircleButton from '../CircleButton/CircleButton';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <CircleButton
            tag='button'
            className='logout-btn'
            onClick={() => logout()}
        >
            Log Out
        </CircleButton>
    );
};

export default LogoutButton;