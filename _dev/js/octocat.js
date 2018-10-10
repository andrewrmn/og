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

            if( !generator.classList.contains('is-ready') ) {
                setTimeout(function(){
                    generator.classList.add('is-ready');
                }, 200);
            }
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
                for(var cs = 0; cs < bodyColorSwatches.length; cs++) {
                    bodyColorSwatches[cs].parentNode.classList.remove('is-active');
                }
                this.parentNode.classList.add('is-active');

                mainColor = this.getAttribute('data-color');
                secondColor = this.getAttribute('data-second-color');
                thirdColor = this.getAttribute('data-third-color');

                octocat.setAttribute('body-color', mainColor);
                octocat.setAttribute('body-color-secondary', secondColor);
                octocat.setAttribute('body-color-teriary', thirdColor);
                colorCheck();
            }
        }
        // Set prop color classes
        var propObjects = document.querySelectorAll('.object.props [fill="#282828"], .object.headgear [fill="#282828"]');
        for(var i = 0; i < propObjects.length; i++) {
            propObjects[i].classList.add('main-body-fill');
        }
        // Set prop color classes
        propSecondObjects = document.querySelectorAll('.object.props [fill="#494949"]');
        for(var i = 0; i < propSecondObjects.length; i++) {
            propSecondObjects[i].classList.add('secondary-body-fill');
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
                for(var cs = 0; cs < colorSwatches.length; cs++) {
                    colorSwatches[cs].parentNode.classList.remove('is-active');
                }
                this.parentNode.classList.add('is-active');

                bgColor = this.getAttribute('data-color');
                accentColor = this.getAttribute('data-color-nose');
                octocat.setAttribute('body-color-accent', accentColor);

                var currentBodyColor = artboard.querySelectorAll('.face-fill-color');
                for(var k = 0; k < currentBodyColor.length; k++) {
                    currentBodyColor[k].setAttribute('fill', bgColor);
                }
                colorCheck();
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
                for(var cs = 0; cs < eyeColorSwatches.length; cs++) {
                    eyeColorSwatches[cs].parentNode.classList.remove('is-active');
                }
                this.parentNode.classList.add('is-active');
                bgColor = this.getAttribute('data-color');
                octocat.setAttribute('eye-color', bgColor);

                colorCheck();
            }
        }

        // Eye Accent Color
        var eyeObjects = document.querySelectorAll('.object.eyes [fill="#A34F3E"]');
        for(var i = 0; i < eyeObjects.length; i++) {
            eyeObjects[i].classList.add('eye-fill-color');
        }

        // Eye Accent Color
        var eyeAccentObjects = document.querySelectorAll('.object.eyes [fill="#8D5548"], .object.eyes [fill="#8d5548"]');
        for(var i = 0; i < eyeAccentObjects.length; i++) {
            eyeAccentObjects[i].classList.add('face-accent-fill-color');
        }



        ///////////////////////// Hair Color /////////////////////////
        var hairColor = document.getElementById('hair-color'),
            hairColorSwatches = hairColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < hairColorSwatches.length; i++) {
            var el = hairColorSwatches[i];
            bgColor = el.getAttribute('data-color');
            el.style.color = bgColor;

            el.onclick = function() {
                for(var cs = 0; cs < hairColorSwatches.length; cs++) {
                    hairColorSwatches[cs].parentNode.classList.remove('is-active');
                }
                this.parentNode.classList.add('is-active');
                bgColor = this.getAttribute('data-color');
                octocat.setAttribute('hair-color', bgColor);
                colorCheck();
            }
        }
        // Set hair color classes
        var hairObjects = document.querySelectorAll('.object.hair [fill="#9F592A"]');
        for(var i = 0; i < hairObjects.length; i++) {
            hairObjects[i].classList.add('hair-color');
        }

        ///////////////////////// Facial Hair Color /////////////////////////
        var facehairColor = document.getElementById('facehair-color'),
            facehairColorSwatches = facehairColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < facehairColorSwatches.length; i++) {
            var el = facehairColorSwatches[i];
            bgColor = el.getAttribute('data-color');
            el.style.color = bgColor;

            el.onclick = function() {
                for(var cs = 0; cs < facehairColorSwatches.length; cs++) {
                    facehairColorSwatches[cs].parentNode.classList.remove('is-active');
                }
                this.parentNode.classList.add('is-active');
                bgColor = this.getAttribute('data-color');
                octocat.setAttribute('face-hair-color', bgColor);
                colorCheck();
            }
        }
        // Set hair color classes
        var faceHairObjects = document.querySelectorAll('.object.faceHair [fill="#9F592A"]');
        for(var i = 0; i < faceHairObjects.length; i++) {
            faceHairObjects[i].classList.add('faceHair-color');
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
                    currActive = currCatCP.querySelectorAll('.is-active'),
                    clickedEl = this;


                if(cat == 'misc') {
                    var elClass = this.getAttribute('id');

                    if( this.classList.contains('is-active') ){
                        artboard.querySelector('.' + elClass).remove();
                        cp.querySelector('#' + elClass).classList.remove('is-active');
                        return;
                    }

                } else {


                    //Check if item is Active
                    // if( this.classList.contains('is-active') ){
                    //     var removeBtn = currCatCP.querySelector('.remove-category[data-category=' + cat + ']');
                    //     if(removeBtn){
                    //         removeBtn.click();
                    //     }
                    //     return;
                    // }

                    // Assign Active Class in Control Panel
                    // for(var t = 0; t < currActive.length; t++) {
                    //    currActive[t].classList.remove('is-active');
                    // }

                    // Empty object holder incase anything is left behind
                    // var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
                    // var ohKids = objectHolder.children;

                    // for(var i = 0; i < objectHolder.length; i++) {
                    //     var h = objectHolder[i];
                    //
                    //     if ( h.classList.contains('hide-ears') ) {
                    //         h.classList.remove('hide-ears');
                    //         hideEars--;
                    //     }
                    //     if ( h.classList.contains('hide-headgear') ) {
                    //         h.classList.remove('hide-headgear');
                    //         hideHeadgear--;
                    //     }
                    //     if ( h.classList.contains('hide-hand') ) {
                    //         h.classList.remove('hide-hand');
                    //         hideHand--;
                    //     }
                    //     h.innerHTML = '';
                    // }

                }

                //




                var elClasses = String(clickedEl.getAttribute('data-classes')).split(',');
                for(var c = 0; c < elClasses.length; c++) {
                    cl = elClasses[c];
                    incompatible = 'no-' + cl;

                    if( cp.classList.contains(incompatible) ) {
                        console.log('incompatible');
                        octocat.querySelector(incompatible);
                    }

                    cp.classList.add(cl);

                    catHolders = octocat.querySelectorAll("[data-cat=" + cat + "]");
                    for(var ch = 0; ch < catHolders.length; ch++) {
                        catHolders[ch].classList.add(cl);
                    }

                    console.log(cl);
                }



                ////////// Add the element to artboard
                //Get asset objects
                var svgObjs = this.querySelectorAll('.object');

                console.log(svgObjs.length);

                for(var i = 0; i < svgObjs.length; i++) {
                    var obj = svgObjs[i];

                    // console.log(elClasses);

                    // get associated holder within the octocat svg
                    var holderCat = obj.getAttribute('data-holder');

                    console.log(holderCat);

                    //console.log(holder);
                    holder = document.getElementById(holderCat);

                    for(var c = 0; c < elClasses.length; c++) {
                        cl = elClasses[c];
                        incompatible = 'no-' + cl;

                        if( cp.classList.contains(incompatible) ) {
                            console.log('incompatible');
                            octocat.querySelector(incompatible);
                        }

                        cp.classList.add(cl);


                        console.log(cl);
                    }

                    // if( clickedEl.classList.contains('is-active') ) {
                    //     holder.innerHTML = '';
                    //     clickedEl.classList.remove('is-active');
                    //
                    // } else {
                    //
                    // }

                    // if( clickedEl.classList.contains('is-active') ) {
                    //     console.log('now remove!');
                    //     clickedEl.classList.remove('is-active');

                        // Remove
                        // if(elClasses.length) {
                        //     for(var c = 0; c < elClasses.length; c++) {
                        //         octocat.classList.remove(elClasses[c]);
                        //     }
                        // }


                    //} else {

                        //console.log(currActive.length);

                        for(var t = 0; t < currActive.length; t++) {
                            currActive[t].click();
                        }


                        //console.log('now add');
                        //console.log(elClasses);

                        // Add Classes
                        // if(elClasses.length) {
                        //     for(var c = 0; c < elClasses.length; c++) {
                        //         octocat.classList.add(elClasses[c]);
                        //         cp.classList.add(elClasses[c]);
                        //         holder.classList.add(elClasses[c]);
                        //         //console.log('add class ' + elClasses[c] );
                        //     }
                        // }

                        // if( octocat.classList.contains('no-big-hair') ) {
                        //     targets = octocat.querySelectorAll('no-big-hair');
                        //     for(var c = 0; c < targets.length; c++) {
                        //         targets[c].style.display = 'none';
                        //     }
                        // }


                        // var ocl = octocat.classList;
                        //
                        // octocat.classList = ocl + ' ' + objClasses;

                        // if(cat == 'hair') {
                        //     var hair = document.getElementById('hair-holder');
                        //     if ( obj.classList.contains('big-hair') ) {
                        //         hair.classList.add('big-hair');
                        //     } else {
                        //         hair.classList.remove('big-hair');
                        //     }
                        //
                        //     if ( obj.classList.contains('medium-hair') ) {
                        //         hair.classList.add('medium-hair');
                        //     } else {
                        //         hair.classList.remove('medium-hair');
                        //     }
                        // }

                        // if(cat == 'headgear') {
                        //
                        //     if ( obj.classList.contains('no-big-hair') ) {
                        //         octocat.classList.add('no-big-hair');
                        //     } else {
                        //         octocat.classList.remove('no-big-hair');
                        //     }
                        //
                        //
                        //     if ( obj.classList.contains('no-medium-hair') ) {
                        //         octocat.classList.add('no-medium-hair');
                        //     } else {
                        //         octocat.classList.remove('no-medium-hair');
                        //     }
                        //
                        //     if ( obj.classList.contains('no-hair') ) {
                        //         octocat.classList.add('no-hair');
                        //     } else {
                        //         octocat.classList.remove('no-hair');
                        //     }
                        //
                        //     if ( obj.classList.contains('hide-whiskers') ) {
                        //         octocat.classList.add('hide-whiskers');
                        //     } else {
                        //         octocat.classList.remove('hide-whiskers');
                        //     }
                        // }

                        // if(cat == 'mouths') {
                        //     if ( obj.classList.contains('no-back-facialhair') ) {
                        //         octocat.classList.add('no-back-facialhair');
                        //     } else {
                        //         octocat.classList.remove('no-back-facialhair');
                        //     }
                        // }
                        //
                        // if(cat == 'tops') {
                        //     if ( obj.classList.contains('no-pants') ) {
                        //         octocat.classList.add('no-pants');
                        //         holder.classList.add('disable-pants');
                        //         document.getElementById('bottoms-preview').classList.add('disabled');
                        //     } else {
                        //         octocat.classList.remove('no-pants');
                        //         holder.classList.remove('disable-pants');
                        //         document.getElementById('bottoms-preview').classList.remove('disabled');
                        //     }
                        //
                        //     if ( obj.classList.contains('no-xl-pants') ) {
                        //         octocat.classList.add('no-xl-pants');
                        //     } else {
                        //         octocat.classList.remove('no-xl-pants');
                        //     }
                        //
                        //     if ( obj.classList.contains('big-collar') ) {
                        //         holder.classList.add('big-collar');
                        //     } else {
                        //         holder.classList.remove('big-collar');
                        //     }
                        // }
                        //
                        // if(cat == 'bottoms') {
                        //     if ( obj.classList.contains('xl-pants') ) {
                        //         holder.classList.add('xl-pants');
                        //         console.log('hit');
                        //     } else {
                        //         holder.classList.remove('xl-pants');
                        //     }
                        // }


                        // if(cat == 'headgear') {
                        //     if ( obj.classList.contains('no-big-collars') ) {
                        //         octocat.classList.add('no-big-collars');
                        //         console.log('hit');
                        //     } else {
                        //         octocat.classList.remove('no-big-collars');
                        //     }
                        // }

                        // if ( obj.classList.contains('hide-ears') ) {
                        //     holder.classList.add('hide-ears');
                        //     hideEars++;
                        // }
                        //
                        // if ( obj.classList.contains('hide-headgear') ) {
                        //     holder.classList.add('hide-headgear');
                        //     hideHeadgear++;
                        // }
                        // if ( obj.classList.contains('hide-hand') ) {
                        //     holder.classList.add('hide-hand');
                        //     hideHand++;
                        // }



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
                    //}





                }

                clickedEl.classList.add('is-active');

                //console.log(objects.length);
                headgearCheck(expandHeadgear, hideHeadgear);
                earCheck(hideEars);
                hairCheck();
                handCheck(hideHand);
                colorCheck();
            }
        }




        // ---------------------------------------------------------------------
        //  Remove Object Controller
        // ---------------------------------------------------------------------

        var removeObj = cp.querySelectorAll('.remove-category');

        // for(var i = 0; i < removeObj.length; i++) {
        //     var el = removeObj[i];
        //
        //     el.onclick = function() {
        //         var cat = this.getAttribute('data-category'),
        //             currCatCP = document.getElementById('cp-' + cat ),
        //             currActive = currCatCP.querySelectorAll('.object-preview');
        //
        //         // Assign Active Class in Control Panel
        //         for(var t = 0; t < currActive.length; t++) {
        //            currActive[t].classList.remove('is-active');
        //         }
        //         this.classList.add('is-active');
        //
        //
        //         // Empty object holder incase anything is left behind
        //         var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
        //         var ohKids = objectHolder.children;
        //
        //         for(var i = 0; i < objectHolder.length; i++) {
        //             var h = objectHolder[i];
        //
        //             var ocl = String(octocat.classList);
        //             var hcl = String(h.classList),
        //                 ncl = ocl.replace(hcl, ' ');
        //
        //             console.log(hcl);
        //             //console.log(ncl);
        //
        //
        //             octocat.classList.remove(hcl);
        //
        //
        //             h.classList = '';
        //             // if ( h.classList.contains('hair-with-headgear') ) {
        //             //     h.classList.remove('hair-with-headgear');
        //             //     expandHeadgear--;
        //             // }
        //
        //             // if ( h.classList.contains('no-big-hair') ) {
        //             //     document.getElementById('hair-holder').classList.remove('no-big-hair');
        //             //     h.classList.remove('no-big-hair');
        //             // }
        //             //
        //             // if(cat == 'headgear') {
        //             //     octocat.classList.remove('no-medium-hair');
        //             //     octocat.classList.remove('no-big-hair');
        //             //     octocat.classList.remove('no-hair');
        //             //     octocat.classList.remove('no-big-collars');
        //             //     octocat.classList.remove('hide-whiskers');
        //             // }
        //             //
        //             // if(cat == 'hair') {
        //             //     document.getElementById('hair-holder').classList = '';
        //             // }
        //             //
        //             // if(cat == 'tops') {
        //             //     octocat.classList.remove('no-pants');
        //             //     document.getElementById('tops-holder').classList = '';
        //             //     //document.getElementById('bottoms-preview').classList.remove('disabled');
        //             // }
        //
        //
        //             if ( h.classList.contains('hide-ears') ) {
        //                 h.classList.remove('hide-ears');
        //                 hideEars--;
        //             }
        //
        //             if ( h.classList.contains('hide-headgear') ) {
        //                 h.classList.remove('hide-headgear');
        //                 hideHeadgear--;
        //             }
        //
        //             if ( h.classList.contains('hide-hand') ) {
        //                 h.classList.remove('hide-hand');
        //                 hideHand--;
        //             }
        //             h.innerHTML = '';
        //         }
        //
        //         headgearCheck(expandHeadgear, hideHeadgear);
        //         earCheck(hideEars);
        //         hairCheck();
        //         handCheck(hideHand);
        //     }
        // }


        function earCheck(count){
            if(count == 0) {
                ears.classList.remove('is-hidden');
            } else {
                ears.classList.add('is-hidden');
            }
        }

        function headgearCheck(count, hide){
            // if(count == 0) {
            //     octocat.classList.remove('enlarge-headgear');
            // } else {
            //     octocat.classList.add('enlarge-headgear');
            // }


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

            var fhh = document.getElementById('faceHair-holder');
            var fhbh = document.getElementById('faceHair-back-holder');
            var hideHairColor = true;
            if( fhh.childElementCount > 0 || fhbh.childElementCount > 0 ) {
                document.getElementById('face-hair-color-preview').classList.remove('disabled');
                hideHairColor = false;
            } else {
                document.getElementById('face-hair-color-preview').classList.add('disabled');
                hideHairColor = true;
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


            // Teriary Body Color (Suction Cups)
            var cbct = octocat.getAttribute('body-color-teriary');
            var tbc = document.querySelectorAll('.teriary-body-fill');
            for(var ai = 0; ai < tbc.length; ai++) {
                tbc[ai].setAttribute('fill', cbct);
            }

            // Accent Colors
            var cac = artboard.querySelectorAll('.face-accent-fill-color');
            var ac = octocat.getAttribute('body-color-accent');
            for(var k = 0; k < cac.length; k++) {
                cac[k].setAttribute('fill', ac);
            }

            // Eye Color
            var cec = artboard.querySelectorAll('.eye-fill-color');
            var ec = octocat.getAttribute('eye-color');
            for(var k = 0; k < cec.length; k++) {
                cec[k].setAttribute('fill', ec);
            }

            // Hair Color
            var hc = octocat.getAttribute('hair-color');
            var hcc = document.querySelectorAll('.hair-color');
            for(var ai = 0; ai < hcc.length; ai++) {
                hcc[ai].setAttribute('fill', hc);
            }

            // Face Hair Color
            var fhc = document.querySelectorAll('.faceHair-color');
            for(var ai = 0; ai < fhc.length; ai++) {
                fhc[ai].setAttribute('fill', octocat.getAttribute('face-hair-color'));
            }
        }




        // ---------------------------------------------------------------------
        //  Panel Movement Controller
        // ---------------------------------------------------------------------

        var catPanel = document.querySelectorAll('.category-objects-panel__inner'),
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
