
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


(function(){
    var width, height, canvas, ctx;
    var app;
    var bgCol  = '#fff';

    window.ma = {
        CONSTANTS : {
            STAGE_WIDTH  : window.innerWidth,
            STAGE_HEIGHT : window.innerHeight
        },
        components : {
            Point    : null,
            MuccaBg1 : null,
        }
    }

    window.onload = function(){
        // init
        init();

        // loop
        loop();
    };
    

    function init(){
        width = window.innerWidth;
        height = window.innerHeight;

        canvas = document.getElementById('c');
        ctx    = canvas.getContext('2d');

        canvas.width  = width;
        canvas.height = height; 

        app = new ma.App(ctx);
    }

    function loop(){
       ctx.fillStyle = bgCol; 
       ctx.fillRect(0, 0, width, height);
        
       app.update();

        requestAnimationFrame(loop);
    }

})();
