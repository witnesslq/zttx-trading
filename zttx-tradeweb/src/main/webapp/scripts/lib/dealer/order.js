var order_index={init:function(){this.initPagination(),this.initDialog(),this.initPopup(),this.initCheckbox();var a=$('select[name="orderType"]').val(),b=$('select[name="orderStatus"]').val(),c=$("li.js-order-status");""==a&&""==b?c.filter('[data-status="all"]').addClass("on"):""!=b?c.filter('[data-status="'+b+'"]').addClass("on"):""!=a&&""==b&&c.filter('[data-type="'+a+'"]').addClass("on"),$("[data-remind]").click(function(){$.post("/dealer/order/freight/notice",{brandId:$(this).data("brandid"),orderId:$(this).data("orderid")},function(a){126e3==a.code?remind("success","运费修改已提醒!"):remind("error","运费提醒失败!")},"json")})},initSticky:function(){seajs.use(["sticky"],function(a){a(".main>.main-left",0)})},initCheckbox:function(){checkAll("#checkAll",".order-list .ui-checkbox")},initPagination:function(){seajs.use(["$","pagination"],function($,a){new a({url:"",elem:"#pagination",total:totalPage,currentPage:currentPage,pageClick:function(a){$("#search-form").append($('<input name="currentPage">').val(a)).submit(),window.event.returnValue=!1}})})},initPopup:function(){seajs.use(["template","tip"],function(a,b){a.helper("$trimLongString",function(a,b){return trimLongString(a,b)}),a.helper("formatNumber",function(a){return isNaN(a)?a:parseFloat(a).toFixed(2)});var b=new b({trigger:".order-list .product a",element:"#detailPanel",inViewport:!0,align:{baseXY:[100,-70]}}).after("show",function(b){var c=b.activeTrigger[0],d=b.element[0],e=$(c).data("detail");if(e)$(d).html(a.render("detail-template",e));else{var f=$(c).data("product-id"),g=$(c).data("ptitle"),h=$(c).data("order-refrenceid");$.ajax({url:"/dealer/order/attribute.json?productId="+f+"&orderId="+h,method:"get",cache:!1,success:function(b,e,f){b.code===zttx.SUCCESS&&(b.ptitle=g,b.orderId=h,$(c).data({detail:b}),$(d).html(a.render("detail-template",b)))}})}})})},initDialog:function(){seajs.use(["dialog"],function(a){var b=$("#complain-form");b.submit(function(a){a.preventDefault();var c=b.find('input[name="orderId"]').val(),e=$("#complaintname_id").val();return null!=e&&e.length>128?void remind("error","输入的内容太长!"):void $.post("/dealer/dealerComplaint/save",b.serialize(),function(a,e){if(a.code===zttx.SUCCESS){remind("success","投诉已提交"),b[0].reset();var f="";switch(a.object.state){case 0:f='<a href="/dealer/dealerComplaint/process/'+a.object.dealerComplaint.refrenceId+'" class="link"><i class="icon i-clock"></i>已递交投诉，等待处理</a>';break;case 1:f='<a href="/dealer/dealerComplaint/process/'+a.object.dealerComplaint.refrenceId+'" class="link"><i class="icon i-clock"></i>已递交投诉，等待处理</a>';break;case 2:f='<a href="/dealer/dealerComplaint/process/'+a.object.dealerComplaint.refrenceId+'" class="link"><i class="icon i-clock"></i>投诉处理完成</a>';break;case 3:f='<a href="/dealer/dealerComplaint/process/'+a.object.dealerComplaint.refrenceId+'" class="link"><i class="icon i-clock"></i>终端商撤销投诉</a>'}$("ul.handle").find("a").filter("[data-complaint-id="+c+"]").replaceWith(f)}else remind("error",a.message);d.hide()},"json")});var c={},d=new a({content:"#complaintPanel",hasMask:!1,width:570}).after("show",function(a){a.activeTrigger=c;var e=$(a.element).find(".complaint-operate .ui-button");$(e).eq(1).unbind("click").click(function(){d.hide()});var f=$(a.activeTrigger);b.find('input[name="orderId"]').val(f.data("complaint-id")),b.find("#serial").text(""+f.data("serial")),b.find("#brand-name").text(""+f.data("brand-name"))});$(document).on("click","a[data-complaint-id]",function(){c=this,d.show()});var e=$("#close-form");e.submit(function(a){a.preventDefault();var b=e.find('input[name="orderId"]').val(),c=e.find('input[name="brandName"]').val(),d=e.find('input[name="number"]').val();$.post("/dealer/dealerOrder/close",e.serialize(),function(a,g){if(a.code===zttx.SUCCESS){remind("success","订单已关闭"),e[0].reset();var h='<li><a class="link" data-brand-name="'+c+'" data-serial="'+d+'" data-complaint-id="'+b+'" href="javascript:;" tabindex="-1">投诉</a></li>';$("ul.handle").filter("[data-id="+b+"]").html(h+'<li><span class="c-hh">交易关闭</span></li><li><a href="/dealer/dealerOrder/orderDetail/'+b+'" target="_blank" class="link">查看订单详情</a></li>')}else remind("error",a.message);f.hide()},"json")});var f=new a({trigger:"[data-close-id]",content:"#closePanel",width:300,hasMask:!1}).after("show",function(a){var b=$(a.activeTrigger).offset().left-$(a.element).outerWidth()+$(a.activeTrigger).outerWidth(),c=$(a.activeTrigger).offset().top+$(a.activeTrigger).outerHeight()+10,d=$(a.element).css({left:b,top:c}).find(".close-operate .ui-button");e.find('input[name="orderId"]').val($(a.activeTrigger).data("close-id")),e.find('input[name="brandName"]').val($(a.activeTrigger).data("close-brandname")),e.find('input[name="number"]').val($(a.activeTrigger).data("close-number")),$(d).eq(1).click(function(){f.hide()})}),g=new a({trigger:".fun-goon-pay",content:"#payArrears",width:415,hasMask:!1}).after("show",function(a){var b=parseFloat($(a.activeTrigger).data("order-rest"));$("#distriOrderAmountsId").val($(a.activeTrigger).data("order-adjustfreight")),$("#distriOrderAmountsId").data({max:b}).attr({"data-price":$(a.activeTrigger).data("order-adjustfreight")}),$("#dlg_payment_rest").html(b),$("#distriOrderIds").val($(a.activeTrigger).data("order-id")),$(".js-pay-close").click(function(){g.hide()})});$("#payArrearsFor").length>0&&baseFormValidator({selector:"#payArrearsForm",addElemFn:function(a,b){b.addRule("iPrice",function(a){var b=$(".self-ui-input").val();return isNaN(b)?!1:parseFloat(b)<=0?!1:!0},"请输入正确的{{display}}"),b.addRule("minFare",function(a){var b=parseFloat($(".self-ui-input").val()),c=parseFloat($(".self-ui-input").attr("data-price"));return c>b?!1:!0},"{{display}}必须大于或等于运费"),a.addItem({element:"input[name=distriOrderAmounts]",rule:"min{target: 'input[name=distriOrderAmounts]', min: '0.01'} iPrice minFare",required:!0,display:"支付金额"})}})})},copyOrderIntoShopper:function(a){$.post("/dealer/dealerOrder/copyOrder/"+a,function(a){126e3==a.code?remind("success","成功添加订单产品到购物车"):remind("error",a.message)},"json")}};