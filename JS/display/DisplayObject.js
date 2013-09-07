define(function(require, exports, module){
	var utils=require('utils/utils');
	var EventDispatcher=require('events/EventDispatcher');

	var DisplayObject=function(config){
		var config=config||{};
		DisplayObject.superclass.constructor.call(this,config);
		this.x=config.x||0;
		this.y=config.y||0;
		this.width=config.width||0;
		this.height=config.height||0;
		this.visible=true;
		this.alpha=1;
		this.useHandCursor=false;
		this.mouseEnabled=true;
		this.parent=null;
		this.stage=null;
	};

	utils.extend(DisplayObject,EventDispatcher);
	
	DisplayObject.prototype._render=function(ctx){
		if(!this.visible||this.alpha<=0) return;
		ctx.setTransform(1,0,0,1,0,0);
		ctx.save();
		var p=this.localToGlobal(0,0);
		ctx.translate(p.x,p.y);
		ctx.globalAlpha *= this.alpha;
		this.render(ctx);
		ctx.restore();
	};
	
	DisplayObject.prototype.localToGlobal=function(x,y){
		for(var obj=this;obj!=stage;obj=obj.parent){
			x+=obj.x;
			y+=obj.y;
		}
		return {x:x,y:y};
	}

	DisplayObject.prototype.globalToLocal=function(x,y){
		var p=this.localToGlobal(0,0);
		return {x:x-p.x,y:y-p.y};
	}
	
	
	
	DisplayObject.prototype.hitTestPoint=function(x,y,shapeFlag){
			var p=this.globalToLocal(x,y);
			if((p.x<this.width)&&(p.y<this.height)){
				if((p.x>0)&&(p.y>0)){
					return true;
				}
			}
			return false;
	}

	DisplayObject.prototype.render=function(ctx){
		
	};

	DisplayObject.prototype.update=function(){
	};
	
	DisplayObject.prototype._update=function(){
		this.update();
	};


	return DisplayObject;
});


