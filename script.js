document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Virtual Lab Menu Loaded!');
    
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});