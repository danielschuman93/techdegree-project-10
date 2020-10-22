import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

function UserSignUp(props) {
    const { context } = props;
    const { actions } = context;

    const [ firstName, setFirstName ] = useState([]);
    const [ lastName, setLastName ] = useState([]);
    const [ emailAddress, setEmail ] = useState([]);
    const [ password, setPassword ] = useState([]);
    const [ confirmPassword, setConfirmPassword ] = useState([]);
    const [ errors, setErrors ] = useState([]);

    const changeFN = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const changeLN = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const changeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
    }

    const changePW = (event) => {
        const value = event.target.value;
        setPassword(value);
    }

    const changeCPW = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
    }

    const submit = (event) => {
        event.preventDefault();

        if (password === confirmPassword) {
            const user = {
                firstName,
                lastName,
                emailAddress,
                password
            };
    
            actions.createUser(user)
            .then(errors => {
                if (errors.length) {
                    setErrors({ errors })
                    console.log(errors);
                } 
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            throw new Error('Your password does not match.');
        }

    } 

    return(
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign Up</h1>
                <div>
                    <form onSubmit={submit}>
                        <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={changeFN}/></div>
                        <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={changeLN}/></div>
                        <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={changeEmail}/></div>
                        <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={changePW}/></div>
                        <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={changeCPW}/></div>
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