var myFinancial={init:function(){this.showTip(),this.showCalendar(),this.cardOperate()},showTip:function(){seajs.use(["tip"],function(a){var b=new a({trigger:$(".freeze_cash"),width:250,theme:"yellow",inViewport:!0,arrowPosition:11});b.before("show",function(){var a=$("#id_amount").val(),b="暂无提现处理…";parseFloat(a)>0&&(b="您的<span id='id_amount_change'>"+a+"</span>元提现金额申请正在处理中…"),this.set("content",b)})})},showCalendar:function(){rangeCalendar("start-cal","end-cal")},cardOperate:function(){$(".my_card_list").on("mouseenter mouseleave",".item",function(a){"mouseenter"==a.type?$(this).addClass("item_hover"):"mouseleave"==a.type&&$(this).removeClass("item_hover")});var a=!0;$(".hidedn_item").hide(),$(".toggle").on("click",function(b){a?($(this).find(".js_show_more").hide(),$(this).find(".js_hide_more").show(),$(".hidedn_item").show()):($(this).find(".js_show_more").show(),$(this).find(".js_hide_more").hide(),$(".hidedn_item").hide()),a=!a}),seajs.use(["dialog","tip"],function(a,b){var c=new a({trigger:"#add_card",content:"#choose_bank",width:682});c.after("show",function(){$("#choose_bank").show()}),$(document).on("click",".ui-dialog-close",function(){$(".ui-mask").hide(),$(".ui-dialog").hide()});var d=new a({content:"#add_form",width:508});new b({trigger:$(".support_info strong"),content:"目前仅支持：工行、招行、建行、中行、农行、交行、浦发、广发、中信、光大、兴业、民生、平安、杭州银行等18家银行",width:330,theme:"yellow",inViewport:!0,arrowPosition:11,zIndex:9999});$(document).on("click","#next_step",function(){var a=0;$(".bank_list li").each(function(){var b=$(this).find("input").prop("checked");1==b&&a++}),0==a||(c.hide(),d.show(),$("#add_form").show())})}),$(document).on("click",".bank_list li",function(){$(".bank_list li").find("input").prop("checked",!1),$(".bank_list li").find(".bank_img").removeClass("hasChecked"),$(this).find("input").prop("checked",!0),$(this).find(".bank_img").addClass("hasChecked")})}};