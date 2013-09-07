define(function(require, exports, module){
	var utils=require('utils/utils');
	var Frame=require('display/Frame');
	
	/*
	*@Constructor Scene
	*@param name:name of the scene
	*/
	var Scene=function(name){
		this.name=name||"";
		this.frames=[];
	}

	/*
	*@add one or more frames to the scene
	*@param frameorarray{Dream.Frame||Array}
	*/
	Scene.prototype.add=function(frameorarray){
		if(utils.isArray(frameorarray)){
				for(var i=0,len=frameorarray.length;i<len;i++){
					var frame=frameorarray[i];
					this.addFrame(frame);
				}
				return;
		}
		this.addFrame(frameorarray);
	}

	/*
	*@addFrame:truely add one frame to this scene(interal only)
	*@param frame{Dream.Frame}
	*/
	Scene.prototype.addFrame=function(frame){
		if(!frame||!frame instanceof Frame){
			throw new Error("ArgumentsException:Dream.Scene.prototype.addFrame need an argument of type Dream.Frame");
		}
		this.frames.push(frame);
	}

	/*
	*@getFrame get frame by given frameIndex or label
	*@param indexorlabel{Number|String}
	*@return frame{Dream.Frame}
	*/
	Scene.prototype.getFrame=function(indexorlabel){
		if(utils.isNumber(indexorlabel)){
			if(indexorlabel>=this.frames.length||indexorlabel<0)
				throw new Error("IndexOutOfException:@Dream.Scene.prototype.getFrame, the error index is "+indexorlabel);
			return this.frames.length&&this.frames[indexorlabel];
		}
		if(typeof indexorlabel=="string"){
			for(var i=0,len=this.frames.length;i<len;i++){
				var frame=this.frames[i];
				if(frame.label==indexorlabel){
					return frame;
				}
			}
		}
		throw new Error("NonPointException:can not find specific frame");
	}

	/*
	*@getFrameIndex get the index of the specific framelabel
	*@param label{string} the label of the target frame
	*/
	Scene.prototype.getFrameIndex=function(label){
		var frames=this.frames;
		for(var i=0,len=frames.length;i<len;i++){
			var frame=frames[i];
			if(frame.label==label)
				return i;
		}
		return -1;
	}

	return Scene;
});
