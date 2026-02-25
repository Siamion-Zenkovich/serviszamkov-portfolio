$(function () {


	// Fixed Header Hide Menu
	function hide_menu() {
		if ($(window).width() >= 768) {
			if (($(window).scrollTop() > 100) && ($('.header-menu').is(':visible'))) {
				$('.header-menu').slideUp(250);
			} else if (($(window).scrollTop() < 100) && (!$('.header-menu').is(':visible'))) {
				$('.header-menu').fadeIn(250);
			}
		}
	}
	hide_menu();
	$(window).on('scroll', hide_menu);


	// Fixed Header Offset
	function header_offset() {
		var body_padding = parseInt($('body').css('padding-top')),
			header_height = $('header').height();
		if (body_padding !== header_height) {
			$('body').css('padding-top', header_height + 'px');
		}
	}
	header_offset();
	$(window).on('resize', header_offset);


	// Toggle Mobile Menu
	$('.menu-toggle').click(function () {
		$(this).toggleClass('on');
		$('.header-mobile-menu').toggleClass('active');
		if ($('.menu-toggle').hasClass('on')) {
			scrollLock.disablePageScroll();
		} else {
			setTimeout(function () {
				scrollLock.enablePageScroll();
			}, 400);
		}
	});
	$(window).resize(function () {
		if (($(window).width() >= 768) && ($('.menu-toggle').hasClass('on'))) {
			$('.menu-toggle').removeClass('on');
			$('.header-mobile-menu').removeClass('active');
		}
	});


	// Services Slider
$('.services-slider').slick({
	arrows: true,
	dots: false,
	infinite: true,
	accessibility: false,
	slidesToShow: 4,
	slidesToScroll: 1,
	rows: 0,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2
			}
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 2,
				variableWidth: true
			}
		},
		{
			breakpoint: 440,
			settings: "unslick" // This will disable the slick slider below 440px
		}
	]
});



	// Services Items on Hover/Click
	function services_items() {
		var s_item = $('.services-main .service-item');
		if (($(window).width() >= 1230) && (!s_item.hasClass('hover'))) {
			s_item.addClass('hover').removeClass('click');
			s_item.off('click').click(function (event) {
				event.stopPropagation();
			});
			s_item.hover(function () {
				$(this).addClass('active');
			}, function () {
				$(this).removeClass('active');
			}
			);
		} else if (($(window).width() < 1230) && (!s_item.hasClass('click'))) {
			s_item.addClass('click').removeClass('hover');
			s_item.off('mouseenter mouseleave');
			s_item.click(function (event) {
				event.stopPropagation();
				$(this).toggleClass('active');
				s_item.not(this).removeClass('active');
			});
		}
	}
	services_items();
	$(window).on('resize', services_items);
	$(document).click(function () {
		$('.services-main .service-item').removeClass('active');
	});


	// Review Slider
	$('.reviews-slider').slick({
		arrows: true,
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		accessibility: false,
		rows: 0,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					variableWidth: true
				}
			},
		]
	});


	// Advantages Titles Match Heights
	function match_heights() {
		if ($(window).width() >= 576) {
			$.fn.matchHeight._apply($('.advantage-item .item-title'), { property: 'min-height', byRow: true });
		} else {
			$('.advantage-item .item-title').removeAttr('style');
		}
	}
	match_heights();
	$(window).resize(function () {
		setTimeout(function () {
			match_heights();
		}, 200);
	});


	// Sliders Nav Arrows Clone
	function slider_nav() {
		$('.slider-nav').each(function () {
			if ($(this).is(':empty')) {
				$(this).closest('section').find('.slick-slider .slick-arrow').clone(true, true).removeAttr('style').prependTo(this);
			}
		});
	}
	slider_nav();

	// Homepage SEO-slider
	$('.seo-slider').slick({
		arrows: false,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		fade: true,
		rows: 0,
		adaptiveHeight: true,
		// autoplay: true,
		// autoplaySpeed: 3000
	});


	// Homepage Video Popup
	var mfpOpen = true;
	$('.video-item').each(function () {
		// Get Video Poster if Not Exist
		var img = $(this).find('.poster-img');
		if ($(this).is('a[href*="youtube"]')) {
			var video_id = $(this).attr('href').split('?v=').pop();
			if (img.attr('src') == '') {
				img.attr('src', 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg');
			}
			img.on('error', function () {
				img.attr('src', 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg');
			});
		} else if ($(this).is('a[href*="vimeo"]')) {
			var video_id = $(this).attr('href').split('vimeo.com/').pop();
			if (img.attr('src') == '') {
				$.getJSON('https://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=?', { format: "json" }, function (data) {
					img.attr('src', data[0].thumbnail_large);
				});
			}
			img.on('error', function () {
				$.getJSON('https://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=?', { format: "json" }, function (data) {
					img.attr('src', data[0].thumbnail_large);
				});
			});
		}
		// Init Video Popup
		$(this).magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade mfp-video',
			removalDelay: 300,
			preloader: false,
			disableOn: function () {
				return mfpOpen;
			},
			iframe: {
				markup: '<div class="mfp-iframe-scaler">' +
					'<div class="mfp-close"></div>' +
					'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
					'</div>',
				patterns: {
					youtube: {
						index: 'youtube.com/',
						id: 'v=',
						src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
					},
				},
				srcAction: 'iframe_src',
			},
			callbacks: {
				open: function () {
					$('header').css('overflow-y', 'scroll');
					var margin = parseInt($('html').css('margin-right'));
					if (margin > 0) {
						$('.mfp-content').css('right', margin / 2 + 'px');
					} else {
						$('.mfp-content').css('right', '');
					}
				},
				close: function () {
					$('header').css('overflow-y', '');
				}
			}
		});
	});


	// Homepage Video Slider
	$('.video-slider').slick({
		arrows: false,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		rows: 0,
		fade: true
	});
	// Prevent Popup Open on Slide Change
	$('.video-slider').on('beforeChange', function () {
		mfpOpen = false;
	});
	$('.video-slider').on('afterChange', function () {
		mfpOpen = true;
	});

	// Homepage Map Responsive
	$(window).resize(function () {
		if (($('.regions-map').length) && ($(window).width() >= 768)) {
			if ($('.regions-map').height() !== $('.regions-consultation').outerHeight()) {
				$('.regions-map').css('height', $('.regions-consultation').outerHeight() + 'px');
			}
		} else {
			$('.regions-map').css('height', '');
		}
	});


	// Scheme Overflow
	$('.scheme-inner').scroll(function () {
		if ($(this).scrollLeft() < 3) {
			$(this).removeClass('left').addClass('right');
		} else if (Math.abs(Math.round($(this).scrollLeft()) - Math.round($(this)[0].scrollWidth - $(this).width())) < 3) {
			$(this).removeClass('right').addClass('left');
		} else {
			$(this).addClass('left').addClass('right');
		}
	});


	// SEO Text Read More
	setTimeout(function () {
		if ($('.seo-block').hasClass('seo-block-internal')) {
			if ($('.seo-text')[0].scrollHeight >= 330) {
				$('.seo-text').addClass('hidden');
				$('.seo-readmore').show();
			} else {
				$('.seo-text').removeClass('hidden');
				$('.seo-readmore').hide();
			}
		}
	}, 10);
	$('.seo-readmore button').click(function () {
		$(this).toggleClass('active');
		if ($('.seo-text').hasClass('hidden')) {
			$('.seo-text').css('height', $('.seo-text')[0].scrollHeight + 'px');
			$('.seo-text').removeClass('hidden');
		} else {
			$('.seo-text').css('height', '');
			$('.seo-text').addClass('hidden');
		}
	});


	// Scroll Animation Library
	sal({
		threshold: 0.08,
		once: true,
	});


	// Pagination Content Load with Ajax
	$(document).on('click', '.page-numbers:not(.current)', function (event) {
		event.preventDefault();
		var target = $(this).attr('href');
		var wrapper;
		if ($('.services-regions').length) {
			var wrapper = $('.services-regions'),
				container = target + ' .services-regions .container',
				scroll_offset = $('.services-regions').offset().top - $('header').height(),
				fade_delay = 250, fade_time = 250, scroll_time = 400;
		} else if ($('.advices').length) {
			var wrapper = $('.advices'),
				container = target + ' .advices .container',
				scroll_offset = $('.advices').offset().top - $('header').height() - 80,
				fade_delay = 300, fade_time = 250, scroll_time = 400;
		}
		if (typeof wrapper !== 'undefined') {
			wrapper.fadeTo(200, 0).load(container);
			$('html, body').animate({
				scrollTop: scroll_offset
			}, scroll_time);
			setTimeout(function () {
				wrapper.fadeTo(fade_time, 1);
			}, fade_delay);
			history.replaceState(null, '', target);
		}
	});


	// Advice Page Go Back
	$('.advice-goback').click(function (event) {
		if ((1 < history.length) && document.referrer) {
			event.preventDefault();
			history.back();
		}
	});


	// Viber Mobile/Desktop Client Switch
	function viber_client() {
		var viber_chat = $('a[href^="viber://chat?number=+"]'),
			viber_add = $('a[href^="viber://add?number="]');
		if (($(window).width() > 1200) && (viber_add.length)) {
			$(viber_add).attr('href', viber_add.attr('href').replace('viber://add?number=', 'viber://chat?number=+'));
		} else if (($(window).width() < 1200) && (viber_chat.length)) {
			$(viber_chat).attr('href', viber_chat.attr('href').replace('viber://chat?number=+', 'viber://add?number='));
		}
	}
	viber_client();
	$(window).on('resize', viber_client);





});