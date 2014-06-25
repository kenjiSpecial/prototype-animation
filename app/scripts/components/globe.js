(function(app){
    var events = app.helpers.events;
    var CONSTANTS = app.CONSTANTS;

    var coord = function (x,y) {
        if(!x) var x=0;
        if(!y) var y=0;
        return {x: x, y: y};
    };

    function B1(t) { return t*t*t }
    function B2(t) { return 3*t*t*(1-t) }
    function B3(t) { return 3*t*(1-t)*(1-t) }
    function B4(t) { return (1-t)*(1-t)*(1-t) }

    function getBezier(percent,C1,C2,C3,C4) {
        var pos = new coord();
        pos.x = C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent);
        pos.y = C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent);
        return pos;
    };


    var Globe = function(ctx, rad, origRad, type){
        _.bindAll(this, 'onCompleteType2Animation');

        this.type = type;
        this.x = CONSTANTS.HALF_STAGE_WIDTH;
        this.y = CONSTANTS.HALF_STAGE_HEIGHT;
        this.theta = -Math.PI/2;
        this.theta1  = 0;
        this.theta2 = -Math.PI/2;

        this.origRad = origRad;
        this.rad = rad;

        this.ctx = ctx;

        // ======================


        this.rads = [];
        for(var i = 0; i < 12; i++){
           this.rads.push({
               rad    : this.rad,
               velRad : 10 * Math.random() - 5
           });
        }
    };

    Globe.prototype = {
        distance : 0,

        vibrationCount : 0,
        vibrationArr   : [],
        col    : 'rgb(165, 165, 165)',

        show : function(){

            if(this.type == 0){
                this.theta = -Math.PI/2;
                this.tweenType1();
            }else{
                this.theta = 0;
                this.num = 0;
                this.pt1 = coord(this.rad * Math.cos(-Math.PI/2), this.rad * Math.sin(-Math.PI/2));
                this.pt2 = coord(this.rad * 1.3, this.rad * Math.sin(-Math.PI/2));
                this.pt3 = coord(this.rad * 1.3, this.rad * Math.sin(Math.PI/2));
                this.pt4 = coord(this.rad * Math.cos(Math.PI/2), this.rad * Math.sin(Math.PI/2));
                this.tweenType2();
            }

        },

        showInState6 : function(){
          TweenLite.to(this, .6, { distance : 90, ease: 'Power2.easeInOut'});
        },

        tweenType1 : function(){
            TweenLite.to(this, .6, { theta : Math.PI * 3/2, ease : 'Power2.easeInOut'/**, onComplete: this.onCompleteAnimation */ })
        },

        tweenType2 : function(){
            this.isFirst = true;
            TweenLite.to(this,.4, { num  : 180, ease : 'Power2.easeInOut', onComplete: this.onCompleteType2Animation, delay:.1*this.type })
        },

        onCompleteType2Animation : function(){
            this.isFirst = false;
            var delay = (0.5 - this.type *.1);

            TweenLite.to(this, .6, { theta  : Math.PI * 3/5, ease : 'Power2.easeInOut', delay: delay/**, onComplete: this.onCompleteAnimation */ })
        },

        upgrade : function(){
            var rad = this.rad - 20;
            //this.origRad -= 20;

            TweenLite.to(this, .6, { theta  : Math.PI , /**rad : rad,*/ ease : 'Power2.easeInOut'/**, onComplete: this.onCompleteAnimation */ })


        },

        update : function(){
            if(this.type == 0)  this.update1();
            else                this.update2();
        },

        update1 : function(){
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.strokeStyle = this.col;
            this.ctx.translate(this.x, this.y);
            this.ctx.arc( 0, 0, this.rad, -Math.PI/2, this.theta);
            this.ctx.stroke();

            this.ctx.closePath();

            this.ctx.restore();
        },

        update2 : function(){
            if(this.isFirst){
                this.update2First();
            }else{
                this.update2Next();
            }
        },

        update3 : function(velocity, mouse){

            var i;

            for( i = 0; i < this.rads.length; i++){
                this.rads[i].rad += this.rads[i].velRad;

                this.rads[i].velRad += (this.origRad - this.rads[i].rad) * .03;
                this.rads[i].velRad *= 0.9;

                if( velocity.x !== 0 || velocity.y !== 0 ){
                    var theta = i / this.rads.length * 2 * Math.PI;
                    var size = Math.cos(theta) * velocity.x + Math.sin(theta) * velocity.y;
                    var dx = Math.cos(theta) * this.rads[i].rad - mouse.x;
                    var dy = Math.sin(theta) * this.rads[i].rad - mouse.y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    this.rads[i].velRad += size * (Math.random() *.6 +.4) / distance * 40;
                }


            }

            // draw

            this.ctx.save();
            this.ctx.strokeStyle = this.col;
            this.ctx.translate(this.x, this.y);

            this.ctx.beginPath();


            var xPos = (this.rads[0].rad * Math.cos(0) + this.rads[this.rads.length - 1].rad * Math.cos((this.rads.length - 1)/ this.rads.length * Math.PI * 2))/2;
            var yPos = (this.rads[0].rad * Math.sin(0) + this.rads[this.rads.length - 1].rad * Math.sin((this.rads.length - 1)/ this.rads.length * Math.PI * 2))/2;

            this.ctx.moveTo( xPos, yPos );

            for( i = 0; i < this.rads.length; i++){
                var number1 = i % this.rads.length;
                var theta1  = number1 / this.rads.length * 2 * Math.PI;
                var x1 = this.rads[number1].rad * Math.cos(theta1);
                var y1 = this.rads[number1].rad * Math.sin(theta1);

                var number2 = (number1 + 1) % this.rads.length;

                var theta2  = number2 / this.rads.length * 2 * Math.PI;
                var x2 = this.rads[number2].rad * Math.cos(theta2);
                var y2 = this.rads[number2].rad * Math.sin(theta2);

                var xC = (x1 + x2) / 2;
                var yC = (y1 + y2) / 2;

                this.ctx.quadraticCurveTo( x1, y1, xC, yC);

            }

            this.ctx.stroke();

            this.ctx.closePath();

            this.ctx.restore();

        },

        updateInState6 : function(){
            var i;

            for( i = 0; i < this.rads.length; i++){
                this.rads[i].rad += this.rads[i].velRad;

                this.rads[i].velRad += (this.origRad - this.rads[i].rad) * .1;
                this.rads[i].velRad *= 0.9;
            }

          for(var j = 0; j < 2; j++){

            this.ctx.save();
            this.ctx.strokeStyle = this.col;

            if(j == 0) this.ctx.translate(this.x + this.distance, this.y);
            else       this.ctx.translate(this.x - this.distance, this.y);

            this.ctx.beginPath();


            var xPos = (this.rads[0].rad * Math.cos(0) + this.rads[this.rads.length - 1].rad * Math.cos((this.rads.length - 1)/ this.rads.length * Math.PI * 2))/2;
            var yPos = (this.rads[0].rad * Math.sin(0) + this.rads[this.rads.length - 1].rad * Math.sin((this.rads.length - 1)/ this.rads.length * Math.PI * 2))/2;

            this.ctx.moveTo( xPos, yPos );

            for( i = 0; i < this.rads.length; i++){
                var number1 = i % this.rads.length;
                var theta1  = number1 / this.rads.length * 2 * Math.PI;
                var x1 = this.rads[number1].rad * Math.cos(theta1);
                var y1 = this.rads[number1].rad * Math.sin(theta1);

                var number2 = (number1 + 1) % this.rads.length;

                var theta2  = number2 / this.rads.length * 2 * Math.PI;
                var x2 = this.rads[number2].rad * Math.cos(theta2);
                var y2 = this.rads[number2].rad * Math.sin(theta2);

                var xC = (x1 + x2) / 2;
                var yC = (y1 + y2) / 2;

                this.ctx.quadraticCurveTo( x1, y1, xC, yC);

            }

            this.ctx.stroke();

            this.ctx.closePath();

            this.ctx.restore();

          }


        },

        update2First : function(){
            this.ctx.save();
            this.ctx.beginPath();

            this.ctx.strokeStyle = this.col;
            this.ctx.translate(this.x, this.y);
            this.ctx.moveTo(this.rad * Math.cos(-Math.PI/2), this.rad * Math.sin(-Math.PI/2));
            for(var i = 0; i < this.num; i++){
                var rate = (180 - i) / 180;
                var pt = getBezier(rate, this.pt1, this.pt2, this.pt3, this.pt4);

                this.ctx.lineTo(pt.x, pt.y);
            }

            this.ctx.stroke();

            this.ctx.closePath();
            this.ctx.restore();

        },

        update2Next : function(){
            this.ctx.save();

            this.ctx.beginPath();
            this.ctx.strokeStyle = this.col;
            this.ctx.translate(this.x, this.y);
            //this.ctx.scale(Math.cos(Math.PI *.6), 1);
            //this.ctx.arc( 0, 0, this.rad, -Math.PI/2, Math.PI/2);

            this.ctx.moveTo(this.rad * Math.cos(-Math.PI/2), this.rad * Math.sin(-Math.PI/2));
            /**this.ctx.bezierCurveTo( this.rad * 1.3 * Math.cos(this.theta1),
                                    this.rad * Math.sin(-Math.PI/2),
                                    this.rad * 1.3 * Math.cos(this.theta1),
                                    this.rad * Math.sin(Math.PI/2),
                                    this.rad * Math.cos(Math.PI/2), this.rad * Math.sin(Math.PI/2)); */

            //this.ctx.lineTo( this.rad * Math.cos(Math.PI/2), this.rad * Math.sin(Math.PI/2));

            this.ctx.bezierCurveTo( this.rad * 1.3,
                                    this.rad * Math.sin(-Math.PI/2),
                                    this.rad * 1.3,
                                    this.rad * Math.sin(Math.PI/2),
                                    this.rad * Math.cos(Math.PI/2), this.rad * Math.sin(Math.PI/2));
            this.ctx.bezierCurveTo( this.rad * 1.3 * Math.cos(this.theta),
                                    this.rad * Math.sin(Math.PI/2),
                                    this.rad * 1.3 * Math.cos(this.theta),
                                    this.rad * Math.sin(-1*Math.PI/2),
                                    this.rad * Math.cos(-Math.PI/2), this.rad * Math.sin(-Math.PI/2));
            // this.ctx.quadraticCurveTo(this.rad * 2 * Math.cos(this.theta), 0, this.rad * Math.cos(-Math.PI/2), this.rad * Math.sin(-Math.PI/2));
            this.ctx.stroke();
            this.ctx.closePath();

            this.ctx.restore();
        },

        onClick : function(val){
            var audioValue = val;
            console.log(audioValue)

            //this.rads[i].velRad += 200 * (2 - Math.random());
            this.rads.forEach(function(element, index, array){
                element.velRad +=  audioValue * ( Math.random() -.5);
            });
        }

    };

    app.components.Globe = Globe;

})(window.ma);
