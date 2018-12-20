var picDic={};
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
	if(window.location.hash != "")
	{
		viewPic(decodeURI(window.location.hash).substr(1,99999));
	}
});
$(window).resize(function(){
	modalResolutionChange();
});
function dataLoad()
{
	var nn=0;
	for(var i=0;i<imgList.length;i++)
	{
		var title=changeHashable(imgList[i].title);
		picDic[title]={no: nn, type: "illust"};
		title='"'+title+'"';
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		var $popup=$("<div class='popup' onclick='viewPic("+title+")'><div><p class='titlePic'>"+imgList[i].title+"</p><p>"+imgList[i].date+"</p></div></div>");
		var $wide=$('<section class="wide" id='+title+'></section>');
		var $widePicArea=$("<div class='widePicArea'></div>");
		var $wideTextArea=$("<div class='wideTextArea'><div class='realTextArea'>"+imgList[i].description+"</div></div>");
		var $d=$("<div></div>");
		$d.append($widePicArea);
		$d.append($wideTextArea);
		$wide.append($d);
		$wide.appendTo($('#wideContainer'));
		$tac.append($popup);
		$tac.appendTo($("#illust .list").eq(0));
		nn++;
	}
	for(var i=0;i<toonList.length;i++)
	{
		var title=changeHashable(toonList[i].title);
		picDic[title]={no: nn, type: "cartoon"};
		title='"'+title+'"';
		var $tac=$("<div class='thumbnail'><img src='img/thumbnail/thumbnail-"+pad(i+1, 2)+".png'></div>");
		var $popup=$("<div class='popup' onclick='viewPic("+title+")'><div><p class='titlePic'>"+imgList[i].title+"</p><p>"+imgList[i].date+"</p></div></div>");
		var $wide=$('<section class="wide" id='+title+'></section>');
		var $widePicArea=$("<div class='widePicArea'></div>");
		var $wideTextArea=$("<div class='wideTextArea'><div class='realTextArea'>"+imgList[i].description+"</div></div>");
		var $d=$("<div></div>");
		$d.append($widePicArea);
		$d.append($wideTextArea);
		$wide.append($d);
		$wide.appendTo($('#wideContainer'));
		$tac.append($popup);
		$tac.appendTo($("#cartoon .list").eq(0));
		nn++;
	}
}
function pad(n, width) {
	n= n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
function changeHashable(str){
	var res=str.replace( / /gi, '_');
	return res.replace(/[!,]/gi, '');
}

function viewPic(str)
{
	var link="#"+str;
	var n=picDic[str].no;
	location.href=link;
	var $picArea=$(link).find(".widePicArea");
	var $imgArea;
	if($picArea.has("img").length == 0)
	{
		if(picDir[str].type == "cartoon")
		{
			for(var j=0; j<imgList[n].page; j++)
			{
				$imgArea=$( "<img src='img/" + imgList[n].src + '-' + pad(j, 2) + "' class='res_" + imgList[n].resol[j] +"'>" );
				if(j==0) $imgArea.addClass('able');
				$picArea.append($imgArea);
			}
		}
		else{
			for(var j=0; j<imgList[n].src.length; j++)
			{
				$imgArea=$( "<img src='img/" + imgList[n].src[j] + "' class='res_" + imgList[n].resol[j] +"'>" );
				if(j==0) $imgArea.addClass('able');
				$picArea.append($imgArea);
			}
		}
		if(j>1)
		{
			var $leftButton=$("<img src='img/prev.png' onclick='prev_(this)' class='controlButton lefter'>");
			var $rightButton=$("<img src='img/next.png' onclick='next_(this)' class='controlButton righter'>");
			$picArea.parent().append($leftButton);
			$picArea.parent().append($rightButton);
		}
	}
	$(".closeButton").addClass('able');
	modalResolutionChange();
}
function closePic()
{
	location.href="#";
	$(".realTextArea").removeClass('able');
	$(".closeButton").removeClass('able');
}

function modalResolutionChange()
{
	var $target=$(".wide:target");
	if($target.length == 0) return;
	var $curr=$target.find('.able');
	var $modal=$target.children('div').eq(0);
	var resolution=parseInt($curr.attr('class').split("res_")[1].split(" ")[0]);
	if(($(window).width()/$(window).height()) > resolution/1280)
	{
		$modal.addClass('landscape');
		$modal.removeClass('portrait');
	}
	else{
		$modal.removeClass('landscape');
		$modal.addClass('portrait');
	}
}
function prev_(e){
	var $pic=$(e).siblings(".widePicArea");
	var $list=$pic.children();
	var ableIndex=$pic.children(".able").index();
	$list.eq(ableIndex).removeClass("able");
	$list.eq((ableIndex+$list.length-1)%$list.length).addClass("able");
	modalResolutionChange();
}
function next_(e){
	var $pic=$(e).siblings(".widePicArea");
	var $list=$pic.children();
	var ableIndex=$pic.children(".able").index();
	$list.eq(ableIndex).removeClass("able");
	$list.eq((ableIndex+1)%$list.length).addClass("able");
	modalResolutionChange();
}
