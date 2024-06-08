/* document.addEventListener('wheel', (e) => {
    e.preventDefault();
    document.querySelector('.container').scrollLeft += e.deltaY;
}, { passive: false });

document.addEventListener('touchstart', (e) => {
    window.startTouch = e.touches[0].clientY;
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let deltaY = window.startTouch - e.touches[0].clientY;
    document.querySelector('.container').scrollLeft += deltaY;
    window.startTouch = e.touches[0].clientY;
}, { passive: false });

document.addEventListener('touchend', () => {
    window.startTouch = null;
}, { passive: false }); */

let lastTouchPosition = 0;
let touchScrollVelocity = 0;

function smoothTouchScroll() {
    const container = document.querySelector('.container');
    if (Math.abs(touchScrollVelocity) > 0.5) { // Schwellenwert für das Stoppen des Scrollens
        container.scrollLeft += touchScrollVelocity;
        touchScrollVelocity *= 0.95; // Dämpfungskoeffizient, um das Scrollen allmählich zu verlangsamen
        requestAnimationFrame(smoothTouchScroll);
    } else {
        touchScrollVelocity = 0; // Stoppt das Scrollen
    }
}

document.addEventListener('wheel', (e) => {
    e.preventDefault();
    document.querySelector('.container').scrollLeft += e.deltaY;
}, { passive: false });

document.addEventListener('touchstart', (e) => {
    lastTouchPosition = e.touches[0].clientX;
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let currentTouch = e.touches[0].clientX;
    touchScrollVelocity += (lastTouchPosition - currentTouch) * 0.5; // Anpassen für Empfindlichkeit
    lastTouchPosition = currentTouch;
    requestAnimationFrame(smoothTouchScroll);
}, { passive: false });

document.addEventListener('touchend', () => {
    touchScrollVelocity = 0; // Setzt die Scrollgeschwindigkeit zurück, wenn die Berührung endet
}, { passive: false });



/* document.querySelector('.container').addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section'); // Wähle alle Sektionen
    const logo = document.querySelector('.logo img');
    const hamburger = document.querySelector('.hamburger');
    const container = document.querySelector('.container');

    let currentColor = '#F2D0B4'; // Standardfarbe

    sections.forEach(section => {
        const start = section.offsetLeft;
        const end = start + section.offsetWidth;
        const scrollLeft = container.scrollLeft;

        if (scrollLeft >= start && scrollLeft < end) {
            const sectionName = section.classList.contains('hero') ? 'hero' :
                                section.classList.contains('welcome') ? 'welcome' :
                                section.classList.contains('nasa') ? 'nasa' :
                                section.classList.contains('Sci-Fi') ? 'Sci-Fi' :
                                section.classList.contains('stories') ? 'stories' :
                                section.classList.contains('by') ? 'by' : '';

            // Setze Farben basierend auf dem Bereich
            switch (sectionName) {
                case 'welcome':
                case 'nasa':
                case 'Sci-Fi':
                case 'stories':
                case 'by':
                    currentColor = '#1D2F3B'; // Dunkelblau für spezifische Sektionen
                    break;
                default:
                    currentColor = '#F2D0B4'; // Standardfarbe
                    break;
            }
        }
    });

    logo.style.color = currentColor;
    hamburger.style.color = currentColor;
}); */