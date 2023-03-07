document.addEventListener("DOMContentLoaded", () => {
    var btn = document.querySelector('#btn');

    btn.addEventListener('click', () => {
        console.log('Clicked the btn');
        location.href = "next";
    })

    let date = document.querySelector('#dateLbl');
    let dt = new Date();
    let month = dt.getMonth();
    let mnStr = '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = document.querySelector('#dayLbl');
    day.innerHTML = dt.getDate();

    switch(month) {
        case 0:
            mnStr = months[0];
            break;
        case 1:
            mnStr = months[1];
            break;
        case 2:
            mnStr = months[2];
            break;
        case 3:
            mnStr = months[3];
            break;
        case 4:
            mnStr = months[4];
            break;
        case 5:
            mnStr = months[5];
            break;
        case 6:
            mnStr = months[6];
            break;
        case 7:
            mnStr = months[7];
            break;
        case 8:
            mnStr = months[8];
            break;
        case 9:
            mnStr = months[9];
            break;
        case 10:
            mnStr = months[10];
            break;
        case 11:
            mnStr = months[11];
            break;
    }

    date.innerHTML = mnStr;

})