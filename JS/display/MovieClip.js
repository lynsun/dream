define(function(require, exports, module){
	var utils=require('utils/utils');
	var DisplayObject=require('display/DisplayObject');
	var Scene=require('display/Scene');
	
	/*
	*@Constructor MovieClip
	*/
	var  MovieClip=function(config){
		var config=config||{};
		MovieClip.superclass.constructor.call(this,config);
		this.scenes=[];
		this.currentScene=null;//Dream.display.Scene
		this.currentFrame=null;//Dream.display.Frame
		this.currentFrameIndex=-1;
		this.isStop=false;
		this.frameRate=config.frameRate||5;//frameRate of the movieclip
		this._timer=null//@private  the timeline of the movieclip
	};
	utils.extend(MovieClip,DisplayObject);
	

	/*
	*addScene add one or more scenes to this instance
	*/	
	MovieClip.prototype.addScene=function(sceneorarray){
		if(utils.isArray(sceneorarray)){
			for(var i=0,len=sceneorarray.length;i<len;i++){
				var scene=sceneorarray[i];
				this._addScene(scene);
			}
		}
		this._addScene(sceneorarray);
	}


	/*
	*truely add one Scene to this instance
	*/	
	MovieClip.prototype._addScene=function(scene){
		if(!scene instanceof Scene){
			throw new Error("TypeError:Dream.display.MovieClip.prototype._addScene need a param of type Dream.display.Scene")
		}
		this.scenes.push(scene);
	}
	
	/*
	*@setCurrentFrame
	*@param frameIndexorLabel{number|string}:the specific frame in a scene
	*@param sceneorName{Scene|string}:the scene of the frame
	*/
	MovieClip.prototype.setCurrentFrame=function(frameIndexorLabel,sceneorName){
		if(!sceneorName){
			throw new Error('ArgumentsError:Dream.display.MovieClip.prototype.gotoAndPlay need a second argument of type Dream.display.Scene or number');
		}
		var scene=this.getScene(sceneorName);
		var frameIndex=frameIndexorLabel;
		if(typeof frameIndexorLabel=='string'){
			 frameIndex=scene.getFrameIndex(frameIndexorLabel);
		}
		if(frameIndex==-1){
			throw new Error("NullPointerException:can not find a frame by "+frameIndexorLabel);
		}
		this.currentFrameIndex=frameIndex;
		this.currentFrame=scene.frames[frameIndex];
		this.currentScene=scene;
	}
	

	/*
	*@gotoAndPlay
	*@param frameIndexorLabel{number|string}:the specific frame in a scene
	*@param sceneorName{Scene|string}:the scene of the frame
	*/
	MovieClip.prototype.gotoAndPlay=function(frameIndexorLabel,sceneorName){
		this.setCurrentFrame(frameIndexorLabel,sceneorName);
		this.isStop=false;
		this._play();
	}

	/*
	*@gotoAndStop
	*@param frameIndexorLabel{number|string}:the specific frame in a scene
	*@param sceneorName{Scene|string}:the scene of the frame
	*/
	MovieClip.prototype.gotoAndStop=function(frameIndexorLabel,sceneorName){
		this.setCurrentFrame(frameIndexorLabel,sceneorName);
		window.clearInterval(this._timer);
		this.isStop=true;
	}
	

	MovieClip.prototype.play=function(scene){
		this.isStop=false;
		if(!scene)
			this.currentScene=this.scenes[0];
		this._play();
	}
	
	
	MovieClip.prototype._play=function(){
		var self=this;
		window.clearInterval(this._timer);
		this._timer=window.setInterval(function(){
			self.dispatchEvent({type:'EVENT.ENTER_FRAME'});//dispatch enterframe event
			self.nextFrame();
		},1000/this.frameRate);
	}

	MovieClip.prototype.stop=function(){
		this.isStop=true;
		window.clearInterval(this._timer);
	}
	
	/*
	*@nextFrame call at enterframelistener of its own timeline
	*/
	MovieClip.prototype.nextFrame=function(){
		var scene=this.currentScene;
		var frames=scene.frames;
		var totalFrames=frames.length;
		this.currentFrameIndex=(this.currentFrameIndex+1)%totalFrames;
		this.currentFrame=frames[this.currentFrameIndex];
	}

	/*
	*@getScene
	*@param sceneorName{string|Scene}
	*@return scene{Scene}
	*/
	MovieClip.prototype.getScene=function(sceneorName){
		if(sceneorName instanceof Dream.display.Scene){
			return sceneorName
		}
		for(var i=0,len=this.scenes.length;i<len;i++){
			var scene=this.scenes[i];
			if(scene.name==sceneorName){
				return scene;
			}
		}
		throw new Error("NullPointerException:can not find a scene by "+sceneorName);
	}
	
	/*
	*@render call at enterframelistener of the main timeline
	*/
	MovieClip.prototype.render=function(ctx){
		var frame=this.currentFrame;
		var bitmap=frame.bitmap;
		ctx.drawImage(bitmap.image,bitmap.sourceX,bitmap.sourceY,bitmap.width,bitmap.height,0,0,bitmap.width,bitmap.height);
	}

	return MovieClip;
});


