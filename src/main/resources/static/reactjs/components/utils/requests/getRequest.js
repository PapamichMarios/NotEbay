import React from 'react';
import * as Constants from '../constants';

export default function getRequest(action) {
    return fetch(action, {
           headers: {
               'Accept': 'application/json',
               'Authorization': Constants.ACCESS_TOKEN
           },
           method: 'GET'
        })
        .then(response => response.json());
}