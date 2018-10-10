

(function() {
    if(  document.getElementById('save') ){

        var save = document.getElementById('save'),
            download = document.getElementById('download-ocotocat'),
            post = document.getElementById('post-to-twitter-submit'),
            octocat = document.getElementById('octocat'),
            exportModal = document.getElementById('export-modal');

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
                octocat.querySelector('g.xl-pants').innerHTML = '';
            }

            if(octocat.classList.contains('no-big-collars')) {
                octocat.querySelector('g.big-collar').innerHTML = '';
            }

            exportModal.classList.add('is-active');
            document.body.classList.add('modal-is-active');
        }

        // Agree to Terms & Conditions
        document.getElementById('terms').onclick = function() {
            if ( this.checked ) {
                post.removeAttribute('disabled');
                download.removeAttribute('disabled');
            } else {
                post.setAttribute('disabled', '');
                download.setAttribute('disabled', '');
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
            }
        }

        exportModal.querySelector('.back-to-options').onclick = function(e) {
            e.preventDefault();
            exportModal.classList.remove('error');
        }


        var svgMaskLoad = document.getElementById('load-svg-mask');

        download.onclick = function(e) {
            e.preventDefault();
            convert('#artboard');
            setTimeout(function(){
                exportModal.classList.add('completed');
            }, 1000);
        }

        post.onclick = function(e) {
            e.preventDefault();
            exportModal.classList.add('posting');

            TweenMax.to(svgMaskLoad, 3, { scaleY: 0.3, transformOrigin:"top center",ease: Power4.easeOut }).delay(.4);

            var form = document.getElementById("post-to-twitter");

            var name = document.getElementById('form-name').value;
            var mediab64 = document.getElementById('form-image').value;

            //console.log(data);

            fetch('https://ar-tweet-server.herokuapp.com/', {
                method:'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type':'application/json'
                },
                body:JSON.stringify({name: name, media_id: mediab64})
            })
            .then((res) => res.json())
            //.then(text => console.log(text))
            .then((data) => {
                console.log(data.success);
                if( data.success === true ){
                    TweenMax.to(svgMaskLoad, .3, { scaleY: 0, transformOrigin:"top center", ease: Power0.easeNone }).delay(3.4);
                    setTimeout(function(){
                        exportModal.classList.remove('posting');
                        exportModal.classList.add('completed');
                        TweenMax.to(svgMaskLoad, 1, { scaleY: 1}).delay(1);
                    }, 4300);
                    console.log("Now continue the process");
                } else {
                    setTimeout(function(){
                        console.log('There was an issue');
                        exportModal.classList.remove('posting');
                        exportModal.classList.add('error');
                    }, 4300);
                }
            });


        }


        function convert(selectors){
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
                    //
                    // document.getElementById('form-name').value = filename;
                    // document.getElementById('octocat-name-modal').value = filename;

                    sourceImage.onload = function(){
                        ctx.fillStyle = "#f6f8fa";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);

                        ctx.drawImage(sourceImage,0,0,2000,2000);


                        img.src = can.toDataURL();

                        // imgData = img.src.split("data:image/png;base64,").pop();
                        // document.getElementById('form-image').value = imgData;


                        //console.log();

                        //localStorage.setItem("imgData", img.src);


                        var a = document.createElement("a");
                        a.download = filename+".png";
                        a.href = img.src;
                        document.body.appendChild(a);
                        a.click();
                    };
                    sourceImage.src = svg ? svgDataURL(svg) : div.getAttribute('data-svgSource');


                }catch(e){ console.log(e) }
            });
        }

        function svgDataURL(svg) {
            var svgAsXML = (new XMLSerializer).serializeToString(svg);
            return "data:image/svg+xml," + encodeURIComponent(svgAsXML);

        }
    }
})();
