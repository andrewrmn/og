'use strict';

//const $ = require('jquery');

class App {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

        this.doc = document.documentElement;

		$(function(){
            document.body.classList.add("page-ready");
        });

		if ( ! ('ontouchstart' in window) ) {
            this.doc.classList.add('no-touch');
        }

		if ( 'ontouchstart' in window ) {
            this.doc.classList.add('is-touch');
        }

		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
            if(navigator.appVersion.indexOf('Trident') === -1) {
                this.doc.classList.add('isEDGE');
            } else {
                this.doc.classList.add('isIE isIE11');
            }
        }
	}

}

module.exports = App;
