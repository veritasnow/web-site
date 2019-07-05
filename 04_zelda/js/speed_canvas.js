$(function(){
    var sct = $(window).scrollTop(),
        plxArr;
    
    if(window.requestAnimationFrame){
        parallax();
    }
    
    resizeHeader(230);
    
    setTimeout(function(){
        $("body").addClass("load");
        $(".screen").stop().fadeOut(500, function(){
            $(this).remove();
        })    
    }, 300);
    
    $(window).on({
        scroll: function(){
            sct = $(window).scrollTop();
            var isHeader = sct >= $("body").offset().top,
                isQuick = sct >= $("#Content1").offset().top - 200;
            if(isQuick && !$("#quick").hasClass("show")){
                $("#quick").stop().addClass("show").fadeIn(300);
            } else if(!isQuick && $("#quick").hasClass("show")){
                $("#quick").removeClass("show").stop().fadeOut(300);
            }
            
            if(isHeader){
                $("body").addClass("fixed");
            } else{
                $("body").removeClass("fixed");
            }
            
            if($("html, body").is(":animated")){return false;}
            
            for(var i = quickArr.length - 1; i >=0 ; i--){
                if(sct >= quickArr[i]){
                    $("#quick li:eq("+i+")").addClass("on").siblings().removeClass("on");
                    $(".event:eq("+i+")").addClass("active");
                    break;
                } else {
                    $("#quick li").removeClass("on");
                    $(".event:not(:eq("+i+"))").removeClass("active");
                }
            }
        },
        resize: function(){
            winHeight = $(window).height();
            activeQuick();
            resizeHeader(230);
        },
        load : function(){
            plxArr = pallaxTop();
            activeQuick();
        }
    })
    
    $("#GNB_BtBanner").click(function(){
        activeQuick();
    })
    
    $(".scroll_list a").click(function(e){
        e.preventDefault();
        var link = $(this).attr("href"),
            scrollTo = $(link).length > 0 ? $(link).offset().top - $("#header").outerHeight() : 0;
        $("#quick li").removeClass("on").filter(":has(a[href="+link+"])").addClass("on");
        $("html, body").stop().animate({scrollTop: scrollTo}, 700);
    })
    
    $(".layerpop .btn_open").hover(function(){
        $(this).siblings("p").addClass("hover");
    }, function(){
        $(this).siblings("p").removeClass("hover");
    })
    
    $(".layerpop .btn_close, .layerpop .bg").click(function(){
        var id = $(this).parents(".layerpop").attr("id");
        pop.close(id);
    });
    
    // parallax
    function pallaxTop(){
        if(!window.requestAnimationFrame){
            return false;
        }
        var arr = [];
        // set scroll distance
        $(".intro .move2, .intro .move3, .content1 .move1, .content2 .move2, .content3 .move1, .content4 .move2, .banner3 .move2,  .banner1 .move1").data("distance", 0.05);
        $(".content1 .move3, .content2 .move1, .banner2 .move1, .content4 .move1").data("distance", 0.1);
        $(".intro .move1, .content1 .move2, .content3 .move2, .banner3 .move1, .content4 .move3, .banner1 .move2").data("distance", 0.2);
        $(".section .moving").each(function(i){
            var distance = $(this).data("distance"),
                fromTop = $(this).offset().top - parseInt(winHeight/2),
                obj = {
                    top: fromTop,
                    from: fromTop - winHeight
                },
                position = obj.top - obj.from;
            $(this).css({transform:"translateY("+position * distance+"px)"}).data("position", position);
            arr[i] = obj;
        })
        return arr;
    }
    
    function parallax(){
        if(plxArr){
            $(".section .moving").each(function(i){
                var distance = $(this).data("distance"),
                    position = $(this).data("position"),
                    move;
                if(sct >= plxArr[i].from){
                    move = (plxArr[i].top - sct);
                    position += (move - position) * 0.05;
                } else {
                    position = plxArr[i].top - plxArr[i].from;
                }
                $(this).data({"position":position}).css({transform:"translateY("+position * distance+"px)"});
            })
        }
        window.requestAnimationFrame(parallax);
    }
})

var quickArr = [],
    winHeight = $(window).height();

//pop
var pop = {
    speed : 300,
    open : function(id){
        var $pop = $("#"+id);
        $pop.stop().removeClass("hide").fadeIn(this.speed);
    },
    close : function(id){
        var $pop = $("#"+id);
        setTimeout(function(){
            if(!$("body").hasClass("load")){
                $("body").addClass("load");
            }    
        }, this.speed * 0.5);
        $pop.stop().fadeOut(this.speed);
    }
}


// section offset top
function activeQuick(){
    $("#quick li").each(function(i){
        var value = {top:"",height:""},
            link  = $(this).find("a").attr("href");
        quickArr[i] = $(link).offset().top - parseInt(winHeight/2) < 0 ? 0 : $(link).offset().top - parseInt(winHeight/2);
    })
}

function resizeHeader(distance){
    var winWidth = $(window).width(),
        maxWidth = 1900,
        minWidth = 1280,
        resizeValue = winWidth <= maxWidth ? winWidth <= minWidth ? distance : parseInt(distance * (maxWidth - winWidth) / (maxWidth - minWidth)) : 0;
    $(".nav").css({"padding-right":resizeValue});
    
}