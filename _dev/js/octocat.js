// ---------------------------------------------------------------------
// Global JavaScript
// Authors: Andrew Ross
// ---------------------------------------------------------------------

var andrewrossco = andrewrossco || {};

(function(APP) {

    if( document.getElementById('artboard') ){
        var artboard = document.getElementById('artboard'),
            generator = document.getElementById('octocat-generator'),
            octocat = document.getElementById('octocat');

        function setHeights() {
            ah = window.innerHeight - document.getElementById('ui-wrapper').offsetHeight - document.getElementById('site-header').offsetHeight - document.getElementById('control-panel').offsetHeight;
            gh = window.innerHeight - document.getElementById('site-header').offsetHeight;

            artboard.style.height = ah + 'px';
            generator.style.height = gh + 'px';
        }

        setHeights();

        window.addEventListener("resize", function() {
            setHeights();
        });


        ///////////////////////// Control Panel /////////////////////////

        var cp = document.getElementById('control-panel'),
            ears = document.getElementById('ears'),
            category = cp.querySelectorAll('.category-tile'),
            categoryPanel = document.querySelectorAll('.category-panel');

        function clearActive() {
            for(var i = 0; i < category.length; i++) {
                category[i].classList.remove('is-active');
            }
            for(var p = 0; p < categoryPanel.length; p++) {
                categoryPanel[p].classList.remove('is-active');
            }
        }

        for(var i = 0; i < category.length; i++) {
            var el = category[i];

            el.onclick = function() {
                if( this.classList.contains('is-active') ) {
                    clearActive();
                    return
                } else {
                    clearActive();
                    this.classList.add('is-active');
                    target = this.getAttribute('data-target');
                    target = document.getElementById(target);
                    target.classList.add('is-active');
                    //console.log('category active');

                    checkPanelWidth();
                }
            }
        }



        ///////////////////////// Body Color /////////////////////////
        var bodyColor = document.getElementById('body-color'),
            bodyColorSwatches = bodyColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < bodyColorSwatches.length; i++) {
            var el = bodyColorSwatches[i];
            bgColor = el.getAttribute('data-color');
            secondColor = el.getAttribute('data-second-color');

            //el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                mainColor = this.getAttribute('data-color');
                secondColor = this.getAttribute('data-second-color');

                octocat.setAttribute('body-color', mainColor);
                octocat.setAttribute('body-color-secondary', secondColor);
                colorCheck();
            }
        }


        ///////////////////////// Face Color /////////////////////////
        var faceColor = document.getElementById('face-color'),
            colorSwatches = faceColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < colorSwatches.length; i++) {
            var el = colorSwatches[i];
            bgColor = el.getAttribute('data-color');

            //el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');

                var currentBodyColor = artboard.querySelectorAll('.face-fill-color');
                for(var k = 0; k < currentBodyColor.length; k++) {
                    var paths = currentBodyColor[k];
                    paths.setAttribute('fill', bgColor);
                }

            }
        }



        ///////////////////////// Eye Color /////////////////////////
        var eyeColor = document.getElementById('eye-color'),
            eyeColorSwatches = eyeColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < eyeColorSwatches.length; i++) {
            var el = eyeColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            //el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentEyeColor = artboard.querySelectorAll('.eye-fill-color');

                for(var k = 0; k < currentEyeColor.length; k++) {
                    var paths = currentEyeColor[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }


        ///////////////////////// Hair Color /////////////////////////
        var hairColor = document.getElementById('hair-color'),
            hairColorSwatches = hairColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < hairColorSwatches.length; i++) {
            var el = hairColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            //el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentHair = artboard.querySelectorAll('[data-cat="hair"] > g > path');
                for(var k = 0; k < currentHair.length; k++) {
                    var paths = currentHair[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }

        ///////////////////////// Facial Hair Color /////////////////////////
        var facehairColor = document.getElementById('facehair-color'),
            facehairColorSwatches = facehairColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < facehairColorSwatches.length; i++) {
            var el = facehairColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            //el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentHair = artboard.querySelectorAll('[data-cat="faceHair"] > g > path');
                for(var k = 0; k < currentHair.length; k++) {
                    var paths = currentHair[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }


        var expandHeadgear = 0;
        var hideEars = 0;
        var hideHeadgear = 0;
        var hideHand = 0;

        // ---------------------------------------------------------------------
        //  Add Object Controller
        // ---------------------------------------------------------------------

        var obj = cp.querySelectorAll('.object-preview');

        for(var i = 0; i < obj.length; i++) {
            var el = obj[i];

            el.onclick = function() {
                var cat = this.getAttribute('data-category'),
                    currCatCP = document.getElementById('cp-' + cat ),
                    currActive = currCatCP.querySelectorAll('.object-preview');


                if(cat == 'misc') {
                    var elClass = this.getAttribute('id');

                    if( this.classList.contains('is-active') ){
                        artboard.querySelector('.' + elClass).remove();
                        cp.querySelector('#' + elClass).classList.remove('is-active');
                        return;
                    }
                } else {

                    //Check if item is Active
                    if( this.classList.contains('is-active') ){
                        var removeBtn = currCatCP.querySelector('.remove-category[data-category=' + cat + ']');
                        removeBtn.click();
                        return;
                    }

                    // Assign Active Class in Control Panel
                    for(var t = 0; t < currActive.length; t++) {
                       currActive[t].classList.remove('is-active');
                    }

                    // Empty object holder incase anything is left behind
                    var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
                    var ohKids = objectHolder.children;

                    for(var i = 0; i < objectHolder.length; i++) {
                        var h = objectHolder[i];

                        if ( h.classList.contains('hair-with-headgear') ) {
                            h.classList.remove('hair-with-headgear');
                            expandHeadgear--;
                        }
                        if ( h.classList.contains('hide-ears') ) {
                            h.classList.remove('hide-ears');
                            hideEars--;
                        }
                        if ( h.classList.contains('hide-headgear') ) {
                            h.classList.remove('hide-headgear');
                            hideHeadgear--;
                        }
                        if ( h.classList.contains('hide-hand') ) {
                            h.classList.remove('hide-hand');
                            hideHand--;
                        }
                        h.innerHTML = '';
                    }

                }

                this.classList.add('is-active');

                ////////// Add the element to artboard
                //Get asset objects
                var svgObjs = this.querySelectorAll('.object');

                for(var i = 0; i < svgObjs.length; i++) {
                    var obj = svgObjs[i];

                    // get associated holder within the octocat svg
                    var holderCat = obj.getAttribute('data-holder');
                    //console.log(holder);
                    holder = document.getElementById(holderCat);

                    if ( obj.classList.contains('hair-with-headgear') ) {
                        holder.classList.add('hair-with-headgear');
                        expandHeadgear++;
                    }

                    if(cat == 'hair') {
                        var hair = document.getElementById('hair-holder');

                        if ( obj.classList.contains('big-hair') ) {
                            hair.classList.add('big-hair');
                        } else {
                            hair.classList.remove('big-hair');
                        }
                    }
                    if(cat == 'headgear') {
                        var hair = document.getElementById('hair-holder');
                        if ( obj.classList.contains('no-big-hair') ) {
                            octocat.classList.add('no-big-hair');
                        } else {
                            octocat.classList.remove('no-big-hair');
                        }

                        if ( obj.classList.contains('no-hair') ) {
                            octocat.classList.add('no-hair');
                        } else {
                            octocat.classList.remove('no-hair');
                        }
                    }

                    if ( obj.classList.contains('hide-ears') ) {
                        holder.classList.add('hide-ears');
                        hideEars++;
                    }

                    if ( obj.classList.contains('hide-headgear') ) {
                        holder.classList.add('hide-headgear');
                        hideHeadgear++;
                    }
                    if ( obj.classList.contains('hide-hand') ) {
                        holder.classList.add('hide-hand');
                        hideHand++;
                    }



                    var svg = obj.querySelectorAll('svg > g');

                    for(var s = 0; s < svg.length; s++) {
                        var s = svg[s];
                        if(cat == 'misc') {
                            s.classList.add(elClass);
                        }
                        // Clone Objects
                        var gClone = s.cloneNode(true);
                        holder.append(gClone);
                    }


                    //if ( obj.classList.contains('props') ) {
                        colorCheck();
                    // }

                }

                //console.log(objects.length);
                headgearCheck(expandHeadgear, hideHeadgear);
                earCheck(hideEars);
                hairCheck();
                handCheck(hideHand);

            }
        }




        // ---------------------------------------------------------------------
        //  Remove Object Controller
        // ---------------------------------------------------------------------

        var removeObj = cp.querySelectorAll('.remove-category');

        for(var i = 0; i < removeObj.length; i++) {
            var el = removeObj[i];

            el.onclick = function() {
                var cat = this.getAttribute('data-category'),
                    currCatCP = document.getElementById('cp-' + cat ),
                    currActive = currCatCP.querySelectorAll('.object-preview');

                // Assign Active Class in Control Panel
                for(var t = 0; t < currActive.length; t++) {
                   currActive[t].classList.remove('is-active');
                }
                this.classList.add('is-active');


                // Empty object holder incase anything is left behind
                var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
                var ohKids = objectHolder.children;

                for(var i = 0; i < objectHolder.length; i++) {
                    var h = objectHolder[i];

                    if ( h.classList.contains('hair-with-headgear') ) {
                        h.classList.remove('hair-with-headgear');
                        expandHeadgear--;
                    }

                    if ( h.classList.contains('no-big-hair') ) {
                        document.getElementById('hair-holder').classList.remove('no-big-hair');
                        h.classList.remove('no-big-hair');
                    }

                    if(cat == 'headgear') {

                        octocat.classList.remove('no-big-hair');
                        octocat.classList.remove('no-hair');

                    }

                    if ( h.classList.contains('hide-ears') ) {
                        h.classList.remove('hide-ears');
                        hideEars--;
                    }

                    if ( h.classList.contains('hide-headgear') ) {
                        h.classList.remove('hide-headgear');
                        hideHeadgear--;
                    }

                    if ( h.classList.contains('hide-hand') ) {
                        h.classList.remove('hide-hand');
                        hideHand--;
                    }
                    h.innerHTML = '';
                }

                headgearCheck(expandHeadgear, hideHeadgear);
                earCheck(hideEars);
                hairCheck();
                handCheck(hideHand);
            }
        }


        function earCheck(count){
            if(count == 0) {
                ears.classList.remove('is-hidden');
            } else {
                ears.classList.add('is-hidden');
            }
        }

        function headgearCheck(count, hide){
            if(count == 0) {
                octocat.classList.remove('enlarge-headgear');
            } else {
                octocat.classList.add('enlarge-headgear');
            }


            if(hide == 0) {
                document.getElementById('headgear-preview').classList.remove('disabled');

            } else {
                document.getElementById('headgear-preview').classList.add('disabled');

                var h = document.getElementById('headgear-holder');

                if ( h.classList.contains('hide-ears') ) {
                    h.classList.remove('hide-ears');
                    hideEars--;
                }
                h.innerHTML = '';

                earCheck(hideEars);
            }
        }

        function hairCheck() {

            var hh = document.getElementById('hair-holder');

            if( hh.childElementCount > 0) {
                document.getElementById('hair-color-preview').classList.remove('disabled');
            } else {
                document.getElementById('hair-color-preview').classList.add('disabled');
            }

            // if( octocat.classList.contains('no-big-hair') ) {
            //     document.getElementById('hair-holder').classList.add('no-big-hair');
            // } else {
            //     document.getElementById('hair-holder').classList.remove('no-big-hair');
            // }



            var fhh = document.getElementById('faceHair-holder');
            var fhbh = document.getElementById('faceHair-back-holder');
            if( fhh.childElementCount > 0 || fhbh.childElementCount > 0 ) {
                document.getElementById('face-hair-color-preview').classList.remove('disabled');
            } else {
                document.getElementById('face-hair-color-preview').classList.add('disabled');
            }
        }

        var handCloned = false;
        var handClone = hand.innerHTML;

        function handCheck(count){
            var hand = document.getElementById('hand');


            if(count == 0) {
                octocat.classList.remove('hide-hand');
                hand.innerHTML = handClone;
                colorCheck();
            } else {
                octocat.classList.add('hide-hand');
                hand.innerHTML = '';
            }
        }

        function colorCheck() {
            // Primary Body Color
            var cbc = octocat.getAttribute('body-color');
            var bc = document.querySelectorAll('.main-body-fill');
            for(var ai = 0; ai < bc.length; ai++) {
                bc[ai].setAttribute('fill', cbc);
            }
            // Secondary Body Color
            var cbcs = octocat.getAttribute('body-color-secondary');
            var sbc = document.querySelectorAll('.secondary-body-fill');
            for(var ai = 0; ai < sbc.length; ai++) {
                sbc[ai].setAttribute('fill', cbcs);
            }
        }




        // ---------------------------------------------------------------------
        //  Panel Movement Controller
        // ---------------------------------------------------------------------

        var catPanel = document.querySelectorAll('.category-objects-panel__inner, .color-panel__inner'),
            scrollDist = 350;

        function checkPanelWidth() {

            for(var i = 0; i < catPanel.length; i++) {
                var panel = catPanel[i],
                    scrollRight = panel.parentNode.getElementsByClassName('scroll-right')[0],
                    scrollLeft = panel.parentNode.getElementsByClassName('scroll-left')[0];

                if( panel.scrollWidth > panel.offsetWidth ) {
                    scrollRight.classList.remove('disabled');
                }
            }
        }

        for(var i = 0; i < catPanel.length; i++) {
            var panel = catPanel[i],
                scrollRight = panel.parentNode.getElementsByClassName('scroll-right')[0],
                scrollLeft = panel.parentNode.getElementsByClassName('scroll-left')[0],
                currentScroll = panel.scrollLeft;

            function checkPos(el) {
                //console.log(el);
                ml = window.getComputedStyle(el);
                addMargins = parseInt(ml.marginLeft, 10) * 2;
                scrollRight = el.parentNode.getElementsByClassName('scroll-right')[0],
                scrollLeft = el.parentNode.getElementsByClassName('scroll-left')[0];
                curScroll = el.scrollLeft + el.offsetWidth;

                if( curScroll >= el.scrollWidth ) {
                    scrollRight.classList.add('disabled');
                } else {
                    scrollRight.classList.remove('disabled');
                }

                if ( el.scrollLeft <= 40) {
                    scrollLeft.classList.add('disabled');
                } else {
                    scrollLeft.classList.remove('disabled');
                }
            }


            scrollRight.onclick = function() {

                var par = this.parentNode.children[0];

                if (window.innerWidth < 800) {
                    scrollDist = 150;
                    scrollDist = par.offsetWidth - 44;
                } else {
                    scrollDist = 350;
                }

                currentScroll = par.scrollLeft;
                currentScroll = currentScroll + scrollDist;
                //console.log(currentScroll);
                TweenMax.to(par, 0.7, {scrollLeft: currentScroll, ease: Circ.ease });
                checkPos(par);

                //console.log(par);
            }

            scrollLeft.onclick = function() {
                var par = this.parentNode.children[0];
                //console.log(par);
                currentScroll = par.scrollLeft;
                currentScroll = currentScroll - scrollDist;
                //console.log(currentScroll);
                TweenMax.to(par, 0.7, {scrollLeft: currentScroll, ease: Circ.ease });
                checkPos(par);
            }

            panel.onmouseleave = function() {
                currentScroll = this.scrollLeft;
                checkPos(this);
            }


            panel.onmousedown = function(event) {
                //console.log('Mouse down on element');
                var par = this;

                mouseStart = event.clientX;
                currentScrollPos =  par.scrollLeft;

                document.onmouseover = function(event) {
                    par.classList.add('moving');
                    amountMoved = -(event.clientX - mouseStart);
                    scrollAmount = currentScrollPos + amountMoved;
                    //console.log('Amount to scroll this drag = ' + scrollAmount);
                    //console.log(scrollAmount * 0.5);
                    TweenMax.to(par, 1, {scrollLeft: scrollAmount, ease: Circ.ease });
                }
                panel.onmouseout = function(event) {
                    document.onmouseover = '';
                    //console.log('done');
                    this.classList.remove('moving');
                }
            }

            panel.onmouseup = function(event) {
                document.onmouseover = '';
                //console.log('done');
                this.classList.remove('moving');
            }
        }




        // ---------------------------------------------------------------------
        //  Start Over
        // ---------------------------------------------------------------------



        var reset = document.getElementById('start-over'),
            icon = reset.querySelector('img'),
            resetModal = document.getElementById('reset-modal'),
            cookieInput = document.getElementById('reset-message');

        //localStorage.removeItem('quickReset');

        reset.onclick = function() {
            if( localStorage.getItem('quickReset') ) {
                window.location.reload();
            } else {
                resetModal.classList.add('is-active');
                document.body.classList.add('modal-is-active');
            }
        }

        document.getElementById('reset').onclick = function(e) {
            e.preventDefault();

            if( cookieInput.checked ) {
                localStorage.setItem('quickReset', true);
                window.location.reload();
            } else {
                window.location.reload();
            }
        }

        document.getElementById('close-reset-modal').onclick = function(e) {
            e.preventDefault();
            resetModal.classList.remove('is-active');
            document.body.classList.remove('modal-is-active');
        }

        resetModal.querySelector('.screen').onclick = function() {
            resetModal.classList.remove('is-active');
            document.body.classList.remove('modal-is-active');
        }

        reset.addEventListener("mouseenter", function( event ) {
            TweenMax.to(icon, 0.8, {rotation: -360, transformOrigin:"50% 50%", ease:  Power4.easeOut });
        });

        reset.addEventListener("mouseout", function( event ) {
            TweenMax.to(icon, 0, {rotation: 0});
        });



        var finish = document.getElementById('save'),
            fIcon = finish.querySelector('img');

        finish.addEventListener("mouseenter", function( event ) {
            TweenMax.to(fIcon, 0.8, {x: 4, ease:  Power4.easeOut });
        });
        finish.addEventListener("mouseout", function( event ) {
            TweenMax.to(fIcon, 0.8, {x: 0, ease:  Power4.easeOut });
        });






        // ---------------------------------------------------------------------
        //  UI
        // ---------------------------------------------------------------------



    }
}(andrewrossco));
