'use strict';

const $ = require('jquery');

class Viewport {

	constructor( options ) {

		//setup any defaults
		this.defaults = {};

		//merge options with defaults
		this.settings = $.extend( true, {}, this.defaults, options );

		this.events();
	}


	events() {

		var items = document.querySelectorAll('*[data-animate-in], *[data-detect-viewport]'),
            pageOffset = window.pageYOffset;

        function isScrolledIntoView(el) {
            var rect = el.getBoundingClientRect(),
                elemTop = rect.top,
                elemBottom = rect.top + el.offsetHeight,
                bottomWin = pageOffset + window.innerHeight;

            return (elemTop < bottomWin && elemBottom > 0);
        }

        function detect() {
            for(var i = 0; i < items.length; i++) {
                if ( isScrolledIntoView(items[i]) ) {
                    if( !items[i].classList.contains('in-view') ) {
                        items[i].classList.add('in-view');
                    }
                }
                else {
                    if( items[i].classList.contains('in-view') ) {
                        items[i].classList.remove('in-view');
                    }
                }
            }
        }

        window.addEventListener('scroll', detect);
        window.addEventListener('resize', detect);


		for(var i = 0; i < items.length; i++) {
			var d = 0,
				el = items[i];

			if( items[i].getAttribute('data-animate-in-delay') ) {
				d = items[i].getAttribute('data-animate-in-delay') / 1000 + 's';
			} else {
				d = 0;
			}
            el.style.transitionDelay = d;
		}

        setTimeout(function(){
            detect();
        }, 500);

	}

}

module.exports = Viewport;
