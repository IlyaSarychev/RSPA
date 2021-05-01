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
        if ($(this).attr('href').length < 2) return
        e.preventDefault()
        jQuery('html, body').animate({scrollTop: jQuery(`#${jQuery(this).attr('href').slice(1)}`).offset().top - jQuery('.header').height()}, 500, 'swing')
    })

    jQuery('.select__header').click(function() {
        jQuery(this).closest('.select').toggleClass('show')
    })

    jQuery('.select__item').click(selectItemClickHandler)

    function selectItemClickHandler() {
        jQuery('.select').removeClass('show')
        let select = jQuery(this).closest('.select')
        let input = select.next('input[type="hidden"]')
        
        if (!select.hasClass('select--chosen')) {
            select.addClass('select--chosen')
            select.find('.select__header span').text(jQuery(this).text())
            input.addClass('valid')
            jQuery(this).remove()
        } else {
            select.find('.select__body').append(`
                <div class="select__item" data-type="${input.val()}">${select.find('.select__header span').text()}</div>
            `)
            select.find('.select__item:last-child').click(selectItemClickHandler)
            select.find('.select__header span').text(jQuery(this).text())
            jQuery(this).remove()
        }

        input.val(jQuery(this).attr('data-type'))
        input.trigger('change')
    }

    jQuery('[type="submit"]').click(e => {
        e.preventDefault()
    })

    jQuery('form input').change(function() {
        let form = jQuery(this).closest('form')
        
        form.find('input').each((i, el) => {
            
            if (jQuery(el).val().length) {
                jQuery(el).addClass('valid')
            }

            if ($(el).attr('type') === 'file') {
                if (el.files.length) {
                    $(el).addClass('valid')
                    $(el).closest('.input-file').addClass('contains')
                    $(el).next('label').find('.input-file__text').text(el.files[0].name)
                }
            }
        })

        if (form.find('input:not(.valid)').length) {
            form.find('button[type="submit"]').attr('disabled', true)
        } else {
            form.find('button[type="submit"]').attr('disabled', false)
        }
    })


    jQuery('.modal').on('click', function (e) {
        if (e.target.classList.contains('modal')) {
            jQuery('.modal.show').removeClass('show');
            jQuery('body,html').removeClass('modal-active');
        }
    
    });
    
    // modal
    function openModal(id) {
        jQuery('.modal#' + id).addClass('show');
        jQuery('body,html').addClass('modal-active');
    }
    
    function closeModal() {
        jQuery('.modal.show').removeClass('show');
        jQuery('body,html').removeClass('modal-active');
    }

    $(document).click(e => {
        if (!$(e.target).hasClass('select') && !$(e.target).closest('.select').length) {
            $('.select').removeClass('show')
        }
    })

    $('.info-wrapper .button').click(e => {
        openModal('member-modal')
    })

    $('.modal-back').click(function(e) {
        e.preventDefault()
        closeModal($(this).closest('.modal').attr('id'))
    })
})