'use strict'

var
    AboutBlockInfoPos,
    ScrollDownPage,
    DetectViewPort;

$(document).ready( () => {
    ScrollDownPage();
    $('.main').removeClass('hideOn');
});


$(window).scroll( (e) => {
	AboutBlockInfoPos();
    DetectViewPort();
});

// Отслеживаем положение блока about
AboutBlockInfoPos = () => {
    let 
		obj = $('.about').find('.about-w-i-wrapper'),
		checkObj = $('.about').find('.about-w-text');
		
	if ( 
		$(checkObj).offset().top < $(window).scrollTop() && 
	   	$(checkObj).offset().top + $(checkObj).height() - $(obj).height() > $(window).scrollTop()	
	) {
		if (!$(obj).hasClass('fixed')) {
			$(obj).addClass('fixed');
			$(obj).css('width', $(obj).parent().width());
		}
		if ($(obj).hasClass('bottom')) $(obj).removeClass('bottom');
	} else {
		$(obj).removeClass('fixed');
		
		// Если ушли ниже
		if ( $(checkObj).offset().top + $(checkObj).height() - $(obj).height() < $(window).scrollTop() ) {
			$(obj).addClass('bottom');
		}
	}
}

// Скроллинг по стрелочке
ScrollDownPage = () => {
    $('body').on('click', '.main-c-bottom', (e) => {
       $('html, body').animate({scrollTop: $(window).innerHeight()}, 500); 
    }); 
}

// Определение видимого блока 
DetectViewPort = () => {
    
    // Проходим по всем базовым блокам
    $('body').children().filter('section').each( (i, e) => {
        // Проверка на то, был ли виден блок
        let 
            screenPosY = $(window).scrollTop() + $(window).height() / 2;
        
        if ($(e).hasClass('hideOn') && screenPosY > $(e).offset().top) {
            $(e).removeClass('hideOn');
        }
    });
}