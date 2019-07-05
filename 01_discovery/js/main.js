// JavaScript Document



// .gnb메뉴
$(".PCgnb").mouseenter(function(){
	$(this).stop().animate({height:375},850);
	$("#header").addClass("over");
	$(".Mbg").addClass("over");

	$(".subbg").stop().slideDown(300);	

}).mouseleave(function(){
	$(this).stop().animate({height:75},400);	
	$("#header").removeClass("over");
	$(".Mbg").removeClass("over");
	$(".subbg").stop().slideUp(400);	
});







$(window).scroll(function(){
	var sct = $(window).scrollTop();
	if(sct>=45){
		$(".Mbg").addClass("over");
		$(".Mlogo").addClass("over");
		$(".menu").addClass("over");
		$(".openMenu").addClass("over");
	}else{
		$(".Mbg").removeClass("over");
		$(".Mlogo").removeClass("over");
		$(".menu").removeClass("over");
		$(".openMenu").removeClass("over");
	}
});





//메인 슬라이드 피씨, //메인 슬라이드 모바일
$(".mainSlide ul").bxSlider({
	auto : true,
	pause : 7000,
	speed : 2000,
	controls : false
});




//메뉴창 열기
$(".openMenu").click(function(){
	$(this).toggleClass("checked")
})


$(".openMenu").click(function(){
	$(".menu").css({display:"block"})
	$(".CloseMenu").css({display:"block"})	
	$(".bkbg").css({display:"block"})	
})




//메뉴창 닫기
$(".CloseMenu").click(function(){
	$(this).toggleClass("checked")
})


$(".CloseMenu").click(function(){
	$(".menu").css({display:"none"})
	$(".CloseMenu").css({display:"none"})	
	$(".bkbg").css({display:"none"})	
})



//브라우저에 스크롤 추가

$(window).scroll(function(){
	var sct = $(window).scrollTop();
	if(sct>=80){
		$("#header").addClass("fix");
		$(".utill").fadeOut(300);
	}else{
		$("#header").removeClass("fix");
		$(".utill").fadeIn(300);
	}
});