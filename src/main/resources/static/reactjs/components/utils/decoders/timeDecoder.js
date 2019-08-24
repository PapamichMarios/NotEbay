import React from 'react';

export default function decodeTime(toDecode) {
    var decoded = toDecode.split('T');
    var time = decoded[1].split('.');

    return time[0];
}