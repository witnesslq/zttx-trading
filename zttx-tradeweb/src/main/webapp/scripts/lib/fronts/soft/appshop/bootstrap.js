if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function($){"use strict";function a(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}$.fn.emulateTransitionEnd=function(a){var b=!1,c=this;$(this).one("bsTransitionEnd",function(){b=!0});var d=function(){b||$(c).trigger($.support.transition.end)};return setTimeout(d,a),this},$(function(){$.support.transition=a(),$.support.transition&&($.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(a){return $(a.target).is(this)?a.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var b=$(this),d=b.data("bs.alert");d||b.data("bs.alert",d=new c(this)),"string"==typeof a&&d[a].call(b)})}var b='[data-dismiss="alert"]',c=function(a){$(a).on("click",b,this.close)};c.VERSION="3.2.0",c.prototype.close=function(a){function b(){e.detach().trigger("closed.bs.alert").remove()}var c=$(this),d=c.attr("data-target");d||(d=c.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,""));var e=$(d);a&&a.preventDefault(),e.length||(e=c.hasClass("alert")?c:c.parent()),e.trigger(a=$.Event("close.bs.alert")),a.isDefaultPrevented()||(e.removeClass("in"),$.support.transition&&e.hasClass("fade")?e.one("bsTransitionEnd",b).emulateTransitionEnd(150):b())};var d=$.fn.alert;$.fn.alert=a,$.fn.alert.Constructor=c,$.fn.alert.noConflict=function(){return $.fn.alert=d,this},$(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.button"),e="object"==typeof a&&a;d||c.data("bs.button",d=new b(this,e)),"toggle"==a?d.toggle():a&&d.setState(a)})}var b=function(a,c){this.$element=$(a),this.options=$.extend({},b.DEFAULTS,c),this.isLoading=!1};b.VERSION="3.2.0",b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",null==e.resetText&&c.data("resetText",c[d]()),c[d](null==e[a]?this.options[a]:e[a]),setTimeout($.proxy(function(){"loadingText"==a?(this.isLoading=!0,c.addClass(b).attr(b,b)):this.isLoading&&(this.isLoading=!1,c.removeClass(b).removeAttr(b))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=$.fn.button;$.fn.button=a,$.fn.button.Constructor=b,$.fn.button.noConflict=function(){return $.fn.button=c,this},$(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(b){var c=$(b.target);c.hasClass("btn")||(c=c.closest(".btn")),a.call(c,"toggle"),b.preventDefault()})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.carousel"),e=$.extend({},b.DEFAULTS,c.data(),"object"==typeof a&&a),f="string"==typeof a?a:e.slide;d||c.data("bs.carousel",d=new b(this,e)),"number"==typeof a?d.to(a):f?d[f]():e.interval&&d.pause().cycle()})}var b=function(a,b){this.$element=$(a).on("keydown.bs.carousel",$.proxy(this.keydown,this)),this.$indicators=this.$element.find(".carousel-indicators"),this.options=b,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter.bs.carousel",$.proxy(this.pause,this)).on("mouseleave.bs.carousel",$.proxy(this.cycle,this))};b.VERSION="3.2.0",b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.keydown=function(a){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()},b.prototype.cycle=function(a){return a||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval)),this},b.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},b.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",$(this.$items[a]))},b.prototype.pause=function(a){return a||(this.paused=!0),this.$element.find(".next, .prev").length&&$.support.transition&&(this.$element.trigger($.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(a,b){var c=this.$element.find(".item.active"),d=b||c[a](),e=this.interval,f="next"==a?"left":"right",g="next"==a?"first":"last",h=this;if(!d.length){if(!this.options.wrap)return;d=this.$element.find(".item")[g]()}if(d.hasClass("active"))return this.sliding=!1;var i=d[0],j=$.Event("slide.bs.carousel",{relatedTarget:i,direction:f});if(this.$element.trigger(j),!j.isDefaultPrevented()){if(this.sliding=!0,e&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var k=$(this.$indicators.children()[this.getItemIndex(d)]);k&&k.addClass("active")}var l=$.Event("slid.bs.carousel",{relatedTarget:i,direction:f});return $.support.transition&&this.$element.hasClass("slide")?(d.addClass(a),d[0].offsetWidth,c.addClass(f),d.addClass(f),c.one("bsTransitionEnd",function(){d.removeClass([a,f].join(" ")).addClass("active"),c.removeClass(["active",f].join(" ")),h.sliding=!1,setTimeout(function(){h.$element.trigger(l)},0)}).emulateTransitionEnd(1e3*c.css("transition-duration").slice(0,-1))):(c.removeClass("active"),d.addClass("active"),this.sliding=!1,this.$element.trigger(l)),e&&this.cycle(),this}};var c=$.fn.carousel;$.fn.carousel=a,$.fn.carousel.Constructor=b,$.fn.carousel.noConflict=function(){return $.fn.carousel=c,this},$(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=$(this),e=$(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""));if(e.hasClass("carousel")){var f=$.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),a.call(e,f),g&&e.data("bs.carousel").to(g),b.preventDefault()}}),$(window).on("load",function(){$('[data-ride="carousel"]').each(function(){var b=$(this);a.call(b,b.data())})})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.collapse"),e=$.extend({},b.DEFAULTS,c.data(),"object"==typeof a&&a);!d&&e.toggle&&"show"==a&&(a=!a),d||c.data("bs.collapse",d=new b(this,e)),"string"==typeof a&&d[a]()})}var b=function(a,c){this.$element=$(a),this.options=$.extend({},b.DEFAULTS,c),this.transitioning=null,this.options.parent&&(this.$parent=$(this.options.parent)),this.options.toggle&&this.toggle()};b.VERSION="3.2.0",b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=$.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;a.call(c,"hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!$.support.transition)return f.call(this);var g=$.camelCase(["scroll",e].join("-"));this.$element.one("bsTransitionEnd",$.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var a=$.Event("hide.bs.collapse");if(this.$element.trigger(a),!a.isDefaultPrevented()){var b=this.dimension();this.$element[b](this.$element[b]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var c=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return $.support.transition?void this.$element[b](0).one("bsTransitionEnd",$.proxy(c,this)).emulateTransitionEnd(350):c.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=$.fn.collapse;$.fn.collapse=a,$.fn.collapse.Constructor=b,$.fn.collapse.noConflict=function(){return $.fn.collapse=c,this},$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(b){var c,d=$(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=$(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&$(i);g&&g.transitioning||(j&&j.find('[data-toggle="collapse"][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),a.call(f,h)})}(jQuery),+function($){"use strict";function a(a){a&&3===a.which||($(d).remove(),$(e).each(function(){var c=b($(this)),d={relatedTarget:this};c.hasClass("open")&&(c.trigger(a=$.Event("hide.bs.dropdown",d)),a.isDefaultPrevented()||c.removeClass("open").trigger("hidden.bs.dropdown",d))}))}function b(a){var b=a.attr("data-target");b||(b=a.attr("href"),b=b&&/#[A-Za-z]/.test(b)&&b.replace(/.*(?=#[^\s]*$)/,""));var c=b&&$(b);return c&&c.length?c:a.parent()}function c(a){return this.each(function(){var b=$(this),c=b.data("bs.dropdown");c||b.data("bs.dropdown",c=new f(this)),"string"==typeof a&&c[a].call(b)})}var d=".dropdown-backdrop",e='[data-toggle="dropdown"]',f=function(a){$(a).on("click.bs.dropdown",this.toggle)};f.VERSION="3.2.0",f.prototype.toggle=function(c){var d=$(this);if(!d.is(".disabled, :disabled")){var e=b(d),f=e.hasClass("open");if(a(),!f){"ontouchstart"in document.documentElement&&!e.closest(".navbar-nav").length&&$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on("click",a);var g={relatedTarget:this};if(e.trigger(c=$.Event("show.bs.dropdown",g)),c.isDefaultPrevented())return;d.trigger("focus"),e.toggleClass("open").trigger("shown.bs.dropdown",g)}return!1}},f.prototype.keydown=function(a){if(/(38|40|27)/.test(a.keyCode)){var c=$(this);if(a.preventDefault(),a.stopPropagation(),!c.is(".disabled, :disabled")){var d=b(c),f=d.hasClass("open");if(!f||f&&27==a.keyCode)return 27==a.which&&d.find(e).trigger("focus"),c.trigger("click");var g=" li:not(.divider):visible a",h=d.find('[role="menu"]'+g+', [role="listbox"]'+g);if(h.length){var i=h.index(h.filter(":focus"));38==a.keyCode&&i>0&&i--,40==a.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).trigger("focus")}}}};var g=$.fn.dropdown;$.fn.dropdown=c,$.fn.dropdown.Constructor=f,$.fn.dropdown.noConflict=function(){return $.fn.dropdown=g,this},$(document).on("click.bs.dropdown.data-api",a).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+', [role="menu"], [role="listbox"]',f.prototype.keydown)}(jQuery),+function($){"use strict";function a(a,c){return this.each(function(){var d=$(this),e=d.data("bs.modal"),f=$.extend({},b.DEFAULTS,d.data(),"object"==typeof a&&a);e||d.data("bs.modal",e=new b(this,f)),"string"==typeof a?e[a](c):f.show&&e.show(c)})}var b=function(a,b){this.options=b,this.$body=$(document.body),this.$element=$(a),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,$.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.VERSION="3.2.0",b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},b.prototype.show=function(a){var b=this,c=$.Event("show.bs.modal",{relatedTarget:a});this.$element.trigger(c),this.isShown||c.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.$body.addClass("modal-open"),this.setScrollbar(),this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',$.proxy(this.hide,this)),this.backdrop(function(){var c=$.support.transition&&b.$element.hasClass("fade");b.$element.parent().length||b.$element.appendTo(b.$body),b.$element.show().scrollTop(0),c&&b.$element[0].offsetWidth,b.$element.addClass("in").attr("aria-hidden",!1),b.enforceFocus();var d=$.Event("shown.bs.modal",{relatedTarget:a});c?b.$element.find(".modal-dialog").one("bsTransitionEnd",function(){b.$element.trigger("focus").trigger(d)}).emulateTransitionEnd(300):b.$element.trigger("focus").trigger(d)}))},b.prototype.hide=function(a){a&&a.preventDefault(),a=$.Event("hide.bs.modal"),this.$element.trigger(a),this.isShown&&!a.isDefaultPrevented()&&(this.isShown=!1,this.$body.removeClass("modal-open"),this.resetScrollbar(),this.escape(),$(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),$.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){$(document).off("focusin.bs.modal").on("focusin.bs.modal",$.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",$.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(a){var b=this,c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=$.support.transition&&c;if(this.$backdrop=$('<div class="modal-backdrop '+c+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",$.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!a)return;d?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(150):a()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var e=function(){b.removeBackdrop(),a&&a()};$.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(150):e()}else a&&a()},b.prototype.checkScrollbar=function(){document.body.clientWidth>=window.innerWidth||(this.scrollbarWidth=this.scrollbarWidth||this.measureScrollbar())},b.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",a+this.scrollbarWidth)},b.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},b.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var c=$.fn.modal;$.fn.modal=a,$.fn.modal.Constructor=b,$.fn.modal.noConflict=function(){return $.fn.modal=c,this},$(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=$(this),d=c.attr("href"),e=$(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":$.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.one("show.bs.modal",function(a){a.isDefaultPrevented()||e.one("hidden.bs.modal",function(){c.is(":visible")&&c.trigger("focus")})}),a.call(e,f,this)})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.tooltip"),e="object"==typeof a&&a;(d||"destroy"!=a)&&(d||c.data("bs.tooltip",d=new b(this,e)),"string"==typeof a&&d[a]())})}var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.VERSION="3.2.0",b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},b.prototype.init=function(a,b,c){this.enabled=!0,this.type=a,this.$element=$(b),this.options=this.getOptions(c),this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport);for(var d=this.options.trigger.split(" "),e=d.length;e--;){var f=d[e];if("click"==f)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=f){var g="hover"==f?"mouseenter":"focusin",h="hover"==f?"mouseleave":"focusout";this.$element.on(g+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(h+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(a){return a=$.extend({},this.getDefaults(),this.$element.data(),a),a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay}),a},b.prototype.getDelegateOptions=function(){var a={},b=this.getDefaults();return this._options&&$.each(this._options,function(c,d){b[c]!=d&&(a[c]=d)}),a},b.prototype.enter=function(a){var b=a instanceof this.constructor?a:$(a.currentTarget).data("bs."+this.type);return b||(b=new this.constructor(a.currentTarget,this.getDelegateOptions()),$(a.currentTarget).data("bs."+this.type,b)),clearTimeout(b.timeout),b.hoverState="in",b.options.delay&&b.options.delay.show?void(b.timeout=setTimeout(function(){"in"==b.hoverState&&b.show()},b.options.delay.show)):b.show()},b.prototype.leave=function(a){var b=a instanceof this.constructor?a:$(a.currentTarget).data("bs."+this.type);return b||(b=new this.constructor(a.currentTarget,this.getDelegateOptions()),$(a.currentTarget).data("bs."+this.type,b)),clearTimeout(b.timeout),b.hoverState="out",b.options.delay&&b.options.delay.hide?void(b.timeout=setTimeout(function(){"out"==b.hoverState&&b.hide()},b.options.delay.hide)):b.hide()},b.prototype.show=function(){var a=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(a);var b=$.contains(document.documentElement,this.$element[0]);if(a.isDefaultPrevented()||!b)return;var c=this,d=this.tip(),e=this.getUID(this.type);this.setContent(),d.attr("id",e),this.$element.attr("aria-describedby",e),this.options.animation&&d.addClass("fade");var f="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,g=/\s?auto?\s?/i,h=g.test(f);h&&(f=f.replace(g,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(f).data("bs."+this.type,this),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var i=this.getPosition(),j=d[0].offsetWidth,k=d[0].offsetHeight;if(h){var l=f,m=this.$element.parent(),n=this.getPosition(m);f="bottom"==f&&i.top+i.height+k-n.scroll>n.height?"top":"top"==f&&i.top-n.scroll-k<0?"bottom":"right"==f&&i.right+j>n.width?"left":"left"==f&&i.left-j<n.left?"right":f,d.removeClass(l).addClass(f)}var o=this.getCalculatedOffset(f,i,j,k);this.applyPlacement(o,f);var p=function(){c.$element.trigger("shown.bs."+c.type),c.hoverState=null};$.support.transition&&this.$tip.hasClass("fade")?d.one("bsTransitionEnd",p).emulateTransitionEnd(150):p()}},b.prototype.applyPlacement=function(a,b){var c=this.tip(),d=c[0].offsetWidth,e=c[0].offsetHeight,f=parseInt(c.css("margin-top"),10),g=parseInt(c.css("margin-left"),10);isNaN(f)&&(f=0),isNaN(g)&&(g=0),a.top=a.top+f,a.left=a.left+g,$.offset.setOffset(c[0],$.extend({using:function(a){c.css({top:Math.round(a.top),left:Math.round(a.left)})}},a),0),c.addClass("in");var h=c[0].offsetWidth,i=c[0].offsetHeight;"top"==b&&i!=e&&(a.top=a.top+e-i);var j=this.getViewportAdjustedDelta(b,a,h,i);j.left?a.left+=j.left:a.top+=j.top;var k=j.left?2*j.left-d+h:2*j.top-e+i,l=j.left?"left":"top",m=j.left?"offsetWidth":"offsetHeight";c.offset(a),this.replaceArrow(k,c[0][m],l)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function a(){"in"!=b.hoverState&&c.detach(),b.$element.trigger("hidden.bs."+b.type)}var b=this,c=this.tip(),d=$.Event("hide.bs."+this.type);return this.$element.removeAttr("aria-describedby"),this.$element.trigger(d),d.isDefaultPrevented()?void 0:(c.removeClass("in"),$.support.transition&&this.$tip.hasClass("fade")?c.one("bsTransitionEnd",a).emulateTransitionEnd(150):a(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(a){a=a||this.$element;var b=a[0],c="BODY"==b.tagName;return $.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():null,{scroll:c?document.documentElement.scrollTop||document.body.scrollTop:a.scrollTop(),width:c?$(window).width():a.outerWidth(),height:c?$(window).height():a.outerHeight()},c?{top:0,left:0}:a.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},b.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(a){var b=this;a&&(b=$(a.currentTarget).data("bs."+this.type),b||(b=new this.constructor(a.currentTarget,this.getDelegateOptions()),$(a.currentTarget).data("bs."+this.type,b))),b.tip().hasClass("in")?b.leave(b):b.enter(b)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=$.fn.tooltip;$.fn.tooltip=a,$.fn.tooltip.Constructor=b,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=c,this}}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.popover"),e="object"==typeof a&&a;(d||"destroy"!=a)&&(d||c.data("bs.popover",d=new b(this,e)),"string"==typeof a&&d[a]())})}var b=function(a,b){this.init("popover",a,b)};if(!$.fn.tooltip)throw new Error("Popover requires tooltip.js");b.VERSION="3.2.0",b.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=$.extend({},$.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").empty()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=$(this.options.template)),this.$tip};var c=$.fn.popover;$.fn.popover=a,$.fn.popover.Constructor=b,$.fn.popover.noConflict=function(){return $.fn.popover=c,this}}(jQuery),+function($){"use strict";function a(b,c){var d=$.proxy(this.process,this);this.$body=$("body"),this.$scrollElement=$($(b).is("body")?window:b),this.options=$.extend({},a.DEFAULTS,c),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",d),this.refresh(),this.process()}function b(b){return this.each(function(){var c=$(this),d=c.data("bs.scrollspy"),e="object"==typeof b&&b;d||c.data("bs.scrollspy",d=new a(this,e)),"string"==typeof b&&d[b]()})}a.VERSION="3.2.0",a.DEFAULTS={offset:10},a.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},a.prototype.refresh=function(){var a="offset",b=0;$.isWindow(this.$scrollElement[0])||(a="position",b=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var c=this;this.$body.find(this.selector).map(function(){var c=$(this),d=c.data("target")||c.attr("href"),e=/^#./.test(d)&&$(d);return e&&e.length&&e.is(":visible")&&[[e[a]().top+b,d]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},a.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},a.prototype.activate=function(a){this.activeTarget=a,$(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var b=this.selector+'[data-target="'+a+'"],'+this.selector+'[href="'+a+'"]',c=$(b).parents("li").addClass("active");c.parent(".dropdown-menu").length&&(c=c.closest("li.dropdown").addClass("active")),c.trigger("activate.bs.scrollspy")};var c=$.fn.scrollspy;$.fn.scrollspy=b,$.fn.scrollspy.Constructor=a,$.fn.scrollspy.noConflict=function(){return $.fn.scrollspy=c,this},$(window).on("load.bs.scrollspy.data-api",function(){$('[data-spy="scroll"]').each(function(){var a=$(this);b.call(a,a.data())})})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.tab");d||c.data("bs.tab",d=new b(this)),"string"==typeof a&&d[a]()})}var b=function(a){this.element=$(a)};b.VERSION="3.2.0",b.prototype.show=function(){var a=this.element,b=a.closest("ul:not(.dropdown-menu)"),c=a.data("target");if(c||(c=a.attr("href"),c=c&&c.replace(/.*(?=#[^\s]*$)/,"")),!a.parent("li").hasClass("active")){var d=b.find(".active:last a")[0],e=$.Event("show.bs.tab",{relatedTarget:d});if(a.trigger(e),!e.isDefaultPrevented()){var f=$(c);this.activate(a.closest("li"),b),this.activate(f,f.parent(),function(){a.trigger({type:"shown.bs.tab",relatedTarget:d})})}}},b.prototype.activate=function(a,b,c){function d(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),a.addClass("active"),f?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade"),a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active"),c&&c()}var e=b.find("> .active"),f=c&&$.support.transition&&e.hasClass("fade");f?e.one("bsTransitionEnd",d).emulateTransitionEnd(150):d(),e.removeClass("in")};var c=$.fn.tab;$.fn.tab=a,$.fn.tab.Constructor=b,$.fn.tab.noConflict=function(){return $.fn.tab=c,this},$(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a.call($(this),"show")})}(jQuery),+function($){"use strict";function a(a){return this.each(function(){var c=$(this),d=c.data("bs.affix"),e="object"==typeof a&&a;d||c.data("bs.affix",d=new b(this,e)),"string"==typeof a&&d[a]()})}var b=function(a,c){this.options=$.extend({},b.DEFAULTS,c),this.$target=$(this.options.target).on("scroll.bs.affix.data-api",$.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",$.proxy(this.checkPositionWithEventLoop,this)),this.$element=$(a),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.VERSION="3.2.0",b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0,target:window},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$target.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var a=$(document).height(),c=this.$target.scrollTop(),d=this.$element.offset(),e=this.options.offset,f=e.top,g=e.bottom;"object"!=typeof e&&(g=f=e),"function"==typeof f&&(f=e.top(this.$element)),"function"==typeof g&&(g=e.bottom(this.$element));var h=null!=this.unpin&&c+this.unpin<=d.top?!1:null!=g&&d.top+this.$element.height()>=a-g?"bottom":null!=f&&f>=c?"top":!1;if(this.affixed!==h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=$.Event(i+".bs.affix");this.$element.trigger(j),j.isDefaultPrevented()||(this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(i).trigger($.Event(i.replace("affix","affixed"))),"bottom"==h&&this.$element.offset({top:a-this.$element.height()-g}))}}};var c=$.fn.affix;$.fn.affix=a,$.fn.affix.Constructor=b,$.fn.affix.noConflict=function(){return $.fn.affix=c,this},$(window).on("load",function(){$('[data-spy="affix"]').each(function(){var b=$(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),a.call(b,c)})})}(jQuery);