// Fungsi buka profile guru
function bukaProfileGuru() {
    window.location.href = 'profile.html';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Virtual Lab Menu Loaded!');
    console.log('📱 Version: 1.0.0 - Auto Refresh Enabled');

      // Tambah click event untuk photo guru
    const photoGuru = document.querySelector('.photo');
    if (photoGuru) {
        photoGuru.style.cursor = 'pointer';
        photoGuru.addEventListener('click', bukaProfileGuru);
    }
    
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Version display for debugging
    const versionInfo = document.createElement('div');
    versionInfo.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0.7;
    `;
    versionInfo.textContent = 'v1.0.0';
    document.body.appendChild(versionInfo);
});