import React, { useState } from 'react';
import config from './config';
const axios = require('axios');

export const Context = React.createContext();

export const Provider = (props) => {

    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = config.apiBaseUrl + path;

        return axios({
            method,
            url,
            data: body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
        });
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

    return(
        <Context.Provider value={{
            actions: {
                api,
                getUser,
                createUser
            }
        }}>
            { props.children }
        </Context.Provider>
    )
}