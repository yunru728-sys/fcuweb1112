var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 'auto',
    loop: true,
    loopAdditionalSlides: 1,
    watchSlidesProgress: true,
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

document.querySelectorAll('.index-video').forEach(element => {
    element.addEventListener('click', () => {
        swiper.autoplay.stop();
        let videoId = element.dataset.videoId;
        if (!videoId) {
            console.error('Video button is missing data-video-id.');
            return;
        }
        document.querySelector('#modalForVideo .modal-content').innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    });
});

document.querySelector('#modalForVideo').addEventListener('hide.bs.modal', () => {
    document.querySelector('#modalForVideo .modal-content').innerHTML = '';
    swiper.autoplay.start();
});

window.addEventListener('load', () => {
    let index_about = document.querySelector('.index-about-background');
    if (!index_about) {
        return;
    }

    let bgimg = index_about.dataset.bgimg;
    if (bgimg) {
        index_about.style.backgroundImage = `url(${location.origin + bgimg})`;
    }
});
