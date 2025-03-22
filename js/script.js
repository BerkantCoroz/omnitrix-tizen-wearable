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
const alienEl = document.getElementById("aliens");
const dial = document.querySelector(".dial");

let mode = 1;
let index = 0;

// Pré-carregar áudios para evitar atrasos
const sounds = {
    activate: new Audio("audio/activate.wav"),
    activating: new Audio("audio/activating.wav"),
    transformation: new Audio("audio/transformation.wav"),
    rccw: new Audio("audio/dial_SFX/dial_sfx_5.wav"),
};

// Forçar carregamento dos áudios
document.addEventListener("DOMContentLoaded", function () {
    for (let key in sounds) {
        sounds[key].load();
    }
});

function playSound(sound) {
    if (sounds[sound]) {
        const audioClone = sounds[sound].cloneNode(); // Evita interrupções
        audioClone.volume = 1;
        setTimeout(() => audioClone.play().catch(() => { }), 10); // Pequeno atraso para evitar bloqueios
    }
}

document.querySelector(".alien").addEventListener("click", function () {
    mode = 2;
    playSound("activate");
    setTimeout(() => playSound("activating"), 50); // Pequeno atraso entre os sons
    document.querySelector(".des-lft").classList.remove("des-lft-off");
    document.querySelector(".des-rht").classList.remove("des-rht-off");
    document.querySelector(".des-lft").classList.add("des-lft-on");
    document.querySelector(".des-rht").classList.add("des-rht-on");

    setTimeout(function () {
        document.querySelector(".hologram").style.display = "block";
    }, 250);
    setTimeout(function() {
        alienEl.style.display = 'block';
    }, 500);
});

document.querySelector(".hologram").addEventListener("click", function () {
    index = 0;
    mode = 1;
    playSound("transformation");
    document.querySelector(".des-lft").classList.remove("des-lft-on");
    document.querySelector(".des-rht").classList.remove("des-rht-on");
    document.querySelector(".des-lft").classList.add("des-lft-off");
    document.querySelector(".des-rht").classList.add("des-rht-off");
    alienEl.style.display = 'none';
    document.querySelector(".hologram").style.display = "none";
});

document.addEventListener("keydown", function (event) {
    if (mode == 2) {
        if (event.key === "ArrowRight") {
            playSound("rccw");
            index = (index + 1) % aliens.length;
        } else if (event.key === "ArrowLeft") {
            playSound("rccw");
            index = (index - 1 + aliens.length) % aliens.length;
        }
        updateAlien();
    }
});

document.addEventListener("rotarydetent", function (event) {
    if (mode == 2) {
        if (event.detail.direction === "CW") {
            playSound("rccw");
            index = (index + 1) % aliens.length;
        } else if (event.detail.direction === "CCW") {
            playSound("rccw");
            index = (index - 1 + aliens.length) % aliens.length;
        }
        updateAlien();
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
    if (Math.abs(diffX) > 50) {
        let direction = diffX > 0 ? 1 : -1;
        playSound("rccw");
        index = (index + direction + aliens.length) % aliens.length;
        requestAnimationFrame(updateAlien);
    }
}

function updateAlien() {
    document.querySelector(".alien").classList.remove("alien-on");
    alienEl.style.transform = `scale(${aliens[index].scale})`;
    alienEl.src = `imgs/${aliens[index].src}`;
    document.querySelector(".alien").classList.add("alien-on");
}

// Eventos otimizados para melhor resposta
const eventTypes = ["pointerdown", "pointerup"];
eventTypes.forEach(event => {
    document.addEventListener(event, event.includes("down") ? startSwipe : endSwipe);
});
