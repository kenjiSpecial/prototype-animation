(function(app){
    var CONSTANTS = app.CONSTANTS;

    var cameraPosition = {
        focus : 100,
        self : {
            x : 0,
            y : 0,
            z : 0
        },
        rotate : {
            x : 0,
            y : 0,
            z : 0
        },
        up : {
            x : 0,
            y : 1,
            z : 0
        },
        zoom : 1,
        display : {
            x : CONSTANTS.HALF_STAGE_WIDTH,
            y : CONSTANTS.HALF_STAGE_HEIGHT,
            z : 0
        }
    };

    var Camera = function(){

    };

    Camera.prototype = {

    };

    app.components.Camera = Camera;
})(window.ma);
