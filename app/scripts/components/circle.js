(function(app){
    
    var Circle = function(ctx){
        _.bindAll(this, 'addAnimation');

       this.ctx = ctx;
       this.isActive = false;

       _.delay(this.addAnimation, 600);
    };

    Circle.prototype = {
        rad    : 4,
        col    : 'rgb(165, 165, 165)',

        addAnimation : function(){
            var yPos = parseInt(app.CONSTANTS.STAGE_HEIGHT * 2 / 5 - this.rad + 1);
            this.x = app.CONSTANTS.STAGE_WIDTH/2; 
            this.y = - this.rad;
            this.isActive = true;

            TweenLite.to(this, .4, { y: yPos,  ease : 'Bounce.easeOut' })
        },

        update : function(){
            if(!this.isActive) return;

            this.ctx.beginPath();
            this.ctx.fillStyle = this.col;
            this.ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
            this.ctx.fill();
            this.ctx.closePath();

        }
    }


    app.components.Circle = Circle;

})(window.ma);
