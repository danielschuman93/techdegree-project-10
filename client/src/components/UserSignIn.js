import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function UserSignIn() {
    return(
        <div>
            <Header/>
            <hr/>
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/></div>
                            <div><input id="password" name="password" type="password" className="" placeholder="Password" value=""/></div>
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