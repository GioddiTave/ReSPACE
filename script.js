const slider = document.querySelector('.slider');
const sections = gsap.utils.toArray('.slider section'); // Korrigiere den Tippfehler von "untils" zu "utils"

// Konfiguration des GSAP Timelines mit ScrollTrigger
let tl = gsap.timeline({
    defaults: {
        ease: "none"
    },
    scrollTrigger: {
        trigger: slider,
        pin: true,
        scrub: 2,
        end: () => "+=" + slider.offsetWidth
    }
});

// Bewegen des Sliders um 308% des Viewports nach links
tl.to(slider, {
    xPercent: -308
});

// Füge das Mausrad-Scroll-Event hinzu, um horizontal zu scrollen
slider.addEventListener('wheel', function(event) {
    event.preventDefault(); // Verhindert das vertikale Scrollen
    const scrollAmount = 100; // Definiere, wie weit jeder Scrollvorgang gehen soll

    if (event.deltaY > 0) {
        gsap.to(slider, {
            x: () => `+=${scrollAmount}`, // Bewegt den Slider horizontal nach rechts
            ease: "none"
        });
    } else {
        gsap.to(slider, {
            x: () => `-=${scrollAmount}`, // Bewegt den Slider horizontal nach links
            ease: "none"
        });
    }
});
