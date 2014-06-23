(function(app){
    var events = app.helpers.events;
    var CONSTANTS = app.CONSTANTS;

    var Circle = function(ctx, bg){
        _.bindAll(this, 'addAnimation', 'onCompleteAnimation', 'swipeBackground', 'onCompleteSwipeBackground');

       this.ctx = ctx;
       this.isActive = false;
       this.isFall   = true;

       this.bg = bg;
       this.duration = parseInt(CONSTANTS.STAGE_WIDTH * 2 / 3 / 800 * 10) / 10;

    };


    Circle.prototype = {
        rad    : 4,
        MIN_RAD : 4,
        MAX_RAD : 12,
        col    : 'rgb(165, 165, 165)',
        _colNumber : 165,

        show : function(){
            _.delay(this.addAnimation, 600);
        },

        moveBase : {
            'left'  : CONSTANTS.STAGE_WIDTH    /6,
            'right' : CONSTANTS.STAGE_WIDTH * 5/6
        },

        addAnimation : function(){
            console.log('addAnimation');
            var yPos = parseInt(app.CONSTANTS.STAGE_HEIGHT * 2/5 );
            this.x = app.CONSTANTS.HALF_STAGE_WIDTH;
            this.y = - this.rad;
            this.isActive = true;

            TweenLite.to(this, .4, { y: yPos, ease : 'Bounce.easeOut', onComplete: this.onCompleteAnimation })
        },

        onCompleteAnimation : function(){

            this.isFall = false;

        },

        fallDown : function(){
            var yPos = parseInt(app.CONSTANTS.STAGE_HEIGHT *.5 ) + this.rad + 1;
            this.isFall = true;
            TweenLite.to(this, .4, { y: yPos, colNumber: 255, onComplete: this.swipeBackground })
        },

        swipeBackground : function(){
            var rad  = Math.sqrt(CONSTANTS.HALF_STAGE_WIDTH * CONSTANTS.HALF_STAGE_WIDTH + CONSTANTS.HALF_STAGE_HEIGHT * CONSTANTS.HALF_STAGE_HEIGHT);
            var yPos = this.y + rad;

            TweenLite.to(this, 1, { rad: rad, y: yPos, onComplete: this.onCompleteSwipeBackground })
        },

        onCompleteSwipeBackground : function() {
            events.emit(events.COMPLETE_SWIPE_BG);
        },

        update : function(){
            var posY, rad;
            if(!this.isActive) return;


            this.ctx.beginPath();
            this.ctx.fillStyle = this.col;

            if(this.isFall) posY = this.y;
            else            posY = Math.tan(this.bg.theta) * (this.x - CONSTANTS.HALF_STAGE_WIDTH) + this.bg.y;

            //console.log(posY);

            this.ctx.arc(this.x, posY - this.rad + 1, this.rad, 0, 2 * Math.PI, false);
            this.ctx.fill();
            this.ctx.closePath();

        },

        update2 : function(){
            this.ctx.beginPath();
            this.ctx.fillStyle = this.col;
            this.ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
            this.ctx.fill();
            this.ctx.closePath();
        },

        onMouseMove : function( currentMouseState, bg ){
            var rotationTheta, duration, delay;

            delay    = (CONSTANTS.INTERVAL_STEP1 /  2000);

            if(this.rad == this.MAX_RAD){
                TweenLite.to(this, this.duration, {x: this.moveBase[currentMouseState], ease : 'Linear', delay: delay});
            }else{
                TweenLite.to(this, this.duration, {x: this.moveBase[currentMouseState], rad : this.MAX_RAD, ease : 'Linear', delay: delay});
            }

        },

        onMouseEnterStep1 : function(){
            if(!this.isActive || this.isFall) return;

            var delay;
            delay    = (CONSTANTS.INTERVAL_STEP1 /  2000);

            TweenLite.to(this, this.duration, {x: CONSTANTS.HALF_STAGE_WIDTH, rad: this.MIN_RAD ,ease : 'Linear', delay: delay});
        }

    };


    Object.defineProperty(Circle.prototype, 'colNumber', {

        set : function(val){
            this._colNumber = val;
            var number = parseInt(this._colNumber);

            this.col = 'rgb(' + number + ', ' + number + ', ' + number + ')';
        },

        get : function(){
            return this._colNumber;
        }

    });

    app.components.Circle = Circle;

})(window.ma);
