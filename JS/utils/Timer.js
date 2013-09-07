define(function(require, exports, module){
	var utils=require('utils/utils');
	var EventDispatcher=require('events/EventDispatcher');
		
	/*
	*@Constructor Timer
	*@param delay{number}:interval
	*@param repeatCount{number}:repeat times
	*/
	function Timer(delay,repeatCount){
		Timer.superclass.constructor.call(this,arguments);
		this.delay=delay||100;
		this.repeatCount=repeatCount||0;
		this.currentCount=0;
		this.running=false;//is timer running
	}
	utils.extend(Timer,EventDispatcher);
	
	/*
	*start timer
	*/
	Timer.prototype.start=function(){
		var self=this;
		this.running=true;
		var tick=function(){
			self._tick();
		}
		this._timer=window.setInterval(tick,this.delay);
	}
	
	/*
	*stop timer (pause)
	*/
	Timer.prototype.stop=function(){
		this.running=false;
		window.clearInterval(this._timer);
	}

	/*
	*reset timer
	*/
	Timer.prototype.reset=function(){
		this.stop();
		this.currentCount=0;
	}
	
	/*
	*the function execute each tick
	*/
	Timer.prototype._tick=function(){
		if(this.repeatCount&&((++this.currentCount)>this.repeatCount)){//timercomplete
			this.reset();
			this.dispatchEvent({type:'timercomplete',target:this});
			return;
		}
		this.dispatchEvent({type:'timer',target:this});
	}

	return Timer;
});


