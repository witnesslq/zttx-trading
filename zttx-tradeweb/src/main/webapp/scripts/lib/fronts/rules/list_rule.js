seajs.use(["$","template","pagination","moment"],function($,a,b,c){a.helper("$formatDate",function(a){return c(a).format("YYYY-MM-DD HH:mm:ss")});var d=$("#mainForm"),e=new b({url:"/fronts/rulesInfo/data",elem:"#pagination",form:d,method:"post",handleData:function(b){var c=a.render("dataList",b);$("#dataPagination").html(c)}});$("#searchs").click(function(){e.goTo(1)});var f={title:"提示",content:"你确定要删除吗？"};$(document).on("click",".js-delete",function(){var a=$(this).data("id");confirmDialog(f,function(){$.post("/fronts/rulesInfo/delete",{refrenceId:a},function(a){126e3==a.code?e.goTo(e.current):remind("error","删除失败")},"json")})})});