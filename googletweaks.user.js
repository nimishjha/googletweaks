// ==UserScript==
// @name           Google my tweaks
// @namespace      nimishjha.com
// @include        http://www.google.tld/*
// @include        http://www.google.tld
// @include        https://www.google.tld/*
// @include        https://www.google.tld
// @include        http://www.google.com.au/*
// @include        http://www.google.com.au
// @include        https://www.google.com.au/*
// @include        https://www.google.com.au
// ==/UserScript==

//setTimeout(main, 100);
main();

function main()
{
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
	//replaceElement("h3", "h6");
	del(["button", "img", "h2", ".esc"]);
	head = get("head")[0];
	while(head.firstChild)
		head.removeChild(head.firstChild);
	document.title = "Google: " + s;
	removeAttributes();
	insertStyle('body { background: none repeat scroll 0% 0% #181818; color: #888888; font: 38px "swis721 cn bt"; padding: 40px; } a { color: #6688CC; outline: 0px none; text-decoration: none; } a:visited { color: #5566AA; } a:hover, a:focus { color: #FFFFFF; } em, b, strong { color: #AAAAAA; font-style: normal; font-weight: normal; } a em, a b, a strong { color: inherit; } h1, h2, h3, h4, h5, h6 { background: none repeat scroll 0% 0% #111111; font-family: verdana; font-weight: normal; margin: 20px 0px 10px; padding: 0px; } h1 { color: #AAAAAA; font: 48px "swis721 cn bt"; padding: 10px 20px; } h3 { font: 24px "swis721 cn bt"; } ol { font: 24px "swis721 cn bt"; margin: 0px; padding: 0px; } ol > li, ol > div > li { background: none repeat scroll 0% 0% #111111; float: left; font: 12px Verdana; margin: 0px 40px 10px 0px; padding: 0px 200px 0px 10px; position: relative; width: 35%; } ol ul { list-style: none outside none; position: absolute; right: 0px; top: 0px; } ol ul li { float: none; font: bold 18px arial; padding: 10px; } ol ul li a { color: #555555; } ol ul li a:hover { color: #FFFFFF; } body > a { background: none repeat scroll 0% 0% #111111; font-size: 32px; margin: 1px; padding: 20px; display: inline-block; } body > a:hover, body > a:focus { background: #000; }');
	xlog(s, "h1", true);
	addEventListener("keyup", handleKeyup, false);
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
