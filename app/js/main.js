$(document).ready(function() {

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.header').addClass('header--scroll')
        } else {
            $('.header').removeClass('header--scroll')
        }
    })

    let workprogSlider = $('.workprog-slider').slick({
        autoplay: false,
        arrows: false
    })

    $('.workprog-slider-arrows .arrow--prev').click(() => {
        workprogSlider.slick('slickPrev')
    })

    $('.workprog-slider-arrows .arrow--next').click(() => {
        workprogSlider.slick('slickNext')
    })
})