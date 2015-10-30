var normalImages = new Array('icon-01.gif', 'icon.gif-02', 'icon.gif-03', 'icon.gif-04', 'icon-05', 'icon-06');

var hoverImages = new Array('icon-grey-01.gif', 'icon-grey.gif-02', 'icon-grey.gif-03', 'icon-grey.gif-04', 'icon-grey-05', 'icon-grey-06');

function preloadImages() 
{
	var i=0;

	objImage = new Image();

	for	(i=1; i<=hoverImages.length; i++)
	{
		objImage.src = hoverImages[i];
	}
}

function setHover(num)
{
	obj = eval('document.image' + num);
	str = obj.src;

	if (str.search(clickImages[num-1]) == -1)
	{
		obj.src = hoverImages[num-1];
	}
}