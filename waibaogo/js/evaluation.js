/**
 * Created by Max Lai on 2016/6/20.
 */
$(function(){
    evaluationInit();
    getEvaluation("pla0","后台管理","url");
    $(".platforms").on("click","li",function(){
        var $this = $(this);
        if($this.text() == "一键委托开发"){
            window.open("http://www.baidu.com");
        }else{
            if($this.hasClass("hover")){
                $this.removeClass("hover");
                var index = $(".platformsTab li.hover").index();
                var len = $(".platformsTab li").length-1;
                $(".platformsTab li[name='"+$this.attr("name")+"']").remove();
                $(".platformsCon>div[name='"+$this.attr("name")+"']").remove();
                console.log(index);
                console.log(len);
                if(index == len){
                    $(".platformsTab li").removeClass("hover");
                    $(".platformsTab li:last-child").addClass("hover");
                    $(".platformsCon>div:last-child").css({"display":"block"}).siblings().css({"display":"none"});
                }
            }else{
                $this.addClass("hover");
                $(".platformsTab li").removeClass("hover");
                getEvaluation($this.attr("name"),$this.text(),"c");
            }
        }
    });
    $(".platformsTab").on("click","li",function(){
        $(this).addClass("hover").siblings().removeClass("hover");
        $(".platformsCon>div").eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"});
    });
    $(".platformsCon").on("click","input",function(){
        if($(this).parents("td").index() != $(this).parents("tr").find("td").length-1){
            if(this.checked){
                $(this).parents("tr").find("td:last-child input").each(function(i,n){
                    n.checked = true;
                });
            }else{
                $(this).parents("tr").find("td:last-child input").each(function(i,n){
                    n.checked = false;
                });
            }
        }else{
            if($(this).attr("type") == "checkbox"){
                var a = 1;
                $(this).parents("td").find("input").each(function(i,n){
                    if(!n.checked){
                        a = 0;
                    }
                });
                if(a == 1){
                    $(this).parents("tr").find("input[name='pm']")[0].checked = true;
                }else{
                    $(this).parents("tr").find("input[name='pm']")[0].checked = false;
                }

            }
        }
    });
    $(".platformsCon").on("change","input",function(){
        $(".platformsTab li").eq($(this).parents("div").index()).find("i").text($(this).parents("table").find("td:last-child input:checked").length);
    });
    $(".evaBtn").on("click",function(){
        var str = "";
        $.each($(".platformsCon td:last-child input:checked"),function(i,n){
            str += i==0?$(n).val():","+$(n).val();
        });
        console.log(str);
    });
});
function evaluationInit(){
    var pla = "";
    $.getJSON("../data/JSON1.txt",function(data){
        if(data.length != 0){
            $.each(data,function(i,n){
                pla += "<li name='p"+ n.terId +"' id='pla"+ n.terId +"' class='pla"+ n.terId +"'><i style='background-image:url("+n.terIcon+")'></i><span>"+ n.terName +"</span></li>";
            });
        }
        $(".platforms ul").prepend(pla);
        $(".platforms li:nth-child(6n)").css({marginRight:0});
    });
}
function getEvaluation(id,name,url){
    var tabHtml = "<li name='"+ id +"' id='tab"+ id +"' class='hover'><span>"+ name +"</span><i>0</i></li>";
    var conHtml = "<div name='"+ id +"' id='con"+ id +"'><table><thead><tr><th>分类</th><th>模块</th><th>功能点</th></tr></thead><tbody>";
    $(".platformsTab ul").append(tabHtml);
    $.getJSON("../data/JSON.txt",function(data){
        console.log(data);
        $.each(data,function(i,n){
            $.each(n.modChildList,function(j,m){
                if(j==0){
                    if(m.modType == 1){
                        conHtml += "<tr><td rowspan='"+ n.modChildList.length +"'>"+ n.modName +"</td><td>"+m.modName+"</td><td>";
                    }else if(m.modType == 2){
                        conHtml += "<tr><td rowspan='"+ n.modChildList.length +"'>"+ n.modName +"</td><td><label><input name='pm' type='checkbox'/>"+m.modName+"</label></td><td>";
                    }
                }else{
                    if(m.modType == 1){
                        conHtml += "<tr><td>"+ m.modName +"</td><td>";
                    }else if(m.modType == 2){
                        conHtml += "<tr><td><label><input name='pm' type='checkbox'/>"+ m.modName +"</label></td><td>";
                    }
                }
                $.each(m.funList,function(k,l){
                    if(m.modType == 1){
                        if(k==0){
                            conHtml += "<a><label><input type='radio' checked='checked' value='"+ l.funId +"' name='modId"+ m.modId+"'/>"+l.funName+"</label></a>";
                        }else{
                            conHtml += "<a><label><input type='radio' value='"+ l.funId +"' name='modId"+ m.modId+"'/>"+l.funName+"</label></a>";
                        }
                    }else if(m.modType == 2){
                        conHtml += "<a><label><input type='checkbox' value='"+ l.funId +"' name='modId"+ m.modId+"'/>"+l.funName+"</label></a>";
                    }

                });
                conHtml += "</td></tr>";
            });
        });
        conHtml += "</tbody></table></div>";
        $(".platformsCon").append(conHtml);
        $(".platformsCon>div:last-child").css({"display":"block"}).siblings().css({"display":"none"});
    });
}
function price(){
    $.each($(".evaluationResult h3 span"),function(i,n){
        var arr = $(n).text().split("").reverse();
        var arr1 = [];
        $.each(arr,function(i,n){
            arr1.push(n);
            if(i%3 == 2){
                arr1.push(",");
            }
        });
        if(arr1[arr1.length-1] == ","){
            arr1.pop();
        }
        var p = arr1.reverse().join("");
        $(n).text(p);
    });
}