function agreeApply(){}function rejectApply(){var a=null;seajs.use(["dialog"],function(b){var c=new b({trigger:".js_reject",effect:"fade",hasMask:!1,content:$(".js-reject-show"),width:385}).after("show",function(){$("#auditMark").val(""),a=this.activeTrigger,$.isFunction(showReject)&&showReject(a)});$(".js-reject-show").on("click",".confirm_btn",function(){$.isFunction(rejectJoin)&&rejectJoin(c)}),$(".js-reject-show").on("click",".cancel_btn",function(){c.hide()})})}function invitationJoin(){var a=null,b=null;seajs.use(["dialog"],function(c){b=new c({trigger:".js-invite-join",effect:"fade",hasMask:!1,content:$(".js-invite-show"),width:385}).after("show",function(){$("#inviteText").val(""),a=this.activeTrigger,$.isFunction(inviteJoin)&&inviteJoin(a,b)}).before("show",function(){$("#brandsId").val(""),$("#brandsId_div span").html("请选择品牌"),$(".joindealer").hide(),$("#joinDiv").show()}),$(".js-invite-show").on("click",".cancel_btn",function(){b.hide()})})}var agencyApply={init:function(){this.handleApply(),invitationJoin()},tabSmenu:function(){var a=$("div.js_agency_menu ul li");a.click(function(){$(this).addClass("selected").siblings().removeClass("selected");var b=a.index(this);$("div.js_agency_con > div").eq(b).show().siblings().hide()})},handleApply:function(){agreeApply(),rejectApply()}},agencyInfo={init:function(){this.tabSmenu(),this.dialogSea(),agreeApply(),rejectApply()},tabSmenu:function(){var a=$("div.js_agency_menu ul li");a.click(function(){$(this).addClass("selected").siblings().removeClass("selected");var b=a.index(this);$("div.js_agency_con > div").eq(b).show().siblings().hide()})},dialogSea:function(){seajs.use(["dialog"],function(a){function b(){var a=$.trim($(".js-confirm-dealerid").data("dealerid")),b=$("input[name='setdef1']:checked").length;$.post("/brand/dealer/viewContact",{dealerId:a,isShow:b},function(a){a.code==zttx.SUCCESS?(c.hide(),$(".contact-warring").hide(),inviteJoinCallback(a.object)):remind("error",a.message)},"json")}var c=new a({effect:"fade",hasMask:!1,content:$(".ui-tanchuang"),align:{baseElement:"#trigger",baseXY:[0,0],selfXY:[0,0]},width:325,height:200});$(document).on("click","#trigger",function(){return $(".js-notip").prop("checked")?(b(),!1):void c.show()}),$(document).on("click",".ui-tanchuang .js-confirm-dealerid",function(){b()}),$(document).on("click",".ui-tanchuang .cancel_btn",function(){c.hide()}),invitationJoin()})}},agencyRecommend={init:function(){this.recommendClick()},recommendClick:function(){var a=".agency-recommend-td-state",b=".apply-editline";$("td").on("click",a,function(){var a=$("tbody tr td").find(".agency-recommend-td-state");return a.find("div.apply-editline").remove(),$(this).append('<div class="apply-editline" style=""><a>点击操作</a><a class="not-state">邀请洽谈</a><a class="not-state">放弃</a></div>'),!1}),$(a).mouseleave(function(){$(b).remove()})}},agencyteamed={init:function(){this.seajsuseData(),this.termination()},tabSmenu:function(){var a=$("div.js_agency_menu ul li");a.click(function(){$(this).addClass("selected").siblings().removeClass("selected");var b=a.index(this);$("div.js_agency_con > div").eq(b).show().siblings().hide()})},seajsuseData:function(){baseCalendar("#date",{dateFmt:"yyyy年MM月dd日 HH时mm分ss秒"}),rangeCalendar("start-cal","end-cal")},termination:function(){seajs.use(["dialog","template"],function(a,b){function c(a,b){var c={};c.id=a,c.max=b;var d=template.render("beforeEndTpl",c);e.element.html(d),e.show(),baseFormValidator({selector:"#beforeEndForm",isAjax:!0,beforeSubmitFn:function(){$.ajax({url:"/brand/payApi/depositTransfer",method:"post",data:$("#beforeEndForm").serialize(),dataType:"json",success:function(a){a.code===zttx.SUCCESS?(e.hide(),window.location.reload()):(remind("error",a.message),e.hide())}})}})}var d=new a({content:$(".js-ending-teamboxshow"),width:285,hasMask:!1}).after("show",function(){$("#endMark").val(""),target=this.activeTrigger}),e=new a({content:$("#beforeEndTpl").html(),width:300});$(document).on("click",".js-ending-team",function(){$.ajax({cache:!0,type:"POST",url:"/brand/join/getDealerJoin",data:{dealerJoinId:$(this).attr("dealerJoinId")},dataType:"json",async:!1,error:function(a){remind("error","访问失败")},success:function(a){a.code===zttx.SUCCESS?a.object.paidAmount?a.object.paidAmount>0?(c(a.object.refrenceId,a.object.paidAmount),e.show()):remind("error","终端商已缴纳的押金未全部结算，无法终止合作"):d.show():remind("error",a.message)}})}),$(document).on("click",".js-tosure-btn",function(){$.isFunction(stopTemd)&&stopTemd(target,d)}),$(document).on("click",".js-tocansole-btn",function(){d.hide()}),$(document).on("click",".js-beforeEndcansole-btn",function(){e.hide()});var f=new a({content:$(".js-leave-messagebox"),width:385,hasMask:!1}).after("show",function(){target=this.activeTrigger});$(document).on("click",".js-leave-message",function(){f.show()}),$(document).on("click",".js-lemsgsure-btn",function(){$.isFunction(leaMsg)&&leaMsg(target,f)}),$(document).on("click",".js-lemsgsurecansole-btn",function(){f.hide()});var g=new a({content:$(".js-invite-show"),width:385,hasMask:!1}).after("show",function(){target=this.activeTrigger});$(document).on("click",".js-tojoin",function(){g.show()}),$(document).on("click",".js-confirm-btn",function(){$.isFunction(join)&&join(target,g)}),$(document).on("click",".js-cancel-btn",function(){g.hide()})})},selpplevel:function(){$(".js-setcom-tobe").attr("disabled",!0),$(document).ready(function(){$("#Ateamed-form-class_div").css("background","#f0f0f0")}),$(".js-setcom-as").click(function(){"全部品牌"==$(".js-setcom-as option:selected").text()?($(".js-setcom-tobe").attr("disabled",!0),$("#Ateamed-form-class_div").css("background","#f0f0f0")):($(".js-setcom-tobe").attr("disabled",!1),$("#Ateamed-form-class_div").css("background","#fff"))})}},agencyteamedinfo={init:function(){this.infosetlevelTab(),this.seajsdialog()},tabSmenu:function(){var a=$("div.js_teamedinfo_menu ul li");a.click(function(){$(this).addClass("selected").siblings().removeClass("selected");var b=a.index(this);$("div.js_teamedinfo_con > div").eq(b).show().siblings().hide()})},infosetlevelTab:function(){var a=$("div.infosetlevel-menu ul li");a.click(function(){a.find(".arrow").hide(),$(this).addClass("current").siblings().removeClass("current");var b=a.index(this);a.find(".arrow").eq(b).show().siblings().hide(),$.isFunction(selectProCate)&&selectProCate(b)})},seajsdialog:function(){seajs.use(["dialog"],function(a){var b=new a({content:$(".js-leave-messagebox"),width:385,hasMask:!1}).after("show",function(){target=this.activeTrigger});$(document).on("click",".js-leave-message",function(){b.show()}),$(document).on("click",".js-lemsgsure-btn",function(){$.isFunction(leaMsg)&&leaMsg(target,b)}),$(document).on("click",".js-lemsgsurecansole-btn",function(){b.hide()})})}},grademanage={init:function(){this.setlevelTab(),this.setlevel()},setLevevlFn:function(a){},tabSmenu:function(){var a=$("div.js_grademanage_menu ul li");a.click(function(){$(this).addClass("selected").siblings().removeClass("selected");var b=a.index(this);$("div.js_grademanage_con > div").eq(b).show().siblings().hide()})},setlevelTab:function(){var a=$("div.setlevel-menu ul li");a.click(function(){a.find(".arrow").hide(),$(this).addClass("current").siblings().removeClass("current");var b=a.index(this);$("div.setlevel-con > .setlevel-con-box").eq(b).show().siblings().hide(),a.find(".arrow").eq(b).show().siblings().hide()})},setlevel:function(){var a=this;seajs.use(["popup"],function(b){var c=new b({trigger:".js-seltosetlel-btn",element:".js-seltosetlel-showbox",align:{baseXY:[-10,26]}});$(".js-seltosetlel-btn").hover(function(){$(".js-seltosetlel-showbox").find(".ui-checkbox").prop("checked",!1)}),$(".js-seltosetlel-showbox").on("click",".js-fn-sure",function(){c.hide()}),$(".js-seltosetlel-showbox").on("click",".js-fn-cancel",function(){c.hide()});new b({trigger:".js-setlevel-btn",element:".js-setlevel-showbox",align:{baseXY:[-25,25]}}).after("show",function(){a.setLevevlFn(this.activeTrigger)})})}},credit={init:function(){this.haveallchk(),this.unitecredit(),this.seajsuseData()},haveallchk:function(){$(".havecheckall").click(function(){$(".haveitemchk:checkbox").prop("checked",this.checked)}),$(".nocheckall").click(function(){$(".noitemchk:checkbox").prop("checked",this.checked)})},unitecredit:function(){seajs.use(["popup"],function(a){var b=new a({trigger:".js-unitecredit-btn",element:".js-unitecredit-showbox",width:157,align:{baseXY:[-10,26]}});$(".js-unitecredit-showbox").on("click",".js-setNum-sure",function(){var a=$(this).parents(".js-unitecredit-showbox").find(".js-setnumber").val();console.log(a),$(".agency-teamed-table").find(".js-toboset-number").val(a)}),$(".js-unitecredit-showbox").on("click",".js-setNum-cancel",function(){b.hide()})})},seajsuseData:function(){baseCalendar("#date",{dateFmt:"yyyy年MM月dd日 HH时mm分ss秒"}),rangeCalendar("start-cal","end-cal")}};