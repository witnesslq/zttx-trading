function changeMobile(a,b){$.ajax({type:"POST",url:a,data:b,dataType:"json",success:function(a){return a.code==zttx.SUCCESS?(remind("success","信息发送成功!"),a):void remind("error","验证失败！")}})}$.fn.offButton=function(a){this.each(function(b,c){var d=$("<div class='ui-offbutton'><span></span></div>").click(function(){$(c).trigger("click")}).addClass(c.checked?"active":"");$(c).change(function(){d.toggleClass("active",c.checked),a(c,d)}).hide().after(d)})};var weshopManage={init:function(){this.initChangeMail(),this.initChangeMobile(),this.initChangeLOGO(),this.initChangeBG(),this.initSelectMoreQRSize(),this.initSelectPrivacy(),this.initChangeIntroduce(),this.initChangeAddress()},initChangeMail:function(){seajs.use(["dialog"],function(a){var b=new a({content:"#dialogChangeMail-step2"}).after("show",function(){c.hide()}),c=new a({trigger:"#ChangeMail",content:"#dialogChangeMail-step1"}).after("render",function(){$(this.element[0]).find("#btnMailStep1").bind("click",function(){var a=$("input[name='validatePas']").val(),b=$("input[name='emailAddress']").val();if((null==a||""==a)&&remind("error","密码不能为空！"),!/^[a-z]([a-z0-9]*[-_]?[a-z0-9])*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i.test(b))return remind("error","邮箱格式不正确！"),!1;var e=$("input[name='shopId']").val();$.ajax({type:"POST",url:"/weshop/config/changeEmail",data:{validatePas:a,newEmail:b,shopId:e},dataType:"json",success:function(a){a.code==zttx.SUCCESS?(remind("success","验证成功!"),c.hide(),$(".userEmail").text(b),$(".newUserMail").text(b),d.show()):remind("error","验证失败！"+zttx.SUCCESS)}})})}),d=new a({content:"#dialogChangeMail-step3"}).after("show",function(){b.hide()});$("#reSend").click(function(){d.hide(),c.show()}),$("#btnMailStep3").click(function(){d.hide()})})},initChangeMobile:function(){seajs.use(["dialog"],function(a){var b=new a({trigger:"#ChangeMobile",content:"#dialogChangeMobile-step1"}).after("render",function(){$(this.element[0]).find('button[name="firstValidation"]').click(function(){var a="/common/sendvcode",b=$("#oldTelephone").val();changeMobile(a,{userMobile:b})}),$(this.element[0]).find("button[name='secondValidation']").click(function(){var a=$("#newTelephone").val();if(null==a||""==a)return remind("error","请输入新的手机号！"),!1;if(!/^1[3|4|5|8]\d{9}$/.test(a))return remind("error","请输入有效的手机号！"),!1;var b="/common/sendvcode";changeMobile(b,{userMobile:a})}),$(this.element[0]).find("#btnMobileStep1").click(function(){var a=$("#oldTelephone").val(),c=$("#newTelephone").val(),d=$("input[name='firstValM']").val(),e=$("input[name='secondValM']").val();if(null==c||""==c)return remind("error","请输入新的手机号！"),!1;if(!/^1[3|4|5|8]\d{9}$/.test(c))return remind("error","请输入有效的手机号！"),!1;if(6!=e.length||6!=d.length)return remind("error","请输入手机上的6位验证码！"),!1;var f="/weshop/config/changeMobile";changeMobile(f,{oldUserMobile:a,newUserMobile:c,firstValM:d,secondValM:e,shopId:$('input[name="shopId"]').val()});$(".userMobile").text(c),b.hide()})})})},initChangeLOGO:function(){seajs.use(["dialog","Jcrop","ajaxFileUpload"],function(a){function b(a){if(a.h=a.h.toFixed(0),a.w=a.w.toFixed(0),a.x=a.x.toFixed(0),a.y=a.y.toFixed(0),a.x2=a.x2.toFixed(0),a.y2=a.y2.toFixed(0),l=a,parseInt(a.w)>0){var b=j/a.w,c=k/a.h;i.css({width:Math.round(b*d)+"px",height:Math.round(c*e)+"px",marginLeft:"-"+Math.round(b*a.x)+"px",marginTop:"-"+Math.round(c*a.y)+"px"})}}var c,d,e,f=new a({trigger:"#ChangeLOGO",content:"#dialogChangeLOGO"}),g=$(".preview-logo"),h=$(g).find(".preview-container"),i=$(h).find("img"),j=h.width(),k=h.height();$(".changelogo-img").Jcrop({boxWidth:320,boxHeight:320,minSize:[160,160],onChange:b,onSelect:b,aspectRatio:1},function(){var a=this.getBounds();d=a[0],e=a[1],c=this,c.animateTo([0,0,160,160])});var l={};$("#dialogChangeLOGO #LogoUpload").click(function(){$.ajaxFileUpload({url:"/dealer/weshop/upload",secureuri:!1,fileElementId:"LogoBJ",dataType:"json",success:function(a){a.code==zttx.SUCCESS?($("#dialogChangeLOGO .changelogo-img").attr("src","${res}"+a.rows[0].path),$('#dialogChangeLOGO input[name="logo_img"]').val(a.rows[0].path),$('#dialogChangeLOGO input[name="logo_imgName"]').val(a.rows[0].origName),$("#dialogChangeLOGO .jcrop-preview").attr("src","${res}"+a.rows[0].path)):remind("error",a.message)}})}),$("#dialogChangeLOGO #SaveLOGO").click(function(){var a=$('#dialogChangeLOGO input[name="logo_img"]').val(),b=$('#dialogChangeLOGO input[name="logo_imgName"]').val();return""==a||""==b?(remind("error","请先上传图片"),!1):(l.img=a,l.imgName=b,l.shopId=$.trim($('input[name="shopId"]').val()),void $.ajax({type:"POST",url:"/weshop/config/saveLogo",data:l,dataType:"json",success:function(a){if(a.code==zttx.SUCCESS){var b=$('#dialogChangeLOGO input[name="logo_img"]').val();$(".LogoImg img").attr("src","${res}"+b),remind("success","图片保存成功!"),f.hide()}else remind("error",a.message)}}))})})},initChangeBG:function(){seajs.use(["dialog","Jcrop"],function(a){function b(a){if(a.h=a.h.toFixed(0),a.w=a.w.toFixed(0),a.x=a.x.toFixed(0),a.y=a.y.toFixed(0),a.x2=a.x2.toFixed(0),a.y2=a.y2.toFixed(0),l=a,parseInt(a.w)>0){var b=j/a.w,c=k/a.h;i.css({width:Math.round(b*d)+"px",height:Math.round(c*e)+"px",marginLeft:"-"+Math.round(b*a.x)+"px",marginTop:"-"+Math.round(c*a.y)+"px"})}}var c,d,e,f=new a({trigger:"#ChangeBG",content:"#dialogChangeBG"}),g=$(".preview-bg"),h=$(g).find(".preview-container"),i=$(h).find("img"),j=h.width(),k=h.height();$(".changelogo-bg").Jcrop({boxWidth:160,boxHeight:160,minSize:[320,110],onChange:b,onSelect:b,aspectRatio:160/55},function(){var a=this.getBounds();d=a[0],e=a[1],c=this,c.animateTo([0,0,160,55])});var l={};$("#uploadBG").click(function(){$.ajaxFileUpload({url:"/dealer/weshop/upload",secureuri:!1,fileElementId:"LogoBG",dataType:"json",success:function(a){a.code==zttx.SUCCESS?($("#dialogChangeBG .changelogo-bg").attr("src","${res}"+a.rows[0].path),$('#dialogChangeBG input[name="logo_img"]').val(a.rows[0].path),$('#dialogChangeBG input[name="logo_imgName"]').val(a.rows[0].origName),$("#dialogChangeBG .jcrop-preview").attr("src","${res}"+a.rows[0].path)):remind("error",a.message)}})}),$("#SaveBG").click(function(){var a=$('#dialogChangeBG input[name="logo_img"]').val(),b=$('#dialogChangeBG input[name="logo_imgName"]').val();return""==a||""==b?(remind("error","请先上传图片"),!1):(l.img=a,l.imgName=b,l.shopId=$.trim($('input[name="shopId"]').val()),void $.ajax({type:"POST",url:"/weshop/config/saveBG",data:l,dataType:"json",success:function(a){if(a.code==zttx.SUCCESS){var b=$('#dialogChangeBG input[name="logo_img"]').val();$(".bgImage img").attr("src","${res}"+b),remind("success","图片保存成功!"),f.hide()}else remind("error",a.message)}}))})})},initSelectMoreQRSize:function(){seajs.use(["dialog","qrcode"],function(a,b){var c=new b({text:"hello world!!",width:120,height:120});$(".myQRCode").append(c);var d=new a({trigger:"#QRSize",content:"#dialogQRSize"}).after("render",function(){$(this.element[0]).find("button").click(function(){d.hide()})})})},initSelectPrivacy:function(){$("#checkPrivacy").offButton(function(a,b){$("#LabelPrivacy").text(a.checked?"已允许":"不允许")})},initChangeIntroduce:function(){seajs.use(["dialog"],function(a){var b=new a({trigger:"#ChangeIntroduce",content:"#dialogChangeIntroduce"}).after("render",function(){$(this.element[0]).find("button").bind("click",function(){var a=$("#introduceText").val();return a.length>120||a.length<4?(alert("介绍长度为4-120个字！"),!1):void $.ajax({type:"POST",url:"/weshop/config/changeIntroduce",data:{introduction_val:a,shopId:$('input[name="shopId"]').val()},dataType:"json",success:function(c){c.code==zttx.SUCCESS?(alert("更新介绍成功！"),$("#showIntroduce").text(a)):alert(c.message),b.hide()}})})})})},initChangeAddress:function(){seajs.use(["dialog"],function(a){var b=new a({trigger:"#ChangeAddress",content:"#dialogChangeAddress"}).after("render",function(){$(this.element[0]).find("button").bind("click",function(){var a=$("#test1province option:selected").val(),c=$("#test1city option:selected").val(),d=$("#test1county option:selected").val(),e="",f=$("input[name='dealerAddress']").val();if(""!=d)e=d;else if(""!=c)e=d;else{if(""==a)return alert("请在下拉框中选择地址！"),!1;e=d}$("#changeAddress input[name='provinceName']").val(a),$("#changeAddress input[name='cityName']").val(c),$("#changeAddress input[name='areaName']").val(d),$("#changeAddress input[name='areaNo']").val(e),$("#changeAddress input[name='dealerAddress']").val(f),$.ajax({type:"POST",url:"/weshop/config/changeAddress",data:$("#changeAddress").serialize(),dataType:"json",success:function(a){if(a.code==zttx.SUCCESS){alert("更新地址成功！");var c=a.object.provinceName,d=a.object.cityName,e=a.object.areaName,f=a.object.address;$("#showAddress").text("");var g=c+d+e+f;$("#showAddress").text(g)}else alert(a.message);b.hide()}})})})})},initChangeWaterMark:function(){seajs.use(["dialog"],function(a){var b=new a({trigger:"#ChangeWaterMark",content:"#dialogChangeWaterMark"}).after("render",function(){$(this.element[0]).find("button").click(function(){b.hide()})})})}};weshopManage.init();