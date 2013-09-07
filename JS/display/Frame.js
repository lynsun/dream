define(function(require, exports, module){
	/*
	*@Constructor Frame
	*@param bitmap{Bitmap}
	*@param label{string}
	*/
	var Frame=function(bitmap,label){
		if(!bitmap)
				throw new Error("Constructor Frame need a bitmap param");
		this.bitmap=bitmap;
		this.label=label||"";
	}
	return Frame;
});

