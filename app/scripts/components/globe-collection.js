(function(app){
    var events = app.helpers.events;

    var GlobeCollection = function(ctx){
        this.ctx = ctx;
        this.globes = [];
    };

    GlobeCollection.prototype = {
        velocity  : {x : null, y: null},
        prevMouse : {x : null, y: null},
        mouse     : {x : null, y: null},

        show : function(){
            for(var i = 0; i < 5; i++){
               var rad, origRad;

               if(i == 0) rad = 200;
               else       rad = 220 - 40 * i;

               origRad = 200 - 40 * i;

               var globe = new app.components.Globe(this.ctx, rad, origRad, i)
               globe.show();

                this.globes.push(globe);
            }

        },

        // ==============
        //     update
        // ==============


        update : function(){
            for(var i in this.globes){
               this.globes[i].update();
            }
        },

        update2 : function(){
            this.velocity.x = this.mouse.x - this.prevMouse.x;
            this.velocity.y = this.mouse.y - this.prevMouse.y;
            var velocity = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);

            for(var i in this.globes){
               this.globes[i].update3( this.velocity, this.mouse);
            }

            this.prevMouse.x = this.mouse.x;
            this.prevMouse.y = this.mouse.y;
        },

        updateInState6 : function(){
            for(var i = 0; i < this.globes.length; i++){
              this.globes[i].updateInState6();
            }
        },

        // ===============
        //     upgrade
        // ===============


        upgrade : function(){
            for(var i = 1; i < this.globes.length; i++){
                this.globes[i].upgrade();
            }

            _.delay(function(){
                events.trigger(events.UPDATE_GLOBE);
            }, 600);
        },

        showInState6 : function(){

          for(var i = 0; i < this.globes.length; i++){
              this.globes[i].showInState6();
          }

        },

        onMousemove : function(mouse){
           this.mouse.x = mouse.x;
           this.mouse.y = mouse.y;
        },

        onClick : function(){
            var clickVal = 20;

            // click
            for(var i = 0; i < this.globes.length; i++){
                this.globes[i].onClick(clickVal);
            }
        },

        onProcessAudio : function(audio){
            var audioVal = audio/10;

            // click
            for(var i = 0; i < this.globes.length; i++){
                this.globes[i].onClick(audioVal);
            }
        }


    };

    app.components.GlobeCollection = GlobeCollection;

})(window.ma);
