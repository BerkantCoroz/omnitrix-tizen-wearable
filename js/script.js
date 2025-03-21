const aliens = [
    {
        name: 'swampfire',
        src: 'swampfire.png',
        scale: 1.0
    },
    {
        name: 'bigchill',
        src: 'bigchill.png',
        scale: 1.0
    },
    {
        name: 'humungousaur',
        src: 'humungousaur.png',
        scale: 1.3
    },
    {
        name: 'alienx',
        src: 'alienx.png',
        scale: 1.0
    },
    {
        name: 'heatblast',
        src: 'heatblast.png',
        scale: 1.0
    },
    {
        name: 'fourarms',
        src: 'fourarms.png',
        scale: 1.0
    },
    {
        name: 'diamondhead',
        src: 'diamondhead.png',
        scale: 1.0
    },
    {
        name: 'jetray',
        src: 'jetray.png',
        scale: 1.3
    },
    {
        name: 'waybig',
        src: 'waybig.png',
        scale: 1.0
    },
    {
        name: 'chromastone',
        src: 'chromastone.png',
        scale: 1.0
    }
]

const alienEl = document.getElementById("aliens")

const dial = document.querySelector('.dial')

let mode = 1;

let index = 0;

document.querySelector('.alien').addEventListener('click', function(event){
    alienEl.style.display = 'block'
    mode = 2
    document.getElementById('ox_activate').play()
    document.getElementById('ox_activating').play()
    document.querySelector('.des-lft').classList.add('deactive')
    document.querySelector('.des-rht').classList.add('deactive')
    document.querySelector('.hologram').style.display='block'
})

document.querySelector('.hologram').addEventListener('click', function(event){
    alienEl.style.display = 'none'
    index = 0
    mode = 1
    document.getElementById('ox_transformation').play()
    document.querySelector('.des-lft').classList.remove('deactive')
    document.querySelector('.des-rht').classList.remove('deactive')
    document.querySelector('.hologram').style.display='none'
})

document.addEventListener('keydown', function(event) {
    if (mode == 2){
        if (event.key === 'ArrowRight') {
            document.getElementById('RCCW').play()
            index = (index + 1) % aliens.length;
        } else if (event.key === 'ArrowLeft') {
            document.getElementById('RCCW').play()
            index = (index - 1 + aliens.length) % aliens.length;
        }
        alienEl.src = `imgs/${aliens[index].src}`
        alienEl.style.scale = aliens[index].scale
    }
})

document.addEventListener('rotarydetent', function(event) {
    if (mode == 2){
        if (event.detail.direction === 'CW') { 
            document.getElementById('RCCW').play()
            index = (index + 1) % aliens.length;
        } else if (event.detail.direction === 'CCW') {
            document.getElementById('RCCW').play()
            index = (index - 1 + aliens.length) % aliens.length;
        }
        alienEl.src = `imgs/${aliens[index].src}`
        alienEl.style.scale = aliens[index].scale
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
        // console.log("Swipe para a direita");
        document.getElementById('RCCW').play()
        index = (index + 1) % aliens.length;
    } else if (diffX < -50) {
        // console.log("Swipe para a esquerda");
        document.getElementById('RCCW').play()
        index = (index - 1 + aliens.length) % aliens.length;
    }

    alienEl.src = `imgs/${aliens[index].src}`
    alienEl.style.scale = aliens[index].scale
}

// Eventos para mobile
document.addEventListener("touchstart", startSwipe);
document.addEventListener("touchend", endSwipe);

// Eventos para desktop
document.addEventListener("mousedown", startSwipe);
document.addEventListener("mouseup", endSwipe);