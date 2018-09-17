(function() {
    var imgs = document.getElementById('img');

    var save = document.getElementById('save');

    save.onclick = function() {
        convert('#artboard');
    }



    function convert(selectors){
        [].forEach.call(document.querySelectorAll(selectors),function(div){
            try{
                var sourceImage;

                var imgs = document.getElementById('img'),
                svg  = document.getElementById('octocat'),
                can  = document.getElementById('canvas'),
                ctx  = can.getContext('2d');

                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                can.setAttribute("width", 2000);
                can.setAttribute("height", 2000);


                if (svg){
                    imgs.src = svgDataURL(svg);
                    sourceImage = new Image;
                    sourceImage.width  = 2000;
                    sourceImage.height = 2000;
                }else{
                    sourceImage = imgs;
                }
                sourceImage.onload = function(){
                    ctx.drawImage(sourceImage,0,0,2000,2000);
                    imgs.src = can.toDataURL();
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
