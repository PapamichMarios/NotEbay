import React from 'react';
import * as Constants from '../constants';

export default function postRequest(action, data) {
    return fetch(action, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Constants.ACCESS_TOKEN
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json());
}