document.addEventListener("DOMContentLoaded", () => {
    console.log(screen.width+" / "+screen.height); 
    var btn = document.querySelector('#btn'); 
    let psBtn = document.querySelector('#psBtn');
    var rect1 = document.querySelector('#rect1'); 
    var pass = document.querySelector('#passage'); 
    var timer = document.querySelector('#timer');

    btn.innerHTML = 'Start Timer';

    for (i = 0; i < 8; i++) {
        var div = document.createElement("div");
        div.id = "tick";
        rect1.appendChild(div);
    }

    const TIME_LIMIT = 60;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let paused = true;

    var span = document.createElement("span");
    span.id = "sTimer";
    span.innerHTML = formatTime(timeLeft);
    timer.appendChild(span);

    btn.addEventListener('click', () => { 
        console.log('Clicked the btn on next'); 
        if(btn.innerHTML == 'Start Timer') {
            console.log(btn.innerHTML);
            btn.innerHTML = 'Reset Timer';
            pass.style.setProperty("--duration", 60 + "s"); 
            pass.style.animation = 'timefill linear var(--duration) forwards';
            paused = false;
            startTimer();
        }
        else if(btn.innerHTML == 'Reset Timer') {
            console.log(btn.innerHTML);
            pass.style.animation = 'none';
            timeUp(timerInterval);
            paused = true;
            stopTimer();
            btn.innerHTML = 'Start Timer';
            psBtn.innerHTML = 'Pause Timer';
        }
        else {
            console.log('idk');
        }
        
    }) 

    psBtn.addEventListener('click', () => {
        console.log('pause');
        if(psBtn.innerHTML == 'Pause Timer') {
            psBtn.innerHTML = 'Resume Timer';
            pass.style.animationPlayState = 'paused';
            console.log('passed time: ' + timePassed);
            pauseTimer(true);
        } 
        else if(psBtn.innerHTML == 'Resume Timer') {
            psBtn.innerHTML = 'Pause Timer';
            pass.style.animationPlayState = 'running';
            pauseTimer(false);
        }
        else {
            console.log('idk also');
        }
    })

    function startTimer() {
        timerInterval = setInterval(() => {
            if(paused == false) {
                timePassed = timePassed += 1;
                timeLeft = TIME_LIMIT - timePassed;
                span.innerHTML = formatTime(timeLeft);
            }
            if(timeLeft == 0) {
                timeUp(timerInterval)
            }
        }, 1000);
    }

    function pauseTimer(toPause) {
        paused = toPause;
    }

    function stopTimer() {
        timeLeft = TIME_LIMIT;
        timePassed = 0;
        span.innerHTML = formatTime(timeLeft);
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