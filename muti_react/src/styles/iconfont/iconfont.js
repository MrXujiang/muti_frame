(function(window){var svgSprite='<svg><symbol id="icon-wechat" viewBox="0 0 1024 1024"><path d="M835.52 769.28c-4.8 3.36-6.72 9.12-5.28 14.88l13.44 42.72-55.2-28.8c-1.92-0.96-4.32-1.92-6.72-1.92-0.96 0-2.4 0-3.36 0.48-29.76 7.2-60.48 14.4-90.24 14.4-138.72 0-252-90.72-252-202.56s113.28-202.08 252-202.08c136.32 0 251.52 92.64 251.52 202.56 0 55.68-36.96 112.8-104.16 160.32z m-424.32-108c-9.12 0.96-18.72 0.96-27.84 0.96-31.68 0-58.08-5.28-88.8-11.04l-17.76-3.36c-2.88-0.48-6.24 0-9.12 0.96l-78.72 37.44 20.64-58.56c1.92-5.76 0-12-5.28-15.36-79.68-52.32-120-116.16-120-189.6 0-132 133.92-240 298.56-240 145.44 0 274.08 84.48 300.96 196.32-152.64 1.92-276 104.16-276 229.92 0 18.24 2.88 36 7.68 52.8-1.44-0.48-2.88-0.48-4.32-0.48zM968 608.96c0-117.6-114.72-218.4-255.36-228.48 0-1.44 0.48-2.88 0-4.32-28.32-125.28-169.92-219.84-329.28-219.84C202.88 155.84 56 275.36 56 422.72c0 79.2 42.24 150.24 122.4 206.4l-27.84 79.68c-1.92 5.28 0 11.04 4.32 14.4 2.88 2.4 5.76 3.36 9.12 3.36 2.4 0 4.32-0.48 6.24-1.44l105.12-49.92 12.96 2.4c32.16 6.24 60 12 94.56 12 10.08 0 20.16-0.48 30.24-1.44 3.84-0.48 7.68-2.4 10.08-5.28 37.92 90.24 142.08 155.52 264.96 155.52 31.2 0 63.36-7.2 91.68-13.92l81.12 42.24c1.92 0.96 4.32 1.92 6.72 1.92 3.36 0 6.24-0.96 9.12-2.88 4.32-3.36 6.24-9.12 4.8-14.4l-20.64-65.28C930.08 733.28 968 670.88 968 608.96z"  ></path><path d="M240.8 332.96a36.96 36.96 0 1 0 73.92 0 36.96 36.96 0 1 0-73.92 0zM459.68 332.96a36.96 36.96 0 1 0 73.92 0 36.96 36.96 0 1 0-73.92 0zM578.72 541.76a26.4 26.4 0 1 0 52.8 0 26.4 26.4 0 1 0-52.8 0zM750.56 541.76a26.4 26.4 0 1 0 52.8 0 26.4 26.4 0 1 0-52.8 0z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)