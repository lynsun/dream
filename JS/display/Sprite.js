define(function(require, exports, module){
	var utils=require('utils/utils');
	var DisplayObjectContainer=require('display/DisplayObjectContainer');
			
	/*
	*@Constructor Sprite
	*/
	var Sprite=function(config){
		Sprite.superclass.constructor.call(this,config);
	}
	utils.extend(Sprite,DisplayObjectContainer);
	
	return Sprite;
});



