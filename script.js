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

/* let lastTouchPosition = 0;
let touchScrollVelocity = 0;

function smoothTouchScroll() {
    const container = document.querySelector('.container');
    if (Math.abs(touchScrollVelocity) > 0.4) { // Schwellenwert für das Stoppen des Scrollens
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
    touchScrollVelocity += (lastTouchPosition - currentTouch) * 0.2; // Anpassen für Empfindlichkeit
    lastTouchPosition = currentTouch;
    requestAnimationFrame(smoothTouchScroll);
}, { passive: false });

document.addEventListener('touchend', () => {
    touchScrollVelocity = 0; // Setzt die Scrollgeschwindigkeit zurück, wenn die Berührung endet
}, { passive: false });
 */

let lastTouchPosition = 0;
let touchScrollVelocity = 0;

function smoothTouchScroll() {
    const container = document.querySelector('.container');
    if (Math.abs(touchScrollVelocity) > 0.4) { // Schwellenwert für das Stoppen des Scrollens
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
    lastTouchPosition = e.touches[0].clientY; // Änderung zu clientY für vertikalen Input
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let currentTouch = e.touches[0].clientY; // Änderung zu clientY für vertikalen Input
    touchScrollVelocity += (lastTouchPosition - currentTouch) * 0.2; // Anpassen für Empfindlichkeit
    lastTouchPosition = currentTouch;
    requestAnimationFrame(smoothTouchScroll);
}, { passive: false });

document.addEventListener('touchend', () => {
    touchScrollVelocity = 0; // Setzt die Scrollgeschwindigkeit zurück, wenn die Berührung endet
}, { passive: false });

function toggleFullImage() {
    var imageDiv = document.getElementById('fullScreenImage');
    if (imageDiv.style.display === 'none') {
        imageDiv.style.display = 'flex'; // Show the full-screen image
    } else {
        imageDiv.style.display = 'none'; // Hide the full-screen image
    }
}

function closeFullImage() {
    var imageDiv = document.getElementById('fullScreenImage');
    imageDiv.style.display = 'none'; // Versteckt das Vollbild
}

/* LOGO COLD */
/* 
document.addEventListener('DOMContentLoaded', () => {
    const navbarLogoLight = document.querySelector('.navbar .logo-light');
    const navbarLogoDark = document.querySelector('.navbar .logo-dark');
    const heroLogoLight = document.querySelector('.logo-hero .logo-light');
    const heroLogoDark = document.querySelector('.logo-hero .logo-dark');
    
    if (!navbarLogoLight || !navbarLogoDark || !heroLogoLight || !heroLogoDark) {
        console.error("One or more logo elements are missing.");
        return;
    }
    
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        console.log("Intersection Observer is running...");
        entries.forEach(entry => {
            console.log(`Section: ${entry.target.className}, is intersecting: ${entry.isIntersecting}`);
            if (entry.isIntersecting) {
                const requiresDarkLogo = entry.target.classList.contains('welcome') || 
                                         entry.target.classList.contains('nasa') ||
                                         entry.target.classList.contains('Sci-Fi') ||
                                         entry.target.classList.contains('stories') ||
                                         entry.target.classList.contains('content-by');

                console.log(`Is dark background: ${requiresDarkLogo}`);

                if (requiresDarkLogo) {
                    navbarLogoLight.style.display = 'none';
                    navbarLogoDark.style.display = 'block';
                    heroLogoLight.style.display = 'none';
                    heroLogoDark.style.display = 'block';
                    console.log("Displaying dark logo.");
                } else {
                    navbarLogoLight.style.display = 'block';
                    navbarLogoDark.style.display = 'none';
                    heroLogoLight.style.display = 'block';
                    heroLogoDark.style.display = 'none';
                    console.log("Displaying light logo.");
                }
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    sections.forEach(section => {
        observer.observe(section);
        console.log(`Observing section: ${section.className}`);
    });

    document.querySelector('.container').addEventListener('scroll', () => {
        console.log("Scrolling...");
    });
});
 */



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