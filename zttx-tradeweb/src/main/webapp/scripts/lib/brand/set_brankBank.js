var myBrankBank={init:function(){this.formOperate(),this.cardListOperate(),this.cardDialogOperate(),this.cardOperate()},cardListOperate:function(){$(".my_card_list").on("mouseenter mouseleave",".item",function(a){"mouseenter"==a.type?$(this).addClass("item_hover"):"mouseleave"==a.type&&$(this).removeClass("item_hover")}),$(function(){$(".my_card_list li.item").each(function(a,b){$(this).find("a.del").click(function(){var a=$(this).data("uuid");confirmDialog("是否删除",function(){$.post("/brand/bank/delete","uuid="+a,function(a){0==a.code?window.location.reload():remind("error","删除失败！")},"json")})}),$(this).find("a.set").click(function(){var a=$(this).data("uuid");$.post("/brand/bank/default","uuid="+a,function(a){0==a.code?window.location.reload():remind("error","设置失败！")},"json")})})})},cardDialogOperate:function(){seajs.use(["dialog"],function(a){var b=new a({content:"#choose_bank",width:682});$(".my_card_list").on("click","#add_card",function(){b.show(),$("input[name=updateId]").val(""),$("#choose_bank input[name=bank_name]").prop("checked",!1),$("#add_form #bankNo").val(""),$("#add_form #subBank").val("")}),$(".my_card_list").on("click",".edit",function(){b.show();var a=$(this).data("uuid");$("input[name=updateId]").val(a),$("#choose_bank input[value=0403]").prop("checked",!0),$("#add_form #bankNo").val("XXXX"),$("#add_form #subBank").val("json")}),b.after("show",function(){$("#choose_bank").show()});var c=new a({content:"#add_form",width:508});c.after("show",function(){$("#add_form").show()}),$(document).on("click","#next_step",function(){var a=0;$(".bank_list li").each(function(){var b=$(this).find("input").prop("checked");1==b&&a++}),0==a?remind("error","请至少选择一个银行！"):(b.hide(),c.show())})}),$(document).on("click",".bank_list li",function(){$(".bank_list li").find("input").prop("checked",!1),$(".bank_list li").find(".bank_img").removeClass("hasChecked"),$(this).find("input").prop("checked",!0),$(this).find(".bank_img").addClass("hasChecked")})},cardOperate:function(){seajs.use(["tip"],function(a){new a({trigger:$(".support_info strong"),content:"目前仅支持：工行、招行、建行、中行、农行、交行、浦发、广发、中信、光大、兴业、民生、平安、杭州银行等22家银行",width:330,theme:"yellow",inViewport:!0,arrowPosition:11,zIndex:9999})})},formOperate:function(){seajs.use(["validator","$","ajaxFileUpload"],function(a,$){$(function(){function b(a){$.ajaxFileUpload({url:"/common/showImg",secureuri:!1,fileElementId:a,dataType:"json",success:function(c){$("#"+a).bind("change",function(){b(a)}),c.code==zttx.SUCCESS?($("input[name=attachment]").val(c.message),$(".js-upload-name").val(c.object)):remind("error",c.message)}})}a.addRule("userId",/^([1-9][0-9]{14}|[1-9][0-9]{17}|[1-9][0-9]{16}[0-9A-Za-z]{1})?$/,"请输入正确的{{display}}");var c=function(){var a=$("#cardForm").serialize();$(".bank_list li").each(function(){var b=$(this).find("input").prop("checked");1==b&&(a+="&bankId="+$(this).find("input").val())}),$("#submitSaveButton").prop("disabled",!0),$.post("/brand/bank/save",a,function(a){$("#submitSaveButton").removeAttr("disabled"),0==a.code?($("#bankNo").val(""),$("#subBank").val(""),$("#province").val(""),$("#city").val(""),$("#county").val(""),window.location.reload()):3==a.code?remind("error","银行卡号不能重复添加！"):remind("error","保存失败！")},"json")};a.addRule("select",/\d{5,}/,"请选择{{display}}下拉列表");var d=new a({element:"#cardForm",autoSubmit:!1,failSilently:!0,onFormValidated:function(a,b,d){a||($("#pepole_bankCate").prop("checked")&&""!=$("input[name=attachment]").val()?c():$("#pepole_bankCate").prop("checked")&&""==$("input[name=attachment]").val()&&remind("error","请上传附件"),$("#copy_bankCate").prop("checked")&&c())}});d.addItem({element:"#province",rule:"select",required:!0,display:"省份",errormessageRequired:"请选择省份下拉列表"}).addItem({element:"[name=bankNo]",rule:"maxlength{max:21} number",required:!0,display:"银行卡号",errormessage:"请输入正确的银行卡号"}).addItem({element:"[name=subBank]",required:!0,display:"开户银行"});var e=function(a){d.removeItem("[id=userInfo_id] [id=userName_copy]"),d.removeItem("[id=userInfo_id] [id=userId_copy]"),d.removeItem("[id=userInfo_id] [id=userName_pepole]"),d.removeItem("[id=userInfo_id] [id=userId_pepole]"),$("#id_bankCate").find("input").prop("checked",!1),$("#userInfo_id").empty(),1==a?($("#pepole_bankCate").prop("checked",!0),$("#userInfo_id").append($("#hidden_pepole").html()),$(".js-fujian").show(),$("#fujian").attr("disabled",!1),$("input[name=attachment]").attr("disabled",!1),d.addItem({element:"[id=userInfo_id] [id=userName_copy]",required:!0,display:"真实姓名"})):($("#copy_bankCate").prop("checked",!0),$("#userInfo_id").append($("#hidden_copy").html()),$(".js-fujian").hide(),$("#fujian").attr("disabled",!0),$("input[name=attachment]").attr("disabled",!0),d.addItem({element:"[id=userInfo_id] [id=userName_pepole]",required:!0,display:"公司名称"}).addItem({element:"[id=userInfo_id] [id=userId_pepole]",required:!0,display:"营业执照"}))};e(1),$(document).on("click","#id_bankCate .js-state",function(){var a=$(this).find("input").val();e(a)}),$("#fujian").change(function(){b("fujian")})})})}};myBrankBank.init();