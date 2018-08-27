'use strict';

const $ = require('jquery');

class ClickFunctions {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		if( $('*[data-click-target]').length ) {
			this.events();
        } else {
            return;
        }
	}


	events() {

		$('*[data-click-target]').on('click touchstart:not(touchmove)', function() {

            var trigger = $(this).attr('data-click-target'),
                bc = $(this).attr('data-click-bodyClass'),
                oc = $(this).attr('data-click-class'),
                target = $("#" + trigger);

            // Check for custom class
            if( $(this).attr('data-click-class') ) {
                if( target.hasClass(oc) ) {
                    target.removeClass(oc);
                } else {
                   target.addClass(oc);
                }
            } else {
                if( target.hasClass('is-active') ) {
                    target.removeClass('is-active');
                } else {
                   target.addClass('is-active');
                }
            }

            // Check for additional body class
            if( $(this).attr('data-click-bodyClass') ) {
                if( $('body').hasClass(bc) ) {
                    $('body').removeClass(bc);
                } else {
                   $('body').addClass(bc);
                }
            }
        });

	}

}

module.exports = ClickFunctions;
