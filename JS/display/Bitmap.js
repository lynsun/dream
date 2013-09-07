define(function(require, exports, module){
	var utils=require('utils/utils');
	var DisplayObject=require('display/DisplayObject');
			
	/*
	*@Constructor Bitmap
	*/
	var Bitmap=function(config){
		var config=config||{};
		Bitmap.superclass.constructor.call(this,config);
		this.image=config.image||null;
		this.sourceX=config.sourceX||0;
		this.sourceY=config.sourceY||0;
		this.width=config.width||(this.image&&this.image.width)||0;
		this.height=config.height||(this.image&&this.image.height)||0;
	};
	utils.extend(Bitmap,DisplayObject);
	
	Bitmap.prototype.render=function(ctx){
		ctx.drawImage(this.image,this.sourceX,this.sourceY,this.width,this.height,0,0,this.width,this.height);
	};

	return Bitmap;
});



