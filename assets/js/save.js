

(function() {
    if(  document.getElementById('save') ){

        var save = document.getElementById('save'),
            download = document.getElementById('download-ocotocat'),
            //email = document.getElementById('email-ocotocat'),
            post = document.getElementById('email-submit'),
            octocat = document.getElementById('octocat'),
            exportModal = document.getElementById('export-modal'),
            whiskers = document.getElementById('whiskers').innerHTML;

        save.onclick = function() {
            if(octocat.classList.contains('no-big-hair')) {
                if(octocat.querySelector('g.big-hair')){
                    octocat.querySelector('g.big-hair').innerHTML = '';
                }
            }
            if(octocat.classList.contains('no-medium-hair')) {
                if(octocat.querySelector('g.medium-hair')){
                    octocat.querySelector('g.medium-hair').innerHTML = '';
                }
            }
            if(octocat.classList.contains('no-hair')) {
                document.getElementById('hair-back-holder').innerHTML = '';
                document.getElementById('hair-holder').innerHTML = '';
            }
            if(octocat.classList.contains('no-back-facialhair')) {
                document.getElementById('faceHair-back-holder').innerHTML = '';
            }
            if(octocat.classList.contains('no-pants')) {
                document.getElementById('bottoms-holder').innerHTML = '';
                document.getElementById('bottoms-front-holder').innerHTML = '';
            }

            if(octocat.classList.contains('no-xl-pants')) {
                if(octocat.querySelector('g.xl-pants')){
                    octocat.querySelector('g.xl-pants').innerHTML = '';
                }
            }
            if(octocat.classList.contains('no-xxl-pants')) {
                if(octocat.querySelector('g.xxl-pants')){
                    octocat.querySelector('g.xxl-pants').innerHTML = '';
                }
            }

            if(octocat.classList.contains('no-big-collars')) {
                if(octocat.querySelector('g.big-collar')){
                    octocat.querySelector('g.big-collar').innerHTML = '';
                }
            }

            if(octocat.classList.contains('hide-whiskers')) {

                console.log(whiskers);
                document.getElementById('whiskers').innerHTML = '';
            }

            if(octocat.classList.contains('hide-low-faceHair')) {
                document.getElementById('faceHair-low-holder').innerHTML = '';
            }

            exportModal.classList.add('is-active');
            document.body.classList.add('modal-is-active');
        }

        // Agree to Terms & Conditions
        document.getElementById('terms').onclick = function() {
            if ( this.checked ) {
                post.removeAttribute('disabled');
                //email.removeAttribute('disabled');
                if(download) {
                    download.removeAttribute('disabled');
                }
            } else {
                post.setAttribute('disabled', '');
                //email.setAttribute('disabled', '');
                if(download) {
                    download.setAttribute('disabled', '');
                }
            }
        }

        exportModal.querySelector('.screen').onclick = function() {
            exportModal.classList = 'modal-wrap';
            document.body.classList.remove('modal-is-active');
        }


        var closeExportModal = exportModal.querySelectorAll('.keep-editing');
        for(var i = 0; i < closeExportModal.length; i++) {
            closeExportModal[i].onclick = function(e) {
                e.preventDefault();
                exportModal.classList = 'modal-wrap';
                document.body.classList.remove('modal-is-active');

                if(octocat.classList.contains('hide-whiskers')) {
                    document.getElementById('whiskers').innerHTML = whiskers;
                }
            }
        }

        exportModal.querySelector('.back-to-options').onclick = function(e) {
            e.preventDefault();
            exportModal.classList.remove('error');
        }


        var svgMaskLoad = document.getElementById('load-svg-mask');


        // email.onclick = function(e) {
        //     e.preventDefault();
        //     convert('#artboard');
        //
        //
        //     setTimeout(function(){
        //         exportModal.classList.add('completed');
        //     }, 1000);
        // }

        if(download) {
            download.onclick = function(e) {
                e.preventDefault();
                convert('#artboard', downloadImg, true, false);

                setTimeout(function(){
                    exportModal.classList.add('completed');
                }, 1000);
            }
        }

        post.onclick = function(e) {
            e.preventDefault();
            convert('#artboard', sendToAws, false, true);
        }


        function convert(selectors, callbackFunction, downloadObject, emailObject){
            [].forEach.call(document.querySelectorAll(selectors),function(div){
                try{
                    var sourceImage;

                    var img = document.getElementById('img'),
                        svg  = document.getElementById('octocat'),
                        can  = document.getElementById('canvas'),
                        ctx  = can.getContext('2d');

                    can.style["display"] = "none";
                    can.setAttribute("width", 2000);
                    can.setAttribute("height", 2000);

                    img.src = svgDataURL(svg);
                    sourceImage = new Image;
                    sourceImage.width  = 2000;
                    sourceImage.height = 2000;

                    var filename = "octocat";

                    // if( document.getElementById('octocat-name').value ) {
                    //     filename = document.getElementById('octocat-name').value;
                    // }

                    //document.getElementById('form-name').value = filename;
                    // document.getElementById('octocat-name-modal').value = filename;

                    sourceImage.onload = function(){
                        ctx.fillStyle = "#f6f8fa";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(sourceImage,0,0,2000,2000);
                        //console.log('img data ' + imgData);
                        //console.log();
                        //localStorage.setItem("imgData", img.src);

                        if(downloadObject) {
                            img.src = can.toDataURL();

                            var a = document.createElement("a");
                            a.download = filename+".png";
                            a.href = img.src;
                            document.body.appendChild(a);
                            a.click();
                        }
                        //console.log('here');
                        // var emailHref = "mailto:?subject=YourSubjecthere!&body=Hereisyourocotcat<img src=\"data:image/png;base64," + imgData + "\"";
                        // email.href=emailHref;

                        if(emailObject) {
                            img.src = can.toDataURL();
                            imgData = img.src;
                            imgData = img.src.split("data:image/png;base64,").pop();
                            document.getElementById('form-image').value = imgData;
                            callbackFunction();
                        }
                    };

                    sourceImage.src = svg ? svgDataURL(svg) : div.getAttribute('data-svgSource');

                }catch(e){ console.log(e) }
            });
        }



        function binEncode(data) {
            var binArray = []
            var datEncode = "";

            for (i=0; i < data.length; i++) {
                binArray.push(data[i].charCodeAt(0).toString(2));
            }
            for (j=0; j < binArray.length; j++) {
                var pad = padding_left(binArray[j], '0', 8);
                datEncode += pad + ' ';
            }
            function padding_left(s, c, n) { if (! s || ! c || s.length >= n) {
                return s;
            }
            var max = (n - s.length)/c.length;
            for (var i = 0; i < max; i++) {
                s = c + s; } return s;
            }
            return binArray;
        }


        function sendToAws() {


            var form = document.getElementById("email-octocat");
            var emailAddress = document.getElementById('form-email');
            var mediab64 = document.getElementById('form-image').value;

            if(emailAddress.value == '') {
                emailAddress.classList.add('form-error');
            } else {
                TweenMax.to(svgMaskLoad, 4, { scaleY: 0.3, transformOrigin:"top center",ease: Power4.easeOut }).delay(.4);
                exportModal.classList.add('posting');

                emailAddress.classList.remove('form-error');
                console.log(emailAddress.value);

                fetch('https://octocat-generator.herokuapp.com/', {
                    method:'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({image: mediab64, email: emailAddress.value })
                })
                .then((res) => res.json())
                //.then(text => console.log(text))
                .then((data) => {
                    console.log('success = ' + data.success);
                    if( data.success === true ){
                        TweenMax.to(svgMaskLoad, 2, { scaleY: 0, transformOrigin:"top center", ease: Power0.easeNone }).delay(1.4);
                        setTimeout(function(){
                            exportModal.classList.remove('posting');
                            exportModal.classList.add('completed');
                            TweenMax.to(svgMaskLoad, 1, { scaleY: 1}).delay(1);

                            // var link = data.url;
                            // console.log(link);
                            // sendEmail(link);
                        }, 2300);
                        //console.log("Now continue the process");
                    } else {
                        setTimeout(function(){
                            console.log('There was an issue');
                            exportModal.classList.remove('posting');
                            exportModal.classList.add('error');
                        }, 4300);
                    }
                })
            }
        }

        function downloadImg() {
            //console.log('download');
        }

        function sendEmail(url) {
            // var emailAddress = document.getElementById('form-email').value;
            // var emailHref = "mailto:" + emailAddress + "?subject=Your Octocat has arrived!&body=Download your octocat here and share with the world using #myoctocat: %0A%0A" + url + "";
            //
            // var a = document.createElement("a");
            // //a.download = filename+".png";
            // a.href = emailHref;
            // document.body.appendChild(a);
            // a.click();
            //
            // console.log('here');


            //email.href=emailHref;
        }

        function svgDataURL(svg) {
            var svgAsXML = (new XMLSerializer).serializeToString(svg);
            return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
        }
    }
})();
