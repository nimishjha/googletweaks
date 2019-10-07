// ==UserScript==
// @name		   Google my tweaks
// @namespace	  google.com
// @include		http://www.google.tld/*
// @include		http://www.google.tld
// @include		https://www.google.tld/*
// @include		https://www.google.tld
// @include		http://www.google.com.au/*
// @include		http://www.google.com.au
// @include		https://www.google.com.au/*
// @include		https://www.google.com.au
// @include		http://www.google.com/*
// @include		http://www.google.com
// ==/UserScript==

"use strict";

function cleanupLinks()
{
	const links = get("a");
	let i = links.length;
	while(i--)
	{
		const link = links[i];
		const newLink = createElement("a", { innerHTML: link.innerHTML, href: link.href });
		link.parentNode.replaceChild(newLink, link);
	}
}

function get(s)
{
	let nodes;
	try
	{
		nodes = document.querySelectorAll(s);
	}
	catch(error)
	{
		return null;
	}
	if(s.indexOf("#") === 0 && !~s.indexOf(" ") && !~s.indexOf("."))
		return document.querySelector(s);
	if(nodes.length)
		return Array.from(nodes);
	return false;
}

function getOne(s)
{
	return document.querySelector(s);
}

function del(arg)
{
	if(!arg)
		return;
	if(arg.nodeType)
		arg.parentNode.removeChild(arg);
	else if(arg.length)
		if(typeof arg === "string")
			del(get(arg));
		else
			for(let i = 0, ii = arg.length; i < ii; i++)
				del(arg[i]);
}

function cleanupHead()
{
	const h = getOne("head");
	if(!h)
		return;
	const tempTitle = document.title;
	h.innerHTML = '';
	document.title = tempTitle;
}

function focusFirstResult()
{
	var e = get("h3");
	let i = e.length;
	let firstLink;
	while(i--)
	{
		const links = e[i].getElementsByTagName("a");
		if(links.length)
			firstLink = links[0];
		firstLink.setAttribute("tabIndex", i + 1);
	}
	firstLink.focus();
}

function createElement(tag, props)
{
	const elem = document.createElement(tag);
	if(props && typeof props === "object")
	{
		const keys = Object.keys(props);
		let i = keys.length;
		const settableProperties = ["id", "className", "textContent", "innerHTML", "value"];
		while(i--)
		{
			const key = keys[i];
			if(settableProperties.includes(key))
				elem[key] = props[key];
			else
				elem.setAttribute(key, props[key]);
		}
		return elem;
	}
	return elem;
}

function main()
{
	if(location.href.toString().indexOf("isch") !== -1) return;	 // Don't run on Google Image Search results

	cleanupHead();
	cleanupLinks();

	const replacementContainer = createElement("div", { id: "replacer" });
	const results = get(".rc");
	for(let i = 0, ii = results.length; i < ii; i++)
	{
		const resultWrapper = createElement("blockquote");
		const resultLink = results[i].querySelector("h3").parentNode;
		const resultDesc = results[i].querySelector(".s");
		const resultLinkText = resultLink.querySelector(".ellip").textContent;
		const resultLinkReplacement = createElement("a", { href: resultLink.href, textContent: resultLinkText });
		const resultLinkReplacementWrapper = createElement("h3");
		resultLinkReplacementWrapper.appendChild(resultLinkReplacement);
		resultWrapper.appendChild(resultLinkReplacementWrapper);
		resultWrapper.appendChild(createElement("h6", { textContent: resultLink }));
		resultWrapper.appendChild(resultDesc);
		replacementContainer.appendChild(resultWrapper);
	}
	const navigation = getOne("#nav").cloneNode(true);
	document.body.innerHTML = "";
	document.body.appendChild(replacementContainer);
	document.body.appendChild(navigation);
	document.body.className = "pad100";
	del("img");
	focusFirstResult();
}

main();
