import React, { Component } from 'react';
import config from './config';
const axios = require('axios');

export const Context = React.createContext();

export class Provider extends Component {
    state = {
        authUser: null,
        authPassword: null
    };

    constructor() {
        super();
    }

    api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            data: body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
        }

        if (requiresAuth) {    
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return axios(url, options);
    }

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

    signIn = async (username, password) => {
        const user = await this.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authUser: user,
                    authPassword: password
                }
            });
        }
        return user;
    }

    signOut = () => {
        this.setState({authUser: null});
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