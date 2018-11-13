'use strict'

var
    hoverCompassLink, // направление стрелки компаса
    addWheelEvent, // добавить функцию при прокрутке мыши
    removeWheelEvent, // Удалить отслеживание прокрутки
    onWheel, // событие при прокрутке колесика
    currentBlock, // Текущий блок
    checkScroll, // Возможен ли скроллинг
    setCurrentBlock; // Установка текущего блока

$(document).ready( () => {   
    checkScroll = true;
    currentBlock = 0;
    
    // Устанавливаем текущий блок
    setCurrentBlock();
    
    // Прокуртка мыши
    addWheelEvent();
    
    // Для компоса при наведении
    $('body').on('mouseenter', '.compass-link', (e) => {
        hoverCompassLink(e);
    });
    
    $('.reviews-w-more:first').css('left', -$('.reviews-w-more:first').width() / 2.5);
    $('.reviews-w-more:last').css('left', $('.reviews-w-more:last').width() / 2.5);
    
    
});

// Направление стрелки
hoverCompassLink = (e) => {
    switch ($(e.currentTarget).index()) {
        case 0:
            $('.main-c-arrow').css('transform', 'rotate(45deg)');
          break;
                
          case 1:
              $('.main-c-arrow').css('transform', 'rotate(0)');
         break;
           
         case 2:
             $('.main-c-arrow').css('transform', 'rotate(-45deg)');
          break;
                
          case 3:
             $('.main-c-arrow').css('transform', 'rotate(-90deg)');
         break;
    }
}

// Добавить функцию при прокрутке мыши
addWheelEvent = () => {
    // Прокрутка колесика мыши
    let elem = document;
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.addEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.addEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.addEventListener("MozMousePixelScroll", onWheel);
        }
    }
}

// Удалить отслеживание прокрутки
removeWheelEvent = () => {
    // Прокрутка колесика мыши
    let elem = document;
    if (elem.removeEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            elem.removeEventListener("wheel", onWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            elem.removeEventListener("mousewheel", onWheel);
        } else {
            // Firefox < 17
            elem.removeEventListener("MozMousePixelScroll", onWheel);
        }
    }
}

// Событие при прокрутке колесик
onWheel = (e) => {
    
    e = e || window.event;
    let 
        delta = e.deltaY || e.detail || e.wheelDelta;
    
    if (checkScroll) {
        
        let
            allBlocks = $('#body').children('.main, section, footer');
    
        // Полная прокрутка
        if (currentBlock !== 1) {
            if (delta > 0 && currentBlock < allBlocks.length - 1)
                currentBlock++;
            else if (delta < 0 && currentBlock > 0)
                currentBlock--;
        
            checkScroll = false;

            $('html, body').stop().animate({
                scrollTop: $(allBlocks[currentBlock]).offset().top
            }, 500, () => {
                checkScroll = true;
            });
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        } else {
            
            // Проверяем, ушли ли выше
            if ( $(window).scrollTop() <= $(allBlocks[currentBlock]).offset().top &&
                    delta < 0) {
                
                currentBlock--;
                $('html, body').stop().animate({
                    scrollTop: $(allBlocks[currentBlock]).offset().top
                }, 500, () => {
                    checkScroll = true;
                });
                
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            } else if (
                $(window).scrollTop() + $(window).height() >= 
                    $(allBlocks[currentBlock+1]).offset().top &&
                    delta > 0) {
                
                // Или ушел ниже
                currentBlock++;
                $('html, body').stop().animate({
                    scrollTop: $(allBlocks[currentBlock]).offset().top
                }, 500, () => {
                    checkScroll = true;
                });
                
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
            
        }
    } 
}

// Определить текущий блок
setCurrentBlock = () => {
    $('#body').children('.main, section, footer').each( (i, e) => {
       $(e).offset().top <= $('html, body').scrollTop() ? currentBlock = i : false; 
    });
}