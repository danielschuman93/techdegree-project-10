import React, { useState } from 'react';
import config from './config';
const axios = require('axios');

export const Context = React.createContext();

export const Provider = (props) => {

    const api = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
        const url = config.apiBaseUrl + path;

        return axios.get(url);
    }

    return(
        <Context.Provider value={{
            actions: {
                api
            }
        }}>
            { props.children }
        </Context.Provider>
    )
}