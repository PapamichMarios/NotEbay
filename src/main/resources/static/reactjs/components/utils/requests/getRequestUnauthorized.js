import React from 'react';
import * as Constants from '../constants';

export default function getRequestUnauth(action) {
    return fetch(action, {
           headers: {
               'Accept': 'application/json',
           },
           method: 'GET'
        })
        .then(response => response.json());
}