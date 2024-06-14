
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

document.addEventListener('DOMContentLoaded', () => {
    function applyEffect(target) {
        let iterations = 0;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const originalText = target.getAttribute('data-value');
        const interval = setInterval(() => {
            target.innerText = originalText.split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index]; // Zeigt den echten Buchstaben
                }
                return letters[Math.floor(Math.random() * letters.length)]; // Zufälliger Buchstabe sonst
            })
            .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval); // Stoppt das Intervall, wenn das letzte Zeichen erreicht ist
            }

            iterations += 0.1; // Verlangsamt die Rate der "Enthüllung" der Buchstaben
        }, 30); // Erhöht die Dauer des Intervalls für einen langsameren Effekt
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                applyEffect(entry.target);
                observer.unobserve(entry.target); // Entfernt das Element aus dem Observer
            }
        });
    }, {
        rootMargin: '0px', // Kann angepasst werden, um den Trigger-Punkt zu verschieben
        threshold: 0.5 // Stellt ein, wie viel eines Elements sichtbar sein muss
    });

    // NEU: Inkludiert sowohl h2 als auch h3 Elemente im Observer
    document.querySelectorAll('h2[data-value], h3[data-value]').forEach(element => {
        observer.observe(element); // Beobachtet jedes h2 und h3 Element für den Sichtbarkeitseffekt
    });
});



