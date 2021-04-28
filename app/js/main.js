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
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots custom-list',
                    adaptiveHeight: true
                }
            }
        ]
    })

    $('.workprog-slider-arrows .arrow--prev').click(() => {
        workprogSlider.slick('slickPrev')
    })

    $('.workprog-slider-arrows .arrow--next').click(() => {
        workprogSlider.slick('slickNext')
    })

    let guestprogSlider = $('.guestprog-slider').slick({
        autoplay: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    dots: true,
                    dotsClass: 'slick-dots blue-dots custom-list',
                    adaptiveHeight: true
                }
            }
        ]
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

    function paddingsAndMarginsForMobileXScroll() {
        let container = $('.container').width()
        let vw = $(window).width()

        $('.experts').css({
            'margin-left': -(vw - container) / 2 + 'px',
            'margin-right': -(vw - container) / 2 + 'px',
            'padding-left': (vw - container) / 2 + 'px',
            'padding-right': (vw - container) / 2 + 'px',
        })
    }

    paddingsAndMarginsForMobileXScroll()

    $(window).resize(() => {
        paddingsAndMarginsForMobileXScroll()
    })
})