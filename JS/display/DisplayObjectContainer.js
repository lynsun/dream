define(function(require, exports, module){
	var utils=require('utils/utils');
	var DisplayObject=require('display/DisplayObject');
	
	function DisplayObjectContainer(config){
		DisplayObjectContainer.superclass.constructor.call(this,config||{});
		this.children = [];
		this.mouseChildren = true;
	}
	utils.extend(DisplayObjectContainer,DisplayObject);

	/**
	 * Adds a child DisplayObject instance to the specific index of this DisplayObjectContainer instance.
	 */
	DisplayObjectContainer.prototype.addChildAt = function(child, index)
	{
		var e={type:'ADDED'};//添加对象时会触发ADDED事件
		if(index < 0) index = 0;
		else if(index > this.children.length) index = this.children.length;
		
		var childIndex = this.getChildIndex(child);
		if(childIndex != -1)
		{
			if(childIndex == index) return child;
			this.children.splice(childIndex, 1);
		}else if(child.parent)
		{
			e.prevParent=child.parent;//把前一个父亲传入事件参数
			child.parent.removeChild(child);
		}
		this.children.splice(index, 0, child);
		child.parent = this;
		child.stage=this.stage||this;//添加子对象时把this.stage赋给child.stage,如果this为stage就是自身了
		child.dispatchEvent(e);//分发一个自定义的添加到对象的事件
		if(child.stage==this){//如果父元素就是stage时同时会触发ADDED_TO_STAGE事件
			child.dispatchEvent({type:'ADDED_TO_STAGE'});
		}
		return child;
	}

	/**
	 * Adds a child DisplayObject instance to this DisplayObjectContainer instance.
	 */
	DisplayObjectContainer.prototype.addChild = function(child)
	{	
		return this.addChildAt(child, this.children.length);
	}

	/**
	 * Removes a child DisplayObject from the specified index position in the child list of the DisplayObjectContainer.
	 */
	DisplayObjectContainer.prototype.removeChildAt = function(index)
	{
		var e={type:'REMOVED'};
		if (index < 0 || index >= this.children.length) return false;
		var child = this.children[index];
		if (child != null) 
		{
			e.from=child.parent;//from参数表示从哪个显示对象中移除
			child.parent = null;
			child.stage = null;
		}
		this.children.splice(index, 1);
		child.dispatchEvent(e);//分发一个自定义的remove事件
		if(e.from==stage){
			child.dispatchEvent({type:'REMOVED_FROM_STAGE',from:stage});
		}
		return true;
	}

	/**
	 * Removes the specified child DisplayObject instance from the child list of the DisplayObjectContainer instance.
	 */
	DisplayObjectContainer.prototype.removeChild = function(child)
	{
		return this.removeChildAt(this.children.indexOf(child));
	}

	/**
	 * Removes a child DisplayObject with the specified name in the child list of the DisplayObjectContainer.
	 */
	DisplayObjectContainer.prototype.removeChildByName = function(name)
	{	
		for(var i = 0, len = this.children.length; i < len; i++)
		{
			if(this.children[i].name == name) 
			{
				return this.removeChildAt(i);
			}
		}
		return null;
	}

	/**
	 * Removes all children of the DisplayObjectContainer.
	 */
	DisplayObjectContainer.prototype.removeAllChildren = function()
	{
		while(this.children.length > 0) this.removeChildAt(0);
	}

	/**
	 * Returns the child display object that exists with the specified name.
	 */
	DisplayObjectContainer.prototype.getChildByName = function(name)
	{
		for(var i = 0, len = this.children.length; i < len; i++)
		{
			var child = this.children[i];
			if(child.name == name) return child;
		}
		return null;
	}

	/**
	 * Returns the child display object instance that exists at the specified index.
	 */
	DisplayObjectContainer.prototype.getChildAt = function(index)
	{
		if (index < 0 || index >= this.children.length) return null;
		return this.children[index];
	}

	/**
	 * Returns the index position of a child DisplayObject instance.
	 */
	DisplayObjectContainer.prototype.getChildIndex = function(child)
	{
		return this.children.indexOf(child);
	}

	/**
	 * Changes the position of an existing child in the display object container.
	 */
	DisplayObjectContainer.prototype.setChildIndex = function(child, index)
	{
		if(child.parent != this) return;
		var oldIndex = this.children.indexOf(child);
		if(index == oldIndex) return;
		this.children.splice(oldIndex, 1);
		this.children.splice(index, 0, child);
	}

	/**
	 * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
	 */
	DisplayObjectContainer.prototype.contains = function(child)
	{
		return this.getChildIndex(child) != -1;
	}

	/**
	 * Returns the number of children of this object.
	 */
	DisplayObjectContainer.prototype.getNumChildren = function()
	{
		return this.children.length;
	}
	
	DisplayObjectContainer.prototype.getDescendantsUnderPoint=function(x,y){
		var ret=[];
		var children=this.children;
		for(var i=0,len=children.length;i<len;i++){
			var child=children[i];
			if(!child.mouseEnabled||child.alpha<=0||!child.visible) continue;
			if ((child instanceof DisplayObjectContainer)&&child.mouseChildren) {
				ret=ret.concat(child.getDescendantsUnderPoint(x,y));
			}
			if(child.hitTestPoint(x,y)){
				ret.push(child);
			}
		}
		return ret;
	}
	

	/**
	 * @private Renders all children of the DisplayObjectContainer onto specific context.
	 */
	DisplayObjectContainer.prototype.render = function(ctx)
	{
		for(var i = 0, len = this.children.length; i < len; i++)
		{
			var child = this.children[i];
			child._render(ctx);
		}
	}
	
	/*
	*	@private update all children 
	*/
	DisplayObjectContainer.prototype._update = function()
	{
		this.update();//先调用自己的更新方法,再调用孩子的
		for(var i = 0, len = this.children.length; i < len; i++)
		{
			var child = this.children[i];
			try{
				child._update();
			}catch(e){
				//该child已被移除
			}
		}
	}

	return DisplayObjectContainer

});