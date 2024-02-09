const convertDateToIndia = () => {
    const date = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'Asia/Kolkata'
    };

    const dateInIndia = date.toLocaleString(undefined, options);
    return dateInIndia
}

const convertTimeToIndia = () => {
    const timeZone = "Asia/Kolkata"
    let date = new Date()
    const hourWithMeridiem = date.toLocaleString(undefined, { hour: "numeric", timeZone });
    const hour = hourWithMeridiem.split(" ")[0].padStart(2, '0');
    const meridiem = hourWithMeridiem.split(" ")[1];
    const min = date.toLocaleString(undefined, { minute: "2-digit", timeZone }).padStart(2, '0');
    const sec = date.toLocaleString(undefined, { second: "2-digit", timeZone }).padStart(2, '0');

    return hour + ":" + min + ":" + sec + " " + meridiem.toUpperCase();
}

class DateAndTime {
    constructor() {
        this.getDate = convertDateToIndia();
        this.getTime = convertTimeToIndia();
        this.timestamps = convertDateToIndia() + " " + convertTimeToIndia();
    }
}

export const indiaDate = new DateAndTime();