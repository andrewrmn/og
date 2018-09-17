// ---------------------------------------------------------------------
// Global JavaScript
// Authors: Andrew Ross & a little help from my friends
// ---------------------------------------------------------------------

(function() {

general();
viewPort();
lines();


// ---------------------------------------------------------------------
// Browser and Feature Detection
// ---------------------------------------------------------------------
function general() {
    this.doc = document.documentElement;

    setTimeout(function(){
        document.body.classList.add('page-loaded');
    }, 400);

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

    var mt = document.getElementById('menu-toggle');
		bd = document.body;

	mt.onclick = function() {
		if( bd.classList.contains('menu-is-open') ){
			bd.classList.remove('menu-is-open');
		} else {
			bd.classList.add('menu-is-open');
		}
	}
}



// ---------------------------------------------------------------------
// Detect when an element is in the viewport
// ---------------------------------------------------------------------

function viewPort(){
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
                    var el = items[i];
                    el.classList.add('in-view');
                    var delay = parseFloat(el.getAttribute('data-animate-in-delay'));
                    if(!el.getAttribute('data-animate-in-delay')) {
                        delay = 0;
                    }
                    if(el.getAttribute('data-animate-in') == 'up'){
                        TweenMax.to(el, .8, { alpha: 1, y: 0 }).delay(delay);
                        TweenMax.to(el, .8, { scale: 1, rotation: 0, ease: Elastic.easeOut.config(1, 0.7) }).delay(delay);
                    } else {
                        TweenMax.to(el, .1, { alpha: 1, ease: Power4.easeOut }).delay(delay);
                    }

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

        if( el.getAttribute('data-animate-in') == 'up' ){
            TweenMax.to(items[i], 0, { scale: 0.6, rotation: 15, alpha: 0 });
        } else {
            TweenMax.to(items[i], 0, { alpha: 0 });
        }
        //
		// if( items[i].getAttribute('data-animate-in-delay') ) {
		// 	d = items[i].getAttribute('data-animate-in-delay') / 1000 + 's';
		// } else {
		// 	d = 0;
		// }
        // el.style.transitionDelay = d;
	}

    setTimeout(function(){
        detect();
    }, 500);
}





// ---------------------------------------------------------------------
// Detect when an element is in the viewport
// ---------------------------------------------------------------------

function lines() {
    if(document.getElementById('draw-svg')) {

        var svg = document.getElementById('draw-svg'),
            line = document.getElementById('draw-svg-line'),
            arrow = document.getElementById('draw-svg-arrow');

        TweenMax.to(line, 0, {alpha:0});

        TweenMax.to(arrow, 0, { scale:0.4, alpha: 0, transformOrigin:"50% 50%" });

        var orig = line, length, timer;
        var timing = 2;

        var obj = {
            length: 0,
            pathLength: orig.getTotalLength()
        }

        TweenMax.to(line, 0.4, {alpha:.2}).delay(1);
        var t = TweenMax.to(obj, timing, {length:obj.pathLength, onUpdate:drawLine, ease:Linear.easeInOut}).delay(1);

        function drawLine() {
            orig.style.strokeDasharray = [obj.length,obj.pathLength].join(' ');
        }

        var scaleW = 1;

        if( window.innerWidth < 600) {
            scaleW = 2;
        }
        TweenMax.to(arrow, .4, {alpha: 1, ease: Power0.easeNone }).delay(2.8);
        TweenMax.to(arrow, 3, { scale:scaleW, ease: Elastic.easeOut.config(1, 0.3) }).delay(2.8);


    }
}

})();
