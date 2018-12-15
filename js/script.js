$(document).ready(function(){
	dataLoad();
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var $tac=$("<div class='thumbnail'><img src='img/"+imgList[i].src+"'></div>");
		$tac.appendTo("#illust");
	}
}
