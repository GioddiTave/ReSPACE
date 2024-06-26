(function() {
    let lastTouchPosition = 0;
    let touchScrollVelocity = 0;

    function smoothTouchScroll() {
        const container = document.querySelector('.container');
        if (Math.abs(touchScrollVelocity) > 0.4) {
            container.scrollLeft += touchScrollVelocity;
            touchScrollVelocity *= 0.95;
            requestAnimationFrame(smoothTouchScroll);
        } else {
            touchScrollVelocity = 0;
        }
    }

    // Globale Funktionen für Fullscreen-Image
    window.toggleFullImage = function() {
        const imageDiv = document.getElementById('fullScreenImage');
        imageDiv.style.display = imageDiv.style.display === 'none' ? 'flex' : 'none';
    }

    window.closeFullImage = function() {
        document.getElementById('fullScreenImage').style.display = 'none';
    }

    function setupEventListeners() {
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            document.querySelector('.container').scrollLeft += e.deltaY;
        }, { passive: false });

        document.addEventListener('touchstart', function(e) {
            this.lastY = e.touches[0].clientY;
        }, { passive: false });
        
        document.addEventListener('touchmove', function(e) {
            var currentY = e.touches[0].clientY;
            var deltaY = currentY - this.lastY;
            this.lastY = currentY;
        
            // Scrollen des Containers horizontal basierend auf der vertikalen Bewegung
            document.querySelector('.container').scrollLeft -= deltaY;
            e.preventDefault();
        }, { passive: false });
    }

    function animateText() {
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(element => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        });
    }

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

    function createStarsForIllustration(starsContainer, isMobile) {
        const starImages = ['./Bilder/star1.svg', './Bilder/star2.svg', './Bilder/star3.svg'];

        function createStar() {
            const star = document.createElement('img');
            star.src = starImages[Math.floor(Math.random() * starImages.length)];
            star.classList.add('star');

            // Mobile Einstellungen
            if (isMobile) {
                const size = (Math.random() * 0.5 + 0.2) + 'em'; // Größe zwischen 0.2em und 0.7em
                star.style.width = size;
                star.style.height = size;
                star.style.top = Math.random() * 100 + 'vh'; // Zufällige Höhe im Viewport
                star.style.left = Math.random() * 600 + 'vw'; // Zufällige Breite im Viewport
                star.style.animationDuration = Math.random() * 5 + 15 + 's'; // Dauer der Animation zwischen 15s und 20s
            } else {
                // Desktop Einstellungen
                const size = (Math.random() * 1 + 0.2) + 'em'; // Größe zwischen 0.5em und 1.5em
                star.style.width = size;
                star.style.height = size;
                star.style.top = Math.random() * 100 + 'vh'; // Zufällige Höhe im Viewport
                star.style.left = Math.random() * 100 + 'vw'; // Zufällige Breite im Viewport
                star.style.animationDuration = Math.random() * 2 + 50 + 's'; // Dauer der Animation zwischen 30s und 150s
            }

            starsContainer.appendChild(star);

            // Entferne den Stern, nachdem die Animation beendet ist
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }

        // Anzahl der initialen Sterne und Intervall basierend auf der Bildschirmgröße
        const initialStars = isMobile ? 1 : 3; // HIER kannst du die Anzahl der initialen Sterne einstellen
        const intervalTime = isMobile ? 1000 : 500; // HIER kannst du das Intervall für neue Sterne einstellen

        // Erstelle initiale Sterne
        for (let i = 0; i < initialStars; i++) {
            createStar();
        }

        // Erstelle in regelmäßigen Abständen neue Sterne
        setInterval(() => createStar(starsContainer), intervalTime);
    }

    document.addEventListener("DOMContentLoaded", function() {
        setupEventListeners();
        animateText(); // Call the animateText function to initialize text animations

        // Füge den .hero-Abschnitt zu den Bereichen hinzu, in denen Sterne erscheinen
        const illustrationElements = document.querySelectorAll('.illustration, .hero');
        const isMobile = window.innerWidth <= 768;

        illustrationElements.forEach(illustration => {
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars');
            illustration.appendChild(starsContainer);

            createStarsForIllustration(starsContainer, isMobile);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    applyEffect(entry.target);
                    observer.unobserve(entry.target); // Entfernt das Element aus dem Observer
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });

        // NEU: Inkludiert sowohl h2 als auch h3 Elemente im Observer
        document.querySelectorAll('h2[data-value], h3[data-value]').forEach(element => {
            observer.observe(element); // Beobachtet jedes h2 und h3 Element für den Sichtbarkeitseffekt
        });
    });

/* })();
 */

let player;
let volume = 50; // Initiale Lautstärke

// Diese Funktion wird von der YouTube-API aufgerufen, wenn sie geladen wird.
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '0', // Höhe und Breite auf 0 setzen, um den Player unsichtbar zu machen
        width: '0',
        videoId: 'aBKEt3MhNMM', // Video-ID von YouTube Music
        events: {
            'onReady': onPlayerReady
        },
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': 'aBKEt3MhNMM' // Video-ID für die Loop-Wiedergabe
        }
    });
}

// Diese Funktion wird aufgerufen, wenn der Player bereit ist.
function onPlayerReady(event) {
    event.target.setVolume(volume);
    event.target.playVideo();
}

// Lautstärke anpassen, wenn zur Playlist gescrollt wird.
function adjustVolumeOnScroll() {
    const playlistSection = document.querySelector('.playlist-content');
    const rect = playlistSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top >= 0 && rect.bottom <= windowHeight) {
        // Sektion ist vollständig sichtbar
        volume = 100;
    } else {
        // Sektion ist nicht vollständig sichtbar
        volume = 50;
    }
    if (player && player.setVolume) {
        player.setVolume(volume);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Event-Listener für das Scrollen hinzufügen
    window.addEventListener('scroll', adjustVolumeOnScroll);
});
})();
