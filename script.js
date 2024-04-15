const track = document.querySelector('.slider-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slide-right');
const prevButton = document.querySelector('.slide-left');
const dotsNav = document.querySelector('.slides-nav');
const dots = Array.from(dotsNav.children);


const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another

const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
}

slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide-li');
    targetSlide.classList.add('current-slide-li');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

function hideShowNav() {
    const currentDot = document.querySelector('.current-slide');
    const targetIndex = dots.indexOf(currentDot);

    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
        return;
    }
    if (targetIndex === slides.length - 1) {
        nextButton.classList.add('is-hidden');
        prevButton.classList.remove('is-hidden');
        return;
    }

    nextButton.classList.remove('is-hidden');
    prevButton.classList.remove('is-hidden');
}


// when I click on the right, move slide right

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide-li');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = document.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

    hideShowNav();
})

// when I click on the left, move slide left

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide-li');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);

    hideShowNav();
})

// when I click the nav indicator, move to that slide

dotsNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide-li');
    const currentDot = dotsNav.querySelector('.current-slide');

    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);

    hideShowNav();

})

