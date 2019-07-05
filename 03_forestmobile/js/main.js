// JavaScript Document






//메인 슬라이드
$(".msImg ul").bxSlider({
	auto : true,
	pause : 7000,
	speed : 2000,
	controls : false,
	autoControls : true,
	autoControlsCombine :true
});

//메뉴창 열기
$(".OpenMenu").click(function(){
	$(this).toggleClass("checked")
})


$(".OpenMenu").click(function(){
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