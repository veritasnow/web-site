// JavaScript Document


$(".QmBk").click(function(){
	$(this).toggleClass("checked");	
})


$(".QmBk").click(function(){
	$(".booked").css({display:"block"})	
	$(".bkbg").css({display:"block"})		
})

// 팝업영역
$(".Close").click(function(){
    $(this).toggleClass("checked");
});

// 팝업닫기

$(".Close").click(function(){
	$(".booked").css({display:"none"});
	$(".bkbg").css({display:"none"});
	return false;
});


// .gnb메뉴
$(".gnb").mouseenter(function(){
	$(this).stop().animate({height:375},400);
	$(".subBg").stop().slideDown(400);	
}).mouseleave(function(){
	$(this).stop().animate({height:75},400);	
	$(".subBg").stop().slideUp(400);	
});


//메인 슬라이드
$(".msImg ul").bxSlider({
	auto : true,
	pause : 7000,
	speed : 2000,
	controls : false
});

$(".Bselect").click(function(){
	$(".boardbox li").removeClass("active");
	$(this).parent("li").addClass("active");
	return false;
})







