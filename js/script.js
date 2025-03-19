const aliens = [
    'swampfire.png',
    'bigchill.png'
]

const alienEl = document.getElementById("aliens")

const dial = document.querySelector('.dial')

let mode = 1;

let index = 0;

document.querySelector('.alien').addEventListener('click', function(event){
    if (mode == 1){
        alienEl.style.display = 'block'
        mode = 2

        document.querySelector('.des-lft').classList.add('deactive')
        document.querySelector('.des-rht').classList.add('deactive')
    }else{
        alienEl.style.display = 'none'
        index = 0
        mode = 1
        document.querySelector('.des-lft').classList.remove('deactive')
        document.querySelector('.des-rht').classList.remove('deactive')
    }
})

document.addEventListener('rotarydetent', function(event) {
    if (mode == 2){
        if (event.detail.direction === 'CW') { 
            index = (index + 1) % aliens.length;
        } else if (event.detail.direction === 'CCW') {
            index = (index - 1 + aliens.length) % aliens.length;
        }
        alienEl.setAttribute('src', `imgs/${aliens[index]}`)
    }
});

let startX = 0;
let endX = 0;

function startSwipe(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function endSwipe(e) {
    endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    handleSwipe();
}

function handleSwipe() {
    let diffX = endX - startX;
    
    if (diffX > 50) {
        console.log("➡️ Swipe para a direita");
        index = (index + 1) % aliens.length;
    } else if (diffX < -50) {
        console.log("⬅️ Swipe para a esquerda");
        index = (index - 1 + aliens.length) % aliens.length;
    }

    alienEl.setAttribute('src', `imgs/${aliens[index]}`)
}

// Eventos para mobile
document.addEventListener("touchstart", startSwipe);
document.addEventListener("touchend", endSwipe);

// Eventos para desktop
document.addEventListener("mousedown", startSwipe);
document.addEventListener("mouseup", endSwipe);