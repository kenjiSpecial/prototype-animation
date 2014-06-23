(function(app){
    var events = new EventEmitter();

   _.extend(events, {
       UPDATE_GLOBE      : 'update-globe',
       COMPLETE_SWIPE_BG : 'complete-swipe-bg',

        // click
        CLICK : 'click',

        // mouse event
        MOUSE_ENTER : 'mouseenter',
        MOUSE_LEAVE : 'mouseleave',
        MOUSE_MOVE  : 'mousemove',

        // touch event
        TOUCH_START : 'touchstart',
        TOUCH_MOVE  : 'touchmove',
        TOUCH_END  : 'touchend',

        // customr window

        'SCROLL_UP' : 'scrollUp',
        'SCROLL_DOWN' : 'scrollDown',

         MOUSE_WHEEL : 'mousewheel DOMMouseScroll',

         KEY_DOWN : 'keydown',
    });
    
    app.helpers.events = events;

})(window.ma);
