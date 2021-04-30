jQuery(document).ready(function() {

    jQuery(window).scroll(function() {
        if (jQuery(window).scrollTop() > 100) {
            jQuery('.header').addClass('header--scroll')
        } else {
            jQuery('.header').removeClass('header--scroll')
        }
    })

    let workprogSlider = jQuery('.workprog-slider').slick({
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

    jQuery('.workprog-slider-arrows .arrow--prev').click(() => {
        workprogSlider.slick('slickPrev')
    })

    jQuery('.workprog-slider-arrows .arrow--next').click(() => {
        workprogSlider.slick('slickNext')
    })

    let guestprogSlider = jQuery('.guestprog-slider').slick({
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
                jQuery(el).addClass('active')
            } else {
                jQuery(el).removeClass('active')
            }
        })
    }

    function bindButtonsToSlider(buttons, slider) {
        buttons.each((i, el) => {
            jQuery(el).click(() => {
                slider.slick('slickGoTo', i)
                changeSliderButtonsClasses(buttons, i)
            })
        })

        slider.on('afterChange', (slick, currentSlide) => {
            changeSliderButtonsClasses(buttons, currentSlide.currentSlide)
        })
    }

    bindButtonsToSlider(jQuery('.section-guestprogramm .slider-buttons__btn'), guestprogSlider)

    function paddingsAndMarginsForMobileXScroll() {
        let container = jQuery('.container').width()
        let vw = jQuery(window).width()

        if (vw < 992) {
            jQuery('.experts').css({
                'margin-left': -(vw - container) / 2 + 'px',
                'margin-right': -(vw - container) / 2 + 'px',
                'padding-left': (vw - container) / 2 + 'px',
                'padding-right': (vw - container) / 2 + 'px',
            })
        } else {
            jQuery('.experts').css({
                'margin-left': 0,
                'margin-right': 0,
                'padding-left': 0,
                'padding-right': 0,
            })
        }

        if (vw < 576) {
            jQuery('.b-nom-wrapper').css({
                'margin-left': -(vw - container) / 2 + 'px',
                'margin-right': -(vw - container) / 2 + 'px',
                'padding-left': (vw - container) / 2 + 'px',
                'padding-right': (vw - container) / 2 + 'px',
            })
        } else {
            jQuery('.b-nom-wrapper').css({
                'margin-left': 0,
                'margin-right': 0,
                'padding-left': 0,
                'padding-right': 0,
            })
        }
    }

    paddingsAndMarginsForMobileXScroll()

    jQuery(window).resize(() => {
        paddingsAndMarginsForMobileXScroll()
    })

    if (jQuery(window).width() < 992) {

        let firstRow = jQuery('.partners-list')
        let secondRow = firstRow.clone()
        secondRow.empty()
        firstRow.find('.partners-list__partner').each((i, el) => {
            if (Math.floor(firstRow.find('.partners-list__partner').length / 2) < i + 1) {
                jQuery(secondRow).append(el)
            }
        })
        jQuery('.partners-list').after(secondRow)

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

    jQuery('.burger').click(() => {
        jQuery('.mobile-menu').addClass('show')
    })

    jQuery('.mobile-menu__button').click(() => {
        jQuery('.mobile-menu').removeClass('show')
    })

    jQuery('a[href^="#"]').click(function(e) {
        e.preventDefault()
        jQuery('html, body').animate({scrollTop: jQuery(`section#${jQuery(this).attr('href').slice(1)}`).offset().top - jQuery('.header').height()}, 500, 'swing')
    })

    jQuery('.select__header').click(function() {
        jQuery(this).closest('.select').toggleClass('show')
    })

    $('.select__item').click(selectItemClickHandler)

    function selectItemClickHandler() {
        $('.select').removeClass('show')
        let select = $(this).closest('.select')
        let input = select.next('input[type="hidden"]')
        
        if (!select.hasClass('select--chosen')) {
            select.addClass('select--chosen')
            select.find('.select__header span').text($(this).text())
            $(this).remove()
        } else {
            select.find('.select__body').append(`
                <div class="select__item" data-type="${input.val()}">${select.find('.select__header span').text()}</div>
            `)
            select.find('.select__item:last-child').click(selectItemClickHandler)
            select.find('.select__header span').text($(this).text())
            $(this).remove()
        }

        input.val($(this).attr('data-type'))
    }

    $('[type="submit"]').click(e => {
        e.preventDefault()
    })

    $('form input').change(function() {
        let form = $(this).closest('form')
        //
    })
})