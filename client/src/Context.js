import React, { useState } from 'react';
import config from './config';
const axios = require('axios');

export const Context = React.createContext();

export const Provider = (props) => {

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
            return response.then(data => data);
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

      const [authUser, setAuthUser] = useState([]);
      async function signIn(username, password) {
        const user = await getUser(username, password);
        if (user !== null) {
            setAuthUser(user);
        }

        return user;
      }

    return(
        <Context.Provider value={{
            actions: {
                api,
                getUser,
                createUser,
                signIn
            }
        }}>
            { props.children }
        </Context.Provider>
    )
}