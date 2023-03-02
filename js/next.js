document.addEventListener("DOMContentLoaded", () => {
    console.log(screen.width+" / "+screen.height); 
    var btn = document.querySelector('#btn'); 
    var rect1 = document.querySelector('#rect1'); 
    var pass = document.querySelector('#passage'); 
    var timer = document.querySelector('#timer');

    //var num = 0;

    for (i = 0; i < 8; i++) {
        var div = document.createElement("div");
        div.id = "tick";
        rect1.appendChild(div);
    }

    const TIME_LIMIT = 60;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;

    var span = document.createElement("span");
    span.id = "sTimer";
    span.innerHTML = formatTime(timeLeft);
    timer.appendChild(span);

    btn.addEventListener('click', () => { 
        console.log('Clicked the btn on next'); 
        pass.style.setProperty("--duration", 60 + "s"); 
        timer.style.setProperty("--duration", 60 + "s");
        startTimer();
    }) 

    function startTimer() {
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            span.innerHTML = formatTime(timeLeft);
            if(timeLeft == 0) {
                timeUp(timerInterval)
            }
        }, 1000);
    }
})

function formatTime(time) {
    const minutes = Math.floor(time/60);

    let secs = time % 60;

    if(secs < 10) {
        secs = `0${secs}`;
    }

    return `${minutes}:${secs}`;
 }

// function startTimer(timePassed, timerInterval) {
//     timerInterval = setInterval(() => {
//         timePassed = timePassed += 1;
//         timeLeft = TIME_LIMIT - timePassed;
//         span.innerHTML = formatTime(timeLeft);
//         if(timeLeft == 0) {
//             timeUp(timerInterval)
//         }
//     }, 1000);
// }

function timeUp(timerInterval) {
    clearInterval(timerInterval);
}