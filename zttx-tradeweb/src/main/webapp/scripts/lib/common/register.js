var register={phoneVerify:function(a,b){var c=$("#"+a),d=regForm.check(!1,$("#"+a));if(d){var e=$.trim(c.val());$.ajax({type:"POST",url:"phoneVerify",data:{userMobile:e,userType:b},dataType:"json",success:function(a){var b=c.parent().find(".Validform_checktip");0!=a.code&&126138!=a.code?(b.text(a.message),c.addClass("Validform_error"),b.attr("class","Validform_checktip Validform_wrong")):126138==a.code?(b.html("您的手机号已被收录/注册，<a href='/common/login' class='link'>立即登录</a>平台采购下单！ <a href='/common/forgotpass' class='link'>忘记密码？</a>"),c.addClass("Validform_error"),b.attr("class","Validform_checktip Validform_wrong")):(b.text("手机号可用！"),c.removeClass("Validform_error"),b.attr("class","Validform_checktip Validform_right"),getCodeFn($(".btn-getcode"),60))},error:function(a,b,c){alert(c)}})}}};window.register=window.$REG=register;