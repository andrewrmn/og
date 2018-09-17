// ---------------------------------------------------------------------
// Global JavaScript
// Authors: Andrew Ross
// ---------------------------------------------------------------------

var andrewrossco = andrewrossco || {};

(function(APP) {

    if( document.getElementById('artboard') ){
        var artboard = document.getElementById('artboard'),
            generator = document.getElementById('octocat-generator');

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


        //console.log(gh);

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

            el.style.background = bgColor;
            el.style.color = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');

                var currentBodyColor = artboard.querySelectorAll('.current-body-color');
                for(var k = 0; k < currentBodyColor.length; k++) {
                    var paths = currentBodyColor[k];
                    paths.setAttribute('fill', bgColor);
                }

                secondColor = this.getAttribute('data-second-color');
                secondaryBodyColor = artboard.querySelectorAll('.secondary-body-fill');

                for(var k = 0; k < secondaryBodyColor.length; k++) {
                    var paths = secondaryBodyColor[k];
                    paths.setAttribute('fill', secondColor);
                }
            }
        }



        ///////////////////////// Eye Color /////////////////////////
        var eyeColor = document.getElementById('eye-color'),
            eyeColorSwatches = eyeColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < eyeColorSwatches.length; i++) {
            var el = eyeColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            el.style.background = bgColor;
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

            el.style.background = bgColor;
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

                //console.log(currCatCP);
                //console.log(cat + 'clicked');

                // Assign Active Class in Control Panel
                for(var t = 0; t < currActive.length; t++) {
                   currActive[t].classList.remove('is-active');
                }
                this.classList.add('is-active');


                // Empty object holder incase anything is left behind
                var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
                var ohKids = objectHolder.children;

                for(var i = 0; i < objectHolder.length; i++) {

                    var ohKids = objectHolder[i].children;

                    for(var k = 0; k < ohKids.length; k++) {
                        var co = ohKids[k];

                        // Check for ear hiding
                        if ( co.classList.contains('hide-ears') ) {
                            earCheck();
                        }

                        // Check for hair with headgear hiding
                        if ( co.classList.contains('hair-with-headgear') ) {
                            artboard.classList.remove('enlarge-headgear');
                        }
                    }

                    objectHolder[i].innerHTML = '';
                }



                ////////// Add the element to artboard

                //Get asset objects
                var svgObjs = this.querySelectorAll('.object');

                for(var i = 0; i < svgObjs.length; i++) {
                    var obj = svgObjs[i];

                    // get associated holder within the octocat svg
                    var holder = obj.getAttribute('data-holder');
                    //console.log(holder);
                    holder = document.getElementById(holder);


                    // if ( g.classList.contains('hair') ) {
                    //     console.log('run hair check');
                    //
                    //     var hasHair = artboard.querySelectorAll('.hair-with-headgear');
                    //
                    //     if( hasHair.length >= 1 ) {
                    //         //g.classList.add('enlarge');
                    //         console.log('Make headgear bigger to fit hair');
                    //     } else {
                    //         //g.classList.remove('enlarge');
                    //         console.log('no hair detected');
                    //     }
                    // }

                    var svg = obj.querySelectorAll('svg > g');

                    for(var s = 0; s < svg.length; s++) {
                        var s = svg[s];
                            //console.log(s);
                        // Clone Objects
                        var gClone = s.cloneNode(true);
                        holder.append(gClone);
                    }



                    // if ( g.classList.contains('back') ) {
                    //     //Get correct holder in master svg
                    //     holder = document.getElementById(cat + '-back-holder');
                    //     holder.prepend(gClone);
                    // } else {
                    //     holder.append(gClone);
                    // }



                    // Check for hair hiding
                    // if ( obj.classList.contains('hide-hair') ) {
                    //     var hideHair = artboard.querySelectorAll('g.hair-no-headgear');
                    //
                    //     for(var h = 0; h < hideHair.length; h++) {
                    //         hideHair[h].remove();
                    //         console.log('hide hair piece');
                    //     }
                    // }
                }

                //console.log(objects.length);


                headgearCheck();
                earCheck();

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
                    currActive = currCatCP.querySelectorAll('.object-preview'),
                    currObj = artboard.querySelectorAll('g.' + cat);

                    //console.log("active objs count " + currObj.length);

                // remove all active class from Control Panel
                for(var i = 0; i < currActive.length; i++) {
                    currActive[i].classList.remove('is-active');
                }

                // remove all elements with this class
                for(var i = 0; i < currObj.length; i++) {
                    //var co = currObj[i];
                    currObj[i].remove();
                }

                // Empty object holder incase anything left behind
                var objectHolder = artboard.querySelectorAll('[data-cat=' + cat + ']');
                for(var i = 0; i < objectHolder.length; i++) {
                    objectHolder[i].innerHTML = '';
                }


                headgearCheck();
                earCheck();
            }
        }



        function earCheck(){
            // Check if any active objects contain the hide ears class
            activeObjs = artboard.querySelectorAll('g.hide-ears');
            //console.log('Hide ear count ' + activeObjs.length);
            if(activeObjs.length == 0) {
                ears.classList.remove('is-hidden');
                //console.log('Show ears');
            } else {
                ears.classList.add('is-hidden');
                //console.log('hide ears');
            }
        }


        function headgearCheck(){
            // Check if any active objects contain the hide headgear
            activeObjs = artboard.querySelectorAll('.hide-headgear');
            //console.log('Hide ear count ' + activeObjs.length);
            if(activeObjs.length > 0) {
                document.getElementById('headgear-preview').classList.add('disabled');

                headgear = artboard.querySelectorAll('.headgear');
                for(var i = 0; i < headgear.length; i++) {
                    headgear[i].remove();
                }
                headgearCP = cp.querySelectorAll('#cp-headgear .object-preview');
                for(var i = 0; i < headgearCP.length; i++) {
                    headgearCP[i].classList.remove('is-active');
                }

                //console.log('Hide headgear');
            } else {
                document.getElementById('headgear-preview').classList.remove('disabled');
            }


            // Check for hair that does allow headgear
            activeObjs = artboard.querySelectorAll('.hair-with-headgear');

            if(activeObjs.length == 0) {
                artboard.classList.remove('enlarge-headgear');
                //console.log('Regualr Headgear');
            } else {
                artboard.classList.add('enlarge-headgear');
                //console.log('Enlarged Headgear');
            }
        }

        function hairCheck() {
            // Check if any active objects contain the hide hair
            activeObjs = artboard.querySelectorAll('g.hide-hair');
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

        function reset() {
            window.location.reload();
        }


        //Cookie Code

        // $(document).ready(function(){
        //     var loaded = parseInt(localStorage.getItem('loaded'), 10),
        //         loaded_numb = loaded?loaded+1:1;
        //     localStorage.setItem('loaded', loaded_numb);
        //
        //     if( loaded_numb == 1 ) {
        //         setTimeout(function(){
        //             document.getElementById('newsletter-signup').classList.add('is-active');
        //         }, 6000);
        //     }
        // });

        document.getElementById('start-over').onclick = function() {
            reset();
        }








        // // ---------------------------------------------------------------------
        // //  Save
        // // ---------------------------------------------------------------------
        //
        // var save = document.getElementById('save');
        // var hg = document.getElementById('octocat');
        //
        // // var ah = document.getElementById('asset-holders');
        // // var ahClone = ah.cloneNode(true);
        // //
        // // var ah = document.getElementById('render');
        // // render.append(ahClone);
        //
        // var options = {
        //     allowTaint: true,
        //     foreignObjectRendering: true,
        //     imageTimeout: 0
        // };
        // save.onclick = function() {
        //
        //     var ah = document.getElementById('asset-holders');
        //     var ahClone = ah.cloneNode(true);
        //
        //     var render = document.getElementById('render');
        //     render.append(ahClone);
        //
        //     html2canvas(render, options).then(canvas => {
        //         document.body.appendChild(canvas)
        //     });
        //
        //     // html2canvas(document.getElementById('octocat'), {
        //     //     onrendered: function(canvas) {
        //     // 		var canvas1 = document.getElementById('myCanvas');
        //     //         var ctx = canvas1.getContext('2d');
        //     //         ctx.drawImage(canvas, 0, 0);
        //     //     }
        //     // });
        //
        //
        //     // var c = document.getElementById("myCanvas");
        //     // var ctx = c.getContext("2d");
        //     // var img = document.getElementById("asset-holders");
        //     // ctx.drawImage(img,10,10);
        // }

    }
}(andrewrossco));
