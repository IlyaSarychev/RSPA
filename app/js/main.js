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

    let guestprogSlider = $('.guestprog-slider').slick({
        autoplay: false,
        arrows: false
    })

    function changeSliderButtonsClasses(buttons, activeIdx) {
        buttons.each((i, el) => {
            if (i === activeIdx) {
                $(el).addClass('active')
            } else {
                $(el).removeClass('active')
            }
        })
    }

    function bindButtonsToSlider(buttons, slider) {
        buttons.each((i, el) => {
            $(el).click(() => {
                slider.slick('slickGoTo', i)
                changeSliderButtonsClasses(buttons, i)
            })
        })

        slider.on('afterChange', (slick, currentSlide) => {
            changeSliderButtonsClasses(buttons, currentSlide.currentSlide)
        })
    }

    bindButtonsToSlider($('.section-guestprogramm .slider-buttons__btn'), guestprogSlider)
})