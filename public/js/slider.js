/*
*	Скрипт слайдера
*	Управление
*/

let
  startSlider;
  

$(document).ready(() => {

	// Запускаем главный слайдер
	startSlider('.main-slides', '.main-s-slide', 6, 1, '.main-c-w-ui');
	// Запускаем главный слайдер 2
	startSlider('.welcome-s-w-slides', '.welcome-s-w-s-slide', 6, 1, '.welcome-s-w-ui-baseline');
	// Запускаем слайдер 
	startHardSlider('.explanation-w-slider', '.explanation-w-s-slide', 5, 1);
	// Слайдер в отзывах
	startSlider('.reviews-s-w-slides', '.reviews-s-w-s-slide', 6, 1, '.reviews-s-w-ui-baseline');

});

// Запуск простого слайдера
startSlider = function (mainSliderObj, nameSlideObj, duration, delay, nameUiBtn) {

	nameUiBtn = nameUiBtn || false;

	setInterval(() => {

		let
			currentSlide = $(mainSliderObj).find('.active'),
			currentUiSlide = $(nameUiBtn).find('.active') || false,
			numSlides = $(mainSliderObj).find(nameSlideObj).length;

		$(currentSlide).css('z-index', -1);
		// Скрытие текущего
		setTimeout(() => {
			$(currentSlide).removeClass('active');
		}, delay * 1000);
		if (nameUiBtn) $(currentUiSlide).removeClass('active');

		// Проверка последнего слайда
		if ($(currentSlide).index() + 1 < numSlides) {
			$(currentSlide).next().css('z-index', 0);
			$(currentSlide).next().addClass('active');
			if (nameUiBtn) $(currentUiSlide).next().addClass('active');
		} else {
			$(mainSliderObj).find(nameSlideObj + ':first').css('z-index', 0);
			$(mainSliderObj).find(nameSlideObj + ':first').addClass('active');
			if (nameUiBtn) $(nameUiBtn).children().first().addClass('active');
		}
	}, duration * 1000);
}

// Запуск слайдера с несколькими промежуточными слайдами
startHardSlider = function (mainSliderObj, nameSlideObj, duration, delay, nameUiBtn) {
	
	nameUiBtn = nameUiBtn || false;
	
	setInterval( () => {
		
		let 
			currentSlide = $(mainSliderObj).find('.active'),
			lastCurrentSlide = $(mainSliderObj).find('.active-last'),
			secondSlide = $(mainSliderObj).find('.second'),
			thirdSlide = $(mainSliderObj).find('.third'),
			currentUiSlide = $(nameUiBtn).find('.active') || false,
			hideSlide;
		
		if ($(thirdSlide).index() + 1 < $(nameSlideObj).length) {
			hideSlide = $(thirdSlide).next();
		} else {
			hideSlide = $(mainSliderObj).find('.hide:first');
		}		

		// текущий -> последний
		$(currentSlide).removeClass('active');
		$(currentSlide).addClass('active-last');
	
		$(lastCurrentSlide).removeClass('active-last');
		$(lastCurrentSlide).addClass('hide');
		
		$(secondSlide).removeClass('second');
		$(secondSlide).addClass('active');
		
		$(thirdSlide).removeClass('third');
		$(thirdSlide).addClass('second');
		
		$(hideSlide).removeClass('hide');
		$(hideSlide).addClass('third');
			
		
	}, duration * 1000);
	
}