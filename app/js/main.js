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

        if (vw < 992) {
            $('.experts').css({
                'margin-left': -(vw - container) / 2 + 'px',
                'margin-right': -(vw - container) / 2 + 'px',
                'padding-left': (vw - container) / 2 + 'px',
                'padding-right': (vw - container) / 2 + 'px',
            })
        } else {
            $('.experts').css({
                'margin-left': 0,
                'margin-right': 0,
                'padding-left': 0,
                'padding-right': 0,
            })
        }
    }

    paddingsAndMarginsForMobileXScroll()

    $(window).resize(() => {
        paddingsAndMarginsForMobileXScroll()

        // if ($(window).width() < 992) {

        // }
    })

    // let partnersSlider = $('.partners-list').slick({
    //     mobileFirst: true,
    //     rows: 2,
    //     variableWidth: true,
    //     cssEase: 'linear',
    //     autoplay: true,
    //     autoplaySpeed: 0,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: 'unslick'
    //         }
    //     ]
    // })

    if ($(window).width() < 992) {

        let firstRow = $('.partners-list')
        let secondRow = firstRow.clone()
        secondRow.empty()
        firstRow.find('.partners-list__partner').each((i, el) => {
            if (Math.floor(firstRow.find('.partners-list__partner').length / 2) < i + 1) {
                $(secondRow).append(el)
            }
        })
        $('.partners-list').after(secondRow)

        firstRow.slick({
            mobileFirst: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: 'unslick'
                }
            ]
        })

        secondRow.slick({
            mobileFirst: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 0,
            speed: 2000,
            variableWidth: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: 'unslick'
                }
            ]
        })
    }
})