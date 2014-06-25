(function (app) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var events = app.helpers.events;
    var CONSTANTS = app.CONSTANTS;

    var App = function (ctx) {
        _.bindAll(this,
            'onMouseMove', 'onMouseEnterStep1', 'onMouseLeaveStep1',
            'delayShowStep1',
            'gotStream', 'streamError', 'onAudioProcess',
            'onClick',
            'onCompleteSwipeBackground', 'onCompleteUpdateGlobe',
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


        this.$step1 = this.$steps[0];
        this.$step1.on(events.MOUSE_ENTER, this.onMouseEnterStep1);
        this.$step1.on(events.MOUSE_LEAVE, this.onMouseLeaveStep1);

        this.$arrowContainer = $('#arrow-container');
        this.$arrowContainer.on(events.MOUSE_ENTER, this.onMouseEnterStep1);
        this.$arrowContainer.on(events.MOUSE_LEAVE, this.onMouseLeaveStep1);


        events.addListener(events.COMPLETE_SWIPE_BG, this.onCompleteSwipeBackground);
        events.addListener(events.UPDATE_GLOBE, this.onCompleteUpdateGlobe);

        this.$stepCenter = this.$steps[0].find('.main');
        this.$step1Left  = this.$steps[0].find('.sub-1');
        this.$step1Right = this.$steps[0].find('.sub-2');

        // relating to microphone
        this.audioContext = new AudioContext();
        this.buflen = 2048;
        this.buf = new Uint8Array( this.buflen );

    };


    App.prototype = {
        isMicrophoneActive : false,

        $steps : [
            $('#step1'),
            $('#step2'),
            $('#step3'),
            $('#step4'),
            $('#step5'),
            $('#step6')
        ],

        start: function () {
            //this.mouseMoves[this.currentState].call(this, position);
            this.show[this.currentState].call(this);

            events.addListener(events.SCROLL_UP, this.onScrollUp);
            events.addListener(events.SCROLL_DOWN, this.onScrollDown);
        },

        update: function () {
            this.updates[this.currentState].call(this);
        },

        hide: {
            state1: function () {

                var self = this;
                this.$steps[0].velocity({
                    opacity: 0
                }, {
                    complete : function(){
                        self.$steps[0].removeClass('show');
                }});


                events.removeListener(events.MOUSE_MOVE, this.onMouseMove);
                events.removeListener(events.SCROLL_UP, this.onScrollUp);
                events.removeListener(events.SCROLL_DOWN, this.onScrollDown);

                if (this.currentMouseState) {
                    this.circle.onMouseEnterStep1();
                    this.bg1.onMouseEnterStep1();

                    this.waitStep1 = 1200;
                } else {
                    this.waitStep1 = 0
                }

                this.step1Arrow.hide();
            },

            state2: function () {

            },

            state3 : function(){
                this.step1Arrow.hide();

                var self = this;
                this.$steps[1].velocity({
                    opacity: 0
                }, {
                    complete : function(){
                        self.$steps[1].removeClass('show');
                }});

                events.removeListener(events.SCROLL_UP, this.onScrollUp);
                events.removeListener(events.SCROLL_DOWN, this.onScrollDown);
            },

            state4 : function(){

            },

            state5 : function(){
                if(this.stream && typeof this.stream.stop === 'function') this.stream.stop();

                var self = this;
                this.$steps[3].velocity({
                    opacity: 0
                }, {
                    complete : function(){
                        self.$steps[3].removeClass('show');
                }});

                events.removeListener(events.MOUSE_MOVE, this.onMouseMove);
                events.removeListener(events.CLICK, this.onClick);

                events.removeListener(events.SCROLL_UP, this.onScrollUp);
                events.removeListener(events.SCROLL_DOWN, this.onScrollDown);
            }
        },

        show: {
            state1: function () {
                this.$steps[0].addClass('show');

                this.$step1Left.css({opacity: 0});
                this.$step1Right.css({opacity: 0});


                this.bg1.show();
                this.circle.show();
                this.step1Arrow.start();

                events.addListener(events.MOUSE_MOVE, this.onMouseMove);
            },

            state2: function () {
                console.log(this.waitStep1)
                if (this.waitStep1 !== 0) {
                    _.delay(this.delayShowStep1, this.waitStep1);
                } else {
                    this.delayShowStep1();
                }

                // showing text
                this.$steps[1].css({opacity: 0});
                this.$steps[1].addClass('show');
                this.$steps[1].velocity({ opacity: 1 }, {delay: (400 + this.waitStep1), duration: 400});

            },

            state3: function () {
                this.globalCollection = new app.components.GlobeCollection(this.ctx);
                this.globalCollection.show();

                (function(self){
                  setTimeout(function(){
                    self.step1Arrow.show();

                    events.addListener(events.SCROLL_UP, self.onScrollUp);
                    events.addListener(events.SCROLL_DOWN, self.onScrollDown);

                  }, 1600);
                })(this);


            },

            state4 : function(){
               this.$steps[3].css({opacity: 0});
               this.$steps[3].addClass('show');
               this.$steps[3].velocity({ opacity: 1 }, {delay: 400, duration: 600});

               this.globalCollection.upgrade();
            },

            state5 : function(){
                console.log('state5');

                this.step1Arrow.show();

                // =======================

                events.addListener(events.MOUSE_MOVE, this.onMouseMove);
                events.addListener(events.CLICK, this.onClick);

                events.addListener(events.SCROLL_UP, this.onScrollUp);
                events.addListener(events.SCROLL_DOWN, this.onScrollDown);

                this.enableMicrophone();
            },

            state6 : function(){
              this.$steps[5].css({opacity: 0});
              this.$steps[5].addClass('show');
              this.$steps[5].velocity({ opacity: 1 }, {delay: 200, duration: 600});

              this.globalCollection.showInState6();
            }
        },

        delayShowStep1: function () {
            this.circle.fallDown();
            this.bg1.levelUp();
        },

        updates: {
            state1 : function () {
                this.bg1.update();
                this.circle.update();
            },

            state2 : function () {
                this.bg1.update();
                this.circle.update();
            },

            state3 : function () {

                this.globalCollection.update();

            },

            state4 : function () {

                this.globalCollection.update();

            },

            state5 : function(){

                this.globalCollection.update2();

                if(this.isMicrophoneActive) this.updatePitch();
            },

            state6 : function(){

                this.globalCollection.updateInState6();

            }
        },

        mouseMoves: {

            state1: function (mouse) {
                if (this.isMouseEnterStep1) return;

                var mouseX = mouse.x;

                if (this.circle.isFall) return;

                if(this.currentMouseState == null){
                    this.$stepCenter.velocity({opacity: 0});
                }

                if (mouseX < CONSTANTS.HALF_STAGE_WIDTH) {
                    this.prevMouseState = this.currentMouseState;
                    this.currentMouseState = 'left';
                } else {
                    this.prevMouseState = this.currentMouseState;
                    this.currentMouseState = 'right';
                }

                if (this.currentMouseState === this.prevMouseState) return;

                if(this.currentMouseState == 'left'){
                    this.$step1Left.velocity({opacity: 0});
                    this.$step1Right.velocity({opacity: 1});
                }else{
                    this.$step1Left.velocity({opacity: 1});
                    this.$step1Right.velocity({opacity: 0});
                }

                this.bg1.onMouseMove(this.currentMouseState);
                this.circle.onMouseMove(this.currentMouseState, this.bg1);

            },

            state5 : function(mouse){
                this.globalCollection.onMousemove(mouse);
            }

        },

        onMouseMove: function (position) {
            this.mouseMoves[this.currentState].call(this, position);
        },

        clicks : {
            state5 : function(){
                this.globalCollection.onClick();

            }
        },

        onClick : function(){
            this.clicks[this.currentState].call(this);
        },

        // ===============
        //   mouse event
        // ===============

        onMouseEnterStep1: function (event) {
            this.$stepCenter.velocity({opacity: 1});
            this.$step1Left.velocity({opacity: 0});
            this.$step1Right.velocity({opacity: 0});

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
            this.hide[this.currentState].call(this);

            this.count++;
            this.currentState = 'state' + this.count;

            this.show[this.currentState].call(this);
        },

        // ======================
        //   on complete event
        // ======================

        onCompleteSwipeBackground: function () {
            this.onScrollDown();
        },

        onCompleteUpdateGlobe : function(){
           this.onScrollDown();
        },

        // ======================
        //

        enableMicrophone : function(){
            //console.log('enable microphone');
            //this.getUserMedia({audio : true}, this.gotStream);
            try {

                navigator.getUserMedia({audio : true}, this.gotStream, this.streamError);
            } catch (e) {
                alert('getUserMedia threw exception :' + e);
            }


        },

        gotStream : function(stream){
            var self = this;

            this.stream = stream;

            var mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.2;
            this.analyser.fftSize = 1024;
            mediaStreamSource.connect(this.analyser);

            var node = this.audioContext.createJavaScriptNode(2048, 1, 1);
            var values = 0;
            var average;

            node.onaudioprocess = this.onAudioProcess;
                /**
                function () {
                // bitcount is fftsize / 2
                var array = new Uint8Array(this.analyser.frequencyBinCount);
                this.analyser.getByteFrequencyData(array);

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += array[i];
                }

                average = values / length;
//                console.log('average' + average);
                //oppdaterGui(average);
                average = values = 0;
            }; **/

            mediaStreamSource.connect(this.analyser);
            this.analyser.connect(node);
            node.connect(this.audioContext.destination);

        },

        onAudioProcess : function(){
            var average = 0;
            var values  = 0;

            var array = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(array);

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += array[i];
            }

            average = values / length;

            this.globalCollection.onProcessAudio(average);
        },


        streamError : function(){
            alert('Stream generation failed.')
        },

        updatePitch : function(){
            //console.log('updatePitch');
            //this.analyser.getByteTimeDomainData(this.buf);
            //console.log(this.analyser.createGain());
            //console.log(this.audioContext.createGain())

            //this.gain = this.audioContext.createGain();

            //window.buf = this.buf;
            //window.analyser = this.analyser;

        }
    };

    app.App = App;

})(window.ma);
