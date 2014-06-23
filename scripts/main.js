window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,function(){function t(){e=window.innerWidth,s=window.innerHeight,o=document.getElementById("c"),n=o.getContext("2d"),o.width=e,o.height=s,h=new H.App(n),h.start()}function i(){n.fillStyle=a,n.fillRect(0,0,e,s),h.update(),requestAnimationFrame(i)}var e,s,o,n,h,a="#fff",r=navigator.userAgent,l=lux.url.has("debug"),c=lux.url.has("dev"),u=(lux.url.has("skip"),lux.url.has("autoplay")),d=/(localhost|(\d{1,3}\.){3}\d{1,3}|\.(local|dev))$/i.test(location.hostname),p=window!==window.top,M=/ip(hone|od|ad)/i.test(r),S=/(mac os x).*version\/\d(.\d)+ (mobile\/\w{5,} )?safari/i.test(r),f=/(mac os x).*version\/5[.\d]+ (mobile\/\w{5} )?safari/i.test(r),w=/android/i.test(r),v=w&&!/chrome|firefox/i.test(r),m=w&&/chrome/i.test(r),g=v&&/android 2\.\d/i.test(r),E=/KF[A-Z]{2,3}/.test(r),T=/firefox/i.test(r),y=/msie \d/i.test(r),x=navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,A=(!!navigator.msMaxTouchPoints,(lux.url.has("phone")||/mobile/i.test(r)&&!/ipad|tablet/i.test(r))&&!E),_=lux.url.has("tablet")||w&&!A||M&&!A||E,L=lux.url.has("mobile")||A||_,I="webkitAudioContext"in window||"AudioContext"in window,C=!I,P=lux.url.has("simple")||!I&&(A||_),b=lux.url.has("lofi")||A||w||T||f,O=!b,H=window.ma={Flags:{isDebug:l,isDev:c,isAutoPlay:u,isLocal:d,isIFrame:p,isIOS:M,isSafari:S,isSafari5:f,isAndroid:w,isAndroidBrowser:v,isAndroidChrome:m,isAndroid2:g,isKindleFire:E,isFirefox:T,isIE:y,isMSTouch:x,isPhone:A,isTablet:_,isMobile:L,isWebAudio:I,isTagAudio:C,isSimpleAudio:P,isLoFi:b,isHiFi:O},CONSTANTS:{INTERVAL_STEP1:400,STAGE_WIDTH:window.innerWidth,HALF_STAGE_WIDTH:window.innerWidth/2,STAGE_HEIGHT:window.innerHeight,HALF_STAGE_HEIGHT:window.innerHeight/2},components:{Point:null,MuccaBg1:null,step1:{Arrow:null},texts:{}},helpers:{}};window.onload=function(){t(),i()}}(),function(t){var i=new EventEmitter;_.extend(i,{UPDATE_GLOBE:"update-globe",COMPLETE_SWIPE_BG:"complete-swipe-bg",CLICK:"click",MOUSE_ENTER:"mouseenter",MOUSE_LEAVE:"mouseleave",MOUSE_MOVE:"mousemove",TOUCH_START:"touchstart",TOUCH_MOVE:"touchmove",TOUCH_END:"touchend",SCROLL_UP:"scrollUp",SCROLL_DOWN:"scrollDown",MOUSE_WHEEL:"mousewheel DOMMouseScroll",KEY_DOWN:"keydown"}),t.helpers.events=i}(window.ma),function(t){function i(t){var i,e,s;if(t.preventDefault(),a){if(s=+new Date,o&&(i=s-o,r>i))return;e=t.wheelDelta||-t.detail,n.trigger(0>e?n.SCROLL_DOWN:n.SCROLL_UP),o=s}}function e(t){var i,e,s=t.keyCode;if((s==l.KEY_SPACE||s==l.KEY_RIGHT||s==l.KEY_DOWN||s==l.KEY_LEFT||s==l.KEY_UP)&&a){if(e=+new Date,o&&(i=e-o,r>i))return;n.trigger(s==l.KEY_SPACE||s==l.KEY_RIGHT||s==l.KEY_DOWN?n.SCROLL_DOWN:n.SCROLL_UP),o=e}}function s(){a=!0,document.addEventListener("mousewheel",i,!1),document.addEventListener("DOMMouseScroll",i,!1),document.addEventListener(n.KEY_DOWN,e),h.isMobile}var o,n=t.helpers.events,h=t.Flags,a=!1,r=1e3,l={KEY_SPACE:32,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40};window.addEventListener(n.MOUSE_MOVE,function(t){var i=t.x|t.stageX,e=t.y|t.stageY;n.emit(n.MOUSE_MOVE,{x:i,y:e})}),window.addEventListener(n.CLICK,function(){n.emit(n.CLICK)}),s()}(window.ma),function(t){var i=t.helpers.events,e=t.CONSTANTS,s=function(t){_.bindAll(this,"onMouseMove","onMouseEnterStep1","onMouseLeaveStep1","delayShowStep1","onClick","onCompleteSwipeBackground","onCompleteUpdateGlobe","onScrollUp","onScrollDown"),this.ctx=t,this.count=1,this.currentState="state1",this.bg1=new ma.components.MuccaBg1(t),this.circle=new ma.components.Circle(t,this.bg1),this.step1Arrow=new ma.components.step1.Arrow,this.prevTime=+new Date,this.isMouseEnter=!1,this.$step1=this.$steps[0],this.$step1.on(i.MOUSE_ENTER,this.onMouseEnterStep1),this.$step1.on(i.MOUSE_LEAVE,this.onMouseLeaveStep1),this.$arrowContainer=$("#arrow-container"),this.$arrowContainer.on(i.MOUSE_ENTER,this.onMouseEnterStep1),this.$arrowContainer.on(i.MOUSE_LEAVE,this.onMouseLeaveStep1),i.addListener(i.COMPLETE_SWIPE_BG,this.onCompleteSwipeBackground),i.addListener(i.UPDATE_GLOBE,this.onCompleteUpdateGlobe),this.$stepCenter=this.$steps[0].find(".main"),this.$step1Left=this.$steps[0].find(".sub-1"),this.$step1Right=this.$steps[0].find(".sub-2")};s.prototype={$steps:[$("#step1"),$("#step2"),$("#step3"),$("#step4"),$("#step5"),$("#step6")],start:function(){this.show[this.currentState].call(this),i.addListener(i.SCROLL_UP,this.onScrollUp),i.addListener(i.SCROLL_DOWN,this.onScrollDown)},update:function(){this.updates[this.currentState].call(this)},hide:{state1:function(){var t=this;this.$steps[0].velocity({opacity:0},{complete:function(){t.$steps[0].removeClass("show")}}),i.removeListener(i.MOUSE_MOVE,this.onMouseMove),i.removeListener(i.SCROLL_UP,this.onScrollUp),i.removeListener(i.SCROLL_DOWN,this.onScrollDown),this.currentMouseState?(this.circle.onMouseEnterStep1(),this.bg1.onMouseEnterStep1(),this.waitStep1=1200):this.waitStep1=0,this.step1Arrow.hide()},state2:function(){},state3:function(){this.step1Arrow.hide();var t=this;this.$steps[1].velocity({opacity:0},{complete:function(){t.$steps[1].removeClass("show")}}),i.removeListener(i.SCROLL_UP,this.onScrollUp),i.removeListener(i.SCROLL_DOWN,this.onScrollDown)},state4:function(){},state5:function(){var t=this;this.$steps[3].velocity({opacity:0},{complete:function(){t.$steps[3].removeClass("show")}}),i.removeListener(i.MOUSE_MOVE,this.onMouseMove),i.removeListener(i.CLICK,this.onClick),i.removeListener(i.SCROLL_UP,this.onScrollUp),i.removeListener(i.SCROLL_DOWN,this.onScrollDown)}},show:{state1:function(){this.$steps[0].addClass("show"),this.$step1Left.css({opacity:0}),this.$step1Right.css({opacity:0}),this.bg1.show(),this.circle.show(),this.step1Arrow.start(),i.addListener(i.MOUSE_MOVE,this.onMouseMove)},state2:function(){console.log(this.waitStep1),0!==this.waitStep1?_.delay(this.delayShowStep1,this.waitStep1):this.delayShowStep1(),this.$steps[1].css({opacity:0}),this.$steps[1].addClass("show"),this.$steps[1].velocity({opacity:1},{delay:400+this.waitStep1,duration:400})},state3:function(){this.globalCollection=new t.components.GlobeCollection(this.ctx),this.globalCollection.show(),function(t){setTimeout(function(){t.step1Arrow.show(),i.addListener(i.SCROLL_UP,t.onScrollUp),i.addListener(i.SCROLL_DOWN,t.onScrollDown)},1600)}(this)},state4:function(){this.$steps[3].css({opacity:0}),this.$steps[3].addClass("show"),this.$steps[3].velocity({opacity:1},{delay:400,duration:600}),this.globalCollection.upgrade()},state5:function(){console.log("state5"),this.step1Arrow.show(),i.addListener(i.MOUSE_MOVE,this.onMouseMove),i.addListener(i.CLICK,this.onClick),i.addListener(i.SCROLL_UP,this.onScrollUp),i.addListener(i.SCROLL_DOWN,this.onScrollDown),this.enableMicrophone()},state6:function(){this.$steps[5].css({opacity:0}),this.$steps[5].addClass("show"),this.$steps[5].velocity({opacity:1},{delay:200,duration:600}),this.globalCollection.showInState6()}},delayShowStep1:function(){this.circle.fallDown(),this.bg1.levelUp()},updates:{state1:function(){this.bg1.update(),this.circle.update()},state2:function(){this.bg1.update(),this.circle.update()},state3:function(){this.globalCollection.update()},state4:function(){this.globalCollection.update()},state5:function(){this.globalCollection.update2()},state6:function(){this.globalCollection.updateInState6()}},mouseMoves:{state1:function(t){if(!this.isMouseEnterStep1){var i=t.x;this.circle.isFall||(null==this.currentMouseState&&this.$stepCenter.velocity({opacity:0}),i<e.HALF_STAGE_WIDTH?(this.prevMouseState=this.currentMouseState,this.currentMouseState="left"):(this.prevMouseState=this.currentMouseState,this.currentMouseState="right"),this.currentMouseState!==this.prevMouseState&&("left"==this.currentMouseState?(this.$step1Left.velocity({opacity:0}),this.$step1Right.velocity({opacity:1})):(this.$step1Left.velocity({opacity:1}),this.$step1Right.velocity({opacity:0})),this.bg1.onMouseMove(this.currentMouseState),this.circle.onMouseMove(this.currentMouseState,this.bg1)))}},state5:function(t){this.globalCollection.onMousemove(t)}},onMouseMove:function(t){this.mouseMoves[this.currentState].call(this,t)},clicks:{state5:function(){this.globalCollection.onClick()}},onClick:function(){this.clicks[this.currentState].call(this)},onMouseEnterStep1:function(){this.$stepCenter.velocity({opacity:1}),this.$step1Left.velocity({opacity:0}),this.$step1Right.velocity({opacity:0}),this.prevMouseState=null,this.currentMouseState=null,this.isMouseEnterStep1=!0,this.circle.onMouseEnterStep1(),this.bg1.onMouseEnterStep1()},onMouseLeaveStep1:function(){this.isMouseEnterStep1=!1},onScrollUp:function(){this.count--},onScrollDown:function(){this.hide[this.currentState].call(this),this.count++,this.currentState="state"+this.count,this.show[this.currentState].call(this)},onCompleteSwipeBackground:function(){this.onScrollDown()},onCompleteUpdateGlobe:function(){this.onScrollDown()},enableMicrophone:function(){console.log("enable microphone")}},t.App=s}(window.ma),function(t){Point=function(t,i){this.x=t,this.y=i},t.components.Point=Point}(window.ma),function(t){var i=t.CONSTANTS,e=function(t){_.bindAll(this,"addAnimation2","onCompleteAnimation"),this.ctx=t,this.circlePos={x:i.HALF_STAGE_WIDTH,y:null},this.x=0,this.width=window.innerWidth,this.height=0,this.col="#F36D3F",this.rate=0,this.isAnimation1Done=!1};e.prototype={prevMouse:{x:null,y:null},curMouse:{x:null,y:null},rotationBase:{left:-Math.PI/6,right:Math.PI/6},show:function(){this.addAnimation()},addAnimation:function(){var t=parseInt(3*i.STAGE_HEIGHT/5);TweenLite.to(this,.6,{height:t,ease:"Power2.easeInOut",onComplete:this.onCompleteAnimation})},onCompleteAnimation:function(){this.originY=this.y,this.isAnimation1Done=!0},addAnimation2:function(){},init:function(){},levelUp:function(){var t=i.STAGE_HEIGHT;TweenLite.to(this,.6,{height:t,ease:"Power2.easeInOut",onComplete:this.onCompleteAnimation})},update:function(){this.ctx.fillStyle=this.col,this.ctx.beginPath(),this.ctx.moveTo(0,i.STAGE_HEIGHT),this.ctx.lineTo(0,this.leftEdgeY),this.ctx.lineTo(i.STAGE_WIDTH,this.rightEdgeY),this.ctx.lineTo(i.STAGE_WIDTH,i.STAGE_HEIGHT),this.ctx.lineTo(0,i.STAGE_HEIGHT),this.ctx.fill(),this.ctx.closePath()},onMouseMove:function(t){var e,s;s=i.INTERVAL_STEP1/1e3,e=this.rotationBase[t],TweenLite.to(this,s,{rate:e,ease:"Power2.easeInOut"})},onMouseEnterStep1:function(){var t=i.INTERVAL_STEP1/1e3;TweenLite.to(this,t,{rate:0,ease:"Power2.easeInOut"})}},Object.defineProperty(e.prototype,"height",{set:function(t){this.y=window.innerHeight-t,this._height=t,this.leftEdgeY=-i.HALF_STAGE_WIDTH*Math.tan(this.theta)+this.y,this.rightEdgeY=i.HALF_STAGE_WIDTH*Math.tan(this.theta)+this.y},get:function(){return this._height}}),Object.defineProperty(e.prototype,"rate",{set:function(t){this._rate=t,this.theta=Math.PI/10*t,this.leftEdgeY=-i.HALF_STAGE_WIDTH*Math.tan(this.theta)+this.y,this.rightEdgeY=i.HALF_STAGE_WIDTH*Math.tan(this.theta)+this.y},get:function(){return this._rate}}),t.components.MuccaBg1=e}(window.ma),function(t){var i=t.helpers.events,e=t.CONSTANTS,s=function(t,i){_.bindAll(this,"addAnimation","onCompleteAnimation","swipeBackground","onCompleteSwipeBackground"),this.ctx=t,this.isActive=!1,this.isFall=!0,this.bg=i,this.duration=parseInt(2*e.STAGE_WIDTH/3/800*10)/10};s.prototype={rad:4,MIN_RAD:4,MAX_RAD:12,col:"rgb(165, 165, 165)",_colNumber:165,show:function(){_.delay(this.addAnimation,600)},moveBase:{left:e.STAGE_WIDTH/6,right:5*e.STAGE_WIDTH/6},addAnimation:function(){console.log("addAnimation");var i=parseInt(2*t.CONSTANTS.STAGE_HEIGHT/5);this.x=t.CONSTANTS.HALF_STAGE_WIDTH,this.y=-this.rad,this.isActive=!0,TweenLite.to(this,.4,{y:i,ease:"Bounce.easeOut",onComplete:this.onCompleteAnimation})},onCompleteAnimation:function(){this.isFall=!1},fallDown:function(){var i=parseInt(.5*t.CONSTANTS.STAGE_HEIGHT)+this.rad+1;this.isFall=!0,TweenLite.to(this,.4,{y:i,colNumber:255,onComplete:this.swipeBackground})},swipeBackground:function(){var t=Math.sqrt(e.HALF_STAGE_WIDTH*e.HALF_STAGE_WIDTH+e.HALF_STAGE_HEIGHT*e.HALF_STAGE_HEIGHT),i=this.y+t;TweenLite.to(this,1,{rad:t,y:i,onComplete:this.onCompleteSwipeBackground})},onCompleteSwipeBackground:function(){i.emit(i.COMPLETE_SWIPE_BG)},update:function(){var t;this.isActive&&(this.ctx.beginPath(),this.ctx.fillStyle=this.col,t=this.isFall?this.y:Math.tan(this.bg.theta)*(this.x-e.HALF_STAGE_WIDTH)+this.bg.y,this.ctx.arc(this.x,t-this.rad+1,this.rad,0,2*Math.PI,!1),this.ctx.fill(),this.ctx.closePath())},update2:function(){this.ctx.beginPath(),this.ctx.fillStyle=this.col,this.ctx.arc(this.x,this.y,this.rad,0,2*Math.PI,!1),this.ctx.fill(),this.ctx.closePath()},onMouseMove:function(t){var i;i=e.INTERVAL_STEP1/2e3,this.rad==this.MAX_RAD?TweenLite.to(this,this.duration,{x:this.moveBase[t],ease:"Linear",delay:i}):TweenLite.to(this,this.duration,{x:this.moveBase[t],rad:this.MAX_RAD,ease:"Linear",delay:i})},onMouseEnterStep1:function(){if(this.isActive&&!this.isFall){var t;t=e.INTERVAL_STEP1/2e3,TweenLite.to(this,this.duration,{x:e.HALF_STAGE_WIDTH,rad:this.MIN_RAD,ease:"Linear",delay:t})}}},Object.defineProperty(s.prototype,"colNumber",{set:function(t){this._colNumber=t;var i=parseInt(this._colNumber);this.col="rgb("+i+", "+i+", "+i+")"},get:function(){return this._colNumber}}),t.components.Circle=s}(window.ma),function(t){var i=t.CONSTANTS,e="#fff",s="#F36D3F",o=function(){_.bindAll(this,"fallDown"),this.$container=$("#arrow-container");var t=parseInt(2*i.STAGE_HEIGHT/5)+"px";this.$container.css({top:t}),this.id="#arrow-svg",this.$id=$(this.id),this.svg=new Snap(this.id),window.svg=this.svg,this.line=this.svg.polyline([0,0,30,0,60,0]),this.svg.attr({fill:null,stroke:e,strokeWidth:1})};o.prototype={start:function(){_.delay(this.fallDown,700)},show:function(){this.$container.css({display:"block"}),this.line.attr({stroke:s}),this.line.animate({points:[0,0,30,20,60,0]},400,mina.easeinout)},hide:function(){this.line.animate({points:[30,20,30,20,30,20]},400,mina.easeinout);var t=this;_.delay(function(){t.$container.css({display:"none"})},400)},fallDown:function(){var t=parseInt(i.STAGE_HEIGHT-50);this.$container.velocity({top:t},600,"easeInOutCubic");var e=this;_.delay(function(){e.line.animate({points:[0,0,30,20,60,0]},400,mina.easeinout)},500)},update:function(){}},t.components.step1.Arrow=o}(window.ma),function(t){function i(t){return t*t*t}function e(t){return 3*t*t*(1-t)}function s(t){return 3*t*(1-t)*(1-t)}function o(t){return(1-t)*(1-t)*(1-t)}function n(t,n,h,r,l){var c=new a;return c.x=n.x*i(t)+h.x*e(t)+r.x*s(t)+l.x*o(t),c.y=n.y*i(t)+h.y*e(t)+r.y*s(t)+l.y*o(t),c}var h=(t.helpers.events,t.CONSTANTS),a=function(t,i){if(!t)var t=0;if(!i)var i=0;return{x:t,y:i}},r=function(t,i,e,s){_.bindAll(this,"onCompleteType2Animation"),this.type=s,this.x=h.HALF_STAGE_WIDTH,this.y=h.HALF_STAGE_HEIGHT,this.theta=-Math.PI/2,this.theta1=0,this.theta2=-Math.PI/2,this.origRad=e,this.rad=i,this.ctx=t,this.rads=[];for(var o=0;12>o;o++)this.rads.push({rad:this.rad,velRad:10*Math.random()-5})};r.prototype={distance:0,vibrationCount:0,vibrationArr:[],col:"rgb(165, 165, 165)",show:function(){0==this.type?(this.theta=-Math.PI/2,this.tweenType1()):(this.theta=0,this.num=0,this.pt1=a(this.rad*Math.cos(-Math.PI/2),this.rad*Math.sin(-Math.PI/2)),this.pt2=a(1.3*this.rad,this.rad*Math.sin(-Math.PI/2)),this.pt3=a(1.3*this.rad,this.rad*Math.sin(Math.PI/2)),this.pt4=a(this.rad*Math.cos(Math.PI/2),this.rad*Math.sin(Math.PI/2)),this.tweenType2())},showInState6:function(){TweenLite.to(this,.6,{distance:90,ease:"Power2.easeInOut"})},tweenType1:function(){TweenLite.to(this,.6,{theta:3*Math.PI/2,ease:"Power2.easeInOut"})},tweenType2:function(){this.isFirst=!0,TweenLite.to(this,.4,{num:180,ease:"Power2.easeInOut",onComplete:this.onCompleteType2Animation,delay:.1*this.type})},onCompleteType2Animation:function(){this.isFirst=!1;var t=.5-.1*this.type;TweenLite.to(this,.6,{theta:3*Math.PI/5,ease:"Power2.easeInOut",delay:t})},upgrade:function(){this.rad-20;TweenLite.to(this,.6,{theta:Math.PI,ease:"Power2.easeInOut"})},update:function(){0==this.type?this.update1():this.update2()},update1:function(){this.ctx.save(),this.ctx.beginPath(),this.ctx.strokeStyle=this.col,this.ctx.translate(this.x,this.y),this.ctx.arc(0,0,this.rad,-Math.PI/2,this.theta),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()},update2:function(){this.isFirst?this.update2First():this.update2Next()},update3:function(t,i){var e;for(e=0;e<this.rads.length;e++)if(this.rads[e].rad+=this.rads[e].velRad,this.rads[e].velRad+=.03*(this.origRad-this.rads[e].rad),this.rads[e].velRad*=.95,0!==t.x||0!==t.y){var s=e/this.rads.length*2*Math.PI,o=Math.cos(s)*t.x+Math.sin(s)*t.y,n=Math.cos(s)*this.rads[e].rad-i.x,h=Math.sin(s)*this.rads[e].rad-i.y,a=Math.sqrt(n*n+h*h);this.rads[e].velRad+=o*(.6*Math.random()+.4)/a*40}this.ctx.save(),this.ctx.strokeStyle=this.col,this.ctx.translate(this.x,this.y),this.ctx.beginPath();var r=(this.rads[0].rad*Math.cos(0)+this.rads[this.rads.length-1].rad*Math.cos((this.rads.length-1)/this.rads.length*Math.PI*2))/2,l=(this.rads[0].rad*Math.sin(0)+this.rads[this.rads.length-1].rad*Math.sin((this.rads.length-1)/this.rads.length*Math.PI*2))/2;for(this.ctx.moveTo(r,l),e=0;e<this.rads.length;e++){var c=e%this.rads.length,u=c/this.rads.length*2*Math.PI,d=this.rads[c].rad*Math.cos(u),p=this.rads[c].rad*Math.sin(u),M=(c+1)%this.rads.length,S=M/this.rads.length*2*Math.PI,f=this.rads[M].rad*Math.cos(S),w=this.rads[M].rad*Math.sin(S),v=(d+f)/2,m=(p+w)/2;this.ctx.quadraticCurveTo(d,p,v,m)}this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()},updateInState6:function(){var t;for(t=0;t<this.rads.length;t++)this.rads[t].rad+=this.rads[t].velRad,this.rads[t].velRad+=.1*(this.origRad-this.rads[t].rad),this.rads[t].velRad*=.9;for(var i=0;2>i;i++){this.ctx.save(),this.ctx.strokeStyle=this.col,0==i?this.ctx.translate(this.x+this.distance,this.y):this.ctx.translate(this.x-this.distance,this.y),this.ctx.beginPath();var e=(this.rads[0].rad*Math.cos(0)+this.rads[this.rads.length-1].rad*Math.cos((this.rads.length-1)/this.rads.length*Math.PI*2))/2,s=(this.rads[0].rad*Math.sin(0)+this.rads[this.rads.length-1].rad*Math.sin((this.rads.length-1)/this.rads.length*Math.PI*2))/2;for(this.ctx.moveTo(e,s),t=0;t<this.rads.length;t++){var o=t%this.rads.length,n=o/this.rads.length*2*Math.PI,h=this.rads[o].rad*Math.cos(n),a=this.rads[o].rad*Math.sin(n),r=(o+1)%this.rads.length,l=r/this.rads.length*2*Math.PI,c=this.rads[r].rad*Math.cos(l),u=this.rads[r].rad*Math.sin(l),d=(h+c)/2,p=(a+u)/2;this.ctx.quadraticCurveTo(h,a,d,p)}this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()}},update2First:function(){this.ctx.save(),this.ctx.beginPath(),this.ctx.strokeStyle=this.col,this.ctx.translate(this.x,this.y),this.ctx.moveTo(this.rad*Math.cos(-Math.PI/2),this.rad*Math.sin(-Math.PI/2));for(var t=0;t<this.num;t++){var i=(180-t)/180,e=n(i,this.pt1,this.pt2,this.pt3,this.pt4);this.ctx.lineTo(e.x,e.y)}this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()},update2Next:function(){this.ctx.save(),this.ctx.beginPath(),this.ctx.strokeStyle=this.col,this.ctx.translate(this.x,this.y),this.ctx.moveTo(this.rad*Math.cos(-Math.PI/2),this.rad*Math.sin(-Math.PI/2)),this.ctx.bezierCurveTo(1.3*this.rad,this.rad*Math.sin(-Math.PI/2),1.3*this.rad,this.rad*Math.sin(Math.PI/2),this.rad*Math.cos(Math.PI/2),this.rad*Math.sin(Math.PI/2)),this.ctx.bezierCurveTo(1.3*this.rad*Math.cos(this.theta),this.rad*Math.sin(Math.PI/2),1.3*this.rad*Math.cos(this.theta),this.rad*Math.sin(-1*Math.PI/2),this.rad*Math.cos(-Math.PI/2),this.rad*Math.sin(-Math.PI/2)),this.ctx.stroke(),this.ctx.closePath(),this.ctx.restore()},onClick:function(){this.rads.forEach(function(t){t.velRad+=20*(2*Math.random()-1)})}},t.components.Globe=r}(window.ma),function(t){var i=t.helpers.events,e=function(t){this.ctx=t,this.globes=[]};e.prototype={velocity:{x:null,y:null},prevMouse:{x:null,y:null},mouse:{x:null,y:null},show:function(){for(var i=0;5>i;i++){var e,s;e=0==i?200:220-40*i,s=200-40*i;var o=new t.components.Globe(this.ctx,e,s,i);o.show(),this.globes.push(o)}},update:function(){for(var t in this.globes)this.globes[t].update()},update2:function(){this.velocity.x=this.mouse.x-this.prevMouse.x,this.velocity.y=this.mouse.y-this.prevMouse.y;Math.sqrt(this.velocity.x*this.velocity.x+this.velocity.y*this.velocity.y);for(var t in this.globes)this.globes[t].update3(this.velocity,this.mouse);this.prevMouse.x=this.mouse.x,this.prevMouse.y=this.mouse.y},updateInState6:function(){for(var t=0;t<this.globes.length;t++)this.globes[t].updateInState6()},upgrade:function(){for(var t=1;t<this.globes.length;t++)this.globes[t].upgrade();_.delay(function(){i.trigger(i.UPDATE_GLOBE)},600)},showInState6:function(){for(var t=0;t<this.globes.length;t++)this.globes[t].showInState6()},onMousemove:function(t){this.mouse.x=t.x,this.mouse.y=t.y},onClick:function(){for(var t=0;t<this.globes.length;t++)this.globes[t].onClick()}},t.components.GlobeCollection=e}(window.ma);