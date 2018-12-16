$(document).ready(function(){
	dataLoad();
	$(".thumbnail").each(function () {
		var top=$(this).offset().top;
		var bot=$(window).height();
		var hei=$(this).height();
		if(top<bot-hei)
		{
			$(this).css('opacity', '1');
			$(this).find('.popup').eq(0).css('cursor','pointer');
		}
		else $(this).css('opacity', '0');
	});
	$(".scrollBlind")[0].onscroll=function(){
		$(".thumbnail").each(function () {
			var top=$(this).offset().top;
			var bot=$(window).height();
			var hei=$(this).height();
			if(top<bot-hei && $(this).css('opacity') == '0')
			{
				$(this).css('display', 'flex');
				$(this).find('.popup').eq(0).css('cursor','pointer');
				$(this).addClass('slideInUp');
			}
		});
	};
	$(".widePicArea").click(function(){
		if($(window).width()>768)
		{
			var $q=$(this).siblings(".wideTextArea").children(".realTextArea");
			if($q.hasClass('able')) $q.removeClass('able');
			else $q.addClass('able');
		}
	});
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var title='"'+imgList[i].title.replace( / /gi, '_')+'"';
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		var $popup=$("<div class='popup' onclick='viewPic("+title+")'><div><p class='titlePic'>"+imgList[i].title+"</p><p>"+imgList[i].date+"</p></div></div>");
		var $wide=$('<div class="wide" id='+title+'></div>');
		var $widePicArea=$("<div class='widePicArea'></div>");
		/*
		for(var j=0; j=imgList[i].src.length; j++)
		{
			$widePicArea.append($("<img src='img/"+imgList[i].src[j]+"'>"));
		}
		*/
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
	location.href="#"+i;
	$(".closeButton").addClass('able');
}
function closePic()
{
	location.href="#";
	$(".closeButton").removeClass('able');
}
