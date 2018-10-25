$(window).scroll( (e) => {
	
	console.log($(window).scrollTop());
	console.log($('.about-w-i-wrapper').offset().top);
	
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
	
});