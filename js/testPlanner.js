document.addEventListener("DOMContentLoaded", () => {
    let g2 = document.querySelector('#grid2');
    let theLine = document.querySelector('#theLine');
    let sbmt = document.querySelector('#sbmtBtn');
    let lineCoords = theLine.getBoundingClientRect();
    let date = document.querySelector('#date');
    let stime = document.querySelector('#stime');
    let etime = document.querySelector('#etime');
    let title = document.querySelector('#title');
    let desc = document.querySelector('#desc');

    let rando = lineCoords.y / 2;
    console.log('rando ' + rando);

    g2.addEventListener('click', getPos);

    sbmt.addEventListener('click', () => {
        console.log('button clicked');
        let d = date.value;
        let s = stime.value;
        let e = etime.value;
        let t = title.value;
        let de = desc.value;

        data = {
            dateVal: d,
            stimeVal: s,
            etimeVal: e,
            titleVal: t,
            descVal: de
        };

        submitPlan(data);
    })
})

function getPos(event) {
    //console.log('x: ' + event.clientX + ' y: ' + event.clientY);
    if(event.clientX > 505 && event.clientY > 305) {
        date.value = '2023-03-18';
        title.value = 'Test';
        desc.value = 'This is a test';
        if(event.clientY < 351) {
            console.log('the time will be 12:00 to 12:30');
            stime.value = '12:00';
            etime.value = '12:30';
        }
        if(event.clientY > 351 && event.clientY < 399) {
            console.log('the time will be 12:30 to 1:00');
            stime.value = '12:30';
            etime.value = '1:00';
        }
        if(event.clientY > 399 && event.clientY < 451) {
            console.log('the time will be 1:00 to 1:30');
            stime.value = '1:00';
            etime.value = '1:30';
        }
        if(event.clientY > 451 && event.clientY < 499) {
            console.log('the time will be 1:30 to 2:00');
            stime.value = '1:30';
            etime.value = '2:00';
        }

    }
}

function submitPlan(data) {
    console.log(data);

    fetch('/input', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(function(err) {
            console.log('Request failed ', err);
        })
}