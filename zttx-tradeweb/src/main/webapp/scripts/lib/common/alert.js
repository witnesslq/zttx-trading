!function(){$("head").append("<style>.ts-mask{position:fixed;top:0;left:0;right:0;bottom:0;z-index: 999;text-align: center}.ts-alert{ display: inline-block;background-color:rgba(0,0,0,.7);border-radius: 5px;padding:10px;margin-top: 200px;min-width:200px;max-width:250px; }.ts-alert p{color:#fff;word-break: break-all}.ts-alert-ok,.ts-alert-cancel {display: inline-block;width:40%;height:30px;line-height:30px;background-color: #fff;border-radius: 5px;color:#666;font-size:14px;}.ts-alert-ok:active,.ts-alert-cancel:active{background-color: #eee;} </style>"),window.alert=function(a){var b=$("<div class='ts-mask'><div class='ts-alert'><p>{{text}}</p><div><a class='ts-alert-ok'>确定</a></div></div></div>".replace("{{text}}",a));$("body").append(b),$(b).find(".ts-alert-ok").bind("click",function(){b.remove()})},window.remind=function(a){var b=$("<div class='ts-mask'><div class='ts-alert'><p>{{text}}</p></div></div>".replace("{{text}}",a));$("body").append(b),setTimeout(function(){b.remove()},3e3)},window.confirm=function(a,b){var c=$("<div class='ts-mask'><div class='ts-alert'><p>{{text}}</p><div><a class='ts-alert-ok'>确定</a> <a class='ts-alert-cancel'>取消</a></div></div></div>".replace("{{text}}",a));$("body").append(c),$(c).find(".ts-alert-ok").bind("click",function(){c.remove(),b(!0)}),$(c).find(".ts-alert-cancel").bind("click",function(){c.remove()})},window.loading=function(a,b){var c=$("<div class='ts-mask'><div class='ts-alert'><p><img src='/images/common/loading.gif'></p><p>{{text}}</p></div></div>".replace("{{text}}",a));$("body").append(c),b(c)}}();