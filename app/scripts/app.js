(function(app){
    var App = function(ctx){
        this.ctx = ctx;
        this.currentState = 'state1';

        this.bg1 = new ma.components.MuccaBg1(ctx);
        this.circle = new ma.components.Circle(ctx);
    };
    

    App.prototype = {
        update : function(){
            this.states[this.currentState].call(this);
        },

        states : {
            state1 : function(){
                this.bg1.update()
                this.circle.update();
            },

        }
    }

    app.App = App;

})(window.ma);
