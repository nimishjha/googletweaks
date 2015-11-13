// ==UserScript==
// @name           Google my tweaks
// @namespace      google.com
// @include        http://www.google.tld/*
// @include        http://www.google.tld
// @include        https://www.google.tld/*
// @include        https://www.google.tld
// @include        http://www.google.com.au/*
// @include        http://www.google.com.au
// @include        https://www.google.com.au/*
// @include        https://www.google.com.au
// ==/UserScript==

// https://gist.github.com/minhnc/2333095
function unRegisterAllEventListeners(obj)
{
	if ( typeof obj._eventListeners == 'undefined' || obj._eventListeners.length == 0 )
	{
		return;
	}

	for(var i = 0, len = obj._eventListeners.length; i < len; i++)
	{
		var e = obj._eventListeners[i];
		xlog(e);
		obj.removeEventListener(e.event, e.callback);
	}

	obj._eventListeners = [];
}

function removeWhitespace(s)
{
	return s.replace(/\s/g, '');
}

function deleteEmptyElements(tag)
{
	var e = document.getElementsByTagName(tag);
	var i = e.length;
	while(i--)
	{
		if( e[i].textContent )
		{
			if( removeWhitespace(e[i].textContent).length === 0 && !e[i].getElementsByTagName("img").length )
				e[i].parentNode.removeChild(e[i]);
		}
		else
		{
			if( !e[i].getElementsByTagName("img").length)
				e[i].parentNode.removeChild(e[i]);
		}
	}
	var t2 = new Date();
}

function removeAttributes()
{
	document.body.innerHTML = document.body.innerHTML.replace(/(<[^ai][a-z0-9]*) [^>]+/gi, '$1');
	a = get("a");
	i = a.length;
	while(i--)
	{
		temp = a[i].href;
		while (a[i].attributes.length>0)
		{
			attnode=a[i].attributes[0];
			old_att=a[i].removeAttributeNode(attnode);
		}
		a[i].href = temp;
	}
}

function get(s)
{
	t = s.substr(1,s.length-1);
	if( s.indexOf("#") == 0 ) return document.getElementById(t);
	else if ( s.indexOf(".") == 0 ) return document.getElementsByClassName(t);
	else if ( document.getElementsByTagName(s).length ) return document.getElementsByTagName(s);
	else return 0;
}

function del(c)
{
	todel = [];
	if(isArray(c))
	{
		for( i = 0; i < c.length; i++ )
		{
			del(c[i]);
		}
	}
	else
	{
		f = get(c);
		if(f && f.length)
		{
			for (j = 0; j < f.length; j++ )
				todel.push(f[j]);
			for(j = todel.length-1; j > -1; j--)
				todel[j].parentNode.removeChild(todel[j]);
		}
		else if (f)
		{
			if(f.parentNode)
				f.parentNode.removeChild(f);
		}
	}
}

function isArray(o)
{
	return Object.prototype.toString.call(o) === '[object Array]';
}

function ac(obj1, obj2)
{
	obj1.appendChild(obj2);
}

function replaceElement(e1, e2)
{
	e = get(e1);
	toreplace = [];
	if(e.length)
	{
		for ( var i = 0, ii = e.length; i < ii; i++ )
		{
			toreplace.push(e[i]);
		}
		for ( i = toreplace.length-1; i >= 0; i-- )
		{
			replacement = document.createElement(e2);
			replacement.innerHTML = toreplace[i].innerHTML;
			toreplace[i].parentNode.replaceChild(replacement, toreplace[i]);
		}
	}
}

function deleteElementsContainingText(tag, str)
{
	var e = document.getElementsByTagName(tag);
	var i = e.length;
	while (i--)
	{
		if (e[i].getElementsByTagName(tag).length) continue;
		if (e[i].textContent.indexOf(str) >= 0) e[i].parentNode.removeChild(e[i]);
	}
}

function insertStyle(str)
{
	var head = get("head")[0], style = document.createElement("style"), rules = document.createTextNode(str);
	style.type = "text/css";
	if (style.styleSheet) style.styleSheet.cssText = rules.nodeValue;
	else style.appendChild(rules);
	head.appendChild(style);
}

function insertStyleNegative()
{
	if(get("#style_negative"))
	{
		del("#style_negative");
		return;
	}
	
	var s = '* { box-shadow: none; text-shadow: none; letter-spacing: 0; text-decoration: none; letter-spacing: 0; font-style: normal; outline: 0; border: 0; color: inherit; background-image: none; }' + 
	'html { background: #202020; }' + 
	'body { margin: 0; font: 12px Verdana; background: #282828; color: #888; }' + 
	'body.pad100 { padding: 100px 200px; }' + 
	'body.pad100 td, body.pad100 th { padding: 3px 10px; }' + 
	'body.pad100 image { display: block; }' + 
	'div, header, footer, section, aside, main, article { background: #202020; background-image: none; }' + 
	'table, tbody, thead, tr, td, th { background-image: none; background-color: inherit; }' + 
	'nav { background: #181818; }' + 
	'ul, ol, li, p, td, rt { font: inherit; }' + 
	'ul { list-style: none; margin: 0; padding: 0 20px; }' + 
	'li { padding: 2px 2px 2px 10px; border-left: 5px solid #111; margin: 0 0 2px 0; }' + 
	'h1, h2, h3, h4, h5, h6 { color: inherit; padding: 10px 20px; margin: 2px 0; background: #151515; border: 0; }' + 
	'h1 { font: 34px "swis721 cn bt", Calibri;; line-height: 160%; color: #FFF; }' + 
	'h2 { font: 30px "swis721 cn bt", Calibri; line-height: 160%; color: #CCC; }' + 
	'h3 { font: 26px "swis721 cn bt", Calibri; line-height: 160%; }' + 
	'h4 { font: 22px "swis721 cn bt", Calibri; line-height: 160%; }' + 
	'h5 { font: 18px "swis721 cn bt", Calibri; line-height: 160%; }' + 
	'h6 { font: 12px verdana; line-height: 160%; }' + 
	'h5, h6 { padding: 5px 10px; }' + 
	'p { margin: 0; padding: 5px 0; line-height: 150%; }' + 
	'a { color: #57F; }' + 
	'a:visited { color: #359; }' + 
	'a:hover, a:focus { color: #FFF; }' + 
	'mark, samp { background: #331500; color: #F90; }' + 
	'a mark, a samp { background: #400; color: #F90; }' + 
	'mark *, samp * { background: inherit; color: inherit; }' + 
	'mark mark, samp { font: 24px "swis721 cn bt"; }' + 
	'a:hover mark, mark:hover, a:hover samp, samp:hover, a:focus mark, a:focus samp, samp:focus, mark:focus { background: #630; color: #FC2; }' + 
	'figure { border: 0; background: #171717; padding: 20px; }' + 
	'figcaption { background: #171717; color: #888; }' + 
	'ruby { margin: 10px 0; background: #000; color: #888; padding: 20px 40px; display: block; float: left; width: 400px; margin-left: -600px; box-shadow: 2px 2px 10px #000; }' + 
	'rp { margin: 10px 0; background: #171717; color: #888; padding: 40px; display: block; font: 24px "swis721 cn bt"; border-top: 50px solid #000; border-bottom: 50px solid #000; }' + 
	'rt { margin: 10px 0!important; padding: 20px!important; display: block!important; background: #171717!important; }' + 
	'rt:before { content: ""!important; display: block!important; width: 10px!important; height: 15px!important; border: 2px solid #555!important; float: left!important; margin: -3px 20px 0 0!important; }' + 
	'tt, kbd { background: #111; font: 12px Verdcode; padding: 1px 2px; }' + 
	'code { font: 12px verdcode; background: #111; }' + 
	'pre { background: #111; border-style: solid; border-width: 0 0 0 10px; border-color: #444; padding: 10px 20px; font: 12px Verdcode; }' + 
	'pre, code { color: #888; }' + 
	'pre p { margin: 0; padding: 0; font: 12px Verdcode; }' + 
	'pre em { color: #57F; font-weight: normal; padding: 0; }' + 
	'pre i { color: #FFF; font-weight: normal; padding: 0; }' + 
	'pre b { color: #F90; font-weight: normal; padding: 0; }' + 
	'pre u { color: #0F0; text-decoration: none; padding: 0; }' + 
	'pre dfn { font-style: normal; color: #F70; background: #331500; padding: 0; }' + 
	'pre s { color: #F00; text-decoration: none; background: #400; padding: 0; }' + 
	'table { border-collapse: collapse; background: #191919; border: 0; width: 100%; }' + 
	'td { vertical-align: top; border-width: 0px; }' + 
	'caption, th { background: #171717; border-color: #171717; text-align: left; }' + 
	'th, tr, tbody { border: 0; }' + 
	'table, td { word-wrap: normal; }' + 
	'dl { border-left: 20px solid #202020; font: inherit; }' + 
	'dt { color: inherit; padding: 0.25em 10px; line-height: 140%; margin: 2px 0; background: #202020; border: 0; border-left: 20px solid #080808; font: inherit; }' + 
	'dd { color: inherit; padding: 0.25em 10px; line-height: 140%; margin: 2px 0; background: #191919; border: 0; border-left: 20px solid #080808; font: inherit; }' + 
	'input, select { font: 12px verdcode; font-family:verdana; }select, input, textarea { padding: 5px 10px; background: #202020; box-shadow: inset 0 0 5px #000; color: #888; line-height: 100%; -moz-appearance: none; border-radius: 0; border: 0; }' + 
	'textarea { font: 12px Verdcode; line-height: 140%; font-kerning: none; text-rendering: optimizeSpeed; }' + 
	'textarea div { font-family: verdcode; }' + 
	'input div { color: #AAA; font: inherit; }' + 
	'select:focus, textarea:focus, input:focus { color: #888; outline: 0; background: #080808; z-index: 1000; }' + 
	'textarea:focus *, input:focus * { color: #888; z-index: 1000; }' + 
	'input[type="reset"], input[type="submit"], input[type="button"], button { -moz-appearance: none; border: 0; background: #000; padding: 0px 10px; color: #444; height: 25px; line-height: 25px; margin-right: 1px; border: 1px solid #000; }' + 
	'input[type="reset"]:focus, input[type="reset"]:hover, input[type="submit"]:focus, input[type="button"]:focus, button:focus, input[type="submit"]:hover, input[type="button"]:hover, button:hover { color: #888; background: #000; border: 1px solid #FFF; }' + 
	'input[type="checkbox"] { width: 24px; height: 24px; background: #222; border: 0; color: #888; }' + 
	'input[type="checkbox"]:focus { border: 0; background: #080808; }' + 
	'input[type="radio"] { width: 24px; height: 24px; background: #222; border: 0; color: #888; }' + 
	'input[type="radio"]:focus { border: 0; background: #080808; }' +
	'body.xDontShowLinks a, body.xDontShowLinks a *, body.xDontShowLinks a:link { color: inherit; text-decoration: none; }' + 
	'body.xDontShowLinks a:visited *, body.xDontShowLinks a:visited { color: inherit; text-decoration: none; }' + 
	'body.xDontShowLinks a:hover *, body.xDontShowLinks a:focus *, body.xDontShowLinks a:hover, body.xDontShowLinks a:focus { color: #FFF; text-decoration: none; }';

	insertStyle(s, "style_negative");
}

function xlog(str, elem, prepend)
{
	if(elem)
		var d = document.createElement(elem);
	else
		d = document.createElement("h6");
	d.className = "xlog";
	d.innerHTML = str;
	if(!prepend)
		document.body.appendChild(d);
	else
		document.body.insertBefore(d, document.body.firstChild);
}

function handleKeyup(e)
{
	var e, i, k;
	k = e.keyCode;
	switch(k)
	{
	case 37: // left arrow
		links = get("a");
		i = links.length;
		while(i--)
		{
			if(links[i].textContent && links[i].textContent.toLowerCase() === 'previous')
			{
				location.href = links[i].href;
				return;
			}
		}
		break;
	case 39: // right arrow
		links = get("a");
		i = links.length;
		while(i--)
		{
			if(links[i].textContent && links[i].textContent.toLowerCase() === 'next')
			{
				location.href = links[i].href;
				return;
			}
		}
		break;
	}
}

function forAll(selector, callback)
{
	var e = get(selector);
	var i = e.length;
	while (i--)
		callback(e[i]);
}

function wrap(x)
{
	x.parentNode.className = "searchresult";
	replaceElement(".searchresult", "dt");
}

function removeEventListeners()
{
	unRegisterAllEventListeners(document.body);
	//xlog("event listeners removed", "h3", true);
}

function main()
{
	setTimeout(removeEventListeners, 1000);
	
	var newBody, rs, rsw, inputs, s, i, head;
	
	if(location.href.toString().indexOf("isch") > 0)
		return;
	newBody = document.createElement("div");
	if(get("#resultStats"))
	{
		rs = get("#resultStats");
		rsw = document.createElement("h6");
		rsw.appendChild(rs.cloneNode(1));
		newBody.appendChild(rsw);
	}
	if(get("#res") && get("#res").innerHTML.length)
		newBody.innerHTML += get("#res").innerHTML;
	else
		return;
	inputs = get("input");
	s = "Google";
	i = inputs.length;
	while(i--)
	{
		if(inputs[i].hasAttribute("name") && inputs[i].name === 'q')
		{
			s = inputs[i].value;
			break;
		}
	}
	if(get("#nav"))
		newBody.innerHTML += get("#nav").innerHTML;;
	document.body.innerHTML = newBody.innerHTML;
	del(["button", "img", "h2", ".esc"]);
	head = get("head")[0];
	while(head.firstChild)
		head.removeChild(head.firstChild);
	document.title = "Google: " + s;
	replaceElement(".s", "dd");
	deleteEmptyElements("div");

	del("style");
	insertStyleNegative();
	var styleString = 'dt { display: table; width: 100%; background: #111 !important; margin: 0 0 2px 0 !important; }' + 
	'h3 { display: table-cell; vertical-align: top; width: 40%; }' + 
	'blockquote { display: table-cell; vertical-align: top; width: 60%; }' +
	'ul li { float: right; }';
	insertStyle(styleString);

	removeAttributes();
	del("hr");
	forAll("h3", wrap);
	xlog(s, "h1", true);
	// no longer need this as nimbus handles keyboard prev/next page navigation
	//document.body.addEventListener("keyup", handleKeyup, false);
	deleteElementsContainingText("div", "Shared on");
	deleteElementsContainingText("div", "{");
	replaceElement("p", "div");
	var e = get("h3");
	i = e.length;
	var a; 
	while(i--)
	{
		a = e[i].getElementsByTagName("a");
		if(a.length)
			a = a[0];
		a.setAttribute("tabIndex", i+1);
	}
	a.focus();
}

main();
