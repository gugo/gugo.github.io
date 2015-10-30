var normalImages = new Array('icon-grey-01.gif', 'icon-grey-02.gif', 'icon-grey-03.gif', 'icon-grey-04.gif', 'icon-grey-05.gif', 'icon-grey-06.gif');

var hoverImages = new Array('icon-01.gif', 'icon-02.gif', 'icon-03.gif', 'icon-04.gif', 'icon-05.gif', 'icon-06.gif');

var clickImages = new Array('icon-click-01.gif', 'icon-click-02.gif', 'icon-click-03.gif', 'icon-click-04.gif', 'icon-click-05.gif', 'icon-click-06.gif');

var objImage;

function preloadImages() 
{
	var i=0;

	objImage = new Image();

	for	(i=1; i<=hoverImages.length; i++)
	{
		objImage.src = hoverImages[i];
	}
}

function resetAll()
{
	for	(i=1; i<=normalImages.length; i++)
	{
		objImage = eval('document.image' + i);
		objImage.src = normalImages[i-1];
	}

}

function setHover(num)
{
	objImage = eval('document.image' + num);
	var str = objImage.src;

	if (str.search(clickImages[num-1]) == -1)
	{
		objImage.src = hoverImages[num-1];
	}
}

function setClick(num) {
	resetAll();
	objImage = eval('document.image' + num);
	objImage.src = clickImages[num-1];
}

function setNormal(num)
{
	objImage = eval('document.image' + num);
	var str = objImage.src;

	if (str.search(clickImages[num-1]) == -1)
	{
		objImage.src = normalImages[num-1];
	}
}

<li id="vimeo">
								<a href="https://vimeo.com/iamgugo" target="_blank" onMouseOver="setHover(1)" onMouseOut="setNormal(1)" onClick="setClick(1)"><img name="image1" src="img/icon-grey-01.gif"></a>
							</li>
							<li id="github">
								<a href="https://github.com/gugo" target="_blank" onMouseOver="setHover(2)" onMouseOut="setNormal(2)" onClick="setClick(2)"><img name="image1" src="img/icon-grey-02.gif"></a>
							</li>
							<li id="twitter">
								<a href="https://twitter.com/gugotorelli" target="_blank" onMouseOver="setHover(3)" onMouseOut="setNormal(3)" onClick="setClick(3)"><img name="image1" src="img/icon-grey-03.gif"></a>
							</li>
							<li id="behance">
								<a href="https://www.behance.net/iamgugo" target="_blank" onMouseOver="setHover(4)" onMouseOut="setNormal(4)" onClick="setClick(4)"><img name="image1" src="img/icon-grey-04.gif"></a>
							</li>
							<li id="tumblr">
								<a href="http://gugo-torelli.tumblr.com/" target="_blank" onMouseOver="setHover(5)" onMouseOut="setNormal(5)" onClick="setClick(5)"><img name="image1" src="img/icon-grey-05.gif"></a>
							</li>
							<li id="pinterest">
								<a href="https://www.pinterest.com/gugotorelli/" target="_blank" onMouseOver="setHover(6)" onMouseOut="setNormal(6)" onClick="setClick(6)"><img name="image1" src="img/icon-grey-06.gif"></a>