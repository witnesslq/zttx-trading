seajs.use(["tabs","$"],function(a,$){new a({element:"#tab-view",triggers:"#tab-view .hot-nav li",panels:"#tab-view .content ul",activeTriggerClass:"active"});$("[data-deftxt]").css({color:"#bbb"}).focus(function(){$(this).val()==$(this).data("deftxt")&&$(this).val("").css({color:"#666"})}).blur(function(){""==$(this).val()&&$(this).val($(this).data("deftxt")).css({color:"#bbb"})})});