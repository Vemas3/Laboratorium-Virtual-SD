let babAktif = 'pengertian';
let skorKuis = 0;
let jawabanBenar = ['B', 'B', 'B'];
let pertanyaanTerjawab = [false, false, false];

function bukaBab(babId) {
    document.querySelectorAll('.bab').forEach(bab => {
        bab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(babId).classList.add('active');
    document.querySelector(`[onclick="bukaBab('${babId}')"]`).classList.add('active');
    
    babAktif = babId;
    window.scrollTo(0, 0);
}

function babBerikutnya() {
    const urutanBab = ['pengertian', 'jenis', 'contoh', 'kuis'];
    const indexSekarang = urutanBab.indexOf(babAktif);
    
    if (indexSekarang < urutanBab.length - 1) {
        bukaBab(urutanBab[indexSekarang + 1]);
    }
}

function babSebelumnya() {
    const urutanBab = ['pengertian', 'jenis', 'contoh', 'kuis'];
    const indexSekarang = urutanBab.indexOf(babAktif);
    
    if (indexSekarang > 0) {
        bukaBab(urutanBab[indexSekarang - 1]);
    }
}

function dorongBola() {
    const bola = document.getElementById('ball1');
    bola.style.transform = 'translateX(200px) rotate(360deg)';
    bola.style.transition = 'all 1s ease';
}

function hentikanBola() {
    const bola = document.getElementById('ball1');
    bola.style.transform = 'translateX(0) rotate(0deg)';
    bola.style.transition = 'all 0.5s ease';
}

function resetBola() {
    const bola = document.getElementById('ball1');
    bola.style.transform = 'translateX(0) rotate(0deg)';
    bola.style.transition = 'all 0.3s ease';
}

function jawabKuis(pertanyaan, jawaban) {
    const tombol = event.target;
    const semuaTombol = tombol.parentElement.querySelectorAll('.option-btn');
    
    if (pertanyaanTerjawab[pertanyaan - 1]) return;
    
    pertanyaanTerjawab[pertanyaan - 1] = true;
    
    semuaTombol.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if (jawaban === jawabanBenar[pertanyaan - 1]) {
        tombol.classList.add('correct');
        skorKuis++;
        document.getElementById('score').textContent = skorKuis;
        
        setTimeout(() => {
            if (skorKuis === 3) {
                alert('🎉 LUAR BIASA! Semua jawaban benar!');
            }
        }, 500);
    } else {
        tombol.classList.add('wrong');
        const tombolBenar = Array.from(semuaTombol).find(btn => {
            return btn.textContent.includes(jawabanBenar[pertanyaan - 1]);
        });
        if (tombolBenar) tombolBenar.classList.add('correct');
        
        setTimeout(() => {
            alert('💡 Ayo coba lagi! Pelajari materinya sekali lagi.');
        }, 500);
    }
}

function resetKuis() {
    skorKuis = 0;
    pertanyaanTerjawab = [false, false, false];
    document.getElementById('score').textContent = '0';
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.style.pointerEvents = 'auto';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    bukaBab('pengertian');
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') babBerikutnya();
        else if (event.key === 'ArrowLeft') babSebelumnya();
        
        if (event.key >= '1' && event.key <= '4') {
            const babIds = ['pengertian', 'jenis', 'contoh', 'kuis'];
            bukaBab(babIds[parseInt(event.key) - 1]);
        }
    });
});