define(function(require, exports, module){
	var utils=require('utils/utils');
	
	/*
	*@Constructor EventDispatcher
	*/
	var  EventDispatcher=function(){
		this._listeners={};
	};

	/*
	*@addEventListener
	*@param type{string} eventType
	*@param listener{function} function to call when the event trigger
	*/
	EventDispatcher.prototype.addEventListener=function(type,listener,context){
		var listeners=this._listeners[type]||(this._listeners[type]=[]);
		if(!listener||!utils.isFunction(listener))
			throw new Error("EventDispatcher.addEventListener need a second param of type Function");
		listeners.push([listener,context||this]);
		return this;
	}
	
	/*
	*@removeEventListener remove one or all listener of the type
	*@param type{string}event type
	*@param listener{function} listener to remove
	*/
	EventDispatcher.prototype.removeEventListener=function(type,listener){
		if(!this._listeners[type])
			return;
		if(!listener||!utils.isFunction(listener))
			throw new Error("EventDispatcher.removeEventListener need a second param of type Function");
		var listeners=this._listeners[type];
		if(!listener){//remove all listener of the type
			listeners=[];
			return;
		}
		for(var i=listeners.length-1;i>=0;i--){
			if(listener==listeners[i]){
				listeners[i]=null;
				listeners.splice(i,1);
			}
		}
		if(listeners.length==0)
			this._listeners[type]=null;
	}

	/*
	*@dispatchEvent trigger an event 
	*@param e{Object}:the event object ex:{type:'click',target:mc}
	*/
	EventDispatcher.prototype.dispatchEvent=function(e){
		var type=e&&e.type;
		if(!type){
			throw new Error('EventDispatcher.dispatchEvent need an event object with type attr to pass in');
		}
		if(!this._listeners[type])
			return;
		var listeners=this._listeners[type];
		for(var i=0,len=listeners.length;i<len;i++){
			var listener=listeners[i];
			if(listener[0]&&listener[1]){
				listener[0].call(listener[1],e);
			}
		}
	}

	/*
	*@removeAllEventListeners  remove all listeners of all type
	*/
	EventDispatcher.prototype.removeAllEventListeners=function(){
		this._listeners={};
	}

	return EventDispatcher;

});


