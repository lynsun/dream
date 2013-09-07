define(function(require, exports, module){
	var utils={};
	/*
	*@detemine whether or not obj instanceof Array
	*@param obj{Object}
	*@return true when obj instanceof Array,false or not
	*/
	utils.isArray=function(obj){
		return Object.prototype.toString.call(obj)==='[object Array]';
	}

	// Is a given value a number?
	utils.isNumber = function(obj) {
		return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
	};

	//Is a given obj a function?
	utils.isFunction=function(obj){
		return !!(obj && obj.constructor && obj.call && obj.apply);
	}
	
	/*
	*@Inheritance Mechanism
	*@param subClass{Function}:childClass
	*@param superClass{Function}:parentClass
	*/
	utils.extend=function(subClass,superClass){
		var F=function(){};
		F.prototype=superClass.prototype;
		subClass.prototype=new F();
		subClass.prototype.constructor=subClass;
		subClass.superclass=superClass.prototype;
		if(superClass.prototype.constructor==Object.prototype.constructor){
			superClass.prototype.constructor=superClass;
		}
	}

	/*
	*@bind context and args for function
	*@param fn{function}
	*@param context{Object}:this obj
	*@return fn{function}
	*/
	utils.bind=function(fn,context){
		var args=Array.prototype.slice.call(arguments,2);
		return function(){
			return fn.apply(context,args.concat(Array.prototype.slice.call(arguments)));
		};
	}

	return utils;
});


