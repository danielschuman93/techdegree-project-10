import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function UserSignOut(props) {
    // get context from props, get state from context
    const { context } = props;
    const { authUser, actions } = context;
    // create history object
    const history = useHistory();

    // When component mounts call signOut function from context and redirect to homepage
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