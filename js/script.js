$(document).ready(function(){
	dataLoad();
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+"'></div>");
		$tac.appendTo("#illust");
	}
}
function pad(n, width) {
	n= n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
