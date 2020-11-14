import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function UserSignUp(props) {
    // get context from props, get state from context
    const { context } = props;
    const { actions } = context;
    // create history object
    const history = useHistory();
    // create stateful variables
    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    });
    const [ errors, setErrors ] = useState([]);

    // change function modifies values in state based on input form values with the corresponding name
    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, ...{ [name]: value } });
    }

    // submit function calls createUser function from context to create the new user in the database
    const submit = (event) => {
        event.preventDefault();
        // if password matches confirm password, create new user object with data saved in state and continue
        // else set errors state to 'password does not match'
        if (user.password === user.confirmPassword) {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                password: user.password
            };
            // pass new user object to createUser function 
            actions.createUser(newUser)
            // then sign in the new user and redirect to homepage
            .then(() => {
                actions.signIn(user.emailAddress, user.password)
                .then(() => {
                    history.push('/');
                });
            })
            // if api returns errors array, save errors in state as an array of list items
            // else if api responds with a 500 status code, redirect to '/error' route
            .catch(err => {
                if (err.response.data.errors){
                    const errors = err.response.data.errors.map((err, index) => <li key={index}>{err}</li>);
                    setErrors(errors);
                    console.log(errors);
                } else if (err.response.status === 500) {
                    history.push('/error');
                }
            });
        } else {
            setErrors([<li>Your password does not match.</li>]);
        }

    } 

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
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
                        <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={change}/></div>
                        <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={change}/></div>
                        <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={change}/></div>
                        <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={change}/></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={change}/></div>
                        <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </div>
        </div>    
    )
}

export default UserSignUp;