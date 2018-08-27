// ---------------------------------------------------------------------
// Global JavaScript
// Authors: Andrew Ross & a little help from my friends
// ---------------------------------------------------------------------


var andrewrossco = andrewrossco || {};

(function(APP) {

    //function octocat() {
    if( document.getElementById('octocat-generator') ) {

        var artboard = document.getElementById('octocat'),
            cp = document.getElementById('control-panel'),
            ears = artboard.getElementById('ears'),
            category = cp.querySelectorAll('.category-tile'),
            categoryPanel = cp.querySelectorAll('.category-panel'),
            colorTrigger = cp.querySelectorAll('.color-panel-trigger'),
            colorPanel = cp.querySelectorAll('.color-panel');


        function clearActive() {
            for(var i = 0; i < category.length; i++) {
                category[i].classList.remove('is-active');
            }
            for(var i = 0; i < categoryPanel.length; i++) {
                categoryPanel[i].classList.remove('is-active');
            }
            for(var i = 0; i < colorTrigger.length; i++) {
                colorTrigger[i].classList.remove('is-active');
            }
            for(var i = 0; i < colorPanel.length; i++) {
                colorPanel[i].classList.remove('is-active');
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
                }
            }
        }


        for(var i = 0; i < colorTrigger.length; i++) {
            var el = colorTrigger[i];

            el.onclick = function() {

                if( this.classList.contains('is-active') ) {
                    //clearActive();
                    return
                } else {
                    //clearActive();
                    this.classList.add('is-active');
                    target = this.getAttribute('data-target');
                    target = document.getElementById(target);
                    target.classList.add('is-active');
                }
            }
        }




        ///////////////////////// Body Color /////////////////////////
        var bodyColor = document.getElementById('body-color'),
            bodyColorSwatches = bodyColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < bodyColorSwatches.length; i++) {
            var el = bodyColorSwatches[i];
            bgColor = el.getAttribute('data-color');
            el.style.background = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentBodyColor = artboard.querySelectorAll('.current-body-color');

                for(var k = 0; k < currentBodyColor.length; k++) {
                    var paths = currentBodyColor[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }



        ///////////////////////// Body Color /////////////////////////
        var eyeColor = document.getElementById('eye-color'),
            eyeColorSwatches = eyeColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < eyeColorSwatches.length; i++) {
            var el = eyeColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            el.style.background = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentEyeColor = artboard.querySelectorAll('.eye-fill-color');

                for(var k = 0; k < currentEyeColor.length; k++) {
                    var paths = currentEyeColor[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }



        // ---------------------------------------------------------------------
        //  Hair
        // ---------------------------------------------------------------------

        // ///////////////////////// ADD /////////////////////////
        // var hair = cp.querySelectorAll('div.hair');
        // for(var i = 0; i < hair.length; i++) {
        //     var el = hair[i];
        //
        //     el.onclick = function() {
        //         console.log('hair added');
        //
        //         for(var t = 0; t < hair.length; t++) {
        //            hair[t].classList.remove('is-active');
        //         }
        //
        //         this.classList.add('is-active');
        //
        //         var objects = this.getElementsByTagName('g');
        //
        //         // Remove Wrap
        //         var currentObjects = artboard.querySelectorAll('g.hair');
        //
        //         // remove all elements with this class
        //         for(var i = 0; i < currentObjects.length; i++) {
        //             var co = currentObjects[i];
        //             co.remove();
        //
        //             if ( co.classList.contains('hide-ears') ) {
        //
        //                 var allObjects = artboard.querySelectorAll('g.hide-ears');
        //
        //                 if( allObjects.length == 0 ) {
        //                     ears.classList.remove('is-hidden');
        //                     console.log('show ears');
        //                 } else {
        //                     console.log('something else hidding ears');
        //                 }
        //             }
        //
        //         }
        //
        //
        //         // Check for headgear that need to be enlarged with hair
        //         var headgear = artboard.querySelectorAll('.hair-check');
        //         for(var i = 0; i < headgear.length; i++) {
        //             var el = headgear[i];
        //             el.classList.add('enlarge');
        //         }
        //
        //
        //         // Add to artboard
        //         for(var i = 0; i < objects.length; i++) {
        //
        //             var g = objects[i],
        //                 gClone = g.cloneNode(true);
        //
        //             if ( g.classList.contains('back') ) {
        //                 artboard.getElementById('hair-back-holder').append(gClone);
        //             } else {
        //                 artboard.getElementById('hair-front-holder').append(gClone);
        //             }
        //
        //             if ( g.classList.contains('hide-ears') ) {
        //                 ears.classList.add('is-hidden');
        //                 console.log('hide-ears');
        //             }
        //         }
        //     }
        // }


        // ///////////////////////// Remove Hair /////////////////////////
        // var removeHair = document.getElementById('remove-hair');
        //
        // removeHair.onclick = function() {
        //     // Remove hair from artboard
        //     var currentHair = artboard.querySelectorAll('g.hair');
        //     for(var i = 0; i < currentHair.length; i++) {
        //         var el = currentHair[i];
        //         el.parentNode.removeChild(el);
        //
        //         if ( el.classList.contains('hide-ears') ) {
        //             ears.classList.add('is-hidden');
        //             var earCheck = artboard.querySelectorAll('g.hide-ears');
        //
        //             if (earCheck.length == 0) {
        //                 ears.classList.remove('is-hidden');
        //             }
        //         }
        //     }
        //
        //     // Remove active class from hair in control panel
        //     var active = cp.querySelectorAll('.hair.is-active');
        //     for(var i = 0; i < active.length; i++) {
        //         var el = active[i];
        //         el.classList.remove('is-active');
        //     }
        //
        //     // Remove scaling on hat's checking for hair
        //     var headgear = artboard.querySelectorAll('.hair-check');
        //     for(var i = 0; i < headgear.length; i++) {
        //         var el = headgear[i];
        //         el.classList.remove('enlarge');
        //     }
        // }


        ///////////////////////// Hair Color /////////////////////////
        var hairColor = document.getElementById('hair-color'),
            hairColorSwatches = hairColor.querySelectorAll('.color-swatch');

        for(var i = 0; i < hairColorSwatches.length; i++) {
            var el = hairColorSwatches[i];
            bgColor = el.getAttribute('data-color');

            el.style.background = bgColor;

            el.onclick = function() {
                bgColor = this.getAttribute('data-color');
                var currentHair = artboard.querySelectorAll('g.hair path');
                for(var k = 0; k < currentHair.length; k++) {
                    var paths = currentHair[k];
                    paths.setAttribute('fill', bgColor);
                }
            }
        }





        // // ---------------------------------------------------------------------
        // //  Headgear
        // // ---------------------------------------------------------------------
        //
        // var headgear = cp.querySelectorAll('div.headgear');
        //
        // for(var i = 0; i < headgear.length; i++) {
        //     var el = headgear[i];
        //
        //     el.onclick = function() {
        //         console.log('clicked');
        //
        //         for(var t = 0; t < headgear.length; t++) {
        //            headgear[t].classList.remove('is-active');
        //         }
        //
        //         this.classList.add('is-active');
        //
        //         var objects = this.getElementsByTagName('g');
        //
        //         // Remove Wrap
        //         var currentObjects = artboard.querySelectorAll('g.headgear');
        //
        //         // remove all elements with this class
        //         for(var i = 0; i < currentObjects.length; i++) {
        //             var co = currentObjects[i];
        //             co.remove();
        //
        //             if ( co.classList.contains('hide-ears') ) {
        //
        //                 var allObjects = artboard.querySelectorAll('g.hide-ears');
        //
        //                 if( allObjects.length == 0 ) {
        //                     ears.classList.remove('is-hidden');
        //                     console.log('show ears');
        //                 } else {
        //                     console.log('something else hidding ears');
        //                 }
        //             }
        //
        //         }
        //
        //
        //         // Add the element to artboard
        //         for(var i = 0; i < objects.length; i++) {
        //
        //             var g = objects[i];
        //
        //             if ( g.classList.contains('hair-check') ) {
        //                 var hasHair = artboard.querySelectorAll('g.hair-with-headgear');
        //
        //                 if( hasHair.length >= 1 ) {
        //                     g.classList.add('enlarge');
        //                     console.log('Make headgear bigger to fit hair');
        //                 } else {
        //                     g.classList.remove('enlarge');
        //                     console.log('no hair detected');
        //                 }
        //             }
        //
        //             var gClone = g.cloneNode(true);
        //
        //             if ( g.classList.contains('back') ) {
        //                 artboard.prepend(gClone);
        //             } else {
        //                 artboard.append(gClone);
        //             }
        //
        //             if ( g.classList.contains('hide-ears') ) {
        //                 ears.classList.add('is-hidden');
        //                 console.log('hide-ears');
        //             }
        //
        //             if ( g.classList.contains('hide-hair') ) {
        //                 var hideHair = artboard.querySelectorAll('g.hair-no-headgear');
        //
        //                 for(var i = 0; i < hideHair.length; i++) {
        //                     hideHair[i].classList.add('is-hidden');
        //                     console.log('hide hair piece');
        //                 }
        //             }
        //
        //
        //         }
        //
        //         //console.log(objects.length);
        //     }
        // }
        //
        //
        //
        // ///////////////////////// Remove headgear /////////////////////////
        // var removeHeadgear = document.getElementById('remove-headgear');
        //
        // removeHeadgear.onclick = function() {
        //     // Remove object from artboard
        //     var currentHeadgear = artboard.querySelectorAll('g.headgear');
        //     for(var i = 0; i < currentHeadgear.length; i++) {
        //         var el = currentHeadgear[i];
        //         el.parentNode.removeChild(el);
        //
        //         if ( el.classList.contains('hide-ears') ) {
        //             ears.classList.add('is-hidden');
        //             var earCheck = artboard.querySelectorAll('g.hide-ears');
        //
        //             if (earCheck.length == 0) {
        //                 ears.classList.remove('is-hidden');
        //             }
        //         }
        //     }
        //
        //     // Remove active class from object in control panel
        //     var active = cp.querySelectorAll('.headgear.is-active');
        //     for(var i = 0; i < active.length; i++) {
        //         var el = active[i];
        //         el.classList.remove('is-active');
        //     }
        // }
        //
        //





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
                console.log(cat + 'clicked');

                // Assign Active Class in Control Panel
                for(var t = 0; t < currActive.length; t++) {
                   currActive[t].classList.remove('is-active');
                }
                this.classList.add('is-active');



                // Check if current category has an active object and remove
                var activeSvgObj = artboard.querySelectorAll('g.' + cat);

                // remove all elements with this class
                for(var i = 0; i < activeSvgObj.length; i++) {
                    var co = activeSvgObj[i];
                    co.remove();

                    // Check for ear hiding
                    if ( co.classList.contains('hide-ears') ) {
                        earCheck();
                    }

                    // Check for ear hiding
                    if ( co.classList.contains('hair-with-headgear') ) {
                        artboard.classList.remove('enlarge-headgear');
                    }
                }


                // Add the element to artboard

                //Get svg elements
                var svgObjs = this.getElementsByTagName('g');


                for(var i = 0; i < svgObjs.length; i++) {
                    var g = svgObjs[i];

                    // if ( g.classList.contains('hair-with-headgear') ) {
                    //     headgearPreview = document.getElementById('headgear-preview');
                    //     headgearPreview.classList.remove('disabled');
                    //     artboard.classList.add('enlarge-headgear');
                    // }
                    //
                    // if ( g.classList.contains('hair-no-headgear') ) {
                    //     headgear = artboard.querySelectorAll('g.headgear');
                    //     headgearPreview = document.getElementById('headgear-preview');
                    //
                    //     headgearPreview.classList.add('disabled');
                    //
                    //     if(headgear.length > 0) {
                    //         for(var i = 0; i < headgear.length; i++) {
                    //             headgear[i].remove();
                    //             console.log('remove headgear');
                    //         }
                    //     }
                    // }

                    if ( g.classList.contains('hair-check') ) {
                        var hasHair = artboard.querySelectorAll('g.hair-with-headgear');

                        if( hasHair.length >= 1 ) {
                            g.classList.add('enlarge');
                            console.log('Make headgear bigger to fit hair');
                        } else {
                            g.classList.remove('enlarge');
                            console.log('no hair detected');
                        }
                    }

                    // Clone Objects
                    var gClone = g.cloneNode(true);

                    // Get holder container from main svg
                    var holder = document.getElementById(cat + '-holder');

                    if ( g.classList.contains('back') ) {
                        //Get correct holder in master svg
                        holder = document.getElementById(cat + '-back-holder');
                        holder.prepend(gClone);
                    } else {
                        holder.append(gClone);
                    }



                    // Check for hair hiding
                    if ( g.classList.contains('hide-hair') ) {
                        var hideHair = artboard.querySelectorAll('g.hair-no-headgear');

                        for(var i = 0; i < hideHair.length; i++) {
                            hideHair[i].remove();
                            console.log('hide hair piece');
                        }
                    }
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

                    console.log("active objs count " + currObj.length);

                // remove all active class from Control Panel
                for(var i = 0; i < currActive.length; i++) {
                    currActive[i].classList.remove('is-active');
                }

                // remove all elements with this class
                for(var i = 0; i < currObj.length; i++) {
                    //var co = currObj[i];
                    currObj[i].remove();
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
                console.log('Show ears');
            } else {
                ears.classList.add('is-hidden');
                console.log('hide ears');
            }
        }


        function headgearCheck(){
            // Check if any active objects contain the hide headgear
            activeObjs = artboard.querySelectorAll('g.hide-headgear');
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

                console.log('Hide headgear');
            } else {
                document.getElementById('headgear-preview').classList.remove('disabled');
            }


            // Check for hair that does allow headgear
            activeObjs = artboard.querySelectorAll('g.hair-with-headgear');

            if(activeObjs.length == 0) {
                artboard.classList.remove('enlarge-headgear');
                console.log('Regualr Headgear');
            } else {
                artboard.classList.add('enlarge-headgear');
                console.log('Enlarged Headgear');
            }
        }

        function hairCheck() {
            // Check if any active objects contain the hide hair
            activeObjs = artboard.querySelectorAll('g.hide-hair');
        }

    }
}(andrewrossco));
