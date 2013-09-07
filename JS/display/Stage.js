define(function(require, exports, module){
	var utils=require('utils/utils');
	var DisplayObjectContainer=require('display/DisplayObjectContainer');
	var Timer=require('utils/Timer');
			
	/*
	*@Constructor Stage
	*/
	var Stage=function(canvasorid){
		Stage.superclass.constructor.call(this);
		if(!canvasorid){
			throw new Error('constructor Stage need a param of type HTMLCanvasElement or string to pass in');
		}
		if(typeof (canvasorid)=='string'){
			this.canvas=document.querySelector('#'+canvasorid);
		}else{
			this.canvas=canvasorid;
		}
		this.context=this.canvas.getContext('2d');
		this.stageWidth=this.canvas.width;
		this.stageHeight=this.canvas.height;
		this.frameRate=40;//default frameRate
	}
	utils.extend(Stage,DisplayObjectContainer);
	
	
	/*
	*获取舞台的宽度
	*/
	Stage.prototype.getStageWidth=function(){
		return this.canvas.width;
	}
	
	/*
	*获取舞台的高度
	*/
	Stage.prototype.getStageHeight=function(){
		return this.canvas.height;
	}
	
	/*
	*begin game cycle
	*/
	Stage.prototype.startup=function(){
		this.initEvent();
		this.timer=new Timer(1000/this.frameRate,0);
		var self=this;
		var tick=function(){
			self.enterFrame();
		}
		this.timer.addEventListener('timer',tick);
		this.timer.start();
	}

	Stage.prototype.pause=function(){
		this.timer.stop();
	}

	Stage.prototype.restart=function(){
		this.timer.start();
	}

	Stage.prototype.enterFrame=function(){
		this.clear(arguments);
		this._update();
		this._render(this.context);
		this.dispatchEvent({type:'enterframe',target:this});
	}
	
	/*
	*clear the specific region or the whole canvas	
	*/
	Stage.prototype.clear=function(args){
		var ctx=this.context,
			 canvas=this.canvas;
		if(args.length>0){
			args=Array.prototype.slice.call(0);
			ctx.clearRect(args[0],args[1],args[2],args[3]);
			return;
		}
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	
	Stage.prototype.initEvent=function(){
		var mouseHandler=utils.bind(this._mouseHandler,this);
		this.canvas.addEventListener('click',mouseHandler,false);
		document.oncontextmenu=mouseHandler;//鼠标右键事件
		this.canvas.addEventListener('mousemove',mouseHandler,false);
		//this.canvas.addEventListener('mousedown',mouseHandler,false);
		//this.canvas.addEventListener('mouseup',mouseHandler,false);
	}

	Stage.prototype._mouseHandler=function(e){
		var mouseX=e.pageX - this.canvas.offsetLeft;
		var mouseY=e.pageY - this.canvas.offsetTop;
		var event={type:e.type,mouseX:mouseX,mouseY:mouseY,target:this};
		this.dispatchEvent(event);
		
		//记得以后加上mouseover和mouseout事件哦
		var descendants=this.getDescendantsUnderPoint(mouseX,mouseY);
		for(var i=0,len=descendants.length;i<len;i++){
			var child=descendants[i];
			event.target=child;
			child.dispatchEvent(event);
		}

		e.preventDefault();
		e.stopPropagation();
	}

	return Stage;
});



