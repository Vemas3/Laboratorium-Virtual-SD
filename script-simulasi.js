// SIMULASI GAYA OTOT
function ubahMassa() {
    const massSlider = document.getElementById('mass-slider');
    const massValue = document.getElementById('mass-value');
    const objectMass = document.getElementById('object-mass');
    
    massValue.textContent = massSlider.value;
    objectMass.textContent = massSlider.value + ' kg';
}

function ubahGaya() {
    const forceSlider = document.getElementById('force-slider');
    const forceDisplay = document.getElementById('force-display');
    const forceArrow = document.getElementById('force-arrow');
    
    forceDisplay.textContent = forceSlider.value;
    forceArrow.style.width = (forceSlider.value / 2) + 'px';
    forceArrow.style.display = forceSlider.value > 0 ? 'block' : 'none';
}

function dorongKanan() {
    document.getElementById('force-slider').value = 50;
    ubahGaya();
    document.getElementById('velocity').textContent = '2.5';
    document.getElementById('acceleration').textContent = '5.0';
    document.getElementById('position').textContent = '+5.0';
}

function dorongKiri() {
    document.getElementById('force-slider').value = 50;
    ubahGaya();
    document.getElementById('velocity').textContent = '-2.5';
    document.getElementById('acceleration').textContent = '-5.0';
    document.getElementById('position').textContent = '-5.0';
}

function resetOtot() {
    document.getElementById('mass-slider').value = 10;
    document.getElementById('force-slider').value = 0;
    ubahMassa();
    ubahGaya();
    document.getElementById('velocity').textContent = '0';
    document.getElementById('acceleration').textContent = '0';
    document.getElementById('position').textContent = '0';
}

// SIMULASI GAYA GESEK
let currentSurface = 'kayu';

function gantiPermukaan(permukaan) {
    currentSurface = permukaan;
    document.getElementById('surface-label').textContent = 'Permukaan ' + 
        (permukaan === 'kayu' ? 'Kayu' : 
         permukaan === 'es' ? 'Es' : 
         permukaan === 'karpet' ? 'Karpet' : 'Karet');
    
    // Update button active state
    document.querySelectorAll('.surface-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function ubahGayaDorong() {
    const pushSlider = document.getElementById('push-slider');
    const pushForce = document.getElementById('push-force');
    pushForce.textContent = pushSlider.value;
}

function jalankanEksperimenGesek() {
    const frictionValues = {
        'kayu': 20,
        'es': 5,
        'karpet': 40,
        'karet': 60
    };
    
    const frictionForce = frictionValues[currentSurface];
    const pushForce = parseInt(document.getElementById('push-slider').value);
    const netForce = pushForce - frictionForce;
    
    document.getElementById('friction-force').textContent = frictionForce;
    document.getElementById('net-force').textContent = netForce > 0 ? netForce : 0;
    
    if (netForce > 0) {
        document.getElementById('sliding-object').style.transform = 'translateX(100px)';
    } else {
        document.getElementById('sliding-object').style.transform = 'translateX(0)';
    }
}

function resetGesek() {
    document.getElementById('push-slider').value = 50;
    ubahGayaDorong();
    document.getElementById('friction-force').textContent = '0';
    document.getElementById('net-force').textContent = '0';
    document.getElementById('sliding-object').style.transform = 'translateX(0)';
}

// SIMULASI GAYA MAGNET
function ubahKekuatanMagnet() {
    const magnetSlider = document.getElementById('magnet-slider');
    const magnetPower = document.getElementById('magnet-power');
    magnetPower.textContent = magnetSlider.value;
}

function ubahKutub(kutub) {
    document.getElementById('magnet-pole').textContent = kutub === 'utara' ? 'N' : 'S';
    document.querySelectorAll('.pole-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function gerakkanMagnet() {
    const magnet = document.getElementById('magnet');
    const currentLeft = parseInt(magnet.style.left || '0');
    magnet.style.left = (currentLeft + 50) % 200 + 'px';
    
    // Update jarak
    const distance = 50 - (currentLeft / 4);
    document.getElementById('magnet-distance').textContent = Math.max(10, Math.round(distance));
    
    // Update gaya magnet
    const power = parseInt(document.getElementById('magnet-slider').value);
    document.getElementById('magnetic-force').textContent = Math.round(power * distance / 50);
}

function resetMagnet() {
    document.getElementById('magnet').style.left = '0px';
    document.getElementById('magnet-distance').textContent = '50';
    document.getElementById('magnetic-force').textContent = '0';
}

// SIMULASI GAYA PEGAS
function ubahKekuatanTarik() {
    const pullSlider = document.getElementById('pull-slider');
    const pullStrength = document.getElementById('pull-strength');
    pullStrength.textContent = pullSlider.value;
}

function tarikPegas() {
    const strength = parseInt(document.getElementById('pull-slider').value);
    document.getElementById('spring').style.transform = 'scaleY(1.' + strength + ')';
    document.getElementById('weight').style.marginTop = (strength * 2) + 'px';
    document.getElementById('stretch-length').textContent = 'Regangan: ' + strength + ' cm';
    document.getElementById('spring-force').textContent = 'Gaya Pegas: ' + (strength * 2) + ' N';
    document.getElementById('spring-status').textContent = 'Pegas: Tertarik';
}

function lepasPegas() {
    document.getElementById('spring').style.transform = 'scaleY(1)';
    document.getElementById('weight').style.marginTop = '0px';
    document.getElementById('spring-status').textContent = 'Pegas: Normal';
}

function resetPegas() {
    document.getElementById('pull-slider').value = 50;
    ubahKekuatanTarik();
    lepasPegas();
    document.getElementById('stretch-length').textContent = 'Regangan: 0 cm';
    document.getElementById('spring-force').textContent = 'Gaya Pegas: 0 N';
}

// SIMULASI GAYA GRAVITASI
function ubahMassaGravitasi() {
    const massSlider = document.getElementById('gravity-mass-slider');
    const massValue = document.getElementById('gravity-mass');
    const objectMass = document.querySelector('#drop-object .object-mass');
    
    massValue.textContent = massSlider.value;
    objectMass.textContent = massSlider.value + ' kg';
}

function ubahKetinggian() {
    const heightSlider = document.getElementById('height-slider');
    const heightValue = document.getElementById('height-value');
    const heightDisplay = document.getElementById('height-display');
    
    heightValue.textContent = heightSlider.value;
    heightDisplay.textContent = heightSlider.value + 'm';
    document.getElementById('drop-object').style.top = '0px';
}

function ubahPlanet() {
    const planetSelect = document.getElementById('planet-select');
    const gravityValue = document.getElementById('gravity-value');
    
    const gravities = {
        'bumi': '9.8 m/s²',
        'bulan': '1.6 m/s²',
        'mars': '3.7 m/s²'
    };
    
    gravityValue.textContent = 'Gravitasi: ' + gravities[planetSelect.value];
}

function jatuhkanBenda() {
    const dropObject = document.getElementById('drop-object');
    const height = parseInt(document.getElementById('height-slider').value);
    const planet = document.getElementById('planet-select').value;
    
    const gravities = {
        'bumi': 9.8,
        'bulan': 1.6,
        'mars': 3.7
    };
    
    const g = gravities[planet];
    const time = Math.sqrt(2 * height / g).toFixed(1);
    const speed = (g * time).toFixed(1);
    
    document.getElementById('fall-time').textContent = 'Waktu Jatuh: ' + time + ' detik';
    document.getElementById('fall-speed').textContent = 'Kecepatan Jatuh: ' + speed + ' m/s';
    
    // Animasi jatuh
    dropObject.style.transition = 'top ' + time + 's linear';
    dropObject.style.top = (height * 3) + 'px';
}

function resetGravitasi() {
    document.getElementById('gravity-mass-slider').value = 1;
    document.getElementById('height-slider').value = 50;
    ubahMassaGravitasi();
    ubahKetinggian();
    document.getElementById('planet-select').value = 'bumi';
    ubahPlanet();
    document.getElementById('fall-time').textContent = 'Waktu Jatuh: 0 detik';
    document.getElementById('fall-speed').textContent = 'Kecepatan Jatuh: 0 m/s';
    document.getElementById('drop-object').style.top = '0px';
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    ubahMassa();
    ubahGaya();
    ubahGayaDorong();
    ubahKekuatanMagnet();
    ubahKekuatanTarik();
    ubahMassaGravitasi();
    ubahKetinggian();
    ubahPlanet();
});