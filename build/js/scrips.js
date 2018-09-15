'use strict';

const $ = require('jquery');
const App = require('./modules/app.js');
const Viewport = require('./modules/viewport.js');
//const Test = require('./modules/test.js');
const ClickFunctions = require('./modules/clickFunction.js');
const ScrollTo = require('./modules/scrollTo.js');
const Tabs = require('./modules/tabs.js');

$(function(){
	//create the app.
	let app = new App();
	let viewport = new Viewport();
	let clickFunctions = new ClickFunctions();
	let scrollTo = new ScrollTo();
	let tabs = new Tabs();
});
