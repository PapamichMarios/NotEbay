import React from 'react';

export default function GetCurrentDate() {
    var dateObj = new Date();

    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    if(day < 10)
        day = '0' + day;

    if(month < 10)
        return (year + "-0" + month + "-" + day);
    else
        return (year + "-" + month + "-" + day);
}