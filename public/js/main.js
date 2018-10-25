var
    aboutBlockInfoPos;

$(document).ready( () => {
   $('body').on('click', '.main-c-bottom', (e) => {
       $('html, body').animate({scrollTop: $(window).innerHeight()}, 500); 
    }); 
});


$(window).scroll( (e) => {
	aboutBlockInfoPos();
});

// Отслеживаем положение блока about
aboutBlockInfoPos = () => {
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