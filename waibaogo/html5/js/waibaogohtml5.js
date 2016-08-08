/**
 * Created by Max Lai on 2016/5/30.
 */
$(function(){
    /*返回顶部*/
    gotop('gotop');
    /*backBtn*/
    $(".backBtn").on("click",function(){
        history.go(-1);
    });
    $(".back").on("click",function(){
        history.go(-1);
    });
    /*companyList logoImg*/
    setTimeout(function(){
        companyListReload();
    },0);
    /*companyList listLocation*/
    $("header").on("click","span",function(){
        $("html,body").css({"overflow":"hidden","height":"100%"});
        $(".listLocation").css("display","block");
    });
    $(".listLocation .remove").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $(".listLocation").css("display","none");
    });
    $(".listLocation b#current").text($("header>span").text());
    $(".listLocation b").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $("header>span").text($(this).text());
        $(".listLocation b#current").text($("header>span").text());
        $(".listLocation").css("display","none");
    });
    /*companyDetails*/
    $(".tags").on("click","span",function(){
        if($(".tags ul").hasClass("open")){
            $(".tags ul").removeClass("open");
        }else{
            $(".tags ul").addClass("open");
        }
    });
    if($(".caseBox").length == 0){
        $(".case h2").css({"display":"none"});
    }//--------------------------------------------------------------
    /*news*/
    newsListReload();
    $(".newsTab span").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    /*search*/
    $(".searchHeader a.reset").on("click",function(){
        $(".searchHeader div.searchDiv input").val("");
    });
    $(".screen").on("click","li",function(){
        $(this).addClass("current").siblings().removeClass("current");
    });
    $(".searchHeader>div").on("click","span",function(){
        $("html,body").css({"overflow":"hidden","height":"100%"});
        $(".location").css("display","block");
    });
    $(".location .remove").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $(".location").css("display","none");
    });
    $(".location b#current").text($(".searchHeader>div span").text());
    $(".location b").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $(".searchHeader>div span").text($(this).text());
        $(".location b#current").text($(".searchHeader>div span").text());
        $(".location").css("display","none");
    });
    /*footer fixed*/
    var hh = 0;
    $.each($("body").children(),function(i,n){
        if(n.nodeName!="SCRIPT"){
            hh += Number(n.offsetHeight);
        }
    });
    if(hh<$(window).height()){
        $("footer").css({
            position: "fixed",
            bottom: 0,
            left: 0
        });
    }else{
        $("footer").css({
            position: "static"
        });
    }//-------------------------------------------------------------
});
function companyListReload(){
    /*footer fixed*/
    if($("body").height()<$(window).height()){
        $("footer").css({
            position: "fixed",
            bottom: 0,
            left: 0
        });
    }else{
        $("footer").css({
            position: "static"
        });
    }
}
function newsListReload(){
    /*footer fixed*/
    if($("body").height()<$(window).height()){
        $("footer").css({
            position: "fixed",
            bottom: 0,
            left: 0
        });
    }else{
        $("footer").css({
            position: "static"
        });
    }
    /*h3*/
    $.each($(".newsBox h3"),function(i,n){
        if($(n).text().length>12){
            $(n).html($(n).html().slice(0,12)+"...");
        }
    });
    /*p*/
    $.each($(".newsBox p"),function(i,n){
        if($(n).text().length>50){
            $(n).html($(n).html().slice(0,50)+"...");
        }
    });
}
function gotop(goTopId) {
    if(document.getElementById(goTopId)){
        var toTopEle = document.getElementById(goTopId),
            removeTimer = 0;
        window.addEventListener('scroll',
            function(){
                if (document.body.scrollTop > window.innerHeight*.5) {
                    toTopEle.style.display = 'block';
                    if (removeTimer) {
                        clearTimeout(removeTimer);
                    }
                    removeTimer = setTimeout(function() {
                            toTopEle.style.display = 'none';
                        },
                        3000);
                } else {
                    toTopEle.style.display = 'none';
                }
            });
        toTopEle.addEventListener('click',
            function() {
                window.scrollTo(0, 0);
            },
            false);
    }
}