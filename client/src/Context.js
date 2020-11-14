import React, { Component } from 'react';
import config from './config';
import Cookies from 'js-cookie';
const axios = require('axios');

export const Context = React.createContext();

export class Provider extends Component {
    // initialize state of authorized user and password from cookies or null
    state = {
        authUser: Cookies.getJSON('authUser') || null,
        authPassword: Cookies.get('authPassword') || null
    };

    constructor() {
        super();
    }
    // api method takes in parameters and returns an axios call to the api
    api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            data: body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
        }
        // if requiresAuth is true, encode the user's username and password and add the Authorization header to the api call
        if (requiresAuth) {    
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return axios(url, options);
    }

    // getUser function takes in a username a password, makes a call to the api, and returns any matching user data
    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, { username, password });
        if (response.status === 200){
            return response.data;
        }
        else if (response.status === 401){
            return null;
        }
        else {
            throw new Error();
        }
    }

    // createUser function takes in user data and makes a call to the api to create the user in the database
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
          return [];
        }
        else if (response.status === 400) {
          return response.then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
    }

    // signIn function takes in a username and password, if user exists sets authUser and authPassword state to the username and password
    signIn = async (username, password) => {
        const user = await this.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authUser: user,
                    authPassword: password
                }
            });
            // Set cookies to expire in 1 day
            Cookies.set('authUser', JSON.stringify(user), { expires: 1 });
            Cookies.set('authPassword', password, { expires: 1 });
        }
        return user;
    }

    // signOut function sets authUser and authPassword state to null and removes cookies
    signOut = () => {
        this.setState({authUser: null, authPassword: null});
        Cookies.remove('authUser');
        Cookies.remove('authPassword');
    }

    render(){
        return(
            <Context.Provider value={{
                authUser: this.state.authUser,
                authPassword: this.state.authPassword,
                actions: {
                    api: this.api,
                    getUser: this.getUser,
                    createUser: this.createUser,
                    signIn: this.signIn,
                    signOut: this.signOut
                }
            }}>
                { this.props.children }
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}