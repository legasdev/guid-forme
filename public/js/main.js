'use strict'

var
    hoverCompassLink;

$(document).ready( () => {
    
    $('body').on('mouseenter', '.compass-link', (e) => {
        hoverCompassLink(e);
    });
    
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