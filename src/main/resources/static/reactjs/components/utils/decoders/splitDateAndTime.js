export default function splitDateAndTime(dateAndTimeToDecode) {
    var dateAndTime = dateAndTimeToDecode.split('T');
    var date = dateAndTime[0];

    var timeToDecode = dateAndTime[1];
    var time = timeToDecode.split('.');

    return [date, time[0]];
}