document.querySelectorAll('.nav-link').forEach(link => {
    console.log('Nav link found, adding event listener'); // Debugging line
    link.addEventListener('click', function(e) {
        console.log('Nav link clicked'); // Debugging line
        e.preventDefault();
        let targetId = this.getAttribute('href');
        let target = document.querySelector(targetId);
        if (target) {
            console.log('Target found:', targetId); // Debugging line
            let scrollContainer = document.querySelector('.h-scroll');
            let scrollPosition = target.offsetLeft;
            scrollContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            console.log('Target not found:', targetId); // Error message if target isn't found
        }
    });
});

document.addEventListener('wheel', function(event) {
    console.log('Wheel event detected', event.deltaY); // Debugging line
    if (event.deltaY != 0) {
        event.preventDefault();
        let scrollContainer = document.querySelector('.h-scroll');
        scrollContainer.scrollBy({ left: event.deltaY * 1.5, behavior: 'smooth' });
    }
}, { passive: false });

