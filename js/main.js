// JavaScript Document

// 메인 슬라이드
var menu = $(".pager li");
var section = $("#container .sec");
var last = menu.size() - 1;


// 페이저 클릭
menu.click(function(){
	var i = $(this).index();
	var tg = section.eq(i);
	var tt = tg.offset().top;
	$("html, body").stop().animate({scrollTop:tt},1000);
	return false;
});

$(window).scroll(function(){
	var sct = $(window).scrollTop();
	section.each(function(){
		var i = $(this).index();
		var tt = $(this).offset().top;
		if(sct >= tt){
			menu.removeClass("on");
			menu.eq(i).addClass("on");
		}
    });

	var bb = $(document).height() - $(window).height();

	if(sct == bb){
		menu.removeClass("on");
		menu.eq(last).addClass("on");
	}
});



// 기획서 보기
$(".ppt1 a").colorbox({
    rel : "ppt1"
});


$(".ppt2 a").colorbox({
    rel : "ppt2"
});

$(".ppt3 a").colorbox({
    rel : "ppt3"
});
