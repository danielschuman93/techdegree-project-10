import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function UserSignIn(props) {
    const { context } = props;
    const { authUser, actions } = context;
    const history = useHistory();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
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
                console.log('Sign in was unsuccessful.');
            } else {
                console.log(`${username} successfully signed in!`)
                history.push('/')
            }
        })
        .catch(err => {
            const errors = err.response.data.errors.map((err, index) => <li key={index}>{err}</li>);
            setErrors(errors);
            console.log(errors);
        });
    }

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    <div>
                        {errors.length > 0 ?
                            <React.Fragment>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {errors}
                                    </ul>
                                </div>
                            </React.Fragment>
                        :
                            <span></span>
                        }
                    </div>
                    <form onSubmit={submit}>
                        <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={changeUsername}/></div>
                        <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={changePW}/></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
    )
}

export default UserSignIn;