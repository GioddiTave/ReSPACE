document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Retrieve the section to scroll to based on the href of the link
        let targetId = this.getAttribute('href');
        let target = document.querySelector(targetId);

        // Calculate the horizontal position of the target element
        let scrollContainer = document.querySelector('.h-scroll');
        let scrollPosition = target.offsetLeft; // Get the left offset of the target

        // Smoothly scroll to the target position
        scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
});
