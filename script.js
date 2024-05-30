document.addEventListener('wheel', (e) => {
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
}, { passive: false });
