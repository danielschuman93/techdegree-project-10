import React, { useState } from 'react';
import config from './config';
const axios = require('axios');

export const Context = React.createContext();

export const Provider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
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

    async function getUser(username, password) {
        const response = await api('/users', 'GET', null, true, { username, password });
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

    async function createUser(user) {
        const response = await api('/users', 'POST', user);
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

    async function signIn(username, password) {
        const user = await getUser(username, password);
        if (user !== null) {
        setAuthUser(user);
        }

        return user;
    }

    function signOut() {
        setAuthUser(null);
    }

    return(
        <Context.Provider value={{
            authUser,
            actions: {
                api,
                getUser,
                createUser,
                signIn,
                signOut
            }
        }}>
            { props.children }
        </Context.Provider>
    )
}