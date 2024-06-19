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

    document.addEventListener("DOMContentLoaded", function() {
        setupEventListeners();
        animateText(); // Call the animateText function to initialize text animations

        const starImages = ['./Bilder/star1.svg', './Bilder/star2.svg', './Bilder/star3.svg'];
        const illustrationElements = document.querySelectorAll('.illustration');

        function createStar(starsContainer) {
            const star = document.createElement('img');
            star.src = starImages[Math.floor(Math.random() * starImages.length)];
            star.classList.add('star');

            // Zufällige Größe und Position
            const size = (Math.random() * 1 + 0.2) + 'em'; // Größe zwischen 0.5em und 1.5em
            star.style.width = size;
            star.style.height = size;
            star.style.top = Math.random() * 100 + 'vh'; // Zufällige Höhe im Viewport
            star.style.left = Math.random() * 100 + 'vw'; // Zufällige Breite im Viewport

            // EXTRA: Animation Dauer und Geschwindigkeit
            star.style.animationDuration = Math.random() * 5 + 30 + 's'; // Dauer der Animation zwischen 5s und 10s

            starsContainer.appendChild(star);

            // Entferne den Stern, nachdem die Animation beendet ist
            star.addEventListener('animationend', () => {
                star.remove();
            });
        }

        // Erstelle initiale Sterne und setze Intervalle für alle Illustrations
        illustrationElements.forEach(illustration => {
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars');
            illustration.appendChild(starsContainer);

            // Erstelle initiale Sterne
            for (let i = 0; i < 3; i++) {
                createStar(starsContainer);
            }

            // Erstelle alle 0.5 Sekunden einen neuen Stern
            setInterval(() => createStar(starsContainer), 500);
        });
    });
})();
