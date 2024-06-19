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

    function toggleFullImage() {
        const imageDiv = document.getElementById('fullScreenImage');
        imageDiv.style.display = imageDiv.style.display === 'none' ? 'flex' : 'none';
    }

    function closeFullImage() {
        document.getElementById('fullScreenImage').style.display = 'none';
    }

    function setupEventListeners() {
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            document.querySelector('.container').scrollLeft += e.deltaY;
        }, { passive: false });

        document.addEventListener('touchstart', (e) => {
            lastTouchPosition = e.touches[0].clientY;
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            let currentTouch = e.touches[0].clientY;
            touchScrollVelocity += (lastTouchPosition - currentTouch) * 0.2;
            lastTouchPosition = currentTouch;
            requestAnimationFrame(smoothTouchScroll);
        }, { passive: false });

        document.addEventListener('touchend', () => {
            touchScrollVelocity = 0;
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
                const size = (Math.random() * 1 + 0.5) + 'em'; // Größe zwischen 0.5em und 1.5em
                star.style.width = size;
                star.style.height = size;
                star.style.top = Math.random() * 100 + 'vh'; // Zufällige Höhe im Viewport
                star.style.left = Math.random() * 100 + 'vw'; // Zufällige Breite im Viewport
                star.style.animationDuration = Math.random() * 30 + 120 + 's'; // Dauer der Animation zwischen 10s und 15s
            }

            starsContainer.appendChild(star);

            // Entferne den Stern, nachdem die Animation beendet ist
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }

        // Anzahl der initialen Sterne und Intervall basierend auf der Bildschirmgröße
        const initialStars = isMobile ? 90 : 300;
        const intervalTime = isMobile ? 1000 : 900;

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

        const illustrationElements = document.querySelectorAll('.illustration');
        const isMobile = window.innerWidth <= 768;

        illustrationElements.forEach(illustration => {
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars');
            illustration.appendChild(starsContainer);

            createStarsForIllustration(starsContainer, isMobile);
        });
    });
})();
