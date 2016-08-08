/**
 * Created by luo on 2016/7/11.
 */
$(function(){
    gotop('id');
    $('.backbtn').on("click",function(){
        history.go(-1);
    });
    $(".back").on('click',function(){
        history.go(-1);
    });
    /*compannylist logoImg*/
    setTimeout(function(){
        companyListReload();
    },0);
    /*companylist listlocation*/
    $("header").on("click","span",function(){
        $("html,body").css({"overflow":"hidden","height":"100%"});
        $(".listLocation").css("display","block");
    });
    $(".listLocation .remove").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $(".listLocation").css("display","none");
    });
    $(".listLocation b#current").text($("header>span").text());
    $(".listLocation").on("click",function(){
        $("html,body").css({"overflow":"auto","height":"auto"});
        $(".searchHeader>div span").text($(this).text());
        $(".location b#current").text($(".searchHeader>div span").text());
        $(".location").css("dispaly","none");
    });
    /*footer fixed*/
    var hh=0;
    $.each($("body").children(),function(i,n){
        if(n.nodeName!="script"){
            hh+=Number(n.offsetHeight);
        }
    });
    if(hh<$(window).height()){
        $("footer").css({"position":"fixed","bottom":"0","left":"0"});
    }else{
        $("footer").css({
            position:'static'
        })
    }
});

function newListReload(){
    /*footer fixed*/
    if($("body").height()<$(window).height()){
        $("footer").css({
            position:"fixed",
            bottom:0,
            left:0
        });
    }else{
        $("footer").css({
            position:"static"
        });
    }
    /*h3*/
    $.each($(".newBox p"),function(i,n){
        if($(n).text().length>50){
            $(n).html($(n).html().slice(0,50)+"...");
        }
    });
}
function gotop(id){
    if(document.getElementById(id)){
        var totopEle=document.getElementById(id),
            removerTimer=0;
        window.addEventListener("scroll",
            function(){
                if(document.body.scrollTop>window.innerHeight*0.5){
                    totopEle.style.display="block";
                    if(removerTimer){
                        clearTimeout(removerTimer);
                    }
                    removerTimer=setTimeout(function(){
                        totopEle.style.display="none";
                    },3000);
                }else{
                    totopEle.style.display="none";
                }
            });
        totopEle.addEventListener("click",
            function(){
                window.scrollTo(0,0);
            },
            false
        );
    }
}

/*adaptation.js  部分*/
(function(doc,win){
        var docE1=doc.documentElement,
            resizeEvt="orienttationchange" in window?"orienttationchange":"resize";
            recalc=function(){
                var clientWidth=docE1.clientWidth;
                if(!clientWidth){return};
                docE1.style.fontSize=20*(clientWidth/300)+"px";
            };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener("DOCContentLoaded",recalc,false);
})(document,window);

/*evalution,js部分*/
$(function(){
    evaluationInit();
    getEvaluation("pla0","后台管理","url");
    $(".plaforms").on("click","li",function(){
        var $this=$(this);
        if($this.text()=="一键委托开发"){
            window.open("http://baidu.com/");
        }else{
            if($this.hasClass("hover")){
                $this.removeClass("hover");
                var index=$(".platformsTab li.hover").index();
                var len=$(".platformsTab li").length-1;
                $(".platformsTab li[name='"+$this.attr("name")+"']").remove();
                $(".platformCon>div[name='"+=$this.attr("name")+"']").remove();
                console.log(index);
                console.log(len);
                if(index==len){
                    $(".platformTab li").removeClass("hover");
                    $(".platformTab li:last-child").addClass("hover");
                    $(".platformCon>div:last-child").css({"display":"block"}).sibling().css({"display":"noen"});
                }else{
                    $this.addClass("hover");
                    $(".platformTab li").removeClass("hover");
                    getEvaluation($this.attr("name"),$this.text(),"c");
                }
            }
        }
    });
    $(".platformTab").on("click","li",function(){
        $(this).addClass("hover").sibling().removeChild("hover");
        $(".platformCon>div").eq($(this).index()).css({"display":"block"}).sibling().css({"display":"none"});
    });
    $("platformCon").on("click","input",function(){
        if($(this).parent("td").index()!=$(this).parents("tr").find("td").length-1){
            if(this.checked){
                $(this).parent("tr").find("td:last-child input").each(function(i,n){
                    n.checked=true;
                });
            }else{
                $(this).parent("tr").find("td:last-child input").each(function(i,n){
                    n.checked=false;
                });
            }
        }else{
            if($(this).attr("type")=="checkbox"){
                var a=1;
                $(this).parents("td").find("input").each(function(i,n){
                    if(!n.checked){
                        a=0;
                    }
                });
            }
        }
    });
    $(".platformCon").on("change","input",function(){
        $(".platformTab li").eq($(this).parents("div").index()).find("i").text($(this).parent("table").find("td:last-child input:checked").length);
    });
    $(".evaBtn").on("click",function(){
       var str="";
        $.each($(".platformCon td:last-child input:checked"),function(i,n){
            str+=i==0?$(n).val():","+$(n).val();
        });
        console.log(str);
    });
});
function eveluationInit(){
    var pla="";
    $.getJSON("../data/JSON.txt",function(data){
        if(data.length!=0){
            $.each(data,function(i,n){
                pla += "<li name='p"+ n.terId +"' id='pla"+ n.terId +"' class='pla"+ n.terId +"'><i style='background-image:url("+n.terIcon+")'></i><span>"+ n.terName +"</span></li>";
            });
        }
        $(".platforms ul").prepend(pla);
        $(".platforms li:nth-child(3n)").css({marginRight:0});
    });
}
function getEvalution(id,name,url){
    var tabHtml = "<li name='"+ id +"' id='tab"+ id +"' class='hover'><span>"+ name +"</span><i>0</i></li>";
    var conHtml = "<div name='"+ id +"' id='con"+ id +"'><table><thead><tr><th>分类</th><th>模块</th><th>功能点</th></tr></thead><tbody>";
    $(".platformsTab ul").append(tabHtml);
    $.getJSON("../data/JSON.txt",function(data){
        $.each(data,function(i,n){
            $.each(n.modChildList, function(j,m){
                if(j==0){
                    if(m.modType==1){
                        conHtml += "<tr><td rowspan='"+ n.modChildList.length +"'>"+ n.modName +"</td><td>"+m.modName+"</td><td>";
                    }else if(m.modType==2){
                        conHtml += "<tr><td><label><input name='pm' type='checkbox'/>"+ m.modName +"</label></td><td>";
                    }
                }else{
                    if(m.modType==1){
                        conHtml += "<tr><td>"+ m.modName +"</td><td>";
                    }else if(m.modeType==2){
                        conHtml += "<tr><td><label><input name='pm' type='checkbox'/>"+ m.modName +"</label></td><td>";
                    }
                }
                $.each(m.funList,function(k,l){
                    if(m.modType==1){
                        conHtml += "<a><label><input type='radio' value='"+ l.funId +"' name='modId"+ m.modId+"'/>"+l.funName+"</label></a>";
                    }else if(m.modType==2){
                        conHtml += "<a><label><input type='checkbox' value='"+ l.funId +"' name='modId"+ m.modId+"'/>"+l.funName+"</label></a>";
                    }
                });
                conHtml+="</td></tr>";
            });
        });
        conHtml+="</tbody></table></div>";
        $(".platformCon").append(conHtml);
        $(".platformsCon>div:last-child").css({"display":"block"}).sibling().css({"display":"none"});
    });
}
function price(){
    $.each($(".evaluationResult h3 span"),function(i,n){
        var arr=$(n).text().split("").reverse();
        var arr1=[];
        $.each(arr,function(i,n){
            arr1.push(n);
            if(i%3==2){
                arr1.push(",");
            }
        })
        if(arr1[arr1.length-1]==","){
            arr1.pop();
        }
        var p=arr1.reverse().join("");
        $(n).text(p);
    });
}

/* my prise  section*/
function calc(x,y){
    if(x===undefined){
        x=0;
    }
    if(y==undefined){
        y=0;
    }
    return x+y;
}

function cal(){
    var len=arguments.length;
    var sum=0;
    for(var i=0;i<len;i++){
        sum+=arguments[i];
    }
    return sum;
}

function cacl(x,y){
    x=arguments[0]?arguments[0]:x;
    y=arguments[1]?arguments[1]:y;
    return x+y;
}
alert(cacl());
alert(cacl(1,2));

function max(){
    var len=arguments.length;
    var max=0;
    for(var i=0;i<len;i++){
        if(arguments[i]>max){
            max=arguments[i];
        }
    }
    return max;
    eval("("+str+")");
    JSON.parse(str,function(){});
    JSON.stringify();
}
/*ajax的返回数据的处理结果处理方法*/
$(document).ready(function(){
    btn();
});
function btn(){
    var $btn=$("input.btn");
    $btn.bind("click",function(){
        $.ajax({
            type:"post",
            url:"akjfes",
            data:{

            },
        })
    });
}



<?php
    $sum=20;
$sum++;
echo $sum;

for($i=0;$i<10;$i++){
    echo $sum;
    echo 'hello';
}
$arr[3]=1;
$arr[count($arr)]=50;
$arr[]=60;
$arr=['ename'=>'marry','sex'=>'女','age'=>20];
    ?>

var a=window.sessionStorage;
a.setItem(b,$("#dd span a:last-child").val());
var s=window.localStorage;
s.setItem(n,$("#cc").get(0).val().reverse().join(" ").charAt(2));
var bb={
    _count:5,
    reset:function a(c,d){
        return var sum=c+d;
    },
    add:function all(){
        var hh=$(".class form[0] a ").html();
        if (window.scrollTop==0){
            $("html,body").animate({
                "height":"100px",
                "left":0,
                "bottom":$(".copy").height()
            },500);
        }
    },
    gg:function(){
        if ($(".footer").height()>$(".footer1").height()){
            $(window.document.getElementById("#dd").style.css({
                "position":"fixed",
                "left":0,
                "bottom":2
            }),200)
        }
    }
}
bb.reset(6,5);
$(".scrollTop").click(function(){
    var speed=500;
    var n=2;
    $("#body div.add ul li:nth-child(3n)").animate({

    },speed)
});
var websocket=new websocket("ws:http://baidu.com");
websocket.send(data);
websocket.close();
websocket.onmessage=function(event){
    var data = event.data;

}

[
{
    "modid":1,
    "terid":1,
    "noname":"基本功能",
    "list":[
        {
            "moname":"一键委托",
            "type":"fun"
        },
        {

        }
    ]

}
    ]
$(function(){
    var winheight=0;
    if(window.innerHeight){
        winheight=window.innerHeight
    }else if((document.body)&&(document.body.clientHeight)){
        winheight=document.body.clientHeight;
    }
});
(function(){
    $.fn.extend({
        "color":function(color){return this.css({"color":color})}
    })
})()


