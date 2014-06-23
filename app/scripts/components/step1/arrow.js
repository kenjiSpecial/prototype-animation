(function (app) {
    var CONSTANTS = app.CONSTANTS;
    var color = '#fff';
    var orangeColor = '#F36D3F';

    var Arrow = function () {
        _.bindAll(this, 'fallDown');

        this.$container = $('#arrow-container');
        var top = parseInt(CONSTANTS.STAGE_HEIGHT * 2 / 5) + 'px';
        this.$container.css({
            top: top
        });
        this.id = '#arrow-svg';
        this.$id = $(this.id);
        this.svg = new Snap(this.id);
        window.svg = this.svg;

        this.line = this.svg.polyline([0, 0, 30, 0, 60, 0]);

        this.svg.attr({
            fill: null,
            stroke: color,
            strokeWidth: 1
        })
    };

    Arrow.prototype = {
        start: function () {
            _.delay(this.fallDown, 700);
        },

        show : function(){
            this.$container.css({ display : 'block' });

            this.line.attr({
              stroke : orangeColor
            });

            this.line.animate({
                points: [0, 0, 30, 20, 60, 0]
            }, 400, mina.easeinout);
        },


        hide: function () {
            this.line.animate({
                points: [30, 20, 30, 20, 30, 20]
            }, 400, mina.easeinout);

            var self = this;
            _.delay(function(){
               self.$container.css({
                   display : 'none'
               });
            }, 400);
        },

        fallDown: function () {
            var top = parseInt(CONSTANTS.STAGE_HEIGHT - 50);
            this.$container.velocity({ top: top }, 600, "easeInOutCubic");

            var self = this;
            _.delay(function () {
                self.line.animate({
                    points: [0, 0, 30, 20, 60, 0]
                }, 400, mina.easeinout);
            }, 500)

        },

        update: function () {

        }
    };

    app.components.step1.Arrow = Arrow;

})(window.ma);
