
(function() {


    var save = document.getElementById('save');

    save.onclick = function() {
        initialize();
    }


    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
    window.URL = (window.URL || window.webkitURL);
    var body = document.body,
    emptySvg;

    var prefix = {
        xmlns: "http://www.w3.org/2000/xmlns/",
        xlink: "http://www.w3.org/1999/xlink",
        svg: "http://www.w3.org/2000/svg"
    };



    function initialize() {
        var documents = [window.document],
        SVGSources = [];

        // add empty svg element
        var emptySvg = window.document.createElementNS(prefix.svg, 'svg');
        window.document.body.appendChild(emptySvg);

        var emptySvgDeclarationComputed = getComputedStyle(emptySvg);

        documents.forEach(function(doc) {
            var newSources = getSources(doc, emptySvgDeclarationComputed);
            //var octocat = document.getElementById('octocat');
            for (var i = 0; i < newSources.length; i++) {
                el = newSources[i];
                //if(el.getAttribute('id') == 'octocat') {
                SVGSources.push(newSources[i]);
                console.log(newSources[i]);
                //}
            }
        });

        downloadPNG(SVGSources[0]);

        // Auto Save
        // if (SVGSources.length > 1) {
        //     createPopover(SVGSources);
        // } else if (SVGSources.length > 0) {
        //     // SVG Download
        //     //download(SVGSources[0]);
        //
        //     // PNG Download
        //     downloadPNG(SVGSources[0]);
        // } else {
        //     alert("The Crowbar couldn’t find any SVG nodes.");
        // }

        //return SVGSources;
    }


    function cleanup() {
        var crowbarElements = document.querySelectorAll(".svg-crowbar");
        [].forEach.call(crowbarElements, function(el) {
            el.parentNode.removeChild(el);
        });
    }


    function getSources(doc, emptySvgDeclarationComputed) {
        var svgInfo = [],
        //svgs = doc.querySelectorAll("svg"),
        //Target only octocat
        svgs = doc.querySelectorAll("#octocat");


        [].forEach.call(svgs, function (svg) {
            svg.setAttribute("version", "1.1");
            // removing attributes so they aren't doubled up
            svg.removeAttribute("xmlns");
            svg.removeAttribute("xlink");

            // These are needed for the svg
            if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
                svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
            }
            if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
                svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
            }

            setInlineStyles(svg, emptySvgDeclarationComputed);

            var source = (new XMLSerializer()).serializeToString(svg);
            var rect = svg.getBoundingClientRect();

            svgInfo.push({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                class: svg.getAttribute("class"),
                id: svg.getAttribute("id"),
                childElementCount: svg.childElementCount,
                source: [doctype + source]
            });
        });
        return svgInfo;
    }


    // SVG Download
    // function download(source) {
    //     console.log("Using Download SVG");
    //     var filename = "untitled";
    //     if (source.id) {
    //         filename = source.id;
    //     } else if (source.class) {
    //         filename = source.class;
    //     } else if (window.document.title) {
    //         filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    //     }
    //
    //     var url = window.URL.createObjectURL(new Blob(source.source, { "type" : "text\/xml" }));
    //     var a = document.createElement("a");
    //     body.appendChild(a);
    //     a.setAttribute("class", "svg-crowbar");
    //     a.setAttribute("download", filename + ".svg");
    //     a.setAttribute("href", url);
    //     a.style["display"] = "none";
    //     a.click();
    //
    //     setTimeout(function() {
    //         window.URL.revokeObjectURL(url);
    //     }, 10);
    // }


    // PNG Download
    function downloadPNG(source) {
        console.log("Using Download PNG");
        var filename = "untitled";
        if (source.id) {
            filename = source.id;
        } else if (source.class) {
            filename = source.class;
        } else if (window.document.title) {
            filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        }

        var canvas = document.createElement("canvas");
        body.appendChild(canvas);
        canvas.setAttribute("id", "svg-image");

        //width & height of image
        // canvas.setAttribute("width", source.width);
        // canvas.setAttribute("height", source.height);
        canvas.setAttribute("width", 2000);
        canvas.setAttribute("height", 2000);

        canvas.style["display"] = "none";
        var canvas = document.querySelector("canvas#svg-image"),
        context = canvas.getContext("2d");
        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        var imgsrc = 'data:image/svg+xml;base64,'+ btoa(source.source);
        var image = new Image;
        image.src = imgsrc;

        image.onload = function() {
            context.drawImage(image, 0, 0);
            var canvasdata = canvas.toDataURL("image/png");
            //var canvasdata = canvas.toDataURL("image/svg+xml;base64");
            var pngimg = '<img src="'+canvasdata+'" width="'+source.width+'" height="'+source.height+'">';
            //d3.select("#pngdataurl").html(pngimg);
            var a = document.createElement("a");
            a.download = filename+".png";
            //a.download = "sample.svg";
            a.href = canvasdata;
            document.body.appendChild(a);
            a.click();
        };
    }


    function setInlineStyles(svg, emptySvgDeclarationComputed) {
        function explicitlySetStyle (element) {
            var cSSStyleDeclarationComputed = getComputedStyle(element);
            var i, len, key, value;
            var computedStyleStr = "";

            for (i=0, len=cSSStyleDeclarationComputed.length; i<len; i++) {
                key=cSSStyleDeclarationComputed[i];
                value=cSSStyleDeclarationComputed.getPropertyValue(key);

                if (value!==emptySvgDeclarationComputed.getPropertyValue(key) && key != 'font-family') {
                    computedStyleStr+=key+":"+value+";";
                }
            }

            if (element.tagName == 'text' || element.tagName == 'tspan') {
                computedStyleStr += 'font-size:'+cSSStyleDeclarationComputed.fontSize+';';
                var fw = cSSStyleDeclarationComputed.fontWeight,
                ff = 'NYTFranklin' + (fw == 300 || fw == 'light' ? 'Light' : fw > 400 || fw == 'bold' ? 'Bold' : 'Medium');
                computedStyleStr += 'font-family:'+ff+';';
            }

            element.setAttribute('style', computedStyleStr);
        }

        function traverse(obj){
            var tree = [];
            tree.push(obj);
            visit(obj);

            function visit(node) {
                if (node && node.hasChildNodes()) {
                    var child = node.firstChild;
                    while (child) {
                        if (child.nodeType === 1 && child.nodeName != 'SCRIPT'){
                            tree.push(child);
                            visit(child);
                        }
                        child = child.nextSibling;
                    }
                }
            }
            return tree;
        }

        // hardcode computed css styles inside svg
        var allElements = traverse(svg);
        var i = allElements.length;
        while (i--){
            explicitlySetStyle(allElements[i]);
        }

    }
})();
