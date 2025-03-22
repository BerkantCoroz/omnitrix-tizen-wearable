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
        scale: 1.2
    },
    {
        name: 'diamondhead',
        src: 'diamondhead.png',
        scale: 1.2
    },
    {
        name: 'cannonbolt',
        src: 'cannonbolt.png',
        scale: 1.6
    },
    {
        name: 'upgrade',
        src: 'upgrade.png',
        scale: 1.4
    },
    {
        name: 'ripjaws',
        src: 'ripjaws.png',
        scale: 1.0
    },
    {
        name: 'echoecho',
        src: 'echoecho.png',
        scale: 1.0
    },
    {
        name: 'rath',
        src: 'rath.png',
        scale: 1.3
    },
    {
        name: 'spidermonkey',
        src: 'spidermonkey.png',
        scale: 1.4
    },
    {
        name: 'nrg',
        src: 'nrg.png',
        scale: 1.2
    },
    {
        name: 'nanomech',
        src: 'nanomech.png',
        scale: 1.1
    },
    {
        name: 'armadrillo',
        src: 'armadrillo.png',
        scale: 1.6
    },
    {
        name: 'waterhazard',
        src: 'waterhazard.png',
        scale: 1.0
    },
    {
        name: 'ampfibian',
        src: 'ampfibian.png',
        scale: 1.0
    },
    {
        name: 'terraspin',
        src: 'terraspin.png',
        scale: 1.6
    },
    {
        name: 'lodestar',
        src: 'lodestar.png',
        scale: 1.0
    },
    {
        name: 'ghostfreak',
        src: 'ghostfreak.png',
        scale: 0.9
    },
    {
        name: 'zsskayr',
        src: 'zsskayr.png',
        scale: 1.5
    },
    {
        name: 'eatle',
        src: 'eatle.png',
        scale: 1.2
    },
    {
        name: 'goop',
        src: 'goop.png',
        scale: 1.1
    },
    {
        name: 'juryrigg',
        src: 'juryrigg.png',
        scale: 1.1
    },
    {
        name: 'chamalien',
        src: 'chamalien.png',
        scale: 1.1
    },
    {
        name: 'fasttrack',
        src: 'fasttrack.png',
        scale: 1.0
    },
    {
        name: 'clockwork',
        src: 'clockwork.png',
        scale: 1.5
    },
    {
        name: 'brainstorm',
        src: 'brainstorm.png',
        scale: 1.7
    },
    {
        name: 'vomitman',
        src: 'vomitman.png',
        scale: 1.0
    },
    {
        name: 'wildmutt',
        src: 'wildmutt.png',
        scale: 1.6
    },
    {
        name: 'jetray',
        src: 'jetray.png',
        scale: 1.4
    },
    {
        name: 'waybig',
        src: 'waybig.png',
        scale: 1.1
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
    // document.querySelector('.des-lft').classList.add('deactive')
    // document.querySelector('.des-rht').classList.add('deactive')
    document.querySelector('.hologram').style.display='block'
    document.querySelector('.des-lft').classList.remove('des-lft-off')
    document.querySelector('.des-rht').classList.remove('des-rht-off')
    document.querySelector('.des-lft').classList.add('des-lft-on')
    document.querySelector('.des-rht').classList.add('des-rht-on')
})

document.querySelector('.hologram').addEventListener('click', function(event){
    alienEl.style.display = 'none'
    index = 0
    mode = 1
    document.getElementById('ox_transformation').play()
    // document.querySelector('.des-lft').classList.remove('deactive')
    // document.querySelector('.des-rht').classList.remove('deactive')
    document.querySelector('.hologram').style.display='none'
    document.querySelector('.des-lft').classList.remove('des-lft-on')
    document.querySelector('.des-rht').classList.remove('des-rht-on')
    document.querySelector('.des-lft').classList.add('des-lft-off')
    document.querySelector('.des-rht').classList.add('des-rht-off')
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
        document.querySelector('.alien').classList.remove('alien-on')
        alienEl.style.transform = `scale(${aliens[index].scale})`
        alienEl.src = `imgs/${aliens[index].src}`
        document.querySelector('.alien').classList.add('alien-on')
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
        document.querySelector('.alien').classList.remove('alien-on')
        alienEl.style.transform = `scale(${aliens[index].scale})`
        alienEl.src = `imgs/${aliens[index].src}`
        document.querySelector('.alien').classList.add('alien-on')
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

    document.querySelector('.alien').classList.remove('alien-on')
    alienEl.style.transform = `scale(${aliens[index].scale})`
    alienEl.src = `imgs/${aliens[index].src}`
    document.querySelector('.alien').classList.add('alien-on')
}

// Eventos para mobile
document.addEventListener("touchstart", startSwipe);
document.addEventListener("touchend", endSwipe);

// Eventos para desktop
document.addEventListener("mousedown", startSwipe);
document.addEventListener("mouseup", endSwipe);