import React from 'react';
import * as Constants from '../constants';

export default function deleteRequest(action){
    return fetch(action, {
           headers: {
               'Accept': 'application/json',
               'Authorization': Constants.ACCESS_TOKEN
           },
           method: 'DELETE'
        })
        .then(response => response.json())
}