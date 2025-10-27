// VARIABEL GLOBAL
let currentSurface = 'kayu';
let currentObject = 'kotak';
let magnetPower = 50;
let magnetPole = 'utara';
let springConstant = 100;
let gravityMass = 1;
let currentPlanet = 'bumi';

// INISIALISASI DRAG AND DROP
function initDragDrop(jenis) {
    switch(jenis) {
        case 'otot':
            initDragOtot();
            break;
        case 'gesek':
            initDragGesek();
            break;
        case 'magnet':
            initDragMagnet();
            break;
        case 'pegas':
            initDragPegas();
            break;
        case 'gravitasi':
            initDragGravitasi();
            break;
    }
}

// SIMULASI GAYA OTOT
function initDragOtot() {
    const draggable = document.getElementById('draggable-object-otot');
    const targetZone = document.getElementById('target-zone-otot');
    
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
    
    targetZone.addEventListener('dragover', handleDragOver);
    targetZone.addEventListener('drop', handleDropOtot);
    targetZone.addEventListener('dragleave', handleDragLeave);
    
    updatePhysicsOtot();
}

function handleDropOtot(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const dropzone = e.target;
    
    if (dropzone.id === 'target-zone-otot') {
        dropzone.appendChild(draggable);
        draggable.classList.remove('dragging');
        dropzone.classList.remove('drag-over');
        
        // Hitung usaha
        hitungUsahaOtot();
        
        // Tampilkan pesan sukses
        showMessage('🎉 Berhasil! Benda berhasil dipindahkan dengan gaya otot!', 'success');
    }
}

function ubahBendaOtot() {
    const select = document.getElementById('object-select');
    currentObject = select.value;
    const object = document.getElementById('draggable-object-otot');
    const objectIcon = object.querySelector('.object-icon');
    const objectName = object.querySelector('.object-name');
    const objectMass = object.querySelector('.object-mass');
    
    const objects = {
        'kotak': { icon: '📦', name: 'Kotak Kayu', mass: '5 kg' },
        'bola': { icon: '🏀', name: 'Bola Basket', mass: '2 kg' },
        'drum': { icon: '🛢️', name: 'Drum Besi', mass: '20 kg' }
    };
    
    objectIcon.textContent = objects[currentObject].icon;
    objectName.textContent = objects[currentObject].name;
    objectMass.textContent = objects[currentObject].mass;
    
    updatePhysicsOtot();
}

function updatePhysicsOtot() {
    const massValues = { 'kotak': 5, 'bola': 2, 'drum': 20 };
    const mass = massValues[currentObject];
    const requiredForce = mass * 5; // F = m * a (dengan a = 5 m/s²)
    
    document.getElementById('required-force').textContent = requiredForce;
}

function hitungUsahaOtot() {
    const force = parseInt(document.getElementById('required-force').textContent);
    const distance = 5; // meter
    const work = force * distance;
    
    document.getElementById('work').textContent = work;
    document.getElementById('distance').textContent = distance;
}

// SIMULASI GAYA GESEK
function initDragGesek() {
    const draggable = document.getElementById('draggable-object-gesek');
    const surfaceArea = document.getElementById('surface-area');
    
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
    
    surfaceArea.addEventListener('dragover', handleDragOver);
    surfaceArea.addEventListener('drop', handleDropGesek);
    surfaceArea.addEventListener('dragleave', handleDragLeave);
    
    updatePhysicsGesek();
}

function handleDropGesek(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const dropzone = e.target;
    
    if (dropzone.id === 'surface-area') {
        const rect = dropzone.getBoundingClientRect();
        const x = e.clientX - rect.left - draggable.offsetWidth / 2;
        const y = e.clientY - rect.top - draggable.offsetHeight / 2;
        
        draggable.style.position = 'absolute';
        draggable.style.left = x + 'px';
        draggable.style.top = y + 'px';
        
        draggable.classList.remove('dragging');
        dropzone.classList.remove('drag-over');
        
        // Hitung gaya gesek
        hitungGayaGesek();
    }
}

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
    
    updatePhysicsGesek();
}

function updatePhysicsGesek() {
    const frictionValues = {
        'kayu': { force: 20, coef: 0.4 },
        'es': { force: 5, coef: 0.1 },
        'karpet': { force: 40, coef: 0.8 },
        'karet': { force: 60, coef: 1.2 }
    };
    
    const friction = frictionValues[currentSurface];
    document.getElementById('friction-force').textContent = friction.force;
    document.getElementById('friction-coef').textContent = friction.coef;
}

function hitungGayaGesek() {
    const friction = parseInt(document.getElementById('friction-force').textContent);
    document.getElementById('friction-status').textContent = 'Bergerak';
    showMessage(`🔧 Gaya gesek bekerja: ${friction} N`, 'info');
}

// SIMULASI GAYA MAGNET
function initDragMagnet() {
    const draggable = document.getElementById('draggable-magnet');
    const magnetSetup = document.querySelector('.magnet-setup');
    
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
    
    magnetSetup.addEventListener('dragover', handleDragOver);
    magnetSetup.addEventListener('drop', handleDropMagnet);
    magnetSetup.addEventListener('dragleave', handleDragLeave);
    
    updatePhysicsMagnet();
}

function handleDropMagnet(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const dropzone = e.target;
    
    if (dropzone.classList.contains('magnet-setup')) {
        const rect = dropzone.getBoundingClientRect();
        const x = e.clientX - rect.left - draggable.offsetWidth / 2;
        const y = e.clientY - rect.top - draggable.offsetHeight / 2;
        
        draggable.style.position = 'absolute';
        draggable.style.left = x + 'px';
        draggable.style.top = y + 'px';
        
        draggable.classList.remove('dragging');
        dropzone.classList.remove('drag-over');
        
        // Cek apakah magnet dekat dengan benda besi
        cekInteraksiMagnet(x, y);
    }
}

function ubahKekuatanMagnet() {
    const slider = document.getElementById('magnet-slider');
    magnetPower = parseInt(slider.value);
    document.getElementById('magnet-power').textContent = magnetPower;
}

function ubahKutub(kutub) {
    magnetPole = kutub;
    document.getElementById('magnet-pole').textContent = kutub === 'utara' ? 'N' : 'S';
    
    document.querySelectorAll('.pole-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function cekInteraksiMagnet(x, y) {
    const objects = document.querySelectorAll('.magnetic-object');
    let attracted = false;
    
    objects.forEach(obj => {
        const objRect = obj.getBoundingClientRect();
        const distance = Math.sqrt(Math.pow(x - objRect.left, 2) + Math.pow(y - objRect.top, 2));
        
        if (distance < 100 && obj.classList.contains('iron')) {
            obj.classList.add('attracted');
            attracted = true;
            showMessage('🧲 Magnet menarik benda besi!', 'success');
        } else {
            obj.classList.remove('attracted');
        }
    });
    
    if (!attracted) {
        showMessage('❌ Tidak ada benda yang tertarik magnet', 'info');
    }
}

function updatePhysicsMagnet() {
    // Update physics data untuk magnet
}

// SIMULASI GAYA PEGAS
function initDragPegas() {
    const draggable = document.getElementById('draggable-weight');
    const springSetup = document.querySelector('.spring-setup');
    
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEndPegas);
    
    springSetup.addEventListener('dragover', handleDragOver);
    springSetup.addEventListener('drop', handleDropPegas);
    springSetup.addEventListener('dragleave', handleDragLeave);
}

function handleDropPegas(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const dropzone = e.target;
    
    if (dropzone.classList.contains('spring-setup')) {
        const rect = dropzone.getBoundingClientRect();
        const y = e.clientY - rect.top - draggable.offsetHeight / 2;
        
        // Batasi pergerakan ke bawah saja
        const maxY = 150;
        const newY = Math.min(maxY, Math.max(0, y));
        
        draggable.style.position = 'absolute';
        draggable.style.left = '50%';
        draggable.style.transform = 'translateX(-50%)';
        draggable.style.top = newY + 'px';
        
        // Update pegas
        updatePegas(newY);
        
        draggable.classList.remove('dragging');
        dropzone.classList.remove('drag-over');
    }
}

function handleDragEndPegas(e) {
    e.target.classList.remove('dragging');
    document.querySelector('.spring-setup').classList.remove('drag-over');
    
    // Kembalikan pegas ke posisi semula
    resetPegas();
}

function ubahKonstantaPegas() {
    const slider = document.getElementById('spring-slider');
    springConstant = parseInt(slider.value);
    document.getElementById('spring-constant').textContent = springConstant;
}

function updatePegas(y) {
    const stretch = y / 3; // cm
    const force = springConstant * (stretch / 100); // N
    const energy = 0.5 * springConstant * Math.pow(stretch / 100, 2); // J
    
    document.getElementById('stretch-length').textContent = stretch.toFixed(1);
    document.getElementById('spring-force').textContent = force.toFixed(1);
    document.getElementById('spring-energy').textContent = energy.toFixed(2);
    
    // Animasi pegas
    const springBody = document.getElementById('spring-body');
    const springCoil = springBody.querySelector('.spring-coil');
    springBody.style.height = (150 + y) + 'px';
    springCoil.style.transform = `scaleY(${1 + y/100})`;
}

function resetPegas() {
    const draggable = document.getElementById('draggable-weight');
    draggable.style.top = '0px';
    updatePegas(0);
}

// SIMULASI GAYA GRAVITASI
function initDragGravitasi() {
    const draggable = document.getElementById('draggable-object-gravitasi');
    const dropZone = document.querySelector('.drop-zone');
    
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEndGravitasi);
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDropGravitasi);
    dropZone.addEventListener('dragleave', handleDragLeave);
    
    updatePhysicsGravitasi();
}

function handleDropGravitasi(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    const dropzone = e.target;
    
    if (dropzone.classList.contains('drop-zone')) {
        const rect = dropzone.getBoundingClientRect();
        const y = e.clientY - rect.top - draggable.offsetHeight / 2;
        
        // Batasi pergerakan dalam drop zone
        const maxY = rect.height - draggable.offsetHeight - 30;
        const newY = Math.min(maxY, Math.max(0, y));
        
        draggable.style.position = 'absolute';
        draggable.style.left = '50%';
        draggable.style.transform = 'translateX(-50%)';
        draggable.style.top = newY + 'px';
        
        // Update physics
        updatePhysicsGravitasiPosition(newY);
        
        draggable.classList.remove('dragging');
        dropzone.classList.remove('drag-over');
    }
}

function handleDragEndGravitasi(e) {
    e.target.classList.remove('dragging');
    document.querySelector('.drop-zone').classList.remove('drag-over');
    
    // Benda jatuh karena gravitasi
    jatuhkanBendaGravitasi();
}

function ubahMassaGravitasi() {
    const slider = document.getElementById('gravity-mass-slider');
    gravityMass = parseInt(slider.value);
    document.getElementById('gravity-mass').textContent = gravityMass;
    
    const objectMass = document.querySelector('#draggable-object-gravitasi .object-mass');
    objectMass.textContent = gravityMass + ' kg';
    
    updatePhysicsGravitasi();
}

function ubahPlanet() {
    const select = document.getElementById('planet-select');
    currentPlanet = select.value;
    updatePhysicsGravitasi();
}

function updatePhysicsGravitasi() {
    const gravities = {
        'bumi': 9.8,
        'bulan': 1.6,
        'mars': 3.7
    };
    
    const g = gravities[currentPlanet];
    document.getElementById('gravity-value').textContent = g;
    
    updatePhysicsGravitasiPosition(0);
}

function updatePhysicsGravitasiPosition(y) {
    const rect = document.querySelector('.drop-zone').getBoundingClientRect();
    const height = ((rect.height - 30 - y) / rect.height) * 100;
    const g = parseFloat(document.getElementById('gravity-value').textContent);
    const potentialEnergy = gravityMass * g * height;
    
    document.getElementById('current-height').textContent = Math.round(height);
    document.getElementById('potential-energy').textContent = Math.round(potentialEnergy);
}

function jatuhkanBendaGravitasi() {
    const draggable = document.getElementById('draggable-object-gravitasi');
    const dropZone = document.querySelector('.drop-zone');
    const rect = dropZone.getBoundingClientRect();
    const currentY = parseInt(draggable.style.top || '0');
    const groundY = rect.height - draggable.offsetHeight - 30;
    
    // Animasi jatuh
    draggable.style.transition = 'top 1s ease-in';
    draggable.style.top = groundY + 'px';
    
    setTimeout(() => {
        showMessage('🌍 Benda jatuh karena gaya gravitasi!', 'info');
        // Reset setelah jatuh
        setTimeout(() => {
            draggable.style.transition = 'top 0.5s ease-out';
            draggable.style.top = '0px';
        }, 1000);
    }, 1000);
}

// FUNGSI DRAG AND DROP UMUM
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

// FUNGSI BANTUAN
function showMessage(message, type) {
    // Hapus pesan sebelumnya
    const oldMessage = document.querySelector('.message');
    if (oldMessage) oldMessage.remove();
    
    // Buat pesan baru
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.querySelector('.simulation-screen:not([style*="none"])').prepend(messageDiv);
    
    // Hapus otomatis setelah 3 detik
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// INISIALISASI
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi nilai default
    updatePhysicsOtot();
    updatePhysicsGesek();
    updatePhysicsMagnet();
    updatePhysicsGravitasi();
});