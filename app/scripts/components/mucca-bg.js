(function(app){

    var CONSTANTS = app.CONSTANTS;

    var MuccaBg1 = function(ctx){
        _.bindAll(this, 'addAnimation2', 'onCompleteAnimation');

        this.ctx = ctx;

        this.circlePos = {x : CONSTANTS.HALF_STAGE_WIDTH, y: null};
        this.x = 0;

        this.width  = window.innerWidth;
        this.height = 0;
        this.col    = '#F36D3F';
        this.rate   = 0;

        this.isAnimation1Done = false;
    };

    MuccaBg1.prototype = {
        prevMouse : {x : null, y: null},
        curMouse  : {x : null, y: null},

        rotationBase : {
            'left' : -Math.PI / 6,
            'right':  Math.PI / 6
        },

        show : function(){
           this.addAnimation();
        },

        addAnimation : function(){
            
            var yPos = parseInt(CONSTANTS.STAGE_HEIGHT * 3 / 5);
            TweenLite.to(this, .6, {height: yPos, ease : 'Power2.easeInOut', onComplete: this.onCompleteAnimation });

        },

        onCompleteAnimation : function(){
            this.originY = this.y;
            this.isAnimation1Done = true;
        },

        addAnimation2 : function(){

        },
        
        init   : function(){

        },

        levelUp : function(){
            var yPos = parseInt(CONSTANTS.STAGE_HEIGHT * 4 / 5);
            TweenLite.to(this, .6, {height: yPos, ease : 'Power2.easeInOut', onComplete: this.onCompleteAnimation });
        },

        update : function(){
            this.ctx.fillStyle = this.col;
            this.ctx.beginPath();
            this.ctx.moveTo(0, CONSTANTS.STAGE_HEIGHT);
            this.ctx.lineTo(0, this.leftEdgeY);
            this.ctx.lineTo(CONSTANTS.STAGE_WIDTH, this.rightEdgeY);
            this.ctx.lineTo(CONSTANTS.STAGE_WIDTH, CONSTANTS.STAGE_HEIGHT);
            this.ctx.lineTo(0, CONSTANTS.STAGE_HEIGHT);
            
            this.ctx.fill();

            this.ctx.closePath();
        },
       
        onMouseMove : function( currentState ){
            var rotationTheta, duration;
            
            duration = (CONSTANTS.INTERVAL_STEP1 )/ 1000;
            rotationTheta = this.rotationBase[currentState];
            
            TweenLite.to(this, duration, {rate: rotationTheta, ease : 'Power2.easeInOut'});
            

        },

        onMouseEnterStep1 : function(){
            var duration = CONSTANTS.INTERVAL_STEP1 / 1000;
            TweenLite.to(this, duration, {rate: 0, ease : 'Power2.easeInOut'});
        }
    };

    // -------------
    
    Object.defineProperty(MuccaBg1.prototype, 'height', {
        set : function(value){
            this.y       = (window.innerHeight - value);
            this._height = value;

            this.leftEdgeY  = -CONSTANTS.HALF_STAGE_WIDTH * Math.tan(this.theta) + this.y;
            this.rightEdgeY =  CONSTANTS.HALF_STAGE_WIDTH * Math.tan(this.theta) + this.y;

        },

        get : function(value){
            return this._height;
        }

    });

    Object.defineProperty(MuccaBg1.prototype, 'rate', {

        set : function(val){
           var yPos;
           this._rate = val; 
           this.theta = Math.PI / 10 * val;

           // y - this.y = (x - window_half) * Math.tan(this.theta)
           this.leftEdgeY  = -CONSTANTS.HALF_STAGE_WIDTH * Math.tan(this.theta) + this.y;
           this.rightEdgeY =  CONSTANTS.HALF_STAGE_WIDTH * Math.tan(this.theta) + this.y;
          
           //this.circlePos.y = Math.tan(this.theta) * (this.circlePos.x + this.y;
           
        },

        get : function(){
            return this._rate;
        }

    });

    // -------------

    app.components.MuccaBg1 = MuccaBg1; 
    
})(window.ma);
