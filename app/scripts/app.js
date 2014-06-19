(function (app) {
    var events = app.helpers.events;
    var CONSTANTS = app.CONSTANTS;

    var App = function (ctx) {
        _.bindAll(this,
            'onMouseMove', 'onMouseEnterStep1', 'onMouseLeaveStep1',
            'delayShowStep1',
            'onScrollUp', 'onScrollDown'
        );

        this.ctx = ctx;
        this.count = 1;
        this.currentState = 'state1';

        this.bg1 = new ma.components.MuccaBg1(ctx);
        this.circle = new ma.components.Circle(ctx, this.bg1);
        this.step1Arrow = new ma.components.step1.Arrow();

        this.prevTime = +new Date;
        this.isMouseEnter = false;


        this.$step1 = $('#step1');
        this.$step1.on(events.MOUSE_ENTER, this.onMouseEnterStep1);
        this.$step1.on(events.MOUSE_LEAVE, this.onMouseLeaveStep1);
        //this.$step1.velocity({ top: 500 }, 1000, "swing");


        events.addListener(events.SCROLL_UP, this.onScrollUp);
        events.addListener(events.SCROLL_DOWN, this.onScrollDown);
    };


    App.prototype = {
        start: function () {
            //this.mouseMoves[this.currentState].call(this, position);
            this.show[this.currentState].call(this);
        },

        update: function () {
            this.states[this.currentState].call(this);
        },

        hide : {
            state1 : function(){
                events.removeListener(events.MOUSE_MOVE, this.onMouseMove);
                if( this.currentMouseState ) {
                    this.circle.onMouseEnterStep1();
                    this.bg1.onMouseEnterStep1();

                    this.waitStep1 = 1200;
                }else{
                    this.waitStep1 = 0
                }

                this.step1Arrow.hide();
            },

            state2 : function(){

            }
        },

        show: {
            state1: function () {
                this.bg1.show();
                this.circle.show();
                this.step1Arrow.show();

                events.addListener(events.MOUSE_MOVE, this.onMouseMove);
            },

            state2 : function(){
               console.log(this.waitStep1)
               if(this.waitStep1 !== 0){
                  // this.delayShowStep1();
                   _.delay(this.delayShowStep1, this.waitStep1);
               }else{
                  this.delayShowStep1();
               }

            }
        },

        delayShowStep1 : function(){
            console.log('delay')
            this.circle.fallDown();
            this.bg1.levelUp();
        },

        states: {
            state1: function () {
                this.bg1.update();
                this.circle.update();
            },

            state2 : function(){
                this.bg1.update();
                this.circle.update();
            }
        },

        mouseMoves: {

            state1: function (mouse) {
                if (this.isMouseEnterStep1) return;

                var mouseX = mouse.x;

                if (this.circle.isFall) return;

                if (mouseX < CONSTANTS.HALF_STAGE_WIDTH) {
                    this.prevMouseState = this.currentMouseState;
                    this.currentMouseState = 'left';
                } else {
                    this.prevMouseState = this.currentMouseState;
                    this.currentMouseState = 'right';
                }

                if (this.currentMouseState === this.prevMouseState) return;

                this.bg1.onMouseMove(this.currentMouseState);
                this.circle.onMouseMove(this.currentMouseState, this.bg1);

            }

        },

        onMouseMove: function (position) {
            this.mouseMoves[this.currentState].call(this, position);
        },

        // ===============
        //   mouse event
        // ===============

        onMouseEnterStep1: function (event) {
            this.prevMouseState = null;
            this.currentMouseState = null;
            this.isMouseEnterStep1 = true;

            this.circle.onMouseEnterStep1();
            this.bg1.onMouseEnterStep1();
        },

        onMouseLeaveStep1: function (event) {
            this.isMouseEnterStep1 = false;
        },

        // ================
        //   scroll event
        // ================

        onScrollUp: function (event) {
            this.count--;
        },

        onScrollDown: function (event) {
            if(this.count >= 2) return;
            this.hide[this.currentState].call(this);

            this.count++;
            this.currentState = 'state' + this.count;

            this.show[this.currentState].call(this);
        }
    };

    app.App = App;

})(window.ma);
