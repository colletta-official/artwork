$(document).ready(function(){
	dataLoad();
	$(".thumbnail").each(function () {
		var top=$(this).offset().top;
		var bot=$(window).height();
		var hei=$(this).height();
		if(top<bot-hei) $(this).css('opacity', '1');
	});
	$(".thumbnail img").each(function () {
		$(this).on("hover", function (e) {
			e.preventDefault();
			var $p=$(this).find(".popup").eq(0);
			$p.stop().fadeToggle("slow");
		});
	});
	$(".scrollBlind")[0].onscroll=function(){
		$(".thumbnail").each(function () {
			var top=$(this).offset().top;
			var bot=$(window).height();
			var hei=$(this).height();
			if(top<bot-hei && $(this).css('opacity') == '0') $(this).addClass('slideInUp');
		});
	};
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		var $popup=$("<div class='popup'><div><p class='titlePic'>"+imgList[i].title+"</p><p>"+imgList[i].date+"</p><div></div>");
		$tac.css('opacity', 0);
		$tac.append($popup);
		$tac.appendTo($(".list").eq(0));
	}
}
function pad(n, width) {
	n= n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
