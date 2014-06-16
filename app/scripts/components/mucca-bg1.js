(function(app){


    var MuccaBg1 = function(ctx){
        _.bindAll(this, 'addAnimation2');

        this.ctx = ctx;
        this.x = 0;
        this.width  = window.innerWidth;
        this.height = 0;
        this.col    = '#F36D3F';

        this.addAnimation();
    };

    MuccaBg1.prototype = {
        addAnimation : function(){
            
            var yPos = parseInt(app.CONSTANTS.STAGE_HEIGHT * 3 / 5);
            TweenLite.to(this, .6, {height: yPos, ease : 'Power2.easeInOut' });

        },

        addAnimation2 : function(){

        },
        
        init   : function(){

        },

        update : function(){
            this.ctx.fillStyle = this.col;
            this.ctx.fillRect(0, this.y, this.width, this.height );

        }
    };

    // -------------
    
    Object.defineProperty(MuccaBg1.prototype, 'height', {
        set : function(value){
            this.y       = (window.innerHeight - value);
            this._height = value;
        },

        get : function(value){
            return this._height;
        }

    });


    app.components.MuccaBg1 = MuccaBg1; 
})(window.ma);
