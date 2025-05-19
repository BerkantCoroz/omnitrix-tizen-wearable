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
        name: 'diamondhead',
        src: 'diamondhead.png',
        scale: 1.2
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
        name: 'cannonbolt',
        src: 'cannonbolt.png',
        scale: 1.0
    },
    {
        name: 'eyeGuy',
        src: 'eyeGuy.png',
        scale: 1.6
    },
    {
        name: 'benwolf',
        src: 'benwolf.png',
        scale: 1.0
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
        name: 'alienx',
        src: 'alienx.png',
        scale: 1.0
    },
    {
        name: 'nanomech',
        src: 'nanomech.png',
        scale: 1.1
    },
    {
        name: 'frakenstrike',
        src: 'frakenstrike.png',
        scale: 1.0
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
        name: 'clockwork',
        src: 'clockwork.png',
        scale: 1.5
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
        name: 'fasttrack',
        src: 'fasttrack.png',
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
let clickCount = 0;
let clickTimer = null;
let clickState = 0; // 0: başlangıç, 1: uzaylı seçim, 2: omnitrix logosu, 3: ultimatrix logosu

const ultimateAliens = [
    'swampfire',
    'humungousaur',
    'cannonbolt',
    'wildmutt',
    'bigchill',
    'echoecho',
    'spidermonkey',
    'waybig'
];

// Pré-carregar áudios para evitar atrasos
const sounds = {
    activate: new Audio("audio/activate.mp3"),
    activating: new Audio("audio/activating.mp3"),
    transformation: new Audio("audio/transformation.mp3"),
    rccw: new Audio("audio/dial_sfx_5.mp3"),
    close: new Audio("audio/close.mp3"),
    ulti: new Audio("audio/ulti.mp3"),
    selfDestroy: new Audio("audio/selfDestroy.mp3"),
    dial: new Audio("audio/dial.mp3"),
    masterControl: new Audio("audio/masterControl.mp3"),
    yellow: new Audio("audio/yellow.mp3"),
    albedo: new Audio("audio/albedo.mp3"),
    repair: new Audio("audio/repair.mp3")
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
        if (sound === "transformation") {
            audioClone.volume = 0.6; // Transformation sesini %60 seviyesinde tut
        } else if (sound === "activating" || sound === "activate") {
            audioClone.volume = 0.4; // Activating ve Activate seslerini %40 seviyesine düşür
        } else {
            audioClone.volume = 1;
        }
        setTimeout(() => audioClone.play().catch(() => { }), 10); // Pequeno atraso para evitar bloqueios
    }
}

document.querySelector(".alien").addEventListener("click", function () {
    if (clickState === 0) {
        // İlk tıklama - Uzaylı seçim ekranı
        clickState = 1;
    mode = 2;
    playSound("activate");
        setTimeout(() => playSound("activating"), 50);
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
    }
});

document.querySelector(".hologram").addEventListener("click", function () {
    if (clickState === 1) {
        // İkinci tıklama - Omnitrix logosu
        clickState = 2;
        playSound("transformation");
        this.classList.add("fullscreen");
        alienEl.style.display = 'none';
    } else if (clickState === 2) {
        // Üçüncü tıklama - Ultimatrix kontrolü
        const currentAlien = aliens[index].name;
        if (ultimateAliens.includes(currentAlien)) {
            clickState = 3;
            playSound("ulti");
            this.classList.remove("fullscreen");
            this.classList.add("ultimatrix");
        } else {
            // Normal uzaylılar için başa dön
            clickState = 0;
    mode = 1;
            playSound("close");
            
    document.querySelector(".des-lft").classList.remove("des-lft-on");
    document.querySelector(".des-rht").classList.remove("des-rht-on");
    document.querySelector(".des-lft").classList.add("des-lft-off");
    document.querySelector(".des-rht").classList.add("des-rht-off");
            this.classList.remove("fullscreen");
            this.style.display = "none";
        }
    } else if (clickState === 3) {
        // Dördüncü tıklama - Başa dön
        clickState = 0;
        mode = 1;
        playSound("close");
        
        document.querySelector(".des-lft").classList.remove("des-lft-on");
        document.querySelector(".des-rht").classList.remove("des-rht-on");
        document.querySelector(".des-lft").classList.add("des-lft-off");
        document.querySelector(".des-rht").classList.add("des-rht-off");
        this.classList.remove("ultimatrix");
        this.style.display = "none";
    }
});

let bezelSequence = [];
let masterControlSequence = [];
let selfDestructSequence = [];
let omnitrixOutSequence = [];
let repairDNASequence = []; // RepairDNA için yeni dizi
const BEZEL_TIMEOUT = 2000;
let lastBezelTime = 0;

// Tizen için gerekli tanımlamalar
let tizen = null;
if (typeof window.tizen !== 'undefined') {
    tizen = window.tizen;
}

// Tizen için bezel kontrolü
if (typeof tizen !== 'undefined') {
    try {
        tizen.application.getCurrentApplication().exit();
    } catch (e) {
        console.log('Tizen uygulaması bulunamadı');
    }
}

let yellowModeSequence = [];
let isAlbedoMode = false;
let albedoSequence = [];

function startYellowMode() {
    // Tüm diğer elementleri gizle
    document.querySelector('.frame').style.display = 'none';
    document.querySelector('.self-destruct').style.display = 'none';
    document.querySelector('.master-control').style.display = 'none';
    
    // Sarı mod div'ini aktif et
    const yellowMode = document.querySelector('.yellow-mode');
    yellowMode.style.display = 'flex';
    yellowMode.classList.add('active');
    
    // Yellow sesini çal
    playSound("yellow");
    
    // 14 saniye sonra kapat
    setTimeout(() => {
        yellowMode.style.display = 'none';
        yellowMode.classList.remove('active');
        // Diğer elementleri geri göster
        document.querySelector('.frame').style.display = 'flex';
    }, 14000);
}

function startAlbedoMode() {
    isAlbedoMode = !isAlbedoMode;
    
    // Albedo sesini çal
    playSound("albedo");
    
    // Albedo modu div'ini göster
    const albedoMode = document.querySelector('.albedo-mode');
    albedoMode.style.display = 'flex';
    albedoMode.classList.add('active');
    
    // Container'a albedo-active class'ını ekle/kaldır
    const container = document.querySelector('.container');
    if (isAlbedoMode) {
        container.classList.add('albedo-active');
    } else {
        container.classList.remove('albedo-active');
        }
    
    // 2 saniye sonra albedo mode div'ini gizle
    setTimeout(() => {
        albedoMode.style.display = 'none';
        albedoMode.classList.remove('active');
    }, 2000);
}

function startOmnitrixOut() {
    const omnitrixOut = document.querySelector('.omnitrix-out');
    playSound("dial");
    
    // Diğer modları gizle
    document.querySelector('.frame').style.display = 'none';
    document.querySelector('.self-destruct').style.display = 'none';
    document.querySelector('.master-control').style.display = 'none';
    document.querySelector('.yellow-mode').style.display = 'none';
    document.querySelector('.albedo-mode').style.display = 'none';
    
    // Omnitrix Out modunu göster
    omnitrixOut.style.display = 'flex';
    omnitrixOut.classList.add('active');
    
    // 3 saniye sonra dönme animasyonunu başlat
    setTimeout(() => {
        omnitrixOut.classList.add('rotate');
        
        // 12 saniye sonra (dönme tamamlandıktan sonra) normal haline dön
        setTimeout(() => {
            omnitrixOut.classList.remove('rotate');
            omnitrixOut.classList.remove('active');
            omnitrixOut.style.display = 'none';
            
            // Uygulamayı yeniden başlatma efekti
            document.querySelector('.frame').style.display = 'flex';
            document.querySelector('.dial').style.animation = 'none';
            document.querySelector('.ring').style.animation = 'none';
            document.querySelector('.alien').style.animation = 'none';
            
            // Kısa bir gecikme ile animasyonları yeniden başlat
            setTimeout(() => {
                document.querySelector('.dial').style.animation = '';
                document.querySelector('.ring').style.animation = '';
                document.querySelector('.alien').style.animation = '';
                
                // Tüm değişkenleri sıfırla
                mode = 1;
                index = 0;
                clickState = 0;
                bezelSequence = [];
                masterControlSequence = [];
                selfDestructSequence = [];
                albedoSequence = [];
                omnitrixOutSequence = [];
                repairDNASequence = [];
                
                // Uzaylıyı ilk haline getir
                alienEl.src = `imgs/${aliens[0].src}`;
                alienEl.style.transform = `scale(${aliens[0].scale})`;
                alienEl.style.display = 'none';
                
                // Hologramı sıfırla
                const hologram = document.querySelector('.hologram');
                hologram.style.display = 'none';
                hologram.classList.remove('fullscreen', 'ultimatrix');
                
                // Yan panelleri sıfırla
                document.querySelector('.des-lft').classList.remove('des-lft-on', 'des-lft-off');
                document.querySelector('.des-rht').classList.remove('des-rht-on', 'des-rht-off');
            }, 50);
        }, 12000);
    }, 3000);
}

// Bezel hareketlerini dinle
if (typeof tizen !== 'undefined') {
    document.addEventListener("rotarydetent", function (event) {
        const currentTime = Date.now();
        if (currentTime - lastBezelTime > BEZEL_TIMEOUT) {
            bezelSequence = [];
            masterControlSequence = [];
            selfDestructSequence = [];
            albedoSequence = [];
            omnitrixOutSequence = [];
            yellowModeSequence = [];
            repairDNASequence = []; // RepairDNA dizisini sıfırla
            console.log("Süre aşımı: Tüm kombinasyonlar sıfırlandı");
        }
        lastBezelTime = currentTime;

        // Yellow Mode için özel kontrol
        if (mode !== 2) {
            if (event.detail.direction === "CW") {
                yellowModeSequence.push("right");
                if (yellowModeSequence.length > 5) yellowModeSequence.shift();
                console.log("Yellow Mode Hareketi:", yellowModeSequence.join(","));
            } else if (event.detail.direction === "CCW") {
                yellowModeSequence.push("left");
                if (yellowModeSequence.length > 5) yellowModeSequence.shift();
                console.log("Yellow Mode Hareketi:", yellowModeSequence.join(","));
            }

            // Yellow Mode kombinasyonu kontrolü
            if (yellowModeSequence.length === 5) {
                const sequence = yellowModeSequence.join(",");
                console.log("Yellow Mode Kontrol:", sequence);
                if (sequence === "right,right,right,left,left") {
                    console.log("Yellow Mode Aktifleştirildi!");
                    startYellowMode();
                    yellowModeSequence = [];
                    return; // Diğer kontrolleri atla
                }
            }
        }

        // Diğer modlar için normal kontroller
        if (event.detail.direction === "CW") {
            if (mode !== 2) {
                playSound("dial");
                // Self Destroy için
                bezelSequence.push("right");
                if (bezelSequence.length > 6) bezelSequence.shift();
                // Master Control için
                masterControlSequence.push("right");
                if (masterControlSequence.length > 6) masterControlSequence.shift();
                // Albedo Mode için
                albedoSequence.push("right");
                if (albedoSequence.length > 5) albedoSequence.shift();
                // Omnitrix Out için
                omnitrixOutSequence.push("right");
                if (omnitrixOutSequence.length > 6) omnitrixOutSequence.shift();
                // RepairDNA için
                repairDNASequence.push("right");
                if (repairDNASequence.length > 6) repairDNASequence.shift();
            }
        } else if (event.detail.direction === "CCW") {
            if (mode !== 2) {
                playSound("dial");
                // Self Destroy için
                bezelSequence.push("left");
                if (bezelSequence.length > 6) bezelSequence.shift();
                // Master Control için
                masterControlSequence.push("left");
                if (masterControlSequence.length > 6) masterControlSequence.shift();
                // Albedo Mode için
                albedoSequence.push("left");
                if (albedoSequence.length > 5) albedoSequence.shift();
                // Omnitrix Out için
                omnitrixOutSequence.push("left");
                if (omnitrixOutSequence.length > 6) omnitrixOutSequence.shift();
                // RepairDNA için
                repairDNASequence.push("left");
                if (repairDNASequence.length > 6) repairDNASequence.shift();
            }
        }

        // RepairDNA kombinasyonu kontrolü
        if (repairDNASequence.length === 6) {
            const sequence = repairDNASequence.join(",");
            if (sequence === "right,left,right,left,right,right" && mode !== 2) {
                startRepairDNA();
                repairDNASequence = [];
            }
        }

        // Diğer kombinasyonların kontrolü
        if (omnitrixOutSequence.length === 6) {
            const sequence = omnitrixOutSequence.join(",");
            if (sequence === "left,right,left,right,left,left" && mode !== 2) {
                startOmnitrixOut();
                omnitrixOutSequence = [];
            }
        }

        if (bezelSequence.length === 6) {
            const sequence = bezelSequence.join(",");
            if (sequence === "right,right,left,left,right,left" && mode !== 2) {
                startSelfDestruct();
                bezelSequence = [];
            }
        }

        if (masterControlSequence.length === 6) {
            const sequence = masterControlSequence.join(",");
            if (sequence === "left,left,right,right,left,right" && mode !== 2) {
                startMasterControl();
                masterControlSequence = [];
            }
        }

        if (albedoSequence.length === 5) {
            const sequence = albedoSequence.join(",");
            if (sequence === "left,left,left,right,right" && mode !== 2) {
                startAlbedoMode();
                albedoSequence = [];
            }
        }

        // Normal bezel işlemleri
        if (mode === 2) {
            if (event.detail.direction === "CW") {
                playSound("rccw");
                index = (index + 1) % aliens.length;
                updateAlien();
            } else if (event.detail.direction === "CCW") {
                playSound("rccw");
                index = (index - 1 + aliens.length) % aliens.length;
                updateAlien();
            }
        }
    });
}

// Klavye kontrolü için de aynı değişiklikleri yapalım
if (typeof tizen === 'undefined') {
    document.addEventListener("keydown", function (event) {
        const currentTime = Date.now();
        
        // Zaman aşımı kontrolü
        if (currentTime - lastBezelTime > BEZEL_TIMEOUT) {
            bezelSequence = [];
            masterControlSequence = [];
            yellowModeSequence = [];
            albedoSequence = [];
            repairDNASequence = []; // RepairDNA dizisini sıfırla
            console.log("Sequences reset due to timeout");
        }
        lastBezelTime = currentTime;

        // Bezel hareketini kaydet
        if (event.key === "ArrowRight") {
            if (mode !== 2) {
                playSound("dial");
                // Self Destroy için
                bezelSequence.push("right");
                if (bezelSequence.length > 6) bezelSequence.shift();
                // Master Control için
                masterControlSequence.push("right");
                if (masterControlSequence.length > 6) masterControlSequence.shift();
                // Yellow Mode için
                yellowModeSequence.push("right");
                if (yellowModeSequence.length > 6) yellowModeSequence.shift();
                // Albedo Mode için
                albedoSequence.push("right");
                if (albedoSequence.length > 5) albedoSequence.shift();
                // RepairDNA için
                repairDNASequence.push("right");
                if (repairDNASequence.length > 6) repairDNASequence.shift();
            }
        } else if (event.key === "ArrowLeft") {
            if (mode !== 2) {
                playSound("dial");
                // Self Destroy için
                bezelSequence.push("left");
                if (bezelSequence.length > 6) bezelSequence.shift();
                // Master Control için
                masterControlSequence.push("left");
                if (masterControlSequence.length > 6) masterControlSequence.shift();
                // Yellow Mode için
                yellowModeSequence.push("left");
                if (yellowModeSequence.length > 6) yellowModeSequence.shift();
                // Albedo Mode için
                albedoSequence.push("left");
                if (albedoSequence.length > 5) albedoSequence.shift();
                // RepairDNA için
                repairDNASequence.push("left");
                if (repairDNASequence.length > 6) repairDNASequence.shift();
            }
        }

        // RepairDNA kombinasyonu kontrolü
        if (repairDNASequence.length === 6) {
            const sequence = repairDNASequence.join(",");
            if (sequence === "right,left,right,left,right,right" && mode !== 2) {
                startRepairDNA();
                repairDNASequence = [];
            }
        }

        // Albedo Mode kombinasyonu kontrolü
        if (albedoSequence.length === 5) {
            const sequence = albedoSequence.join(",");
            console.log("Checking Albedo Mode:", sequence);
            if (sequence === "left,left,left,right,right" && mode !== 2) {
                console.log("Albedo Mode activated!");
                startAlbedoMode();
                albedoSequence = [];
            }
        }

        // Self Destroy kombinasyonu kontrolü
        if (bezelSequence.length === 6) {
            const sequence = bezelSequence.join(",");
            console.log("Checking Self Destroy:", sequence);
            if (sequence === "right,right,left,left,right,left" && mode !== 2) {
                console.log("Self Destroy activated!");
                startSelfDestruct();
                bezelSequence = [];
            }
        }

        // Master Control kombinasyonu kontrolü
        if (masterControlSequence.length === 6) {
            const sequence = masterControlSequence.join(",");
            console.log("Checking Master Control:", sequence);
            if (sequence === "left,left,right,right,left,right" && mode !== 2) {
                console.log("Master Control activated!");
                startMasterControl();
                masterControlSequence = [];
            }
        }

        // Yellow Mode kombinasyonu kontrolü
        if (yellowModeSequence.length === 6) {
            const sequence = yellowModeSequence.join(",");
            console.log("Checking Yellow Mode:", sequence);
            if (sequence === "left,left,right,right,left,right" && mode !== 2) {
                console.log("Yellow Mode activated!");
                startYellowMode();
                yellowModeSequence = [];
            }
        }

        // Normal klavye işlemleri
        if (mode === 2) {
            if (event.key === "ArrowRight") {
                playSound("rccw");
                index = (index + 1) % aliens.length;
                updateAlien();
            } else if (event.key === "ArrowLeft") {
                playSound("rccw");
                index = (index - 1 + aliens.length) % aliens.length;
        updateAlien();
            }
    }
});
}

let startX = 0;
let endX = 0;

function startSwipe(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    handleSwipe();
}

function endSwipe(e) {
    endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
}

function handleSwipe() {
    let diffX = endX - startX;
    if (Math.abs(diffX) > 50) {
        let direction = diffX > 0 ? 1 : -1;
        if (mode == 2) {
        playSound("rccw");
        index = (index + direction + aliens.length) % aliens.length;
        requestAnimationFrame(updateAlien);
        } else {
            playSound("dial");
        }
    }
}

function updateAlien() {
    alienEl.style.display = "none";
    document.querySelector(".alien").classList.remove("alien-on");
    setTimeout(() => {
        alienEl.src = `imgs/${aliens[index].src}`;
        alienEl.style.transform = `scale(${aliens[index].scale})`;
        alienEl.style.display = "block";
        document.querySelector(".alien").classList.add("alien-on");
    }, 50);
}


// Eventos otimizados para melhor resposta
const eventTypes = ["touchstart", "touchend", "mousedown", "mouseup"];
eventTypes.forEach(event => {
    document.addEventListener(event, (event.includes("up") || event.includes('end')) ? startSwipe : endSwipe);
});

let isSelfDestructMode = false;
let destructIndex = 0;
const destructImages = Array.from({length: 33}, (_, i) => 
  `b43845cfc71f4ea0ac2150288bf4afdeLke1cIi1lRYuCOdW-${i}.png`
);

// Kendini imha modu için tuş kombinasyonu
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.shiftKey) {
        if (e.key.toLowerCase() === 'd') {
            if (!isSelfDestructMode) {
                startSelfDestruct();
            }
        }
        // Sarı mod için tuş kombinasyonu
        if (e.key.toLowerCase() === 'y') {
            startYellowMode();
        }
        // Albedo modu için tuş kombinasyonu
        if (e.key.toLowerCase() === 'a') {
            startAlbedoMode();
        }
        // Omnitrix Out modu için tuş kombinasyonu
        if (e.key.toLowerCase() === 'o') {
            startOmnitrixOut();
        }
        // RepairDNA modu için tuş kombinasyonu
        if (e.key.toLowerCase() === 'r') {
            startRepairDNA();
        }
    }
});

function startSelfDestruct() {
    isSelfDestructMode = true;
    destructIndex = 0;
    
    // Kendini imha sesini çal
    playSound("selfDestroy");
    
    // Tüm diğer elementleri gizle
    document.querySelector('.frame').style.display = 'none';
    const selfDestruct = document.querySelector('.self-destruct');
    selfDestruct.style.display = 'flex';
    selfDestruct.classList.add('active');
    
    // İlk resmi göster
    showNextDestructImage();

    // Animasyon için interval
    const interval = setInterval(() => {
        if (destructIndex < destructImages.length) {
            showNextDestructImage();
        } else {
            // Animasyon bittiğinde başa dön
            destructIndex = 0;
            showNextDestructImage();
        }
    }, 100);

    // 15 saniye sonra patlama efekti
    setTimeout(() => {
        clearInterval(interval); // Animasyonu durdur
        selfDestruct.classList.add('explosion');
        
        // Patlama animasyonu bittikten sonra (3 saniye)
        setTimeout(() => {
            resetSelfDestruct();
        }, 3000);
    }, 15000);
}

function resetSelfDestruct() {
    isSelfDestructMode = false;
    destructIndex = 0;
    document.querySelector('.frame').style.display = 'flex';
    const selfDestruct = document.querySelector('.self-destruct');
    selfDestruct.style.display = 'none';
    selfDestruct.classList.remove('active', 'explosion');
    const img = document.getElementById('destruct-image');
    img.src = '';
}

function showNextDestructImage() {
    if (isSelfDestructMode) {
        const img = document.getElementById('destruct-image');
        img.src = `imgs/${destructImages[destructIndex]}`;
        destructIndex = (destructIndex + 1) % destructImages.length;
    }
}

function startMasterControl() {
    // Master Control sesini çal
    playSound("masterControl");
    
    // Master Control div'ini aktif et
    const masterControl = document.querySelector('.master-control');
    masterControl.style.display = 'flex';
    masterControl.classList.add('active');
    
    // 8 saniye sonra kapat
    setTimeout(() => {
        masterControl.style.display = 'none';
        masterControl.classList.remove('active');
    }, 8000);
}

function startRepairDNA() {
    const repairDNAMode = document.querySelector('.repairdna-mode');
    repairDNAMode.classList.add('active');
    playSound("repair");
    
    // Diğer elementleri gizle
    document.querySelector('.frame').style.display = 'none';
    document.querySelector('.self-destruct').style.display = 'none';
    document.querySelector('.master-control').style.display = 'none';
    document.querySelector('.yellow-mode').style.display = 'none';
    document.querySelector('.albedo-mode').style.display = 'none';
    document.querySelector('.omnitrix-out').style.display = 'none';
    
    setTimeout(() => {
        // Kapanış animasyonunu başlat
        repairDNAMode.classList.add('closing');
        
        // Animasyon bittikten sonra (1 saniye) elementleri sıfırla
        setTimeout(() => {
            repairDNAMode.classList.remove('active', 'closing');
            // Diğer elementleri geri göster
            document.querySelector('.frame').style.display = 'flex';
            
            // Tüm değişkenleri sıfırla
            mode = 1;
            index = 0;
            clickState = 0;
            bezelSequence = [];
            masterControlSequence = [];
            selfDestructSequence = [];
            albedoSequence = [];
            omnitrixOutSequence = [];
            repairDNASequence = [];
            
            // Uzaylıyı ilk haline getir
            alienEl.src = `imgs/${aliens[0].src}`;
            alienEl.style.transform = `scale(${aliens[0].scale})`;
            alienEl.style.display = 'none';
            
            // Hologramı sıfırla
            const hologram = document.querySelector('.hologram');
            hologram.style.display = 'none';
            hologram.classList.remove('fullscreen', 'ultimatrix');
            
            // Yan panelleri sıfırla
            document.querySelector('.des-lft').classList.remove('des-lft-on', 'des-lft-off');
            document.querySelector('.des-rht').classList.remove('des-rht-on', 'des-rht-off');
        }, 1000);
    }, 10000);
}

// Sağ sol sağ sol sağ sağ kombinasyonu için değişkenler
let lastClickTime = 0;
let clickSequence = [];

document.addEventListener('click', function(e) {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    // 1 saniye içinde tıklama yapılmadıysa sıfırla
    if (timeDiff > 1000) {
        clickSequence = [];
    }
    
    // Tıklama yönünü belirle (sağ/sol)
    const clickX = e.clientX;
    const centerX = window.innerWidth / 2;
    const direction = clickX > centerX ? 'right' : 'left';
    
    clickSequence.push(direction);
    lastClickTime = currentTime;
    
    // Son 6 tıklamayı kontrol et
    if (clickSequence.length >= 6) {
        const lastSixClicks = clickSequence.slice(-6);
        if (lastSixClicks.join(',') === 'right,left,right,left,right,right') {
            startRepairDNA();
            clickSequence = [];
        }
    }
});