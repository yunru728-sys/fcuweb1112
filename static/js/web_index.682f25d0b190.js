const videoModal = document.querySelector('#modalForVideo');
const videoModalContent = videoModal?.querySelector('.modal-content');
const videoCarousel = document.querySelector('.mySwiper');
let swiper = null;
let swiperLoad = null;
let swiperStylesLoad = null;

const loadSwiperStyles = () => {
    if (document.querySelector('link[data-swiper-styles]')) {
        return Promise.resolve();
    }
    if (!swiperStylesLoad) {
        swiperStylesLoad = new Promise((resolve, reject) => {
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
            stylesheet.dataset.swiperStyles = 'true';
            stylesheet.onload = resolve;
            stylesheet.onerror = () => reject(new Error('Unable to load the video carousel styles.'));
            document.head.appendChild(stylesheet);
        });
    }
    return swiperStylesLoad;
};

const initializeSwiper = () => {
    if (swiper || !window.Swiper || !videoCarousel) {
        return swiper;
    }

    swiper = new window.Swiper(videoCarousel, {
        spaceBetween: 10,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 2000,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    videoCarousel.classList.add('is-ready');
    return swiper;
};

const loadSwiper = () => {
    if (window.Swiper) {
        return Promise.resolve(initializeSwiper());
    }
    if (!swiperLoad) {
        swiperLoad = loadSwiperStyles().then(() => new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            script.async = true;
            script.onload = () => resolve(initializeSwiper());
            script.onerror = () => reject(new Error('Unable to load the video carousel.'));
            document.head.appendChild(script);
        }));
    }
    return swiperLoad;
};

if (videoCarousel && 'IntersectionObserver' in window) {
    const carouselObserver = new IntersectionObserver((entries, observer) => {
        if (entries.some(entry => entry.isIntersecting)) {
            loadSwiper().catch(error => console.error(error));
            observer.disconnect();
        }
    }, { rootMargin: '300px 0px' });
    carouselObserver.observe(videoCarousel);
} else {
    loadSwiper().catch(error => console.error(error));
}

document.querySelectorAll('.index-video').forEach(element => {
    element.addEventListener('click', async () => {
        let videoId = element.dataset.videoId;
        if (!videoId) {
            console.error('Video button is missing data-video-id.');
            return;
        }
        try {
            const carousel = await loadSwiper();
            carousel?.autoplay.stop();
        } catch (error) {
            console.error(error);
            return;
        }
        if (videoModalContent) {
            videoModalContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
        }
    });
});

videoModal?.addEventListener('hide.bs.modal', () => {
    if (videoModalContent) {
        videoModalContent.innerHTML = '';
    }
    swiper?.autoplay.start();
});
