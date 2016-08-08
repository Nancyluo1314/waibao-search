/**
 * Created by Max Lai on 2016/5/9.
 */
$(function(){
    var winHeight = 0;
    if (window.innerHeight) winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
    $(window).scroll(function(){
        /*回到顶部*/
        if(window.navigator.userAgent.indexOf("Chrome") !== -1){
            if($("body").scrollTop()>winHeight*.5){
                if($(".scrollTop").hasClass("off")){
                    $(".scrollTop").css({display:"block"}).animate({"opacity":1},300,function(){
                        $(".scrollTop").removeClass("off").addClass("on");
                    })
                }
            }else{
                if($(".scrollTop").hasClass("on")){
                    $(".scrollTop").stop(true).animate({"opacity":0},300,function(){
                        $(".scrollTop").css({display:"none"}).removeClass("on").addClass("off");
                    });
                }
            }
        }else{
            if($("html,body").scrollTop()>winHeight*.5){
                if($(".scrollTop").hasClass("off")){
                    $(".scrollTop").css({display:"block"}).animate({"opacity":1},300,function(){
                        $(".scrollTop").removeClass("off").addClass("on");
                    })
                }
            }else{
                if($(".scrollTop").hasClass("on")){
                    $(".scrollTop").stop(true).animate({"opacity":0},300,function(){
                        $(".scrollTop").css({display:"none"}).removeClass("on").addClass("off");
                    });
                }
            }
        }
    });
    /*回到顶部*/
    $(".scrollTop").click(function(){
        var speed=500;//滑动的速度
        $("html,body").animate({scrollTop: 0}, speed);
        return false;
    });
    /*bottom fixed*/
    if($(window).height()>$("body").height()){
        $(".copy").css({
            "position":"fixed",
            "left":0,
            "bottom":0
        });
        $(".footer").css({
            "position":"fixed",
            "left":0,
            "bottom":$(".copy").height()
        });
        $("body").css({
            "paddingBottom":$(".footer").outerHeight()+$(".copy").height()
        });
    }

    /*index*/
    $.each($(".asideNav li>div div"),function(i,n){
        $(n).css({
            marginTop : ($(n).parent().innerHeight()-$(n).outerHeight()-20)/2
        });
    });
    $(".asideNav li>div").css("display","none");
    $(".asideNav li").hover(function(){
        $(this).children("div").css("display","block");
    },function(){
        $(this).children("div").css("display","none");
    });
    $(".search input[type='text']").on("focus",function(){
        $(this).attr("placeholder","hello world");
    }).on("blur",function(){
        $(this).attr("placeholder","框架设计");
    });

    /*companyList*/
    companyListReload();

    /*companyDetails caseImgShow*/
    $(".caseBox").on("click","img",function(){
        $("body").css({overflow:"hidden"});
        $(".caseImgShow img").attr("src",$(this).attr("src"));
        $(".caseImgShow").css({display:"table"});
    });
    $(".caseImgShow").on("click",function(){
        $("body").css({overflow:"auto"});
        $(".caseImgShow").css({display:"none"});
    });

    /*news*/
    $(".main").on("click","li",function(){
        $(this).addClass("hover").siblings().removeClass("hover");
    });
    $(".calendar").on("click","h3",function(){
        var $calendarBox = $(this).parent().find(".calendarBox");
        if($calendarBox.hasClass("off")){
            $calendarBox.stop(true).animate({height:$(this).parent().find("p").height()+40},500);
            $calendarBox.removeClass("off");
        }else{
            $calendarBox.stop(true).addClass("off").animate({height:0},500);
        }
    }).on("click","span",function(){
        $(this).parent().stop(true).animate({height:0},500);
    });
    newsListReload();

    btnL();
    setInterval(btnL,2700);

    /*entrust*/
    var processFlag = 0;
    var processTimer = setInterval(function(){
        processFlag++;
        processFlag%=5;
        processPlay(processFlag);
    },3000);
    $(".processLeft .pb>div.empty").on("click","b",function(){
        clearInterval(processTimer);
        processFlag = $(this).index();
        processPlay(processFlag);
        processTimer = setInterval(function(){
            processFlag++;
            processFlag%=5;
            processPlay(processFlag);
        },3000);
    });

});
var bannerPlay = {
    element:null,
    length:0,
    i:0,
    timer:null,
    init:function(element,vOrH,btnList,btnLR,time){
        var _this = this;
        _this.length = $("#"+element +" ul li").length;
        _this.element = element;
        if(_this.length>1){
            _this.timer = setInterval(function(){
                _this.i++;
                _this.i%=_this.length;
                if(vOrH == "V"){
                    _this.autoPlayV(_this.i);
                }else if(vOrH == "H"){
                    _this.autoPlayH(_this.i);
                }
            },time);
        }
        $("#"+element +" .imgList").append($("#"+element +" ul li:first-child").html());
        if(btnList){
            $.each($("#"+element +" ul li"),function(i,n){
                if(_this.length<=1){
                    $(".btnList").css("display","none");
                }else if(i==0){
                    $(".btnList").append('<a class="hover"></a>');
                }else{
                    $(".btnList").append('<a></a>');
                }
            });
            $(".btnList").on("click","a",function(){
                clearInterval(_this.timer);
                _this.timer = null;
                _this.clickPlayV(_this.i,$(this).index());
                _this.timer = setInterval(function(){
                    _this.i++;
                    _this.i%=_this.length;
                    _this.autoPlayV(_this.i);
                },time);
            });
        }
        if(btnLR&&_this.length>1){
            $("#"+element+" .btn").append('<a class="btnLeft"></a><a class="btnRight"></a>');
            $(".btn").on("click","a.btnLeft",function(){
                clearInterval(_this.timer);
                _this.timer = null;
                _this.clickL();
                _this.timer = setInterval(function(){
                    _this.i++;
                    _this.i%=_this.length;
                    _this.autoPlayH(_this.i);
                },time);
            });
            $(".btn").on("click","a.btnRight",function(){
                clearInterval(_this.timer);
                _this.timer = null;
                _this.clickR();
                _this.timer = setInterval(function(){
                    _this.i++;
                    _this.i%=_this.length;
                    _this.autoPlayH(_this.i);
                },time);
            });
        }
    },
    autoPlayV:function(i){
        var _this = this;
        $("#"+_this.element +" .imgList").append($("#"+_this.element +" ul li:eq("+i+")").html()).animate({marginTop:-$(".banner").height()},function(){
            $("#"+_this.element +" .imgList a:first-child").remove();
            $("#"+_this.element +" .imgList").css("marginTop",0);
        });
        $(".btnList a:eq("+i+")").addClass("hover").siblings().removeClass("hover");
    },
    clickPlayV:function(i,j){
        var _this = this;
        if(i<j){
            $("#"+_this.element +" .imgList").append($("#"+_this.element +" ul li:eq("+j+")").html()).animate({marginTop:-$(".banner").height()},function(){
                $("#"+_this.element +" .imgList a:first-child").remove();
                $("#"+_this.element +" .imgList").css("marginTop",0);
            });
            $(".btnList a:eq("+j+")").addClass("hover").siblings().removeClass("hover");
            _this.i=j;
            _this.i%=_this.length;
        }else if(i>j){
            $("#"+_this.element +" .imgList").prepend($("#"+_this.element +" ul li:eq("+j+")").html()).css("marginTop",-$(".banner").height()).animate({marginTop:0},function(){
                $("#"+_this.element +" .imgList a:last-child").remove();
            });
            $(".btnList a:eq("+j+")").addClass("hover").siblings().removeClass("hover");
            _this.i=j;
            _this.i%=_this.length;
        }
    },
    autoPlayH:function(i){
        var _this = this;
        $("#"+_this.element +" .imgList").append($("#"+_this.element +" ul li:eq("+i+")").html()).animate({marginLeft:-$(".banner").width()},function(){
            $("#"+_this.element +" .imgList a:first-child").remove();
            $("#"+_this.element +" .imgList").css("marginLeft",0);
        });
        $(".btnList a:eq("+i+")").addClass("hover").siblings().removeClass("hover");
    },
    clickPlayH:function(i,j){
        var _this = this;
        if(i<j){
            $("#"+_this.element +" .imgList").append($("#"+_this.element +" ul li:eq("+j+")").html()).animate({marginLeft:-$(".banner").width()},function(){
                $("#"+_this.element +" .imgList a:first-child").remove();
                $("#"+_this.element +" .imgList").css("marginLeft",0);
            });
            $(".btnList a:eq("+j+")").addClass("hover").siblings().removeClass("hover");
            _this.i=j;
            _this.i%=_this.length;
        }else if(i>j){
            $("#"+_this.element +" .imgList").prepend($("#"+_this.element +" ul li:eq("+j+")").html()).css("marginLeft",-$(".banner").width()).animate({marginTop:0},function(){
                $("#"+_this.element +" .imgList a:last-child").remove();
            });
            $(".btnList a:eq("+j+")").addClass("hover").siblings().removeClass("hover");
            _this.i=j;
            _this.i%=_this.length;
        }
    },
    clickL:function(){
        var _this = this;
        _this.i -= 1;
        _this.i%=_this.length;
        $("#"+_this.element +" .imgList").prepend($("#"+_this.element +" ul li:eq("+_this.i+")").html()).css("marginLeft",-$(".banner").width()).animate({marginLeft:0},function(){
            $("#"+_this.element +" .imgList a:last-child").remove();
        });
    },
    clickR:function(){
        var _this = this;
        _this.i++;
        _this.i%=_this.length;
        $("#"+_this.element +" .imgList").append($("#"+_this.element +" ul li:eq("+_this.i+")").html()).animate({"marginLeft":-$(".banner").width()},function(){
            $("#"+_this.element +" .imgList a:first-child").remove();
            $("#"+_this.element +" .imgList").css("marginLeft",0);
        });
    }
};

function companyListReload(){
    $.each($(".list .listBox p"),function(i,n){
        if($(n).text().length>120){
            $(n).html($(n).html().slice(0,120)+"...");
        }
    });
    $.each($(".share"),function(i,n){
        if(!$(n).hasClass("hover")){
            $(n).on("click",function(){
                $(n).addClass("hover");
                $(n).find("span").css({"display":"block"}).animate({"top":50},300,function(){
                    $(n).find("span").css({"display":"none","top":70});
                });
                setTimeout(function(){
                    $(n).html(Number($(n).text().slice(0,-2))+1);
                },300);
            });
        }
    });
    if($(window).height()>$("body").height()){
        $(".copy").css({
            "position":"fixed",
            "left":0,
            "bottom":0
        });
        $(".footer").css({
            "position":"fixed",
            "left":0,
            "bottom":$(".copy").height()
        });
        $("body").css({
            "paddingBottom":$(".footer").outerHeight()+$(".copy").height()
        });
    }
}

function newsListReload(){
    $.each($(".newsBox .newsText h4 a"),function(i,n){
        if($(n).text().length>25){
            $(n).html($(n).html().slice(0,25)+"...");
        }
    });
    $.each($(".newsBox .newsText p"),function(i,n){
        if($(n).text().length>100){
            $(n).html($(n).html().slice(0,100)+"...");
        }
    });//---------------------------------------------
    if($(window).height()>$("body").height()){
        $(".copy").css({
            "position":"fixed",
            "left":0,
            "bottom":0
        });
        $(".footer").css({
            "position":"fixed",
            "left":0,
            "bottom":$(".copy").height()
        });
        $("body").css({
            "paddingBottom":$(".footer").outerHeight()+$(".copy").height()
        });
    }
}

function btnL(){
    $(".otherNav a b.rightLine").animate({height:40},100);
    $(".otherNav a b.bottomLine").delay(100).animate({width:360},600);
    $(".otherNav a b.leftLine").delay(700).animate({height:40},100);
    $(".otherNav a b.topLine").delay(800).animate({width:360},600,function(){
        setTimeout(function(){
            $(".otherNav a b.rightLine").animate({opacity:0},200,function(){$(".otherNav a b.rightLine").css({height:0,opacity:1})});
            $(".otherNav a b.bottomLine").animate({opacity:0},200,function(){$(".otherNav a b.bottomLine").css({width:0,opacity:1})});
            $(".otherNav a b.leftLine").animate({opacity:0},200,function(){$(".otherNav a b.leftLine").css({height:0,opacity:1})});
            $(".otherNav a b.topLine").animate({opacity:0},200,function(){$(".otherNav a b.topLine").css({width:0,opacity:1})});
        },1000);
    });
}

function processPlay(i){
    $(".stepTitle li").eq(i).fadeIn(500).siblings().fadeOut(500);
    $(".stepMain li").eq(i).fadeIn(500).siblings().fadeOut(500);
    $(".processLeft .pb>div.hasColor").stop(true).animate({width:20+i*75},500);
}