(function() {
    var save = document.getElementById('save');

    save.onclick = function() {
        convert('#artboard');
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

                if( document.getElementById('octocat-name').value ) {
                    filename = document.getElementById('octocat-name').value;
                }


                sourceImage.onload = function(){
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    ctx.drawImage(sourceImage,0,0,2000,2000);

                    img.src = can.toDataURL();

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

})();
