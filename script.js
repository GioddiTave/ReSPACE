const slider = document.querySelector('.slider')
const sections = gsap.untils.toArray('.slider section')
//const illustration = document.querySelector('.illustration')

let tl = gsap.timeline({
    defaults: {
        ease: "none"
    },
    scrollTrigger: {
        trigger: slider,
        pin: true,
        scrub: 2,
        end: ()=> "+=" + slider.offsetWidth
    }
})

tl.to(slider, {
    xPrecent: -308
})


/* document.querySelectorAll('.nav-link').forEach(link => {
    console.log('Nav link found, adding event listener'); 
    link.addEventListener('click', function(e) {
        console.log('Nav link clicked'); 
        e.preventDefault();
        let targetId = this.getAttribute('href');
        let target = document.querySelector(targetId);
        if (target) {
            console.log('Target found:', targetId); 
            let scrollContainer = document.querySelector('.h-scroll');
            let scrollPosition = target.offsetLeft;
            scrollContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            console.log('Target not found:', targetId); 
        }
    });
});

document.addEventListener('wheel', function(event) {
    console.log('Wheel event detected', event.deltaY); 
    if (event.deltaY != 0) {
        event.preventDefault();
        let scrollContainer = document.querySelector('.h-scroll');
        scrollContainer.scrollBy({ left: event.deltaY * 1.5, behavior: 'smooth' });
    }
}, { passive: false });

 */