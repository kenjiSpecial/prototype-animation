(function (app) {
    var myEvents = app.helpers.events;
    var Flags = app.Flags;

    var isTransform = false, prevWheelTime;
    var interval = 600 + 400;

    var KEYS = {
        KEY_SPACE  : 32,
        KEY_LEFT   : 37,
        KEY_UP     : 38,
        KEY_RIGHT  : 39,
        KEY_DOWN   : 40
    };

    window.addEventListener(myEvents.MOUSE_MOVE, function (event) {
        var x = event.x | event.stageX;
        var y = event.y | event.stageY;

        myEvents.emit(myEvents.MOUSE_MOVE, {x: x, y: y});

    });

    function onMouseWheel(event) {
        var dTime;
        var delta;
        var curWheelTime;

        event.preventDefault();

        if (isTransform) {
            curWheelTime = +new Date;

            if (prevWheelTime) {
                dTime = curWheelTime - prevWheelTime;

                if (dTime < interval) {
                    return;
                }
            }

            delta = event.wheelDelta || -event.detail;

            if (delta < 0) myEvents.trigger(myEvents.SCROLL_DOWN);
            else           myEvents.trigger(myEvents.SCROLL_UP);


            prevWheelTime = curWheelTime;
        }

    }

    function onKeyDown(event) {
        var dTime;
        var delta;
        var curWheelTime;

        var keyNumber = event.keyCode;

        if (keyNumber != KEYS.KEY_SPACE && keyNumber != KEYS.KEY_RIGHT && keyNumber != KEYS.KEY_DOWN && keyNumber != KEYS.KEY_LEFT && keyNumber != KEYS.KEY_UP) return;

        if (isTransform) {
            curWheelTime = +new Date;

            if (prevWheelTime) {
                dTime = curWheelTime - prevWheelTime;

                if (dTime < interval) {
                    return;
                }
            }

            if (keyNumber == KEYS.KEY_SPACE || keyNumber == KEYS.KEY_RIGHT || keyNumber == KEYS.KEY_DOWN) myEvents.trigger(myEvents.SCROLL_DOWN);
            else                                                                                          myEvents.trigger(myEvents.SCROLL_UP);

            prevWheelTime = curWheelTime;
        }
    }


    function addEvent() {
        isTransform = true;

        document.addEventListener("mousewheel", onMouseWheel, false);
        // Firefox
        document.addEventListener("DOMMouseScroll", onMouseWheel, false);
        document.addEventListener(myEvents.KEY_DOWN, onKeyDown);
        if (Flags.isMobile) {
            //document.addEventListener(myEvents.TOUCH_START, onTouchStart);
        }

    }


    // execute event function
    addEvent()

})(window.ma);
