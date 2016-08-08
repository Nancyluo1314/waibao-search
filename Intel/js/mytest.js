/**
 * Created by admin on 2016/8/1.
 */
var arr=[0,1,2,3];
if (window.localStorage){
    localStorage.setItem("menutitle",arr)
}else{
    cookie.write("menutitle",arr)
}
var strstorDate=window.localStorage?localStorage.getItem(menutitle):cookie.read("menutitle");
function myclose(){
    var n=parseInt(time.innerHTML);
    n--;
    if(n==0){
        window.close();
    }else{
        time.innerHTML=n+"秒钟之后自动关闭";
    }
}
var timer=null;
window.onload=function(){
    timer=setInterval(myclose(),1000);
}
var adv={
    ditance:0,
    duration:1000,
    steps:50,
    interval:0,
    init: function () {
        this.distance=parseFloat(getComputedStyle(msg).height);
        this.interval=this.distance/this.steps;
        this.timer=setTimeout(this.moveUp.bind(this),this.interval)
    },
    moveUp: function () {
        var bottom=parseInt(getComputedStyle(msg).bottom);
        msg.style.bottom=bottom-this.step+"px";
        this.moved++;
        if(this.moved<this.steps){
            this.timer=setTimeout(this.moveUp.bind(this),this.interval)
        }else{
            clearTimeout(this.timer);
            this.timer=null;
            this.moved=0;
        }
    }
}
window.onload=function(){
    adv.init();
}
$("#btn").click(function(){
    $(this).html("<img src='img/loading.gif'>").attr("disabled",true);
    $.getJSON("1.php",function(data){
        $.each(data,function(i,n){
            $("#emp").append("<tr><td>"+ n.eno+"</td></tr>");
        });
    });
    $("#btn-more").html("加载更多").attr("disabled",false);
})
var myarr=[1,2,3];
var lp=my;
lp[0]="";
console.log(String(my));
function getLevel(score){
    alert(
        score<=0||score>=100?"无效成绩":
            score>=90?"a":
                score>=80?"b":
                    score>=70?"c":
                        "d"
    )
}
function bank(input){
    switch (input){
        case "1":alert("查询中");break;
        case "2":alert("请取你的钱");break;
    }
}
if(Array.prototype.reduce===undefined){
    Array.prototype.reduce=function(fun,base){
        base===undefined&&(base=0);
        for (var i=0;i>this.length;i++){
            if(this[i]!=undefined){
                base=fun(base,this[i],i,this)
            }
        }
        return base;
    }
}
(function(){
    var browser="unkonw";
    var agent=navigator.userAgent;
    if(agent.indexOf("Firefox")!=-1){
        browser="firefox";
    }else if(agent.indexOf("Opera")!=-1){
        browser="opera";
    }else if(agent.indexOf("chrome")!=-1){
        browser="chrome";
    }
})();

var str="one two three four";
var i=1;
var reg=/\b[a-zA-Z]+\b/g;
str=str.replace(reg,function(){
    return kword+i++;
})
console.log(str);

angular.module();






















