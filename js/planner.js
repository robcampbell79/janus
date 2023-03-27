class JanusPlanner extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'css/planner.css');
        this.shadow.appendChild(linkElem);


    }
}



function isLeapYear(y) {
    var leapYear = 0;

    if (y % 400 == 0) {
        leapYear = 1;
    }
    else if (y % 100 == 0 && y % 4 == 0) {
        leapYear = 0;
    }
    else if (y % 4 == 0 && y % 100 != 0) {
        leapYear = 1;
    }
    else {
        leapYear = 0;
    }

    return leapYear;
}

function findTheFirst(y, m) {
    var yc;
    var mc;
    var cc;
    var dc = 1;
    var lpc;
    var result;

    var thisY = y % 100;
    //console.log('thisY ' + thisY);

    yc = (((thisY / 4) - ((thisY % 4) / 4)) + thisY) % 7;
    //console.log('yc ' + yc);

    switch (m) {
        case 0:
            mc = 0;
            break;
        case 1:
            mc = 3;
            break;
        case 2:
            mc = 3;
            break;
        case 3:
            mc = 6;
            break;
        case 4:
            mc = 1;
            break;
        case 5:
            mc = 4;
            break;
        case 6:
            mc = 6;
            break;
        case 7:
            mc = 2;
            break;
        case 8:
            mc = 5;
            break;
        case 9:
            mc = 0;
            break;
        case 10:
            mc = 3;
            break;
        case 11:
            mc = 5;
            break;
    }
    //console.log('mc ' + mc);

    century = ((y - (y % 100)) / 4) % 100;
    //console.log('century ' + century);

    switch (century) {
        case 0:
            cc = 6;
            break;
        case 25:
            cc = 4;
            break;
        case 50:
            cc = 2;
            break;
        case 75:
            cc = 0;
            break;
    }
    //console.log('cc ' + cc);

    var leapYear = isLeapYear(y);

    if (leapYear == 1 && m < 2) {
        lpc = 1;
    } else {
        lpc = 0;
    }
    //console.log('lpc ' + lpc);

    result = (yc + mc + cc + dc - lpc) % 7;

    return result;
}

function numberOfDays(month, year = 0) {
    var days;
    var date = new Date();
    var year;
    var y;
    var leapYear = 0;

    if (year == 0) {
        y = date.getFullYear();
    } else {
        y = year;
    }

    leapYear = isLeapYear(y);

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        days = 31;
    }
    else if (month == 1 && leapYear == 0) {
        days = 28;
    }
    else if (month == 1 && leapYear == 1) {
        days = 29;
    }
    else {
        days = 30;
    }

    return days;
}

function daysLeftInYear() {
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    var leapYear = isLeapYear(year);
    var days = 0;

    if (leapYear == 1) {
        allDays = 366;
    } else {
        allDays = 365;
    }

    for (i = 0; i < month; i++) {
        days += numberOfDays(i);
    }

    days += day;

    days = allDays - days;

    return days;
}

customElements.define('janus-planner', JanusPlanner);