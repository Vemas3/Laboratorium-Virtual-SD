let babAktif = 'pengertian';
let skorKuis = 0;
let jawabanBenar = ['B', 'B', 'B', 'C', 'B'];
let pertanyaanTerjawab = [false, false, false, false, false];

function bukaBab(babId) {
    console.log('Membuka bab:', babId); // Debug log
    
    // Sembunyikan semua bab
    document.querySelectorAll('.bab').forEach(bab => {
        bab.classList.remove('active');
    });
    
    // Nonaktifkan semua tombol nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Tampilkan bab yang dipilih
    const babElement = document.getElementById(babId);
    if (babElement) {
        babElement.classList.add('active');
    } else {
        console.error('Bab tidak ditemukan:', babId);
    }
    
    // Aktifkan tombol nav yang sesuai
    const navBtn = document.querySelector(`[onclick="bukaBab('${babId}')"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }
    
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
    if (bola) {
        bola.style.transform = 'translateX(200px) rotate(360deg)';
        bola.style.transition = 'all 1s ease';
    }
}

function hentikanBola() {
    const bola = document.getElementById('ball1');
    if (bola) {
        bola.style.transform = 'translateX(0) rotate(0deg)';
        bola.style.transition = 'all 0.5s ease';
    }
}

function resetBola() {
    const bola = document.getElementById('ball1');
    if (bola) {
        bola.style.transform = 'translateX(0) rotate(0deg)';
        bola.style.transition = 'all 0.3s ease';
    }
}

function jawabKuis(pertanyaan, jawaban) {
    console.log('Jawab kuis:', pertanyaan, jawaban); // Debug log
    
    const tombol = event.target;
    const semuaTombol = tombol.parentElement.querySelectorAll('.option-btn');
    
    // Cek apakah pertanyaan sudah dijawab
    if (pertanyaanTerjawab[pertanyaan - 1]) {
        console.log('Pertanyaan sudah dijawab');
        return;
    }
    
    // Tandai pertanyaan sudah dijawab
    pertanyaanTerjawab[pertanyaan - 1] = true;
    
    // Nonaktifkan semua tombol di pertanyaan ini
    semuaTombol.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // Cek jawaban benar
    if (jawaban === jawabanBenar[pertanyaan - 1]) {
        tombol.classList.add('correct');
        skorKuis++;
        
        // Update skor display
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = skorKuis;
        }
        
        console.log('Jawaban benar! Skor:', skorKuis);
        
        // Beri feedback
        setTimeout(() => {
            if (skorKuis === 5) {
                alert('🎉 LUAR BIASA! Semua 5 jawaban benar! Kamu benar-benar menguasai materi tentang gaya!');
            } else if (skorKuis >= 3) {
                alert('👍 Bagus! Kamu sudah memahami sebagian besar materi!');
            }
        }, 500);
    } else {
        tombol.classList.add('wrong');
        
        // Tampilkan jawaban yang benar
        const tombolBenar = Array.from(semuaTombol).find(btn => {
            return btn.textContent.includes(jawabanBenar[pertanyaan - 1]);
        });
        if (tombolBenar) {
            tombolBenar.classList.add('correct');
        }
        
        console.log('Jawaban salah. Jawaban benar:', jawabanBenar[pertanyaan - 1]);
        
        // Beri petunjuk
        setTimeout(() => {
            if (pertanyaan === 1) {
                alert('💡 Gaya otot adalah gaya yang dihasilkan oleh tenaga manusia atau hewan!');
            } else if (pertanyaan === 2) {
                alert('💡 Gaya gesek terjadi ketika dua permukaan saling bergesekan!');
            } else if (pertanyaan === 3) {
                alert('💡 Gaya gravitasi Bumi menarik semua benda ke bawah!');
            } else if (pertanyaan === 4) {
                alert('💡 Gaya pegas bekerja pada benda yang elastis seperti busur panah!');
            } else if (pertanyaan === 5) {
                alert('💡 Gaya magnet menarik benda-benda logam tertentu!');
            }
        }, 500);
    }
}

function resetKuis() {
    console.log('Reset kuis'); // Debug log
    
    skorKuis = 0;
    pertanyaanTerjawab = [false, false, false, false, false];
    
    // Reset skor display
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = '0';
    }
    
    // Reset semua tombol
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.style.pointerEvents = 'auto';
    });
    
    console.log('Kuis berhasil direset');
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman materi dimuat'); // Debug log
    
    // Pastikan bab pertama aktif
    setTimeout(() => {
        bukaBab('pengertian');
    }, 100);
    
    // Tambahkan event listener untuk keyboard
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            babBerikutnya();
        } else if (event.key === 'ArrowLeft') {
            babSebelumnya();
        }
        
        // Navigasi dengan angka 1-4
        if (event.key >= '1' && event.key <= '4') {
            const babIds = ['pengertian', 'jenis', 'contoh', 'kuis'];
            const index = parseInt(event.key) - 1;
            if (index < babIds.length) {
                bukaBab(babIds[index]);
            }
        }
    });
    
    // Debug: Cek elemen kuis
    const kuisElement = document.getElementById('kuis');
    if (kuisElement) {
        console.log('Elemen kuis ditemukan');
    } else {
        console.error('Elemen kuis TIDAK ditemukan!');
    }
});