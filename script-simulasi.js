// script-simulasi.js

// State variables untuk setiap eksperimen
let state = {
    otot: {
        position: 0,
        force: 0,
        isLifted: false
    },
    gesek: {
        surface: 'kayu',
        distance: 0,
        frictionCoefficient: 0.3
    },
    magnet: {
        position: 'center',
        attractedObjects: []
    },
    pegas: {
        stretch: 0,
        isStretched: false,
        status: 'normal'
    },
    gravitasi: {
        isFalling: false,
        fallTime: 0,
        speed: 0
    }
};

// Fungsi navigasi utama
function bukaAlat(jenisGaya) {
    // Sembunyikan default screen dan semua screen
    document.querySelector('.default-screen').style.display = 'none';
    const screens = document.querySelectorAll('.simulation-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Tampilkan screen yang dipilih
    const targetScreen = document.getElementById(`${jenisGaya}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Reset state ketika membuka eksperimen baru
    resetAllExperiments();
}

function tutupAlat() {
    // Kembali ke menu utama
    const screens = document.querySelectorAll('.simulation-screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Tampilkan default screen
    document.querySelector('.default-screen').style.display = 'block';
}

// ==================== EKSPERIMEN GAYA OTOT ====================
function dorongObject() {
    const object = document.getElementById('movable-object');
    const forceValue = document.getElementById('force-value');
    
    state.otot.position += 50;
    state.otot.force = 20;
    
    object.style.transform = `translateX(${state.otot.position}px)`;
    forceValue.textContent = state.otot.force;
    
    // Animasi dorong
    object.style.transition = 'transform 0.3s ease';
    
    // Reset force setelah 1 detik
    setTimeout(() => {
        state.otot.force = 0;
        forceValue.textContent = state.otot.force;
    }, 1000);
}

function tarikObject() {
    const object = document.getElementById('movable-object');
    const forceValue = document.getElementById('force-value');
    
    state.otot.position -= 50;
    state.otot.force = 15;
    
    object.style.transform = `translateX(${state.otot.position}px)`;
    forceValue.textContent = state.otot.force;
    
    // Animasi tarik
    object.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        state.otot.force = 0;
        forceValue.textContent = state.otot.force;
    }, 1000);
}

function angkatObject() {
    const object = document.getElementById('movable-object');
    const forceValue = document.getElementById('force-value');
    
    if (!state.otot.isLifted) {
        state.otot.force = 30;
        object.style.transform = `translate(${state.otot.position}px, -80px)`;
        state.otot.isLifted = true;
    } else {
        state.otot.force = 0;
        object.style.transform = `translate(${state.otot.position}px, 0)`;
        state.otot.isLifted = false;
    }
    
    forceValue.textContent = state.otot.force;
    object.style.transition = 'transform 0.5s ease';
}

function resetOtot() {
    const object = document.getElementById('movable-object');
    const forceValue = document.getElementById('force-value');
    
    state.otot.position = 0;
    state.otot.force = 0;
    state.otot.isLifted = false;
    
    object.style.transform = 'translate(0, 0)';
    forceValue.textContent = state.otot.force;
    object.style.transition = 'transform 0.5s ease';
}

// ==================== EKSPERIMEN GAYA GESEK ====================
function gantiPermukaan(permukaan) {
    const surface = document.getElementById('current-surface');
    const surfaceButtons = document.querySelectorAll('.surface-btn');
    const frictionLevel = document.getElementById('friction-level');
    
    // Update active button
    surfaceButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(permukaan)) {
            btn.classList.add('active');
        }
    });
    
    // Update surface appearance dan koefisien gesek
    switch(permukaan) {
        case 'kayu':
            surface.style.background = '#a55eea';
            state.gesek.frictionCoefficient = 0.4;
            frictionLevel.textContent = 'Tingkat Gesekan: Sedang';
            break;
        case 'es':
            surface.style.background = '#74b9ff';
            state.gesek.frictionCoefficient = 0.1;
            frictionLevel.textContent = 'Tingkat Gesekan: Rendah';
            break;
        case 'karpet':
            surface.style.background = '#e17055';
            state.gesek.frictionCoefficient = 0.6;
            frictionLevel.textContent = 'Tingkat Gesekan: Tinggi';
            break;
    }
    
    state.gesek.surface = permukaan;
    resetGesek();
}

function dorongDenganGaya(gaya) {
    const object = document.getElementById('sliding-object');
    const distanceElement = document.getElementById('distance-traveled');
    
    if (object.style.transform === 'translateX(0px)') {
        // Hitung jarak berdasarkan gaya dan koefisien gesek
        const effectiveForce = gaya - (state.gesek.frictionCoefficient * 100);
        const distance = Math.max(0, effectiveForce * 2);
        
        state.gesek.distance = distance;
        
        // Animasikan pergerakan
        object.style.transform = `translateX(${distance}px)`;
        object.style.transition = `transform ${1.5 - (gaya/100)}s ease-out`;
        
        distanceElement.textContent = `Jarak: ${Math.round(distance)} cm`;
        
        // Berikan feedback visual
        if (gaya === 100) {
            object.style.fontSize = '2.5em';
            setTimeout(() => {
                object.style.fontSize = '2em';
            }, 300);
        }
    }
}

function resetGesek() {
    const object = document.getElementById('sliding-object');
    const distanceElement = document.getElementById('distance-traveled');
    
    state.gesek.distance = 0;
    object.style.transform = 'translateX(0)';
    object.style.transition = 'transform 0.5s ease';
    distanceElement.textContent = 'Jarak: 0 cm';
    object.style.fontSize = '2em';
}

// ==================== EKSPERIMEN GAYA MAGNET ====================
function gerakkanMagnet() {
    const magnet = document.getElementById('magnet');
    const objects = document.querySelectorAll('.magnet-setup .object');
    const magnetInfo = document.getElementById('magnet-info');
    
    // Toggle posisi magnet
    if (state.magnet.position === 'center') {
        magnet.style.transform = 'translate(-150%, -50%)';
        state.magnet.position = 'left';
    } else {
        magnet.style.transform = 'translate(-50%, -50%)';
        state.magnet.position = 'center';
    }
    
    // Cek benda yang tertarik
    state.magnet.attractedObjects = [];
    objects.forEach(object => {
        const objectType = object.getAttribute('data-type');
        
        if (objectType === 'ferro' && state.magnet.position === 'left') {
            // Benda ferro tertarik
            object.classList.add('attracted');
            state.magnet.attractedObjects.push(object.textContent);
        } else {
            object.classList.remove('attracted');
        }
    });
    
    // Update info
    if (state.magnet.attractedObjects.length > 0) {
        magnetInfo.textContent = `Magnet menarik: ${state.magnet.attractedObjects.join(', ')}`;
        magnetInfo.style.background = '#d4edda';
        magnetInfo.style.color = '#155724';
    } else {
        magnetInfo.textContent = 'Tidak ada benda yang tertarik magnet';
        magnetInfo.style.background = '#f8d7da';
        magnetInfo.style.color = '#721c24';
    }
}

function resetMagnet() {
    const magnet = document.getElementById('magnet');
    const objects = document.querySelectorAll('.magnet-setup .object');
    const magnetInfo = document.getElementById('magnet-info');
    
    state.magnet.position = 'center';
    state.magnet.attractedObjects = [];
    
    magnet.style.transform = 'translate(-50%, -50%)';
    magnet.style.transition = 'transform 0.5s ease';
    
    objects.forEach(object => {
        object.classList.remove('attracted');
        object.style.transition = 'transform 0.5s ease';
    });
    
    magnetInfo.textContent = 'Klik magnet untuk menggerakkan dan melihat benda yang tertarik';
    magnetInfo.style.background = '#dfe6e9';
    magnetInfo.style.color = '#333';
}

// ==================== EKSPERIMEN GAYA PEGAS ====================
function tarikPegas() {
    const spring = document.getElementById('spring');
    const weight = document.getElementById('weight');
    const springStatus = document.getElementById('spring-status');
    const stretchLength = document.getElementById('stretch-length');
    
    if (!state.pegas.isStretched) {
        state.pegas.stretch += 30;
        state.pegas.isStretched = true;
        
        spring.style.transform = 'translate(-50%, -50%) scaleY(1.5)';
        weight.style.transform = 'translateX(-50%) translateY(20px)';
        spring.style.transition = 'transform 0.5s ease';
        weight.style.transition = 'transform 0.5s ease';
        
        springStatus.textContent = 'Pegas: Tertarik';
        stretchLength.textContent = `Regangan: ${state.pegas.stretch} cm`;
        
        // Ubah tampilan pegas saat tertarik
        spring.style.background = 'linear-gradient(135deg, #ff7675, #fd79a8)';
        spring.style.padding = '5px';
        spring.style.borderRadius = '10px';
        spring.textContent = '🔄🔄🔄';
    }
}

function lepasPegas() {
    const spring = document.getElementById('spring');
    const weight = document.getElementById('weight');
    const springStatus = document.getElementById('spring-status');
    
    if (state.pegas.isStretched) {
        // Animasi pegas kembali dengan efek bouncing
        spring.style.transform = 'translate(-50%, -50%) scaleY(1)';
        weight.style.transform = 'translateX(-50%) translateY(0)';
        spring.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        weight.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        springStatus.textContent = 'Pegas: Melompat!';
        
        // Reset setelah animasi
        setTimeout(() => {
            state.pegas.isStretched = false;
            springStatus.textContent = 'Pegas: Normal';
            spring.style.background = 'none';
            spring.style.padding = '0';
            spring.style.borderRadius = '0';
            spring.textContent = '🔄';
        }, 800);
    }
}

function resetPegas() {
    const spring = document.getElementById('spring');
    const weight = document.getElementById('weight');
    const springStatus = document.getElementById('spring-status');
    const stretchLength = document.getElementById('stretch-length');
    
    state.pegas.stretch = 0;
    state.pegas.isStretched = false;
    
    spring.style.transform = 'translate(-50%, -50%)';
    weight.style.transform = 'translateX(-50%)';
    spring.style.transition = 'transform 0.5s ease';
    weight.style.transition = 'transform 0.5s ease';
    
    springStatus.textContent = 'Pegas: Normal';
    stretchLength.textContent = 'Regangan: 0 cm';
    spring.style.background = 'none';
    spring.style.padding = '0';
    spring.style.borderRadius = '0';
    spring.textContent = '🔄';
}

// ==================== EKSPERIMEN GAYA GRAVITASI ====================
function jatuhkanBenda() {
    const dropObject = document.getElementById('drop-object');
    const fallSpeed = document.getElementById('fall-speed');
    const fallTime = document.getElementById('fall-time');
    
    if (!state.gravitasi.isFalling) {
        state.gravitasi.isFalling = true;
        state.gravitasi.fallTime = 0;
        state.gravitasi.speed = 0;
        
        // Animasi jatuh
        dropObject.style.transform = 'translateX(-50%) translateY(200px)';
        dropObject.style.transition = 'transform 2s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
        
        // Simulasi percepatan gravitasi
        let time = 0;
        const gravityInterval = setInterval(() => {
            time += 0.1;
            state.gravitasi.fallTime = time.toFixed(1);
            state.gravitasi.speed = (9.8 * time).toFixed(1);
            
            fallSpeed.textContent = `Kecepatan Jatuh: ${state.gravitasi.speed} m/s`;
            fallTime.textContent = `Waktu Jatuh: ${state.gravitasi.fallTime} detik`;
            
            if (time >= 2) {
                clearInterval(gravityInterval);
                state.gravitasi.isFalling = false;
            }
        }, 100);
    }
}

function resetGravitasi() {
    const dropObject = document.getElementById('drop-object');
    const fallSpeed = document.getElementById('fall-speed');
    const fallTime = document.getElementById('fall-time');
    
    state.gravitasi.isFalling = false;
    state.gravitasi.fallTime = 0;
    state.gravitasi.speed = 0;
    
    dropObject.style.transform = 'translateX(-50%) translateY(0)';
    dropObject.style.transition = 'transform 0.5s ease';
    
    fallSpeed.textContent = 'Kecepatan Jatuh: 0 m/s';
    fallTime.textContent = 'Waktu Jatuh: 0 detik';
}

// ==================== FUNGSI UTILITAS ====================
function resetAllExperiments() {
    resetOtot();
    resetGesek();
    resetMagnet();
    resetPegas();
    resetGravitasi();
}

// Inisialisasi event listeners ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('Virtual Lab Sains SD - Simulasi Gaya telah dimuat!');
    
    // Inisialisasi permukaan gesek default
    gantiPermukaan('kayu');
    
    // Tambahkan event listener untuk keyboard (aksesibilitas)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            tutupAlat();
        }
        
        // Shortcut angka 1-5 untuk buka alat
        if (e.key >= '1' && e.key <= '5') {
            const alatIds = ['otot', 'gesek', 'magnet', 'pegas', 'gravitasi'];
            bukaAlat(alatIds[parseInt(e.key) - 1]);
        }
    });
    
    // Pastikan default screen ditampilkan saat pertama kali load
    document.querySelector('.default-screen').style.display = 'block';
});

// Export functions untuk testing (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bukaAlat,
        tutupAlat,
        dorongObject,
        tarikObject,
        angkatObject,
        resetOtot,
        gantiPermukaan,
        dorongDenganGaya,
        resetGesek,
        gerakkanMagnet,
        resetMagnet,
        tarikPegas,
        lepasPegas,
        resetPegas,
        jatuhkanBenda,
        resetGravitasi,
        state
    };
}