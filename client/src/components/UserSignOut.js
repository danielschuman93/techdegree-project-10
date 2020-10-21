import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Context } from '../Context';

function UserSignOut() {
    const { actions, authUser } = useContext(Context);
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