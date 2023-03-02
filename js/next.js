document.addEventListener("DOMContentLoaded", () => {
    console.log(screen.width+" / "+screen.height); 
    var btn = document.querySelector('#btn'); 
    //var rect1 = document.querySelector('#rect1'); 
    var pass = document.querySelector('#passage'); 
    var rect2 = document.querySelector('#rect2'); 
     
 
    btn.addEventListener('click', () => { 
        console.log('Clicked the btn on next'); 
        pass.style.setProperty("--duration", 15 + "s"); 
        rect2.style.setProperty("--duration", 20 + "s"); 
        //rect2.style.backgroundPosition = '200% left'; 
    }) 
})