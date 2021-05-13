import React, { useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import NavButton from '../NavButton/NavButton';
import ApiContext from '../ApiContext';

const LogoutButton = () => {
    const { logout } = useAuth0();

    // For user logging
    const {isAuthenticated, user } = useAuth0();
    const loginContext = useContext(ApiContext);
    let userId = '1'; // default user

    if(isAuthenticated && (loginContext.user_id !== user.sub) ) {
        loginContext.user_id = user.sub;
        userId = loginContext.user_id;
        loginContext.userLogin(isAuthenticated, userId);
    }
    //
    return (
        <NavButton
            tag='button'
            className='logout-btn'
            onClick={() => logout()}
        >
            Log Out
        </NavButton>
    );
};

export default LogoutButton;