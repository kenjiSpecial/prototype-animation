
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


(function(){
    var width, height, canvas, ctx;
    var app;
    var bgCol  = '#fff';
    var UA               = navigator.userAgent,
        isDebug          = lux.url.has('debug'),
        isDev            = lux.url.has('dev'),
        isSkip           = lux.url.has('skip'),
        isAutoPlay       = lux.url.has('autoplay'),
        isLocal          = /(localhost|(\d{1,3}\.){3}\d{1,3}|\.(local|dev))$/i.test(location.hostname),
        isIFrame         = window !== window.top,
        isIOS            = /ip(hone|od|ad)/i.test(UA),
        isSafari         = /(mac os x).*version\/\d(.\d)+ (mobile\/\w{5,} )?safari/i.test(UA),
        isSafari5        = /(mac os x).*version\/5[.\d]+ (mobile\/\w{5} )?safari/i.test(UA),
        isAndroid        = /android/i.test(UA),
        isAndroidBrowser = isAndroid && !/chrome|firefox/i.test(UA),
        isAndroidChrome  = isAndroid && /chrome/i.test(UA),
        isAndroid2       = isAndroidBrowser && /android 2\.\d/i.test(UA),
        isKindleFire     = /KF[A-Z]{2,3}/.test(UA),
        isFirefox        = /firefox/i.test(UA),
        isIE             = /msie \d/i.test(UA),
        isTouch          = 'ontouchstart' in window,
        isMSTouch        = (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0),
        isMSTouchPrefix  = !!navigator.msMaxTouchPoints,
    //isPhone          = (lux.url.has('phone')  || (/mobile/i.test(UA) && !/ipad|tablet/i.test(UA)) || matchMedia('only screen and (max-device-width : 767px)').matches) && !isKindleFire,
        isPhone          = (lux.url.has('phone')  || (/mobile/i.test(UA) && !/ipad|tablet/i.test(UA)) ) && !isKindleFire,
        isTablet         = lux.url.has('tablet') || (isAndroid && !isPhone) || (isIOS && !isPhone) || isKindleFire,
        isMobile         = lux.url.has('mobile') || isPhone || isTablet,
        isWebAudio       = 'webkitAudioContext' in window || 'AudioContext' in window,
        isTagAudio       = !isWebAudio,
        isSimpleAudio    = lux.url.has('simple') || !isWebAudio && (isPhone || isTablet),
        isLoFi           = lux.url.has('lofi')   || isPhone || isAndroid || isFirefox || isSafari5,
        isHiFi           = !isLoFi;



    var ma = window.ma = {
        Flags : {
            /**
             *  Place useful runtime booleans here. Good for debugging and switching
             *  things on and off.
             */
            isDebug          : isDebug,
            isDev            : isDev,
            isAutoPlay       : isAutoPlay,
            isLocal          : isLocal,
            isIFrame         : isIFrame,
            isIOS            : isIOS,
            isSafari         : isSafari,
            isSafari5        : isSafari5,
            isAndroid        : isAndroid,
            isAndroidBrowser : isAndroidBrowser,
            isAndroidChrome  : isAndroidChrome,
            isAndroid2       : isAndroid2,
            isKindleFire     : isKindleFire,
            isFirefox        : isFirefox,
            isIE             : isIE,
            isMSTouch        : isMSTouch,
            isPhone          : isPhone,
            isTablet         : isTablet,
            isMobile         : isMobile,
            isWebAudio       : isWebAudio,
            isTagAudio       : isTagAudio,
            isSimpleAudio    : isSimpleAudio,
            isLoFi           : isLoFi,
            isHiFi           : isHiFi
        },

        // constants
        //
        // ============

        CONSTANTS : {
            // app step1
            INTERVAL_STEP1 : 400,

            // ================

            STAGE_WIDTH  : window.innerWidth,
            HALF_STAGE_WIDTH : window.innerWidth / 2,
            STAGE_HEIGHT : window.innerHeight,
            HALF_STAGE_HEIGHT : window.innerHeight / 2
        },

        // ============
        //  components
        // ===========

        components : {
            Point    : null,
            MuccaBg1 : null,

            // =============
            //     step1
            // =============
            step1 : {
                Arrow : null,
            },

            texts : {

            }
        },

        helpers : {}
    };

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
        app.start();
    }

    function loop(){
       ctx.fillStyle = bgCol;
       ctx.fillRect(0, 0, width, height);

       app.update();

       requestAnimationFrame(loop);
    }

})();
