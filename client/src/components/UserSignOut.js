import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function UserSignOut(props) {
    const { context } = props;
    const { authUser, actions } = context;
    const history = useHistory();

    useEffect(() => {
        actions.signOut();
        console.log(`${authUser.emailAddress} signed out.`)
        history.push('/');
    })

    return(
        <div>Signing out...</div>
    )
}

export default UserSignOut;