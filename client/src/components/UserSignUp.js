import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function UserSignUp() {
    const { actions } = useContext(Context);

    const [ firstName, setFirstName ] = useState([]);
    const [ lastName, setLastName ] = useState([]);
    const [ emailAddress, setEmail ] = useState([]);
    const [ password, setPassword ] = useState([]);
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

    const submit = (event) => {
        event.preventDefault();

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
        });
    } 

    return(
        <div>
            <Header/>
            <hr/>
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        <form>
                            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={changeFN}/></div>
                            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={changeLN}/></div>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={changeEmail}/></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={changePW}/></div>
                            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password"/></div>
                            <div className="grid-100 pad-bottom"><button className="button" type="submit" onSubmit={submit}>Sign Up</button><Link className="button button-secondary" to="/">Cancel</Link></div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>    
        </div>
    )
}

export default UserSignUp;