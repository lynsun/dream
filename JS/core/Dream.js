/*
*@fileoverview Dream.js
*/
define(function(require, exports, module){
	//the game namespace Dream
	var Dream=window.Dream={};
	
	//package display
	var display=Dream.display={};
	display.DisplayObject=require('display/DisplayObject');
	display.Frame=require('display/Frame');
	display.Scene=require('display/Scene');
	display.Bitmap=require('display/Bitmap');
	display.MovieClip=require('display/MovieClip');
	display.DisplayObjectContainer=require('display/DisplayObjectContainer');
	display.Stage=require('display/Stage');
	display.Sprite=require('display/Sprite');
	
	//package utils
	var utils=Dream.utils=require('utils/utils');
	utils.Timer=require('utils/Timer');
	
	//package events
	var events=Dream.events={};
	events.EventDispatcher=require('events/EventDispatcher');

	//package geom
	var geom=Dream.geom={};
	geom.Rectangle=require('geom/Rectangle');
	
	//API
	Dream.extend=utils.extend;
	return Dream;
});