$(document).ready(function(){
	dataLoad();
	$(".scrollBlind")[0].onscroll=function(){
		$(".thumbnail").each(function (e) {
			var top=$(this).offset().top;
			var bot=$(window).height();
			var hei=$(this).height();
			if(top<bot-hei) $(this).addClass('slideInUp');
		});
	};
});
function dataLoad()
{
	for(var i=0;i<imgList.length;i++)
	{
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		$tac.css('opacity', 0);
		$tac.appendTo($(".list").eq(0));
	}
}
function pad(n, width) {
	n= n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
