import React from 'react';

export default function decodeDate(toDecode) {
    var decoded = toDecode.split('T');
    var date = decoded[0];
    var dateSplit = date.split('-');

    var month;
    if (dateSplit[1] === '01')
        month = 'January';
    else if (dateSplit[1] === '02')
        month = 'February';
    else if (dateSplit[1] === '03')
        month = 'March';
    else if (dateSplit[1] === '04')
        month = 'April';
    else if (dateSplit[1] === '05')
        month = 'May';
    else if (dateSplit[1] === '06')
        month = 'June';
    else if (dateSplit[1] === '07')
        month = 'July';
    else if (dateSplit[1] === '08')
        month = 'August';
    else if (dateSplit[1] === '09')
        month = 'September';
    else if (dateSplit[1] === '10')
        month = 'October';
    else if (dateSplit[1] === '11')
        month = 'November';
    else if (dateSplit[1] === '12')
        month = 'December';

    return (dateSplit[2] + ' ' + month + ' ' + dateSplit[0]);
}