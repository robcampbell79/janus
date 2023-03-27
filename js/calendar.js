class JanusCalendar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        console.log('height: '+screen.height+ ' width: '+screen.width);
        let calendar = document.createElement('div');
        calendar.className = "janusCal";
        this.shadow.appendChild(calendar)

        var daysAttr = this.getAttribute('days');
        let calendar_grid = document.createElement('div');
        this.shadow.appendChild(calendar_grid);
        calendar_grid.className = "calendar_grid";
        // calendar_grid.style.height = screen.height;
        // calendar_grid.style.width = screen.width;
        calendar_grid.style.left = screen.width - 980;

        let upperPanel = document.createElement('div');
        upperPanel.className = 'upperPanel';
        upperPanel.style.left = screen.width-1000;
        calendar_grid.appendChild(upperPanel);

        let monthEl = document.createElement('div');
        monthEl.className = "month";
        calendar_grid.appendChild(monthEl);

        let prevYrBtn = document.createElement('button');
        prevYrBtn.className = "prevYear";
        prevYrBtn.innerHTML = '&lt&lt';
        monthEl.appendChild(prevYrBtn);

        let prevBtn = document.createElement('button');
        prevBtn.className = "prev";
        prevBtn.innerHTML = '&lt';
        monthEl.appendChild(prevBtn);

        let current = document.createElement('button');
        current.className = "current";
        monthEl.appendChild(current);

        let nextBtn = document.createElement('button');
        nextBtn.className = "next";
        nextBtn.innerHTML = '&gt';
        monthEl.appendChild(nextBtn);

        let nextYrBtn = document.createElement('button');
        nextYrBtn.className = "nextYear";
        nextYrBtn.innerHTML = '&gt&gt';
        monthEl.appendChild(nextYrBtn);

        let daysOfWeek = document.createElement('div');
        daysOfWeek.className = "days_of_week";
        upperPanel.appendChild(daysOfWeek);

        let su = document.createElement('div');
        su.id = 'day';
        su.innerHTML = 'Su';
        daysOfWeek.appendChild(su);

        let mo = document.createElement('div');
        mo.id = 'day';
        mo.innerHTML = 'Mo';
        daysOfWeek.appendChild(mo);

        let tu = document.createElement('div');
        tu.id = 'day';
        tu.innerHTML = 'Tu';
        daysOfWeek.appendChild(tu);

        let we = document.createElement('div');
        we.id = 'day';
        we.innerHTML = 'We';
        daysOfWeek.appendChild(we);

        let th = document.createElement('div');
        th.id = 'day';
        th.innerHTML = 'Th';
        daysOfWeek.appendChild(th);

        let fr = document.createElement('div');
        fr.id = 'day';
        fr.innerHTML = 'Fr';
        daysOfWeek.appendChild(fr);

        let sa = document.createElement('div');
        sa.id = 'day';
        sa.innerHTML = 'Sa';
        daysOfWeek.appendChild(sa);

        let dateEl = document.createElement('div');
        dateEl.className = "date";
        upperPanel.appendChild(dateEl);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'css/calendar.css');
        this.shadow.appendChild(linkElem);

        var date = new Date();
        var month;
        var year;
        var day;
        var minMonth;
        var minYear;
        var minDay;
        var dayOfMonth = [];
        var calendarArr = [];
        var minDate = [];
        // var minDateType = document.querySelector('#minDate_type');
        var minDateTypeVal;
        var minDateNumber;
        var minDateNum = 0;
        // let btnCal = document.querySelector('#btnCal');

        if (daysAttr == null || daysAttr == 'none') {
            minDateNumber = '-1';
        }
        else if (daysAttr == 'current') {
            minDateNumber = '0';
        }
        else {
            minDateNumber = daysAttr;
        }

        minDateTypeVal = 'days';
        //minDateNumber = '0';

        minDateNum = parseInt(minDateNumber);
        minDate = setMinDate(minDateTypeVal, minDateNum);

        minYear = minDate[0];
        minMonth = minDate[1];
        minDay = minDate[2];
        year = minYear;
        month = minMonth;
        day = minDay;

        for (var i = 0; i < calendarArr.length; i++) {
            calendarArr[i].remove();
        }

        calendarArr = [];

        calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);

        calendar_grid.style.display = 'block';

        // btnCal.addEventListener('focus', () => {

        //     if (daysAttr == null || daysAttr == 'none') {
        //         minDateNumber = '-1';
        //     }
        //     else if (daysAttr == 'current') {
        //         minDateNumber = '0';
        //     }
        //     else {
        //         minDateNumber = daysAttr;
        //     }

        //     minDateTypeVal = 'days';
        //     //minDateNumber = '0';

        //     minDateNum = parseInt(minDateNumber);
        //     minDate = setMinDate(minDateTypeVal, minDateNum);

        //     minYear = minDate[0];
        //     minMonth = minDate[1];
        //     minDay = minDate[2];
        //     year = minYear;
        //     month = minMonth;
        //     day = minDay;

        //     for (var i = 0; i < calendarArr.length; i++) {
        //         calendarArr[i].remove();
        //     }

        //     calendarArr = [];

        //     calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);

        //     calendar_grid.style.display = 'block';
        // });

        prevBtn.addEventListener('click', () => {
            day = 0;

            for (var i = 0; i < calendarArr.length; i++) {
                calendarArr[i].remove();
            }

            calendarArr = [];

            if (month == 0) {
                month = 11;
                year = year - 1;
            } else {
                month = month - 1;
            }

            calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);

        });

        prevYrBtn.addEventListener('click', () => {
            day = 0;

            for (var i = 0; i < calendarArr.length; i++) {
                calendarArr[i].remove();
            }

            calendarArr = [];

            year = year - 1;

            if (year > date.getFullYear()) {
                minDate = [];
                calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);
            } else {
                calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);
            }


        });

        nextBtn.addEventListener('click', () => {
            day = 0;

            for (var i = 0; i < calendarArr.length; i++) {
                calendarArr[i].remove();
            }

            calendarArr = [];

            if (month == 11) {
                month = 0;
                year = year + 1;
            } else {
                month = month + 1;
            }

            calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);

        });

        nextYrBtn.addEventListener('click', () => {
            day = 0;

            for (var i = 0; i < calendarArr.length; i++) {
                calendarArr[i].remove();
            }

            calendarArr = [];

            year = year + 1;

            if (year > date.getFullYear()) {
                minDate = [];
                calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);
            } else {
                calendarArr = createCalendar(year, month, day, minDate, dateEl, current, calendar_grid);
            }


        });

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

function createCalendar(year, month, day = 0, minDate = [], dateEl, current, calendar_grid) {

    var date = new Date();
    var dayOfMonth = [];
    var days;
    var lastMonth;
    var prevDays;
    var firstDay;
    var prevDaysFill;
    var dayStart = 1;
    var minYear;
    var minMonth;
    var minDay;

    if (minDate.length > 0) {
        minYear = minDate[0];
        minMonth = minDate[1];
        minDay = minDate[2];
    } else {
        minYear = 0;
        minMonth = 0;
        minDay = 0;
    }

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var firstOfMonth = findTheFirst(year, month);

    var cssGridProp = 'grid-area: 1/1/2/2;';

    days = numberOfDays(month, year);
    monthVal = month;
    firstDay = findTheFirst(year, month);
    lastMonth = month - 1;
    prevDays = numberOfDays(lastMonth, year);
    prevDaysFill = prevDays - (firstDay - 1);
    prevDaysFill2 = prevDays - (firstDay - 1);
    totalDays = days + firstDay;




    // for (var i = 0; i < 42; i++) {
    //     var btn = document.createElement("button");
    //     btn.className = 'btn' + i;
    //     btn.type = 'button'
    //     dayOfMonth.push(btn);
    // }

    for (var i = 0; i < 42; i++) {
        var dayBlk = document.createElement("div");
        // dayBlk.className = 'dayBlk' + i;
        dayBlk.className = 'dayBlk';
        dayBlk.style.height ='55px';
        dayBlk.style.width = '112px';
        dayBlk.style.borderRadius = '25%';
        dayBlk.style.textAlign = 'left';
        dayBlk.style.padding = '10px';
        dayBlk.style.color = '#66ffc2';
        dayBlk.style.textShadow = '0 0 7px #66ffc2,0 0 10px #66ffc2,0 0 21px #66ffc2,0 0 42px #0fa,0 0 82px #0fa,0 0 92px #0fa,0 0 102px #0fa,0 0 151px #0fa';
        //glasspanels
        dayBlk.style.background = 'rgba(255, 255, 255, 0.15)';
        dayBlk.style.borderRadius = '5px';
        dayBlk.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        dayBlk.style.backdropFilter = 'saturate(50%) blur(5px)';
        dayBlk.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        //glasspanels
        dayOfMonth.push(dayBlk);
    }

    for (var j = 0; j < firstDay; j++) {
        dayOfMonth[j].value = prevDaysFill * -1;
        dayOfMonth[j].disabled = true;
        dayOfMonth[j].innerHTML = prevDaysFill;
        dayOfMonth[j].style.color = '#4d4d4d';
        dayOfMonth[j].style.textShadow = '';
        prevDaysFill++;
    }

    var d = 1;

    if (minDay > 0) {
        for (var k = firstDay; k < days + firstDay; k++) {
            dayOfMonth[k].value = (monthVal + 1) + '/' + d + '/' + year;
            dayOfMonth[k].innerHTML = dayStart;
            if (dayStart < minDay && monthVal == minMonth) {
                dayOfMonth[k].disabled = true;
            }
            else if (monthVal > minMonth && year == minYear) {
                dayOfMonth[k].disabled = false;
            }
            else if (year < minYear) {
                dayOfMonth[k].disabled = true;
            }
            else if (dayStart <= minDay && monthVal > -1 && year > date.getFullYear()) {
                dayOfMonth[k].disabled = false;
            }
            else if (year > minYear) {
                dayOfMonth[k].disabled = false;
            }
            else if (monthVal < minMonth && (year == minYear || year < minYear)) {
                dayOfMonth[k].disabled = true;
            }
            else {
                dayOfMonth[k].disabled = false;
            }
            dayStart++;
            d++;
        }
    } else {
        for (var k = firstDay; k < days + firstDay; k++) {
            dayOfMonth[k].value = (monthVal + 1) + '/' + d + '/' + year;
            dayOfMonth[k].innerHTML = dayStart;
            dayStart++;
            d++;
        }
    }

    var fDays = 1;

    for (var h = days + firstDay; h < 42; h++) {
        dayOfMonth[h].value = -1;
        dayOfMonth[h].disabled = true;
        dayOfMonth[h].innerHTML = fDays;
        dayOfMonth[h].style.color = '#4d4d4d';
        dayOfMonth[h].style.textShadow = '';
        fDays++;
    }

    cssNeon = 'text-align: left; padding: 10px; color: #33ffad; text-shadow: 0 0 7px #33ffad,0 0 10px #33ffad,0 0 21px #33ffad,0 0 42px #0fa,0 0 82px #0fa,0 0 92px #0fa,0 0 102px #0fa,0 0 151px #0fa;';
    cssGlass = 'background: rgba(255, 255, 255, 0.15); border-radius: 5px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5); backdrop-filter: saturate(50%) blur(5px); border: 1px solid rgba(255, 255, 255, 0.3);';

    switch (firstOfMonth) {
        case 0:
            cssGridProp = 'grid-area: 1/1/2/2;'+cssNeon+cssGlass;
            break;
        case 1:
            cssGridProp = 'grid-area: 1/2/2/3;'+cssNeon+cssGlass;
            break;
        case 2:
            cssGridProp = 'grid-area: 1/3/2/4;'+cssNeon+cssGlass;
            break;
        case 3:
            cssGridProp = 'grid-area: 1/4/2/5;'+cssNeon+cssGlass;
            break;
        case 4:
            cssGridProp = 'grid-area: 1/5/2/6;'+cssNeon+cssGlass;
            break;
        case 5:
            cssGridProp = 'grid-area: 1/6/2/7;'+cssNeon+cssGlass;
            break;
        case 6:
            cssGridProp = 'grid-area: 1/7/2/8;'+cssNeon+cssGlass;
            break;
    }

    dayOfMonth[firstOfMonth].style.cssText = cssGridProp;


    for (var i = 0; i < dayOfMonth.length; i++) {
        dateEl.appendChild(dayOfMonth[i]);
    }

    var buttons = dayOfMonth;

    current.innerHTML = months[month] + ' ' + year;

    return dayOfMonth;

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

function setMinDate(type, when) {
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();
    var nextMonth;
    var nextYear = year + 1;
    var currentNumDays = numberOfDays(month);
    var nextNumDays;
    var daysLeft = currentNumDays - day;
    var restOfYear = daysLeftInYear();
    var yearCounter = 0;
    var minYear = 0;
    var minMonth = 0;
    var minDay = 0;
    var allYear = 365;
    var allNextYear = 365;
    var minDate = [];

    if (month + 1 < 12) {
        nextMonth = month + 1;
    } else {
        nextMonth = 0;
        year + 1;
    }

    nextNumDays = numberOfDays(nextMonth);

    if (type == 'weeks') {
        when = when * 7;
    }

    if (isLeapYear(nextYear) == 1) {
        allNextYear = 366;
    } else {
        allNextYear = 365;
    }

    var thisAndNextMonth = daysLeft + nextNumDays;
    var thisAndNextYear = restOfYear + allNextYear;

    if (when > restOfYear && when < thisAndNextYear) {
        //console.log('komodo dragon');
        when -= restOfYear;
        yearCounter++;
        month = 0;
        days = numberOfDays(month);

        while (when > days) {
            if (month == 12) {
                month = 0;
            }

            when -= days;
            month++;
            days = numberOfDays(month);
        }

        minYear = year + yearCounter;
        minMonth = month;
        minDay = when;

    }
    else if (when > restOfYear && when > thisAndNextYear) {
        //console.log('wolf');
        when -= restOfYear;
        yearCounter++;

        if (isLeapYear(year + yearCounter)) {
            allYear = 366
        } else {
            allYear = 365;
        }

        while (when > allYear) {

            if (isLeapYear(year + yearCounter)) {
                allYear = 366
            } else {
                allYear = 365;
            }

            when -= allYear;
            yearCounter++;
        }

        month = 0;
        days = numberOfDays(month, (year + yearCounter));

        if (when > days) {
            while (when > days) {
                if (month == 11) {
                    month = 0;
                }

                when -= days;
                month++;
                days = numberOfDays(month, year + yearCounter);
            }

        } else {
            when -= days;
        }
        minYear = year + yearCounter;
        minMonth = month;
        minDay = when;

    }
    // else if (when > daysLeft && when < thisAndNextMonth) {
    else if (when > daysLeft) {
        //console.log('raven');
        when -= daysLeft;

        if (month == 11) {
            month = 0;
            year++;
        } else {
            month++;
        }

        days = numberOfDays(month, year)

        if (when > days) {
            while (when > days) {
                when -= days;
                if (month == 11) {
                    month = 0;
                    year++;
                } else {
                    month++;
                }
            }
        }

        minYear = year;
        minMonth = month;
        minDay = when;
    }
    else {
        if (when == -1) {
            when = 0;
        } else {
            // console.log('fire hawk day is ' + day);
            when += day;
        }

        minYear = year;
        minMonth = month;
        minDay = when;
    }

    // console.log('month: ' + minMonth);
    // console.log('day: ' + minDay);
    // console.log('year ' + minYear);

    minDate.push(minYear);
    minDate.push(minMonth);
    minDate.push(minDay);

    return minDate;


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

function dragElement(el) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        // console.log("pos3 " + pos3);
        // console.log("pos4 " + pos4);

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

customElements.define('janus-calendar', JanusCalendar);