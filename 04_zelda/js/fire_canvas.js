$(function(){
    
    var isScreen = true;
    
    if(window.requestAnimationFrame){
        parallax();
        particle();
    
    }
    // glitch
    glitch.init();
    
    // quick
    activeQuick();
    
    $("#wrap").append("<span id='dim'></span>");
    
    setTimeout(function(){
        $("#wrap").addClass("load");
        setTimeout(function(){
            isScreen = false;
            $(".intro .subtitle").removeClass("fixed");
            $("#dim").stop().fadeOut(800, function(){
                $(this).remove();
            })
        }, 1000);
        glitch.show();
    }, 300)
    
    // quick
    $("#quick a[href^=#], #Nav li a").click(function(e){
        e.preventDefault();
        if($(this).parent().is("li")){
            $(this).parent().addClass("on").siblings().removeClass("on");
        }
        var link = $(this).attr("href"),
            scrollTo = $(link).length > 0 ? $(link).offset().top : 0,
            speed = Math.min(Math.max(parseInt(Math.abs(scrollTo - sct) * 0.1), 500), 700);
        $("html, body").stop().animate({scrollTop: scrollTo}, speed, function(){
            $(window).trigger("scroll");
        });
    })
    
    $(window).on({
        scroll: function(){
            sct = $(window).scrollTop();
            
            for(var i = scrollPosition.length - 1; i >=0 ; i--){
                if(sct >= scrollPosition[i]){
                    $(".scroll:eq("+i+")").addClass("active");
                } else {
                    $(".scroll:eq("+i+")").removeClass("active");
                }
            }
            
            if(isScreen){
                if(sct>$("#wrap").offset().top){
                    $(".intro .subtitle").addClass("fixed");
                } else {
                    $(".intro .subtitle").removeClass("fixed");
                }
            } else {
                $(".intro .subtitle").removeClass("fixed");
            }
            
            if($("html, body").is(":animated")){return false;}
            
            if(sct >= $("#Content1").offset().top && !$("#quick").hasClass("show")){
                $("#quick").addClass("show").fadeIn(300);
            } else if(sct < $("#Content1").offset().top && $("#quick").hasClass("show")){
                $("#quick").removeClass("show").fadeOut(300);
            }
            
            for(var i = quickPosition.length - 1; i >=0 ; i--){
                if(sct >= quickPosition[i]){
                    $("#quick li:eq("+i+")").addClass("on").siblings().removeClass("on");
                    break;
                } else {
                    $("#quick li").removeClass("on");
                }
            }
        },
        load: function(){
            activeQuick();
            plxArr = pallaxTop();
        }
    })
})

var winHeight = $(window).height(),
    sct = $(window).scrollTop(),
    quickPosition =[],
    scrollPosition = [],
    plxArr;

// glitch
var glitch = {
    $obj : "",
    init : function(){
        this.$obj = $(".intro .subtitle");
        var self = this,
            distance = 3,
            range = 10,
            rects = {width : this.$obj.width(), height: this.$obj.height()};
        for(var i = 0 ; i < Math.ceil(rects.height / distance) ; i++){
            (function(i){
                var $span = $("<span></span>"),
                    vertical = i * distance;
                $span.css({"top":vertical, "height":distance, "background-position":"0 "+ (-vertical)+"px"}).appendTo(self.$obj);    
            })(i);
        }
    }, 
    show: function(){
        var div = document.createElement("div"),
            self = this;
        if(!("transition" in div.style)){return false;}
        this.timeout();
        setTimeout(function(){
            self.timeout();
        }, 500);
    },
    timeout: function(){
        this.$obj.find("span").each(function(j){
            var el = $(this),
                range = 20,
                random = Math.random() < 0.5 ? parseInt(Math.random() * range) + 1 : -parseInt(Math.random() * range) + 1,
                delay = Math.round(Math.random() * 500),
                timer = j;
            setTimeout(function(){
                if(el.position().left !=0 )  {return false;}
                el.css({"left":random, "opacity":1});    
                setTimeout(function(){
                    el.css({"left":""});
                },150);
            }, delay);
        })
    }
}

// particle
function particle(){
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        now = +new Date(),
        length = 30,
        round = 360,
        img = new Image(),
        ptcs = [],
        spriteArr = [
            {x:0, y:59, width:13, height: 11},
            {x:0, y:116, width:11, height: 17},
            {x:0, y:151, width:13, height: 13},
            {x:0, y:190, width:11, height: 10},
            {x:0, y:295, width:8, height: 8},
            {x:0, y:323, width:7, height: 8},
            {x:0, y:357, width:8, height: 10},
            {x:0, y:0, width:47, height: 45},
            {x:0, y:83, width:20, height: 21},
            {x:0, y:219, width:49, height: 59}
        ];
    canvas.width = window.innerWidth;
    canvas.height = 1002;
    img.src = "../img/spr_particle.png";

    var Particle = (function(){
        function Particle(){
            this.from = {};
            this.to = {};
            this.move = {};
            this.distance = {};
            this.x = 0;
            this.accure = 0;
            this.degree = 0;

            this.init();
        }

        Particle.prototype.init = function(){
            this.delay = random(0, 5000);
            this.speed = random(5, 30) * 0.1;
            this.wave = Math.sin(5, 20);
            this.img = random(0, 10) % 4 == 0 ? spriteArr[random(spriteArr.length - 3, spriteArr.length - 1)] : spriteArr[random(0, spriteArr.length - 4)];
            this.from.x = this.x = this.move.x = random(0, canvas.width);
            this.to.x = this.from.x < canvas.width * 0.2 ? -this.img.width : (this.from.x > canvas.width * 0.7 ? canvas.width + this.img.width * 2 : this.from.x);  
            this.from.y = this.move.y = canvas.height + this.img.height;
            this.to.y = (this.to.x < 0 || this.to.x > canvas.width) ? random(0, canvas.height * 0.4) : -this.img.height;
            this.distance.x = (this.from.x - this.to.x) / round * this.speed;
            this.distance.y = (this.from.y - this.to.y) / round * this.speed;
        }

        Particle.prototype.calc = function(delta){
            this.accure += delta;
            if(this.accure < this.delay){
                return false;
            } else if(this.move.y + this.img.height < 0 || this.move.x + this.img.width < 0 || this.move.x > canvas.width){
                this.move.x = this.x = this.from.x;
                this.move.y = this.from.y;
                this.delta = 0;
                return false;
            }
            this.move.x = this.x + Math.sin(this.degree * Math.PI/180) * this.wave;
            this.move.y -= this.distance.y;
            this.degree += this.distance.y;
            this.x -= this.distance.x; 
            this.draw();
        }

        Particle.prototype.draw = function(){
            ctx.beginPath();
            //ctx.arc(this.move.x, this.move.y, this.img.width, 0, Math.PI * 2, true);
            ctx.drawImage(img, this.img.x, this.img.y, this.img.width, this.img.height, this.move.x, this.move.y, this.img.width, this.img.height);
            //ctx.fillStyle = "#F0D4B7";
            ctx.closePath();
            //ctx.fill();
        }

        return Particle;

    })(); 

    // random
    function random(n, x){
        return parseInt(n + Math.round(Math.random() * (x-n)));
    }

    // timer
    function timer(){
        var then = +new Date(),
            delta = then - now;
        now = then;
        return delta;
    }

   function createParticles(){  
       for(var i = 0; i< length; i++){
           ptcs[i] = new Particle();
       }
   }

    function loop(){
        var delta = timer();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i = 0; i<length; i++){
            ptcs[i].calc(delta);
        }
        window.requestAnimationFrame(loop);
    }

    createParticles();

    loop();
}

// parallax
function pallaxTop(){
    if(!window.requestAnimationFrame){
        return false;
    }
    var arr = [];
    // set scroll distance
    $(".content1 ._h1, .content2 ._x3").data("distance", 0.04);
    $(".content1 .subtitle").data("distance", 0.05);
    $(".content1 ._h2, .content2 ._x2, .content2 ._x5, .content3 ._c2").data("distance", 0.06);
    $(".content2 ._x1, .content2 ._x4").data("distance", 0.08);
    $(".content3 ._c3, .section .particle:even").data("distance", 0.1);
    $(".section .particle:odd").data("distance", 0.2);
    $(".content3 ._c1").data("distance", -0.05);
    $(".section .particle:nth-child(3n)").data("distance", -0.1);
    
    $(".section .plx").each(function(i){
        var rotate,
            distance = $(this).data("distance"),
            fromTop = $(this).offset().top - parseInt(winHeight * 0.5),
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
        $(".section .plx").each(function(i){
            var rotate,
                distance = $(this).data("distance"),
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

// section offset top
function activeQuick(){
    $("#quick li").each(function(i){
        var value = {top:"",height:""},
            link  = $(this).find("a").attr("href");
        quickPosition[i] = $(link).offset().top - parseInt(winHeight * 0.5) < 0 ? 0 : $(link).offset().top - parseInt(winHeight * 0.5);
    })
    $(".scroll").each(function(j){
        scrollPosition[j] = $(this).hasClass("character") ? $(this).offset().top - parseInt(winHeight * 0.7) : $(this).offset().top - parseInt(winHeight * 0.5);
    })
    $(window).trigger("scroll");
}