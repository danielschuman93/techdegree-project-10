import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

function UserSignUp(props) {
    const { context } = props;
    const { actions } = context;
    const history = useHistory();

    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: ''
    });
    const [ errors, setErrors ] = useState([]);

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser({ ...user, ...{ [name]: value } });
    }

    const submit = (event) => {
        event.preventDefault();

        if (user.password === user.confirmPassword) {
            const newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                emailAddress: user.emailAddress,
                password: user.password
            };
    
            actions.createUser(newUser)
            .then(() => {
                actions.signIn(user.emailAddress, user.password)
                .then(() => {
                    history.push('/');
                });
            })
            .catch(err => {
                const errors = err.response.data.errors.map((err, index) => <li key={index}>{err}</li>);
                setErrors(errors);
                console.log(errors);
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