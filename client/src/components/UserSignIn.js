import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function UserSignIn(props) {
    const { actions } = useContext(Context);

    const [ username, setUsername ] = useState([]);
    const [ password, setPassword ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    const changeUsername = (event) => {
        const value = event.target.value;
        setUsername(value);
    }

    const changePW = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const submit = (event) => {
        event.preventDefault();

        actions.signIn(username, password)
        .then(user => {
            if (user === null) {
                setErrors(['Sign in was unsuccessful.']);
                console.log(errors);
            } else {
                console.log(`${username} successfully signed in!`)
                props.history.push('/')
            }
        })
        .catch(err => {
            console.log(err)
        });
    }

    return(
        <div>
            <Header/>
            <hr/>
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={submit}>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={changeUsername}/></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={changePW}/></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <a href="sign-up.html">Click here</a> to sign up!</p>
                </div>
            </div>
        </div>
    )
}

export default UserSignIn;