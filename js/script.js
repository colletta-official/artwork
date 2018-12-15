$(document).ready(function(){
	dataLoad();
	$(".thumbnail").each(function () {
		var top=$(this).offset().top;
		var bot=$(window).height();
		var hei=$(this).height();
		if(top<bot-hei) $(this).css('display', 'flex');
		else $(this).css('display', 'none');
	});
	$(".scrollBlind")[0].onscroll=function(){
		$(".thumbnail").each(function () {
			var top=$(this).offset().top;
			var bot=$(window).height();
			var hei=$(this).height();
			if(top<bot-hei && $(this).css('display') == 'none')
			{
				$(this).css('display', 'flex');
				$(this).addClass('slideInUp');
			}
		});
	};
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		var $popup=$("<div class='popup' onclick='viewPic("+i+")'><div><p class='titlePic'>"+imgList[i].title+"</p><p>"+imgList[i].date+"</p></div></div>");
		var $wide=$("<div class='wide' id='wp"+i+"'></div>");
		var $widePicArea=$("<div class='widePicArea'></div>");
		for(var j=0; j=imgList[i].src.length; j++)
		{
			$widePicArea.append($("<img src='img/"+imgList[i].src[j]+"'>"));
		}
		var $wideTextArea=$("<div class='wideTextArea'><div class='realTextArea'>"+imgList[i].description+"</div></div>");
		$wide.append($widePicArea);
		$wide.append($wideTextArea);
		$wide.appendTo($('#wideContainer'));
		$tac.append($popup);
		$tac.appendTo($(".list").eq(0));
		
	}
}
function pad(n, width) {
	n= n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
function viewPic(i)
{
	location.href="#wp"+i;
}
