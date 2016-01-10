function searchMe(e) {
    $("#search_form input[id=q]").val(e), window.location.href = "/market/brands/search?q=" + encodeURIComponent($.trim(e))
}
function AddFavorite(e, t) {
    try {
        window.external.addFavorite(t, e)
    } catch (n) {
        try {
            window.sidebar.addPanel(e, t, "")
        } catch (n) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}
function parseURL(e) {
    var t = document.createElement("a");
    return t.href = e, {
        source: e,
        protocol: t.protocol.replace(":", ""),
        host: t.hostname,
        port: t.port,
        query: t.search,
        params: function () {
            for (var e, n = {}, r = t.search.replace(/^\?/, "").split("&"), i = r.length, o = 0; i > o; o++)r[o] && (e = r[o].split("="), n[e[0]] = e[1]);
            return n
        }(),
        file: (t.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
        hash: t.hash.replace("#", ""),
        path: t.pathname.replace(/^([^\/])/, "/$1"),
        relative: (t.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
        segments: t.pathname.replace(/^\//, "").split("/")
    }
}
function ajaxLogin() {
    return $("#ajaxLogin").length > 0 && "" != $("#ajaxLogin").html() ? ($("#ajaxLogin").show(), void 0) : ($.get("/common/login_dialog", function (e) {
        $('<div id="ajaxLogin">' + e + "</div>").appendTo($("body")), $(".login-dialog-tabmenu").on("click", "li a", function () {
            var e = $(this).parents("li").index();
            $(".login-dialog-tabmenu  li").removeClass("selected").eq(e).addClass("selected"), 0 == e ? $("#userType").val(1) : 1 == e && $("#userType").val(0)
        }), $("#login-btn").on("click", function () {
            return "" == $("input[name='account']").val() ? (alert("请输入会员名"), void 0) : "" == $("input[name='pwd']").val() ? (alert("请输入密码"), void 0) : ($.ajax({
                url: $("#command").attr("action"),
                method: "post",
                data: $("#command").serialize(),
                dataType: "json",
                success: function (e) {
                    if (126e3 === e.code) {
                        var t = $.trim($('input[name="redirect"]').val());
                        if ("" == t)t = e.object.redirect; else {
                            var n = parseURL(t), r = parseURL(window.location.href);
                            if (n.host == r.host) {
                                var i = parseInt($("#userType").val());
                                switch (i) {
                                    case 0:
                                        0 == n.path.indexOf("/dealer") && (t = e.object.redirect);
                                        break;
                                    case 1:
                                        0 == n.path.indexOf("/brand") && (t = e.object.redirect);
                                        break;
                                    default:
                                }
                            } else t = e.object.redirect
                        }
                        window.location.href = t
                    } else alert(e.message)
                }
            }), void 0)
        }), $("#ajaxLogin .login-dialog-close").on("click", function () {
            $("#ajaxLogin").hide()
        })
    }), void 0)
}
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = e.length, n = ot.type(e);
        return "function" === n || ot.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function r(e, t, n) {
        if (ot.isFunction(t))return ot.grep(e, function (e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType)return ot.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (pt.test(t))return ot.filter(t, e, n);
            t = ot.filter(t, e)
        }
        return ot.grep(e, function (e) {
            return ot.inArray(e, t) >= 0 !== n
        })
    }

    function i(e, t) {
        do e = e[t]; while (e && 1 !== e.nodeType);
        return e
    }

    function o(e) {
        var t = wt[e] = {};
        return ot.each(e.match(xt) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function a() {
        mt.addEventListener ? (mt.removeEventListener("DOMContentLoaded", s, !1), e.removeEventListener("load", s, !1)) : (mt.detachEvent("onreadystatechange", s), e.detachEvent("onload", s))
    }

    function s() {
        (mt.addEventListener || "load" === event.type || "complete" === mt.readyState) && (a(), ot.ready())
    }

    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(kt, "-$1").toLowerCase();
            if (n = e.getAttribute(r), "string" == typeof n) {
                try {
                    n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : Nt.test(n) ? ot.parseJSON(n) : n
                } catch (i) {
                }
                ot.data(e, t, n)
            } else n = void 0
        }
        return n
    }

    function u(e) {
        var t;
        for (t in e)if (("data" !== t || !ot.isEmptyObject(e[t])) && "toJSON" !== t)return !1;
        return !0
    }

    function c(e, t, n, r) {
        if (ot.acceptData(e)) {
            var i, o, a = ot.expando, s = e.nodeType, l = s ? ot.cache : e, u = s ? e[a] : e[a] && a;
            if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t)return u || (u = s ? e[a] = V.pop() || ot.guid++ : a), l[u] || (l[u] = s ? {} : {toJSON: ot.noop}), ("object" == typeof t || "function" == typeof t) && (r ? l[u] = ot.extend(l[u], t) : l[u].data = ot.extend(l[u].data, t)), o = l[u], r || (o.data || (o.data = {}), o = o.data), void 0 !== n && (o[ot.camelCase(t)] = n), "string" == typeof t ? (i = o[t], null == i && (i = o[ot.camelCase(t)])) : i = o, i
        }
    }

    function d(e, t, n) {
        if (ot.acceptData(e)) {
            var r, i, o = e.nodeType, a = o ? ot.cache : e, s = o ? e[ot.expando] : ot.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    ot.isArray(t) ? t = t.concat(ot.map(t, ot.camelCase)) : t in r ? t = [t] : (t = ot.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;)delete r[t[i]];
                    if (n ? !u(r) : !ot.isEmptyObject(r))return
                }
                (n || (delete a[s].data, u(a[s]))) && (o ? ot.cleanData([e], !0) : rt.deleteExpando || a != a.window ? delete a[s] : a[s] = null)
            }
        }
    }

    function f() {
        return !0
    }

    function p() {
        return !1
    }

    function h() {
        try {
            return mt.activeElement
        } catch (e) {
        }
    }

    function m(e) {
        var t = Mt.split("|"), n = e.createDocumentFragment();
        if (n.createElement)for (; t.length;)n.createElement(t.pop());
        return n
    }

    function g(e, t) {
        var n, r, i = 0, o = typeof e.getElementsByTagName !== Et ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== Et ? e.querySelectorAll(t || "*") : void 0;
        if (!o)for (o = [], n = e.childNodes || e; null != (r = n[i]); i++)!t || ot.nodeName(r, t) ? o.push(r) : ot.merge(o, g(r, t));
        return void 0 === t || t && ot.nodeName(e, t) ? ot.merge([e], o) : o
    }

    function v(e) {
        Lt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function y(e, t) {
        return ot.nodeName(e, "table") && ot.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function b(e) {
        return e.type = (null !== ot.find.attr(e, "type")) + "/" + e.type, e
    }

    function x(e) {
        var t = Vt.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)ot._data(n, "globalEval", !t || ot._data(t[r], "globalEval"))
    }

    function T(e, t) {
        if (1 === t.nodeType && ot.hasData(e)) {
            var n, r, i, o = ot._data(e), a = ot._data(t, o), s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s)for (r = 0, i = s[n].length; i > r; r++)ot.event.add(t, n, s[n][r])
            }
            a.data && (a.data = ot.extend({}, a.data))
        }
    }

    function C(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !rt.noCloneEvent && t[ot.expando]) {
                i = ot._data(t);
                for (r in i.events)ot.removeEvent(t, r, i.handle);
                t.removeAttribute(ot.expando)
            }
            "script" === n && t.text !== e.text ? (b(t).text = e.text, x(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), rt.html5Clone && e.innerHTML && !ot.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Lt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }

    function E(t, n) {
        var r = ot(n.createElement(t)).appendTo(n.body), i = e.getDefaultComputedStyle ? e.getDefaultComputedStyle(r[0]).display : ot.css(r[0], "display");
        return r.detach(), i
    }

    function N(e) {
        var t = mt, n = en[e];
        return n || (n = E(e, t), "none" !== n && n || (Zt = (Zt || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Zt[0].contentWindow || Zt[0].contentDocument).document, t.write(), t.close(), n = E(e, t), Zt.detach()), en[e] = n), n
    }

    function k(e, t) {
        return {
            get: function () {
                var n = e();
                return null != n ? n ? void delete this.get : (this.get = t).apply(this, arguments) : void 0
            }
        }
    }

    function j(e, t) {
        if (t in e)return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = hn.length; i--;)if (t = hn[i] + n, t in e)return t;
        return r
    }

    function S(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++)r = e[a], r.style && (o[a] = ot._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && At(r) && (o[a] = ot._data(r, "olddisplay", N(r.nodeName)))) : o[a] || (i = At(r), (n && "none" !== n || !i) && ot._data(r, "olddisplay", i ? n : ot.css(r, "display"))));
        for (a = 0; s > a; a++)r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }

    function A(e, t, n) {
        var r = cn.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function D(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2)"margin" === n && (a += ot.css(e, n + St[o], !0, i)), r ? ("content" === n && (a -= ot.css(e, "padding" + St[o], !0, i)), "margin" !== n && (a -= ot.css(e, "border" + St[o] + "Width", !0, i))) : (a += ot.css(e, "padding" + St[o], !0, i), "padding" !== n && (a += ot.css(e, "border" + St[o] + "Width", !0, i)));
        return a
    }

    function L(e, t, n) {
        var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = tn(e), a = rt.boxSizing() && "border-box" === ot.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = nn(e, t, o), (0 > i || null == i) && (i = e.style[t]), on.test(i))return i;
            r = a && (rt.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + D(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function $(e, t, n, r, i) {
        return new $.prototype.init(e, t, n, r, i)
    }

    function _() {
        return setTimeout(function () {
            mn = void 0
        }), mn = ot.now()
    }

    function H(e, t) {
        var n, r = {height: e}, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t)n = St[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function q(e, t, n) {
        for (var r, i = (wn[t] || []).concat(wn["*"]), o = 0, a = i.length; a > o; o++)if (r = i[o].call(n, t, e))return r
    }

    function O(e, t, n) {
        var r, i, o, a, s, l, u, c, d = this, f = {}, p = e.style, h = e.nodeType && At(e), m = ot._data(e, "fxshow");
        n.queue || (s = ot._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
            s.unqueued || l()
        }), s.unqueued++, d.always(function () {
            d.always(function () {
                s.unqueued--, ot.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height"in t || "width"in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], u = ot.css(e, "display"), c = N(e.nodeName), "none" === u && (u = c), "inline" === u && "none" === ot.css(e, "float") && (rt.inlineBlockNeedsLayout && "inline" !== c ? p.zoom = 1 : p.display = "inline-block")), n.overflow && (p.overflow = "hidden", rt.shrinkWrapBlocks() || d.always(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
        }));
        for (r in t)if (i = t[r], vn.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                if ("show" !== i || !m || void 0 === m[r])continue;
                h = !0
            }
            f[r] = m && m[r] || ot.style(e, r)
        }
        if (!ot.isEmptyObject(f)) {
            m ? "hidden"in m && (h = m.hidden) : m = ot._data(e, "fxshow", {}), o && (m.hidden = !h), h ? ot(e).show() : d.done(function () {
                ot(e).hide()
            }), d.done(function () {
                var t;
                ot._removeData(e, "fxshow");
                for (t in f)ot.style(e, t, f[t])
            });
            for (r in f)a = q(h ? m[r] : 0, r, d), r in m || (m[r] = a.start, h && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }

    function M(e, t) {
        var n, r, i, o, a;
        for (n in e)if (r = ot.camelCase(n), i = t[r], o = e[n], ot.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ot.cssHooks[r], a && "expand"in a) {
            o = a.expand(o), delete e[r];
            for (n in o)n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }

    function F(e, t, n) {
        var r, i, o = 0, a = xn.length, s = ot.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (i)return !1;
            for (var t = mn || _(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; l > a; a++)u.tweens[a].run(o);
            return s.notifyWith(e, [u, o, n]), 1 > o && l ? n : (s.resolveWith(e, [u]), !1)
        }, u = s.promise({
            elem: e,
            props: ot.extend({}, t),
            opts: ot.extend(!0, {specialEasing: {}}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: mn || _(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = ot.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r), r
            },
            stop: function (t) {
                var n = 0, r = t ? u.tweens.length : 0;
                if (i)return this;
                for (i = !0; r > n; n++)u.tweens[n].run(1);
                return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this
            }
        }), c = u.props;
        for (M(c, u.opts.specialEasing); a > o; o++)if (r = xn[o].call(u, e, c, u.opts))return r;
        return ot.map(c, q, u), ot.isFunction(u.opts.start) && u.opts.start.call(e, u), ot.fx.timer(ot.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function R(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0, o = t.toLowerCase().match(xt) || [];
            if (ot.isFunction(n))for (; r = o[i++];)"+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function B(e, t, n, r) {
        function i(s) {
            var l;
            return o[s] = !0, ot.each(e[s] || [], function (e, s) {
                var u = s(t, n, r);
                return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u), i(u), !1)
            }), l
        }

        var o = {}, a = e === Un;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function P(e, t) {
        var n, r, i = ot.ajaxSettings.flatOptions || {};
        for (r in t)void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && ot.extend(!0, e, n), e
    }

    function W(e, t, n) {
        for (var r, i, o, a, s = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)for (a in s)if (s[a] && s[a].test(i)) {
            l.unshift(a);
            break
        }
        if (l[0]in n)o = l[0]; else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0
    }

    function I(e, t, n, r) {
        var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1])for (a in e.converters)u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = c.shift())if ("*" === o)o = l; else if ("*" !== l && l !== o) {
            if (a = u[l + " " + o] || u["* " + o], !a)for (i in u)if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                a === !0 ? a = u[i] : u[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0)if (a && e["throws"])t = a(t); else try {
                t = a(t)
            } catch (d) {
                return {state: "parsererror", error: a ? d : "No conversion from " + l + " to " + o}
            }
        }
        return {state: "success", data: t}
    }

    function z(e, t, n, r) {
        var i;
        if (ot.isArray(t))ot.each(t, function (t, i) {
            n || Yn.test(e) ? r(e, i) : z(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        }); else if (n || "object" !== ot.type(t))r(e, t); else for (i in t)z(e + "[" + i + "]", t[i], n, r)
    }

    function U() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function X() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function G(e) {
        return ot.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }

    var V = [], Y = V.slice, J = V.concat, Q = V.push, K = V.indexOf, Z = {}, et = Z.toString, tt = Z.hasOwnProperty, nt = "".trim, rt = {}, it = "1.11.0", ot = function (e, t) {
        return new ot.fn.init(e, t)
    }, at = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, st = /^-ms-/, lt = /-([\da-z])/gi, ut = function (e, t) {
        return t.toUpperCase()
    };
    ot.fn = ot.prototype = {
        jquery: it, constructor: ot, selector: "", length: 0, toArray: function () {
            return Y.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : Y.call(this)
        }, pushStack: function (e) {
            var t = ot.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return ot.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(ot.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(Y.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: Q, sort: V.sort, splice: V.splice
    }, ot.extend = ot.fn.extend = function () {
        var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || ot.isFunction(a) || (a = {}), s === l && (a = this, s--); l > s; s++)if (null != (i = arguments[s]))for (r in i)e = a[r], n = i[r], a !== n && (u && n && (ot.isPlainObject(n) || (t = ot.isArray(n))) ? (t ? (t = !1, o = e && ot.isArray(e) ? e : []) : o = e && ot.isPlainObject(e) ? e : {}, a[r] = ot.extend(u, o, n)) : void 0 !== n && (a[r] = n));
        return a
    }, ot.extend({
        expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === ot.type(e)
        }, isArray: Array.isArray || function (e) {
            return "array" === ot.type(e)
        }, isWindow: function (e) {
            return null != e && e == e.window
        }, isNumeric: function (e) {
            return e - parseFloat(e) >= 0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, isPlainObject: function (e) {
            var t;
            if (!e || "object" !== ot.type(e) || e.nodeType || ot.isWindow(e))return !1;
            try {
                if (e.constructor && !tt.call(e, "constructor") && !tt.call(e.constructor.prototype, "isPrototypeOf"))return !1
            } catch (n) {
                return !1
            }
            if (rt.ownLast)for (t in e)return tt.call(e, t);
            for (t in e);
            return void 0 === t || tt.call(e, t)
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Z[et.call(e)] || "object" : typeof e
        }, globalEval: function (t) {
            t && ot.trim(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        }, camelCase: function (e) {
            return e.replace(st, "ms-").replace(lt, ut)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, r) {
            var i, o = 0, a = e.length, s = n(e);
            if (r) {
                if (s)for (; a > o && (i = t.apply(e[o], r), i !== !1); o++); else for (o in e)if (i = t.apply(e[o], r), i === !1)break
            } else if (s)for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++); else for (o in e)if (i = t.call(e[o], o, e[o]), i === !1)break;
            return e
        }, trim: nt && !nt.call("﻿ ") ? function (e) {
            return null == e ? "" : nt.call(e)
        } : function (e) {
            return null == e ? "" : (e + "").replace(at, "")
        }, makeArray: function (e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ot.merge(r, "string" == typeof e ? [e] : e) : Q.call(r, e)), r
        }, inArray: function (e, t, n) {
            var r;
            if (t) {
                if (K)return K.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++)if (n in t && t[n] === e)return n
            }
            return -1
        }, merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r;)e[i++] = t[r++];
            if (n !== n)for (; void 0 !== t[r];)e[i++] = t[r++];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var r, i = [], o = 0, a = e.length, s = !n; a > o; o++)r = !t(e[o], o), r !== s && i.push(e[o]);
            return i
        }, map: function (e, t, r) {
            var i, o = 0, a = e.length, s = n(e), l = [];
            if (s)for (; a > o; o++)i = t(e[o], o, r), null != i && l.push(i); else for (o in e)i = t(e[o], o, r), null != i && l.push(i);
            return J.apply([], l)
        }, guid: 1, proxy: function (e, t) {
            var n, r, i;
            return "string" == typeof t && (i = e[t], t = e, e = i), ot.isFunction(e) ? (n = Y.call(arguments, 2), r = function () {
                return e.apply(t || this, n.concat(Y.call(arguments)))
            }, r.guid = e.guid = e.guid || ot.guid++, r) : void 0
        }, now: function () {
            return +new Date
        }, support: rt
    }), ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase()
    });
    var ct = function (e) {
        function t(e, t, n, r) {
            var i, o, a, s, l, u, d, h, m, g;
            if ((t ? t.ownerDocument || t : B) !== $ && L(t), t = t || $, n = n || [], !e || "string" != typeof e)return n;
            if (1 !== (s = t.nodeType) && 9 !== s)return [];
            if (H && !r) {
                if (i = yt.exec(e))if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode)return n;
                        if (o.id === a)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && F(t, o) && o.id === a)return n.push(o), n
                } else {
                    if (i[2])return Z.apply(n, t.getElementsByTagName(e)), n;
                    if ((a = i[3]) && C.getElementsByClassName && t.getElementsByClassName)return Z.apply(n, t.getElementsByClassName(a)), n
                }
                if (C.qsa && (!q || !q.test(e))) {
                    if (h = d = R, m = t, g = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (u = f(e), (d = t.getAttribute("id")) ? h = d.replace(xt, "\\$&") : t.setAttribute("id", h), h = "[id='" + h + "'] ", l = u.length; l--;)u[l] = h + p(u[l]);
                        m = bt.test(e) && c(t.parentNode) || t, g = u.join(",")
                    }
                    if (g)try {
                        return Z.apply(n, m.querySelectorAll(g)), n
                    } catch (v) {
                    } finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return w(e.replace(lt, "$1"), t, n, r)
        }

        function n() {
            function e(n, r) {
                return t.push(n + " ") > E.cacheLength && delete e[t.shift()], e[n + " "] = r
            }

            var t = [];
            return e
        }

        function r(e) {
            return e[R] = !0, e
        }

        function i(e) {
            var t = $.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function o(e, t) {
            for (var n = e.split("|"), r = e.length; r--;)E.attrHandle[n[r]] = t
        }

        function a(e, t) {
            var n = t && e, r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r)return r;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return r(function (t) {
                return t = +t, r(function (n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;)n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function c(e) {
            return e && typeof e.getElementsByTagName !== G && e
        }

        function d() {
        }

        function f(e, n) {
            var r, i, o, a, s, l, u, c = z[e + " "];
            if (c)return n ? 0 : c.slice(0);
            for (s = e, l = [], u = E.preFilter; s;) {
                (!r || (i = ut.exec(s))) && (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = !1, (i = ct.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(lt, " ")
                }), s = s.slice(r.length));
                for (a in E.filter)!(i = ht[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r)break
            }
            return n ? s.length : s ? t.error(e) : z(e, l).slice(0)
        }

        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
            return r
        }

        function h(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, o = W++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];)if (1 === t.nodeType || i)return e(t, n, o)
            } : function (t, n, a) {
                var s, l, u = [P, o];
                if (a) {
                    for (; t = t[r];)if ((1 === t.nodeType || i) && e(t, n, a))return !0
                } else for (; t = t[r];)if (1 === t.nodeType || i) {
                    if (l = t[R] || (t[R] = {}), (s = l[r]) && s[0] === P && s[1] === o)return u[2] = s[2];
                    if (l[r] = u, u[2] = e(t, n, a))return !0
                }
            }
        }

        function m(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;)if (!e[i](t, n, r))return !1;
                return !0
            } : e[0]
        }

        function g(e, t, n, r, i) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; l > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
            return a
        }

        function v(e, t, n, i, o, a) {
            return i && !i[R] && (i = v(i)), o && !o[R] && (o = v(o, a)), r(function (r, a, s, l) {
                var u, c, d, f = [], p = [], h = a.length, m = r || x(t || "*", s.nodeType ? [s] : s, []), v = !e || !r && t ? m : g(m, f, e, s, l), y = n ? o || (r ? e : h || i) ? [] : a : v;
                if (n && n(v, y, s, l), i)for (u = g(y, p), i(u, [], s, l), c = u.length; c--;)(d = u[c]) && (y[p[c]] = !(v[p[c]] = d));
                if (r) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = y.length; c--;)(d = y[c]) && u.push(v[c] = d);
                            o(null, y = [], u, l)
                        }
                        for (c = y.length; c--;)(d = y[c]) && (u = o ? tt.call(r, d) : f[c]) > -1 && (r[u] = !(a[u] = d))
                    }
                } else y = g(y === a ? y.splice(h, y.length) : y), o ? o(null, a, y, l) : Z.apply(a, y)
            })
        }

        function y(e) {
            for (var t, n, r, i = e.length, o = E.relative[e[0].type], a = o || E.relative[" "], s = o ? 1 : 0, l = h(function (e) {
                return e === t
            }, a, !0), u = h(function (e) {
                return tt.call(t, e) > -1
            }, a, !0), c = [function (e, n, r) {
                return !o && (r || n !== S) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r))
            }]; i > s; s++)if (n = E.relative[e[s].type])c = [h(m(c), n)]; else {
                if (n = E.filter[e[s].type].apply(null, e[s].matches), n[R]) {
                    for (r = ++s; i > r && !E.relative[e[r].type]; r++);
                    return v(s > 1 && m(c), s > 1 && p(e.slice(0, s - 1).concat({value: " " === e[s - 2].type ? "*" : ""})).replace(lt, "$1"), n, r > s && y(e.slice(s, r)), i > r && y(e = e.slice(r)), i > r && p(e))
                }
                c.push(n)
            }
            return m(c)
        }

        function b(e, n) {
            var i = n.length > 0, o = e.length > 0, a = function (r, a, s, l, u) {
                var c, d, f, p = 0, h = "0", m = r && [], v = [], y = S, b = r || o && E.find.TAG("*", u), x = P += null == y ? 1 : Math.random() || .1, w = b.length;
                for (u && (S = a !== $ && a); h !== w && null != (c = b[h]); h++) {
                    if (o && c) {
                        for (d = 0; f = e[d++];)if (f(c, a, s)) {
                            l.push(c);
                            break
                        }
                        u && (P = x)
                    }
                    i && ((c = !f && c) && p--, r && m.push(c))
                }
                if (p += h, i && h !== p) {
                    for (d = 0; f = n[d++];)f(m, v, a, s);
                    if (r) {
                        if (p > 0)for (; h--;)m[h] || v[h] || (v[h] = Q.call(l));
                        v = g(v)
                    }
                    Z.apply(l, v), u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                }
                return u && (P = x, S = y), m
            };
            return i ? r(a) : a
        }

        function x(e, n, r) {
            for (var i = 0, o = n.length; o > i; i++)t(e, n[i], r);
            return r
        }

        function w(e, t, n, r) {
            var i, o, a, s, l, u = f(e);
            if (!r && 1 === u.length) {
                if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && C.getById && 9 === t.nodeType && H && E.relative[o[1].type]) {
                    if (t = (E.find.ID(a.matches[0].replace(wt, Tt), t) || [])[0], !t)return n;
                    e = e.slice(o.shift().value.length)
                }
                for (i = ht.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !E.relative[s = a.type]);)if ((l = E.find[s]) && (r = l(a.matches[0].replace(wt, Tt), bt.test(o[0].type) && c(t.parentNode) || t))) {
                    if (o.splice(i, 1), e = r.length && p(o), !e)return Z.apply(n, r), n;
                    break
                }
            }
            return j(e, u)(r, t, !H, n, bt.test(e) && c(t.parentNode) || t), n
        }

        var T, C, E, N, k, j, S, A, D, L, $, _, H, q, O, M, F, R = "sizzle" + -new Date, B = e.document, P = 0, W = 0, I = n(), z = n(), U = n(), X = function (e, t) {
            return e === t && (D = !0), 0
        }, G = "undefined", V = 1 << 31, Y = {}.hasOwnProperty, J = [], Q = J.pop, K = J.push, Z = J.push, et = J.slice, tt = J.indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (this[t] === e)return t;
                return -1
            }, nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", rt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ot = it.replace("w", "w#"), at = "\\[" + rt + "*(" + it + ")" + rt + "*(?:([*^$|!~]?=)" + rt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ot + ")|)|)" + rt + "*\\]", st = ":(" + it + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)", lt = RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"), ut = RegExp("^" + rt + "*," + rt + "*"), ct = RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"), dt = RegExp("=" + rt + "*([^\\]'\"]*?)" + rt + "*\\]", "g"), ft = RegExp(st), pt = RegExp("^" + ot + "$"), ht = {
            ID: RegExp("^#(" + it + ")"),
            CLASS: RegExp("^\\.(" + it + ")"),
            TAG: RegExp("^(" + it.replace("w", "w*") + ")"),
            ATTR: RegExp("^" + at),
            PSEUDO: RegExp("^" + st),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
            bool: RegExp("^(?:" + nt + ")$", "i"),
            needsContext: RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
        }, mt = /^(?:input|select|textarea|button)$/i, gt = /^h\d$/i, vt = /^[^{]+\{\s*\[native \w/, yt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, bt = /[+~]/, xt = /'|\\/g, wt = RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"), Tt = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
        };
        try {
            Z.apply(J = et.call(B.childNodes), B.childNodes), J[B.childNodes.length].nodeType
        } catch (Ct) {
            Z = {
                apply: J.length ? function (e, t) {
                    K.apply(e, et.call(t))
                } : function (e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, k = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, L = t.setDocument = function (e) {
            var t, n = e ? e.ownerDocument || e : B, r = n.defaultView;
            return n !== $ && 9 === n.nodeType && n.documentElement ? ($ = n, _ = n.documentElement, H = !k(n), r && r !== r.top && (r.addEventListener ? r.addEventListener("unload", function () {
                L()
            }, !1) : r.attachEvent && r.attachEvent("onunload", function () {
                L()
            })), C.attributes = i(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = i(function (e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = vt.test(n.getElementsByClassName) && i(function (e) {
                    return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
                }), C.getById = i(function (e) {
                return _.appendChild(e).id = R, !n.getElementsByName || !n.getElementsByName(R).length
            }), C.getById ? (E.find.ID = function (e, t) {
                if (typeof t.getElementById !== G && H) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, E.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete E.find.ID, E.filter.ID = function (e) {
                var t = e.replace(wt, Tt);
                return function (e) {
                    var n = typeof e.getAttributeNode !== G && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), E.find.TAG = C.getElementsByTagName ? function (e, t) {
                return typeof t.getElementsByTagName !== G ? t.getElementsByTagName(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];)1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, E.find.CLASS = C.getElementsByClassName && function (e, t) {
                    return typeof t.getElementsByClassName !== G && H ? t.getElementsByClassName(e) : void 0
                }, O = [], q = [], (C.qsa = vt.test(n.querySelectorAll)) && (i(function (e) {
                e.innerHTML = "<select t=''><option selected=''></option></select>", e.querySelectorAll("[t^='']").length && q.push("[*^$]=" + rt + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || q.push("\\[" + rt + "*(?:value|" + nt + ")"), e.querySelectorAll(":checked").length || q.push(":checked")
            }), i(function (e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && q.push("name" + rt + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), q.push(",.*:")
            })), (C.matchesSelector = vt.test(M = _.webkitMatchesSelector || _.mozMatchesSelector || _.oMatchesSelector || _.msMatchesSelector)) && i(function (e) {
                C.disconnectedMatch = M.call(e, "div"), M.call(e, "[s!='']:x"), O.push("!=", st)
            }), q = q.length && RegExp(q.join("|")), O = O.length && RegExp(O.join("|")), t = vt.test(_.compareDocumentPosition), F = t || vt.test(_.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, X = t ? function (e, t) {
                if (e === t)return D = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !C.sortDetached && t.compareDocumentPosition(e) === r ? e === n || e.ownerDocument === B && F(B, e) ? -1 : t === n || t.ownerDocument === B && F(B, t) ? 1 : A ? tt.call(A, e) - tt.call(A, t) : 0 : 4 & r ? -1 : 1)
            } : function (e, t) {
                if (e === t)return D = !0, 0;
                var r, i = 0, o = e.parentNode, s = t.parentNode, l = [e], u = [t];
                if (!o || !s)return e === n ? -1 : t === n ? 1 : o ? -1 : s ? 1 : A ? tt.call(A, e) - tt.call(A, t) : 0;
                if (o === s)return a(e, t);
                for (r = e; r = r.parentNode;)l.unshift(r);
                for (r = t; r = r.parentNode;)u.unshift(r);
                for (; l[i] === u[i];)i++;
                return i ? a(l[i], u[i]) : l[i] === B ? -1 : u[i] === B ? 1 : 0
            }, n) : $
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== $ && L(e), n = n.replace(dt, "='$1']"), !(!C.matchesSelector || !H || O && O.test(n) || q && q.test(n)))try {
                var r = M.call(e, n);
                if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
            } catch (i) {
            }
            return t(n, $, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== $ && L(e), F(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== $ && L(e);
            var n = E.attrHandle[t.toLowerCase()], r = n && Y.call(E.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
            return void 0 !== r ? r : C.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, t.error = function (e) {
            throw Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], r = 0, i = 0;
            if (D = !C.detectDuplicates, A = !C.sortStable && e.slice(0), e.sort(X), D) {
                for (; t = e[i++];)t === e[i] && (r = n.push(i));
                for (; r--;)e.splice(n[r], 1)
            }
            return A = null, e
        }, N = t.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += N(e)
                } else if (3 === i || 4 === i)return e.nodeValue
            } else for (; t = e[r++];)n += N(t);
            return n
        }, E = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: ht,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(wt, Tt), e[3] = (e[4] || e[5] || "").replace(wt, Tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[5] && e[2];
                    return ht.CHILD.test(e[0]) ? null : (e[3] && void 0 !== e[4] ? e[2] = e[4] : n && ft.test(n) && (t = f(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(wt, Tt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = I[e + " "];
                    return t || (t = RegExp("(^|" + rt + ")" + e + "(" + rt + "|$)")) && I(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== G && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, r) {
                    return function (i) {
                        var o = t.attr(i, e);
                        return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o + " ").indexOf(r) > -1 : "|=" === n ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, c, d, f, p, h, m = o !== a ? "nextSibling" : "previousSibling", g = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (d = t; d = d[m];)if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)return !1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? g.firstChild : g.lastChild], a && y) {
                                for (c = g[R] || (g[R] = {}), u = c[e] || [], p = u[0] === P && u[1], f = u[0] === P && u[2], d = p && g.childNodes[p]; d = ++p && d && d[m] || (f = p = 0) || h.pop();)if (1 === d.nodeType && ++f && d === t) {
                                    c[e] = [P, p, f];
                                    break
                                }
                            } else if (y && (u = (t[R] || (t[R] = {}))[e]) && u[0] === P)f = u[1]; else for (; (d = ++p && d && d[m] || (f = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++f || (y && ((d[R] || (d[R] = {}))[e] = [P, f]), d !== t)););
                            return f -= i, f === r || 0 === f % r && f / r >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var i, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return o[R] ? o(n) : o.length > 1 ? (i = [e, e, "", n], E.setFilters.hasOwnProperty(e.toLowerCase()) ? r(function (e, t) {
                        for (var r, i = o(e, n), a = i.length; a--;)r = tt.call(e, i[a]), e[r] = !(t[r] = i[a])
                    }) : function (e) {
                        return o(e, 0, i)
                    }) : o
                }
            },
            pseudos: {
                not: r(function (e) {
                    var t = [], n = [], i = j(e.replace(lt, "$1"));
                    return i[R] ? r(function (e, t, n, r) {
                        for (var o, a = i(e, null, r, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function (e, r, o) {
                        return t[0] = e, i(t, null, o, n), !n.pop()
                    }
                }), has: r(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: r(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || N(t)).indexOf(e) > -1
                    }
                }), lang: r(function (e) {
                    return pt.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(wt, Tt).toLowerCase(), function (t) {
                        var n;
                        do if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === _
                }, focus: function (e) {
                    return e === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (6 > e.nodeType)return !1;
                    return !0
                }, parent: function (e) {
                    return !E.pseudos.empty(e)
                }, header: function (e) {
                    return gt.test(e.nodeName)
                }, input: function (e) {
                    return mt.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; t > ++r;)e.push(r);
                    return e
                })
            }
        }, E.pseudos.nth = E.pseudos.eq;
        for (T in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})E.pseudos[T] = s(T);
        for (T in{submit: !0, reset: !0})E.pseudos[T] = l(T);
        return d.prototype = E.filters = E.pseudos, E.setFilters = new d, j = t.compile = function (e, t) {
            var n, r = [], i = [], o = U[e + " "];
            if (!o) {
                for (t || (t = f(e)), n = t.length; n--;)o = y(t[n]), o[R] ? r.push(o) : i.push(o);
                o = U(e, b(i, r))
            }
            return o
        }, C.sortStable = R.split("").sort(X).join("") === R, C.detectDuplicates = !!D, L(), C.sortDetached = i(function (e) {
            return 1 & e.compareDocumentPosition($.createElement("div"))
        }), i(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || o("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && i(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || o("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), i(function (e) {
            return null == e.getAttribute("disabled")
        }) || o(nt, function (e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), t
    }(e);
    ot.find = ct, ot.expr = ct.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = ct.uniqueSort, ot.text = ct.getText, ot.isXMLDoc = ct.isXML, ot.contains = ct.contains;
    var dt = ot.expr.match.needsContext, ft = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, pt = /^.[^:#\[\.,]*$/;
    ot.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ot.find.matchesSelector(r, e) ? [r] : [] : ot.find.matches(e, ot.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, ot.fn.extend({
        find: function (e) {
            var t, n = [], r = this, i = r.length;
            if ("string" != typeof e)return this.pushStack(ot(e).filter(function () {
                for (t = 0; i > t; t++)if (ot.contains(r[t], this))return !0
            }));
            for (t = 0; i > t; t++)ot.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ot.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        }, filter: function (e) {
            return this.pushStack(r(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(r(this, e || [], !0))
        }, is: function (e) {
            return !!r(this, "string" == typeof e && dt.test(e) ? ot(e) : e || [], !1).length
        }
    });
    var ht, mt = e.document, gt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, vt = ot.fn.init = function (e, t) {
        var n, r;
        if (!e)return this;
        if ("string" == typeof e) {
            if (n = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : gt.exec(e), !n || !n[1] && t)return !t || t.jquery ? (t || ht).find(e) : this.constructor(t).find(e);
            if (n[1]) {
                if (t = t instanceof ot ? t[0] : t, ot.merge(this, ot.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : mt, !0)), ft.test(n[1]) && ot.isPlainObject(t))for (n in t)ot.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                return this
            }
            if (r = mt.getElementById(n[2]), r && r.parentNode) {
                if (r.id !== n[2])return ht.find(e);
                this.length = 1, this[0] = r
            }
            return this.context = mt, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ot.isFunction(e) ? ht.ready !== void 0 ? ht.ready(e) : e(ot) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), ot.makeArray(e, this))
    };
    vt.prototype = ot.fn, ht = ot(mt);
    var yt = /^(?:parents|prev(?:Until|All))/, bt = {children: !0, contents: !0, next: !0, prev: !0};
    ot.extend({
        dir: function (e, t, n) {
            for (var r = [], i = e[t]; i && 9 !== i.nodeType && (void 0 === n || 1 !== i.nodeType || !ot(i).is(n));)1 === i.nodeType && r.push(i), i = i[t];
            return r
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), ot.fn.extend({
        has: function (e) {
            var t, n = ot(e, this), r = n.length;
            return this.filter(function () {
                for (t = 0; r > t; t++)if (ot.contains(this, n[t]))return !0
            })
        }, closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = dt.test(e) || "string" != typeof e ? ot(e, t || this.context) : 0; i > r; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, e))) {
                o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? ot.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? ot.inArray(this[0], ot(e)) : ot.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(ot.unique(ot.merge(this.get(), ot(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ot.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return ot.dir(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return ot.dir(e, "parentNode", n)
        }, next: function (e) {
            return i(e, "nextSibling")
        }, prev: function (e) {
            return i(e, "previousSibling")
        }, nextAll: function (e) {
            return ot.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return ot.dir(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return ot.dir(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return ot.dir(e, "previousSibling", n)
        }, siblings: function (e) {
            return ot.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return ot.sibling(e.firstChild)
        }, contents: function (e) {
            return ot.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ot.merge([], e.childNodes)
        }
    }, function (e, t) {
        ot.fn[e] = function (n, r) {
            var i = ot.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ot.filter(r, i)), this.length > 1 && (bt[e] || (i = ot.unique(i)), yt.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    });
    var xt = /\S+/g, wt = {};
    ot.Callbacks = function (e) {
        e = "string" == typeof e ? wt[e] || o(e) : ot.extend({}, e);
        var t, n, r, i, a, s, l = [], u = !e.once && [], c = function (o) {
            for (n = e.memory && o, r = !0, a = s || 0, s = 0, i = l.length, t = !0; l && i > a; a++)if (l[a].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            t = !1, l && (u ? u.length && c(u.shift()) : n ? l = [] : d.disable())
        }, d = {
            add: function () {
                if (l) {
                    var r = l.length;
                    !function o(t) {
                        ot.each(t, function (t, n) {
                            var r = ot.type(n);
                            "function" === r ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== r && o(n)
                        })
                    }(arguments), t ? i = l.length : n && (s = r, c(n))
                }
                return this
            }, remove: function () {
                return l && ot.each(arguments, function (e, n) {
                    for (var r; (r = ot.inArray(n, l, r)) > -1;)l.splice(r, 1), t && (i >= r && i--, a >= r && a--)
                }), this
            }, has: function (e) {
                return e ? ot.inArray(e, l) > -1 : !(!l || !l.length)
            }, empty: function () {
                return l = [], i = 0, this
            }, disable: function () {
                return l = u = n = void 0, this
            }, disabled: function () {
                return !l
            }, lock: function () {
                return u = void 0, n || d.disable(), this
            }, locked: function () {
                return !u
            }, fireWith: function (e, n) {
                return !l || r && !u || (n = n || [], n = [e, n.slice ? n.slice() : n], t ? u.push(n) : c(n)), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!r
            }
        };
        return d
    }, ot.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", ot.Callbacks("once memory"), "resolved"], ["reject", "fail", ot.Callbacks("once memory"), "rejected"], ["notify", "progress", ot.Callbacks("memory")]], n = "pending", r = {
                state: function () {
                    return n
                }, always: function () {
                    return i.done(arguments).fail(arguments), this
                }, then: function () {
                    var e = arguments;
                    return ot.Deferred(function (n) {
                        ot.each(t, function (t, o) {
                            var a = ot.isFunction(e[t]) && e[t];
                            i[o[1]](function () {
                                var e = a && a.apply(this, arguments);
                                e && ot.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                            })
                        }), e = null
                    }).promise()
                }, promise: function (e) {
                    return null != e ? ot.extend(e, r) : r
                }
            }, i = {};
            return r.pipe = r.then, ot.each(t, function (e, o) {
                var a = o[2], s = o[3];
                r[o[1]] = a.add, s && a.add(function () {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        }, when: function (e) {
            var t, n, r, i = 0, o = Y.call(arguments), a = o.length, s = 1 !== a || e && ot.isFunction(e.promise) ? a : 0, l = 1 === s ? e : ot.Deferred(), u = function (e, n, r) {
                return function (i) {
                    n[e] = this, r[e] = arguments.length > 1 ? Y.call(arguments) : i, r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                }
            };
            if (a > 1)for (t = Array(a), n = Array(a), r = Array(a); a > i; i++)o[i] && ot.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --s;
            return s || l.resolveWith(r, o), l.promise()
        }
    });
    var Tt;
    ot.fn.ready = function (e) {
        return ot.ready.promise().done(e), this
    }, ot.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? ot.readyWait++ : ot.ready(!0)
        }, ready: function (e) {
            if (e === !0 ? !--ot.readyWait : !ot.isReady) {
                if (!mt.body)return setTimeout(ot.ready);
                ot.isReady = !0, e !== !0 && --ot.readyWait > 0 || (Tt.resolveWith(mt, [ot]), ot.fn.trigger && ot(mt).trigger("ready").off("ready"))
            }
        }
    }), ot.ready.promise = function (t) {
        if (!Tt)if (Tt = ot.Deferred(), "complete" === mt.readyState)setTimeout(ot.ready); else if (mt.addEventListener)mt.addEventListener("DOMContentLoaded", s, !1), e.addEventListener("load", s, !1); else {
            mt.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
            var n = !1;
            try {
                n = null == e.frameElement && mt.documentElement
            } catch (r) {
            }
            n && n.doScroll && !function i() {
                if (!ot.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    a(), ot.ready()
                }
            }()
        }
        return Tt.promise(t)
    };
    var Ct, Et = "undefined";
    for (Ct in ot(rt))break;
    rt.ownLast = "0" !== Ct, rt.inlineBlockNeedsLayout = !1, ot(function () {
        var e, t, n = mt.getElementsByTagName("body")[0];
        n && (e = mt.createElement("div"), e.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", t = mt.createElement("div"), n.appendChild(e).appendChild(t), typeof t.style.zoom !== Et && (t.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1", (rt.inlineBlockNeedsLayout = 3 === t.offsetWidth) && (n.style.zoom = 1)), n.removeChild(e), e = t = null)
    }), function () {
        var e = mt.createElement("div");
        if (null == rt.deleteExpando) {
            rt.deleteExpando = !0;
            try {
                delete e.test
            } catch (t) {
                rt.deleteExpando = !1
            }
        }
        e = null
    }(), ot.acceptData = function (e) {
        var t = ot.noData[(e.nodeName + " ").toLowerCase()], n = +e.nodeType || 1;
        return 1 !== n && 9 !== n ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
    };
    var Nt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, kt = /([A-Z])/g;
    ot.extend({
        cache: {},
        noData: {"applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
        hasData: function (e) {
            return e = e.nodeType ? ot.cache[e[ot.expando]] : e[ot.expando], !!e && !u(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return d(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return d(e, t, !0)
        }
    }), ot.fn.extend({
        data: function (e, t) {
            var n, r, i, o = this[0], a = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (i = ot.data(o), 1 === o.nodeType && !ot._data(o, "parsedAttrs"))) {
                    for (n = a.length; n--;)r = a[n].name, 0 === r.indexOf("data-") && (r = ot.camelCase(r.slice(5)), l(o, r, i[r]));
                    ot._data(o, "parsedAttrs", !0)
                }
                return i
            }
            return "object" == typeof e ? this.each(function () {
                ot.data(this, e)
            }) : arguments.length > 1 ? this.each(function () {
                ot.data(this, e, t)
            }) : o ? l(o, e, ot.data(o, e)) : void 0
        }, removeData: function (e) {
            return this.each(function () {
                ot.removeData(this, e)
            })
        }
    }), ot.extend({
        queue: function (e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = ot._data(e, t), n && (!r || ot.isArray(n) ? r = ot._data(e, t, ot.makeArray(n)) : r.push(n)), r || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = ot.queue(e, t), r = n.length, i = n.shift(), o = ot._queueHooks(e, t), a = function () {
                ot.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return ot._data(e, n) || ot._data(e, n, {
                    empty: ot.Callbacks("once memory").add(function () {
                        ot._removeData(e, t + "queue"), ot._removeData(e, n)
                    })
                })
        }
    }), ot.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), n > arguments.length ? ot.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = ot.queue(this, e, t);
                ot._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && ot.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                ot.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, r = 1, i = ot.Deferred(), o = this, a = this.length, s = function () {
                --r || i.resolveWith(o, [o])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)n = ot._data(o[a], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var jt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, St = ["Top", "Right", "Bottom", "Left"], At = function (e, t) {
        return e = t || e, "none" === ot.css(e, "display") || !ot.contains(e.ownerDocument, e)
    }, Dt = ot.access = function (e, t, n, r, i, o, a) {
        var s = 0, l = e.length, u = null == n;
        if ("object" === ot.type(n)) {
            i = !0;
            for (s in n)ot.access(e, t, s, n[s], !0, o, a)
        } else if (void 0 !== r && (i = !0, ot.isFunction(r) || (a = !0), u && (a ? (t.call(e, r), t = null) : (u = t, t = function (e, t, n) {
                return u.call(ot(e), n)
            })), t))for (; l > s; s++)t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
    }, Lt = /^(?:checkbox|radio)$/i;
    !function () {
        var e = mt.createDocumentFragment(), t = mt.createElement("div"), n = mt.createElement("input");
        if (t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a>", rt.leadingWhitespace = 3 === t.firstChild.nodeType, rt.tbody = !t.getElementsByTagName("tbody").length, rt.htmlSerialize = !!t.getElementsByTagName("link").length, rt.html5Clone = "<:nav></:nav>" !== mt.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, e.appendChild(n), rt.appendChecked = n.checked, t.innerHTML = "<textarea>x</textarea>", rt.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, e.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", rt.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, rt.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                rt.noCloneEvent = !1
            }), t.cloneNode(!0).click()), null == rt.deleteExpando) {
            rt.deleteExpando = !0;
            try {
                delete t.test
            } catch (r) {
                rt.deleteExpando = !1
            }
        }
        e = t = n = null
    }(), function () {
        var t, n, r = mt.createElement("div");
        for (t in{
            submit: !0,
            change: !0,
            focusin: !0
        })n = "on" + t, (rt[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), rt[t + "Bubbles"] = r.attributes[n].expando === !1);
        r = null
    }();
    var $t = /^(?:input|select|textarea)$/i, _t = /^key/, Ht = /^(?:mouse|contextmenu)|click/, qt = /^(?:focusinfocus|focusoutblur)$/, Ot = /^([^.]*)(?:\.(.+)|)$/;
    ot.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var o, a, s, l, u, c, d, f, p, h, m, g = ot._data(e);
            if (g) {
                for (n.handler && (l = n, n = l.handler, i = l.selector), n.guid || (n.guid = ot.guid++), (a = g.events) || (a = g.events = {}), (c = g.handle) || (c = g.handle = function (e) {
                    return typeof ot === Et || e && ot.event.triggered === e.type ? void 0 : ot.event.dispatch.apply(c.elem, arguments)
                }, c.elem = e), t = (t || "").match(xt) || [""], s = t.length; s--;)o = Ot.exec(t[s]) || [], p = m = o[1], h = (o[2] || "").split(".").sort(), p && (u = ot.event.special[p] || {}, p = (i ? u.delegateType : u.bindType) || p, u = ot.event.special[p] || {}, d = ot.extend({
                    type: p,
                    origType: m,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && ot.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, l), (f = a[p]) || (f = a[p] = [], f.delegateCount = 0, u.setup && u.setup.call(e, r, h, c) !== !1 || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, d) : f.push(d), ot.event.global[p] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, l, u, c, d, f, p, h, m, g = ot.hasData(e) && ot._data(e);
            if (g && (c = g.events)) {
                for (t = (t || "").match(xt) || [""], u = t.length; u--;)if (s = Ot.exec(t[u]) || [], p = m = s[1], h = (s[2] || "").split(".").sort(), p) {
                    for (d = ot.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, f = c[p] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = o = f.length; o--;)a = f[o], !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, d.remove && d.remove.call(e, a));
                    l && !f.length && (d.teardown && d.teardown.call(e, h, g.handle) !== !1 || ot.removeEvent(e, p, g.handle), delete c[p])
                } else for (p in c)ot.event.remove(e, p + t[u], n, r, !0);
                ot.isEmptyObject(c) && (delete g.handle, ot._removeData(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var o, a, s, l, u, c, d, f = [r || mt], p = tt.call(t, "type") ? t.type : t, h = tt.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || mt, 3 !== r.nodeType && 8 !== r.nodeType && !qt.test(p + ot.event.triggered) && (p.indexOf(".") >= 0 && (h = p.split("."), p = h.shift(), h.sort()), a = 0 > p.indexOf(":") && "on" + p, t = t[ot.expando] ? t : new ot.Event(p, "object" == typeof t && t), t.isTrigger = i ? 2 : 3, t.namespace = h.join("."), t.namespace_re = t.namespace ? RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), n = null == n ? [t] : ot.makeArray(n, [t]), u = ot.event.special[p] || {}, i || !u.trigger || u.trigger.apply(r, n) !== !1)) {
                if (!i && !u.noBubble && !ot.isWindow(r)) {
                    for (l = u.delegateType || p, qt.test(l + p) || (s = s.parentNode); s; s = s.parentNode)f.push(s), c = s;
                    c === (r.ownerDocument || mt) && f.push(c.defaultView || c.parentWindow || e)
                }
                for (d = 0; (s = f[d++]) && !t.isPropagationStopped();)t.type = d > 1 ? l : u.bindType || p, o = (ot._data(s, "events") || {})[t.type] && ot._data(s, "handle"), o && o.apply(s, n), o = a && s[a], o && o.apply && ot.acceptData(s) && (t.result = o.apply(s, n), t.result === !1 && t.preventDefault());
                if (t.type = p, !i && !t.isDefaultPrevented() && (!u._default || u._default.apply(f.pop(), n) === !1) && ot.acceptData(r) && a && r[p] && !ot.isWindow(r)) {
                    c = r[a], c && (r[a] = null), ot.event.triggered = p;
                    try {
                        r[p]()
                    } catch (m) {
                    }
                    ot.event.triggered = void 0, c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = ot.event.fix(e);
            var t, n, r, i, o, a = [], s = Y.call(arguments), l = (ot._data(this, "events") || {})[e.type] || [], u = ot.event.special[e.type] || {};
            if (s[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (a = ot.event.handlers.call(this, e, l), t = 0; (i = a[t++]) && !e.isPropagationStopped();)for (e.currentTarget = i.elem, o = 0; (r = i.handlers[o++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(r.namespace)) && (e.handleObj = r, e.data = r.data, n = ((ot.event.special[r.origType] || {}).handle || r.handler).apply(i.elem, s), void 0 !== n && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))for (; l != this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (i = [], o = 0; s > o; o++)r = t[o], n = r.selector + " ", void 0 === i[n] && (i[n] = r.needsContext ? ot(n, this).index(l) >= 0 : ot.find(n, this, null, [l]).length), i[n] && i.push(r);
                i.length && a.push({elem: l, handlers: i})
            }
            return t.length > s && a.push({elem: this, handlers: t.slice(s)}), a
        },
        fix: function (e) {
            if (e[ot.expando])return e;
            var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Ht.test(i) ? this.mouseHooks : _t.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ot.Event(o), t = r.length; t--;)n = r[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || mt), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (r = e.target.ownerDocument || mt, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== h() && this.focus)try {
                        return this.focus(), !1
                    } catch (e) {
                    }
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === h() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return ot.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return ot.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = ot.extend(new ot.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
            r ? ot.event.trigger(i, null, t) : ot.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ot.removeEvent = mt.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Et && (e[r] = null), e.detachEvent(r, n))
    }, ot.Event = function (e, t) {
        return this instanceof ot.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && (e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault()) ? f : p) : this.type = e, t && ot.extend(this, t), this.timeStamp = e && e.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(e, t)
    }, ot.Event.prototype = {
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = f, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = f, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = f, this.stopPropagation()
        }
    }, ot.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        ot.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, r = this, i = e.relatedTarget, o = e.handleObj;
                return (!i || i !== r && !ot.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), rt.submitBubbles || (ot.event.special.submit = {
        setup: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.add(this, "click._submit keypress._submit", function (e) {
                var t = e.target, n = ot.nodeName(t, "input") || ot.nodeName(t, "button") ? t.form : void 0;
                n && !ot._data(n, "submitBubbles") && (ot.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), ot._data(n, "submitBubbles", !0))
            })
        }, postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ot.event.simulate("submit", this.parentNode, e, !0))
        }, teardown: function () {
            return ot.nodeName(this, "form") ? !1 : void ot.event.remove(this, "._submit")
        }
    }), rt.changeBubbles || (ot.event.special.change = {
        setup: function () {
            return $t.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ot.event.add(this, "propertychange._change", function (e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ot.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ot.event.simulate("change", this, e, !0)
            })), !1) : void ot.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                $t.test(t.nodeName) && !ot._data(t, "changeBubbles") && (ot.event.add(t, "change._change", function (e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ot.event.simulate("change", this.parentNode, e, !0)
                }), ot._data(t, "changeBubbles", !0))
            })
        }, handle: function (e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return ot.event.remove(this, "._change"), !$t.test(this.nodeName)
        }
    }), rt.focusinBubbles || ot.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            ot.event.simulate(t, e.target, ot.event.fix(e), !0)
        };
        ot.event.special[t] = {
            setup: function () {
                var r = this.ownerDocument || this, i = ot._data(r, t);
                i || r.addEventListener(e, n, !0), ot._data(r, t, (i || 0) + 1)
            }, teardown: function () {
                var r = this.ownerDocument || this, i = ot._data(r, t) - 1;
                i ? ot._data(r, t, i) : (r.removeEventListener(e, n, !0), ot._removeData(r, t))
            }
        }
    }), ot.fn.extend({
        on: function (e, t, n, r, i) {
            var o, a;
            if ("object" == typeof e) {
                "string" != typeof t && (n = n || t, t = void 0);
                for (o in e)this.on(o, t, n, e[o], i);
                return this
            }
            if (null == n && null == r ? (r = t, n = t = void 0) : null == r && ("string" == typeof t ? (r = n, n = void 0) : (r = n, n = t, t = void 0)), r === !1)r = p; else if (!r)return this;
            return 1 === i && (a = r, r = function (e) {
                return ot().off(e), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = ot.guid++)), this.each(function () {
                ot.event.add(this, e, r, n, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj)return r = e.handleObj, ot(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e)this.off(i, t, e[i]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = p), this.each(function () {
                ot.event.remove(this, e, n, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                ot.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            return n ? ot.event.trigger(e, t, n, !0) : void 0
        }
    });
    var Mt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ft = / jQuery\d+="(?:null|\d+)"/g, Rt = RegExp("<(?:" + Mt + ")[\\s/>]", "i"), Bt = /^\s+/, Pt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Wt = /<([\w:]+)/, It = /<tbody/i, zt = /<|&#?\w+;/, Ut = /<(?:script|style|link)/i, Xt = /checked\s*(?:[^=]|=\s*.checked.)/i, Gt = /^$|\/(?:java|ecma)script/i, Vt = /^true\/(.*)/, Yt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Jt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: rt.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }, Qt = m(mt), Kt = Qt.appendChild(mt.createElement("div"));
    Jt.optgroup = Jt.option, Jt.tbody = Jt.tfoot = Jt.colgroup = Jt.caption = Jt.thead, Jt.th = Jt.td, ot.extend({
        clone: function (e, t, n) {
            var r, i, o, a, s, l = ot.contains(e.ownerDocument, e);
            if (rt.html5Clone || ot.isXMLDoc(e) || !Rt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Kt.innerHTML = e.outerHTML, Kt.removeChild(o = Kt.firstChild)), !(rt.noCloneEvent && rt.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ot.isXMLDoc(e)))for (r = g(o), s = g(e), a = 0; null != (i = s[a]); ++a)r[a] && C(i, r[a]);
            if (t)if (n)for (s = s || g(e), r = r || g(o), a = 0; null != (i = s[a]); a++)T(i, r[a]); else T(e, o);
            return r = g(o, "script"), r.length > 0 && w(r, !l && g(e, "script")), r = s = i = null, o
        }, buildFragment: function (e, t, n, r) {
            for (var i, o, a, s, l, u, c, d = e.length, f = m(t), p = [], h = 0; d > h; h++)if (o = e[h], o || 0 === o)if ("object" === ot.type(o))ot.merge(p, o.nodeType ? [o] : o); else if (zt.test(o)) {
                for (s = s || f.appendChild(t.createElement("div")), l = (Wt.exec(o) || ["", ""])[1].toLowerCase(), c = Jt[l] || Jt._default, s.innerHTML = c[1] + o.replace(Pt, "<$1></$2>") + c[2], i = c[0]; i--;)s = s.lastChild;
                if (!rt.leadingWhitespace && Bt.test(o) && p.push(t.createTextNode(Bt.exec(o)[0])), !rt.tbody)for (o = "table" !== l || It.test(o) ? "<table>" !== c[1] || It.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;)ot.nodeName(u = o.childNodes[i], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (ot.merge(p, s.childNodes), s.textContent = ""; s.firstChild;)s.removeChild(s.firstChild);
                s = f.lastChild
            } else p.push(t.createTextNode(o));
            for (s && f.removeChild(s), rt.appendChecked || ot.grep(g(p, "input"), v), h = 0; o = p[h++];)if ((!r || -1 === ot.inArray(o, r)) && (a = ot.contains(o.ownerDocument, o), s = g(f.appendChild(o), "script"), a && w(s), n))for (i = 0; o = s[i++];)Gt.test(o.type || "") && n.push(o);
            return s = null, f
        }, cleanData: function (e, t) {
            for (var n, r, i, o, a = 0, s = ot.expando, l = ot.cache, u = rt.deleteExpando, c = ot.event.special; null != (n = e[a]); a++)if ((t || ot.acceptData(n)) && (i = n[s], o = i && l[i])) {
                if (o.events)for (r in o.events)c[r] ? ot.event.remove(n, r) : ot.removeEvent(n, r, o.handle);
                l[i] && (delete l[i], u ? delete n[s] : typeof n.removeAttribute !== Et ? n.removeAttribute(s) : n[s] = null, V.push(i))
            }
        }
    }), ot.fn.extend({
        text: function (e) {
            return Dt(this, function (e) {
                return void 0 === e ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || mt).createTextNode(e))
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = y(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var n, r = e ? ot.filter(e, this) : this, i = 0; null != (n = r[i]); i++)t || 1 !== n.nodeType || ot.cleanData(g(n)), n.parentNode && (t && ot.contains(n.ownerDocument, n) && w(g(n, "script")), n.parentNode.removeChild(n));
            return this
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ot.cleanData(g(e, !1)); e.firstChild;)e.removeChild(e.firstChild);
                e.options && ot.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return ot.clone(this, e, t)
            })
        }, html: function (e) {
            return Dt(this, function (e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (void 0 === e)return 1 === t.nodeType ? t.innerHTML.replace(Ft, "") : void 0;
                if (!("string" != typeof e || Ut.test(e) || !rt.htmlSerialize && Rt.test(e) || !rt.leadingWhitespace && Bt.test(e) || Jt[(Wt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Pt, "<$1></$2>");
                    try {
                        for (; r > n; n++)t = this[n] || {}, 1 === t.nodeType && (ot.cleanData(g(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, ot.cleanData(g(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (e, t) {
            e = J.apply([], e);
            var n, r, i, o, a, s, l = 0, u = this.length, c = this, d = u - 1, f = e[0], p = ot.isFunction(f);
            if (p || u > 1 && "string" == typeof f && !rt.checkClone && Xt.test(f))return this.each(function (n) {
                var r = c.eq(n);
                p && (e[0] = f.call(this, n, r.html())), r.domManip(e, t)
            });
            if (u && (s = ot.buildFragment(e, this[0].ownerDocument, !1, this), n = s.firstChild, 1 === s.childNodes.length && (s = n), n)) {
                for (o = ot.map(g(s, "script"), b), i = o.length; u > l; l++)r = s, l !== d && (r = ot.clone(r, !0, !0), i && ot.merge(o, g(r, "script"))), t.call(this[l], r, l);
                if (i)for (a = o[o.length - 1].ownerDocument, ot.map(o, x), l = 0; i > l; l++)r = o[l], Gt.test(r.type || "") && !ot._data(r, "globalEval") && ot.contains(a, r) && (r.src ? ot._evalUrl && ot._evalUrl(r.src) : ot.globalEval((r.text || r.textContent || r.innerHTML || "").replace(Yt, "")));
                s = n = null
            }
            return this
        }
    }), ot.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        ot.fn[e] = function (e) {
            for (var n, r = 0, i = [], o = ot(e), a = o.length - 1; a >= r; r++)n = r === a ? this : this.clone(!0), ot(o[r])[t](n), Q.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Zt, en = {};
    !function () {
        var e, t, n = mt.createElement("div"), r = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], e.style.cssText = "float:left;opacity:.5", rt.opacity = /^0.5/.test(e.style.opacity), rt.cssFloat = !!e.style.cssFloat, n.style.backgroundClip = "content-box", n.cloneNode(!0).style.backgroundClip = "", rt.clearCloneStyle = "content-box" === n.style.backgroundClip, e = n = null, rt.shrinkWrapBlocks = function () {
            var e, n, i, o;
            if (null == t) {
                if (e = mt.getElementsByTagName("body")[0], !e)return;
                o = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", n = mt.createElement("div"), i = mt.createElement("div"), e.appendChild(n).appendChild(i), t = !1, typeof i.style.zoom !== Et && (i.style.cssText = r + ";width:1px;padding:1px;zoom:1", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", t = 3 !== i.offsetWidth), e.removeChild(n), e = n = i = null
            }
            return t
        }
    }();
    var tn, nn, rn = /^margin/, on = RegExp("^(" + jt + ")(?!px)[a-z%]+$", "i"), an = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (tn = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null)
    }, nn = function (e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || tn(e), a = n ? n.getPropertyValue(t) || n[t] : void 0, n && ("" !== a || ot.contains(e.ownerDocument, e) || (a = ot.style(e, t)), on.test(a) && rn.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 === a ? a : a + ""
    }) : mt.documentElement.currentStyle && (tn = function (e) {
        return e.currentStyle
    }, nn = function (e, t, n) {
        var r, i, o, a, s = e.style;
        return n = n || tn(e), a = n ? n[t] : void 0, null == a && s && s[t] && (a = s[t]), on.test(a) && !an.test(t) && (r = s.left, i = e.runtimeStyle, o = i && i.left, o && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto"
    }), !function () {
        function t() {
            var t, n, r = mt.getElementsByTagName("body")[0];
            r && (t = mt.createElement("div"), n = mt.createElement("div"), t.style.cssText = u, r.appendChild(t).appendChild(n), n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;display:block;padding:1px;border:1px;width:4px;margin-top:1%;top:1%", ot.swap(r, null != r.style.zoom ? {zoom: 1} : {}, function () {
                i = 4 === n.offsetWidth
            }), o = !0, a = !1, s = !0, e.getComputedStyle && (a = "1%" !== (e.getComputedStyle(n, null) || {}).top, o = "4px" === (e.getComputedStyle(n, null) || {width: "4px"}).width), r.removeChild(t), n = r = null)
        }

        var n, r, i, o, a, s, l = mt.createElement("div"), u = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px", c = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;padding:0;margin:0;border:0";
        l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = l.getElementsByTagName("a")[0], n.style.cssText = "float:left;opacity:.5", rt.opacity = /^0.5/.test(n.style.opacity), rt.cssFloat = !!n.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", rt.clearCloneStyle = "content-box" === l.style.backgroundClip, n = l = null, ot.extend(rt, {
            reliableHiddenOffsets: function () {
                if (null != r)return r;
                var e, t, n, i = mt.createElement("div"), o = mt.getElementsByTagName("body")[0];
                return o ? (i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = mt.createElement("div"), e.style.cssText = u, o.appendChild(e).appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", t = i.getElementsByTagName("td"), t[0].style.cssText = "padding:0;margin:0;border:0;display:none", n = 0 === t[0].offsetHeight, t[0].style.display = "", t[1].style.display = "none", r = n && 0 === t[0].offsetHeight, o.removeChild(e), i = o = null, r) : void 0
            }, boxSizing: function () {
                return null == i && t(), i
            }, boxSizingReliable: function () {
                return null == o && t(), o
            }, pixelPosition: function () {
                return null == a && t(), a
            }, reliableMarginRight: function () {
                var t, n, r, i;
                if (null == s && e.getComputedStyle) {
                    if (t = mt.getElementsByTagName("body")[0], !t)return;
                    n = mt.createElement("div"), r = mt.createElement("div"), n.style.cssText = u, t.appendChild(n).appendChild(r), i = r.appendChild(mt.createElement("div")), i.style.cssText = r.style.cssText = c, i.style.marginRight = i.style.width = "0", r.style.width = "1px", s = !parseFloat((e.getComputedStyle(i, null) || {}).marginRight), t.removeChild(n)
                }
                return s
            }
        })
    }(), ot.swap = function (e, t, n, r) {
        var i, o, a = {};
        for (o in t)a[o] = e.style[o], e.style[o] = t[o];
        i = n.apply(e, r || []);
        for (o in t)e.style[o] = a[o];
        return i
    };
    var sn = /alpha\([^)]*\)/i, ln = /opacity\s*=\s*([^)]*)/, un = /^(none|table(?!-c[ea]).+)/, cn = RegExp("^(" + jt + ")(.*)$", "i"), dn = RegExp("^([+-])=(" + jt + ")", "i"), fn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, pn = {letterSpacing: 0, fontWeight: 400}, hn = ["Webkit", "O", "Moz", "ms"];
    ot.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = nn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": rt.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = ot.camelCase(t), l = e.style;
                if (t = ot.cssProps[s] || (ot.cssProps[s] = j(l, s)), a = ot.cssHooks[t] || ot.cssHooks[s], void 0 === n)return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                if (o = typeof n, "string" === o && (i = dn.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(ot.css(e, t)), o = "number"), null != n && n === n && ("number" !== o || ot.cssNumber[s] || (n += "px"), rt.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), !(a && "set"in a && void 0 === (n = a.set(e, n, r)))))try {
                    l[t] = "", l[t] = n
                } catch (u) {
                }
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = ot.camelCase(t);
            return t = ot.cssProps[s] || (ot.cssProps[s] = j(e.style, s)), a = ot.cssHooks[t] || ot.cssHooks[s], a && "get"in a && (o = a.get(e, !0, n)), void 0 === o && (o = nn(e, t, r)), "normal" === o && t in pn && (o = pn[t]), "" === n || n ? (i = parseFloat(o), n === !0 || ot.isNumeric(i) ? i || 0 : o) : o
        }
    }), ot.each(["height", "width"], function (e, t) {
        ot.cssHooks[t] = {
            get: function (e, n, r) {
                return n ? 0 === e.offsetWidth && un.test(ot.css(e, "display")) ? ot.swap(e, fn, function () {
                    return L(e, t, r)
                }) : L(e, t, r) : void 0
            }, set: function (e, n, r) {
                var i = r && tn(e);
                return A(e, n, r ? D(e, t, r, rt.boxSizing() && "border-box" === ot.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), rt.opacity || (ot.cssHooks.opacity = {
        get: function (e, t) {
            return ln.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        }, set: function (e, t) {
            var n = e.style, r = e.currentStyle, i = ot.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ot.trim(o.replace(sn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = sn.test(o) ? o.replace(sn, i) : o + " " + i)
        }
    }), ot.cssHooks.marginRight = k(rt.reliableMarginRight, function (e, t) {
        return t ? ot.swap(e, {display: "inline-block"}, nn, [e, "marginRight"]) : void 0
    }), ot.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        ot.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + St[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, rn.test(e) || (ot.cssHooks[e + t].set = A)
    }), ot.fn.extend({
        css: function (e, t) {
            return Dt(this, function (e, t, n) {
                var r, i, o = {}, a = 0;
                if (ot.isArray(t)) {
                    for (r = tn(e), i = t.length; i > a; a++)o[t[a]] = ot.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? ot.style(e, t, n) : ot.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return S(this, !0)
        }, hide: function () {
            return S(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                At(this) ? ot(this).show() : ot(this).hide()
            })
        }
    }), ot.Tween = $, $.prototype = {
        constructor: $, init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ot.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = $.propHooks[this.prop];
            return e && e.get ? e.get(this) : $.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = $.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ot.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : $.propHooks._default.set(this), this
        }
    }, $.prototype.init.prototype = $.prototype, $.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ot.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                ot.fx.step[e.prop] ? ot.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ot.cssProps[e.prop]] || ot.cssHooks[e.prop]) ? ot.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, $.propHooks.scrollTop = $.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ot.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ot.fx = $.prototype.init, ot.fx.step = {};
    var mn, gn, vn = /^(?:toggle|show|hide)$/, yn = RegExp("^(?:([+-])=|)(" + jt + ")([a-z%]*)$", "i"), bn = /queueHooks$/, xn = [O], wn = {
        "*": [function (e, t) {
            var n = this.createTween(e, t), r = n.cur(), i = yn.exec(t), o = i && i[3] || (ot.cssNumber[e] ? "" : "px"), a = (ot.cssNumber[e] || "px" !== o && +r) && yn.exec(ot.css(n.elem, e)), s = 1, l = 20;
            if (a && a[3] !== o) {
                o = o || a[3], i = i || [], a = +r || 1;
                do s = s || ".5", a /= s, ot.style(n.elem, e, a + o); while (s !== (s = n.cur() / r) && 1 !== s && --l)
            }
            return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
        }]
    };
    ot.Animation = ot.extend(F, {
        tweener: function (e, t) {
            ot.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++)n = e[r], wn[n] = wn[n] || [], wn[n].unshift(t)
        }, prefilter: function (e, t) {
            t ? xn.unshift(e) : xn.push(e)
        }
    }), ot.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? ot.extend({}, e) : {
            complete: n || !n && t || ot.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ot.isFunction(t) && t
        };
        return r.duration = ot.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ot.fx.speeds ? ot.fx.speeds[r.duration] : ot.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            ot.isFunction(r.old) && r.old.call(this), r.queue && ot.dequeue(this, r.queue)
        }, r
    }, ot.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(At).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, n, r) {
            var i = ot.isEmptyObject(e), o = ot.speed(t, n, r), a = function () {
                var t = F(this, ot.extend({}, e), o);
                (i || ot._data(this, "finish")) && t.stop(!0)
            };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        }, stop: function (e, t, n) {
            var r = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, i = null != e && e + "queueHooks", o = ot.timers, a = ot._data(this);
                if (i)a[i] && a[i].stop && r(a[i]); else for (i in a)a[i] && a[i].stop && bn.test(i) && r(a[i]);
                for (i = o.length; i--;)o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
                (t || !n) && ot.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = ot._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = ot.timers, a = r ? r.length : 0;
                for (n.finish = !0, ot.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; a > t; t++)r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), ot.each(["toggle", "show", "hide"], function (e, t) {
        var n = ot.fn[t];
        ot.fn[t] = function (e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(H(t, !0), e, r, i)
        }
    }), ot.each({
        slideDown: H("show"),
        slideUp: H("hide"),
        slideToggle: H("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        ot.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), ot.timers = [], ot.fx.tick = function () {
        var e, t = ot.timers, n = 0;
        for (mn = ot.now(); t.length > n; n++)e = t[n], e() || t[n] !== e || t.splice(n--, 1);
        t.length || ot.fx.stop(), mn = void 0
    }, ot.fx.timer = function (e) {
        ot.timers.push(e), e() ? ot.fx.start() : ot.timers.pop()
    }, ot.fx.interval = 13, ot.fx.start = function () {
        gn || (gn = setInterval(ot.fx.tick, ot.fx.interval))
    }, ot.fx.stop = function () {
        clearInterval(gn), gn = null
    }, ot.fx.speeds = {slow: 600, fast: 200, _default: 400}, ot.fn.delay = function (e, t) {
        return e = ot.fx ? ot.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e, t, n, r, i = mt.createElement("div");
        i.setAttribute("className", "t"), i.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = i.getElementsByTagName("a")[0], n = mt.createElement("select"), r = n.appendChild(mt.createElement("option")), t = i.getElementsByTagName("input")[0], e.style.cssText = "top:1px", rt.getSetAttribute = "t" !== i.className, rt.style = /top/.test(e.getAttribute("style")), rt.hrefNormalized = "/a" === e.getAttribute("href"), rt.checkOn = !!t.value, rt.optSelected = r.selected, rt.enctype = !!mt.createElement("form").enctype, n.disabled = !0, rt.optDisabled = !r.disabled, t = mt.createElement("input"), t.setAttribute("value", ""), rt.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), rt.radioValue = "t" === t.value, e = t = n = r = i = null
    }();
    var Tn = /\r/g;
    ot.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = ot.isFunction(e), this.each(function (n) {
                var i;
                1 === this.nodeType && (i = r ? e.call(this, n, ot(this).val()) : e, null == i ? i = "" : "number" == typeof i ? i += "" : ot.isArray(i) && (i = ot.map(i, function (e) {
                    return null == e ? "" : e + ""
                })), t = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], t && "set"in t && void 0 !== t.set(this, i, "value") || (this.value = i))
            })) : i ? (t = ot.valHooks[i.type] || ot.valHooks[i.nodeName.toLowerCase()], t && "get"in t && void 0 !== (n = t.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(Tn, "") : null == n ? "" : n)) : void 0
        }
    }), ot.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = ot.find.attr(e, "value");
                    return null != t ? t : ot.text(e)
                }
            }, select: {
                get: function (e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, l = 0 > i ? s : o ? i : 0; s > l; l++)if (n = r[l], !(!n.selected && l !== i || (rt.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ot.nodeName(n.parentNode, "optgroup"))) {
                        if (t = ot(n).val(), o)return t;
                        a.push(t)
                    }
                    return a
                }, set: function (e, t) {
                    for (var n, r, i = e.options, o = ot.makeArray(t), a = i.length; a--;)if (r = i[a], ot.inArray(ot.valHooks.option.get(r), o) >= 0)try {
                        r.selected = n = !0
                    } catch (s) {
                        r.scrollHeight
                    } else r.selected = !1;
                    return n || (e.selectedIndex = -1), i
                }
            }
        }
    }), ot.each(["radio", "checkbox"], function () {
        ot.valHooks[this] = {
            set: function (e, t) {
                return ot.isArray(t) ? e.checked = ot.inArray(ot(e).val(), t) >= 0 : void 0
            }
        }, rt.checkOn || (ot.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Cn, En, Nn = ot.expr.attrHandle, kn = /^(?:checked|selected)$/i, jn = rt.getSetAttribute, Sn = rt.input;
    ot.fn.extend({
        attr: function (e, t) {
            return Dt(this, ot.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                ot.removeAttr(this, e)
            })
        }
    }), ot.extend({
        attr: function (e, t, n) {
            var r, i, o = e.nodeType;
            return e && 3 !== o && 8 !== o && 2 !== o ? typeof e.getAttribute === Et ? ot.prop(e, t, n) : (1 === o && ot.isXMLDoc(e) || (t = t.toLowerCase(), r = ot.attrHooks[t] || (ot.expr.match.bool.test(t) ? En : Cn)), void 0 === n ? r && "get"in r && null !== (i = r.get(e, t)) ? i : (i = ot.find.attr(e, t), null == i ? void 0 : i) : null !== n ? r && "set"in r && void 0 !== (i = r.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : void ot.removeAttr(e, t)) : void 0
        }, removeAttr: function (e, t) {
            var n, r, i = 0, o = t && t.match(xt);
            if (o && 1 === e.nodeType)for (; n = o[i++];)r = ot.propFix[n] || n, ot.expr.match.bool.test(n) ? Sn && jn || !kn.test(n) ? e[r] = !1 : e[ot.camelCase("default-" + n)] = e[r] = !1 : ot.attr(e, n, ""), e.removeAttribute(jn ? n : r)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!rt.radioValue && "radio" === t && ot.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }
    }), En = {
        set: function (e, t, n) {
            return t === !1 ? ot.removeAttr(e, n) : Sn && jn || !kn.test(n) ? e.setAttribute(!jn && ot.propFix[n] || n, n) : e[ot.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = Nn[t] || ot.find.attr;
        Nn[t] = Sn && jn || !kn.test(t) ? function (e, t, r) {
            var i, o;
            return r || (o = Nn[t], Nn[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, Nn[t] = o), i
        } : function (e, t, n) {
            return n ? void 0 : e[ot.camelCase("default-" + t)] ? t.toLowerCase() : null
        }
    }), Sn && jn || (ot.attrHooks.value = {
        set: function (e, t, n) {
            return ot.nodeName(e, "input") ? void(e.defaultValue = t) : Cn && Cn.set(e, t, n)
        }
    }), jn || (Cn = {
        set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            return r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n) ? t : void 0
        }
    }, Nn.id = Nn.name = Nn.coords = function (e, t, n) {
        var r;
        return n ? void 0 : (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
    }, ot.valHooks.button = {
        get: function (e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : void 0
        }, set: Cn.set
    }, ot.attrHooks.contenteditable = {
        set: function (e, t, n) {
            Cn.set(e, "" === t ? !1 : t, n)
        }
    }, ot.each(["width", "height"], function (e, t) {
        ot.attrHooks[t] = {
            set: function (e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        }
    })), rt.style || (ot.attrHooks.style = {
        get: function (e) {
            return e.style.cssText || void 0
        }, set: function (e, t) {
            return e.style.cssText = t + ""
        }
    });
    var An = /^(?:input|select|textarea|button|object)$/i, Dn = /^(?:a|area)$/i;
    ot.fn.extend({
        prop: function (e, t) {
            return Dt(this, ot.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return e = ot.propFix[e] || e, this.each(function () {
                try {
                    this[e] = void 0, delete this[e]
                } catch (t) {
                }
            })
        }
    }), ot.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, n) {
            var r, i, o, a = e.nodeType;
            return e && 3 !== a && 8 !== a && 2 !== a ? (o = 1 !== a || !ot.isXMLDoc(e), o && (t = ot.propFix[t] || t, i = ot.propHooks[t]), void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]) : void 0
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = ot.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : An.test(e.nodeName) || Dn.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), rt.hrefNormalized || ot.each(["href", "src"], function (e, t) {
        ot.propHooks[t] = {
            get: function (e) {
                return e.getAttribute(t, 4)
            }
        }
    }), rt.optSelected || (ot.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        ot.propFix[this.toLowerCase()] = this
    }), rt.enctype || (ot.propFix.enctype = "encoding");
    var Ln = /[\t\r\n\f]/g;
    ot.fn.extend({
        addClass: function (e) {
            var t, n, r, i, o, a, s = 0, l = this.length, u = "string" == typeof e && e;
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).addClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(xt) || []; l > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : " ")) {
                for (o = 0; i = t[o++];)0 > r.indexOf(" " + i + " ") && (r += i + " ");
                a = ot.trim(r), n.className !== a && (n.className = a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, r, i, o, a, s = 0, l = this.length, u = 0 === arguments.length || "string" == typeof e && e;
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).removeClass(e.call(this, t, this.className))
            });
            if (u)for (t = (e || "").match(xt) || []; l > s; s++)if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Ln, " ") : "")) {
                for (o = 0; i = t[o++];)for (; r.indexOf(" " + i + " ") >= 0;)r = r.replace(" " + i + " ", " ");
                a = e ? ot.trim(r) : "", n.className !== a && (n.className = a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ot.isFunction(e) ? function (n) {
                ot(this).toggleClass(e.call(this, n, this.className, t), t)
            } : function () {
                if ("string" === n)for (var t, r = 0, i = ot(this), o = e.match(xt) || []; t = o[r++];)i.hasClass(t) ? i.removeClass(t) : i.addClass(t); else(n === Et || "boolean" === n) && (this.className && ot._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ot._data(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Ln, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        ot.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ot.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var $n = ot.now(), _n = /\?/, Hn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    ot.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t + "");
        var n, r = null, i = ot.trim(t + "");
        return i && !ot.trim(i.replace(Hn, function (e, t, i, o) {
            return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "")
        })) ? Function("return " + i)() : ot.error("Invalid JSON: " + t)
    }, ot.parseXML = function (t) {
        var n, r;
        if (!t || "string" != typeof t)return null;
        try {
            e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
        } catch (i) {
            n = void 0
        }
        return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + t), n
    };
    var qn, On, Mn = /#.*$/, Fn = /([?&])_=[^&]*/, Rn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Bn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Pn = /^(?:GET|HEAD)$/, Wn = /^\/\//, In = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, zn = {}, Un = {}, Xn = "*/".concat("*");
    try {
        On = location.href
    } catch (Gn) {
        On = mt.createElement("a"), On.href = "", On = On.href
    }
    qn = In.exec(On.toLowerCase()) || [], ot.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: On,
            type: "GET",
            isLocal: Bn.test(qn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Xn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": ot.parseJSON, "text xml": ot.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? P(P(e, ot.ajaxSettings), t) : P(ot.ajaxSettings, e)
        },
        ajaxPrefilter: R(zn),
        ajaxTransport: R(Un),
        ajax: function (e, t) {
            function n(e, t, n, r) {
                var i, c, v, y, x, T = t;
                2 !== b && (b = 2, s && clearTimeout(s), u = void 0, a = r || "", w.readyState = e > 0 ? 4 : 0, i = e >= 200 && 300 > e || 304 === e, n && (y = W(d, w, n)), y = I(d, y, w, i), i ? (d.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (ot.lastModified[o] = x), x = w.getResponseHeader("etag"), x && (ot.etag[o] = x)), 204 === e || "HEAD" === d.type ? T = "nocontent" : 304 === e ? T = "notmodified" : (T = y.state, c = y.data, v = y.error, i = !v)) : (v = T, (e || !T) && (T = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || T) + "", i ? h.resolveWith(f, [c, T, w]) : h.rejectWith(f, [w, T, v]), w.statusCode(g), g = void 0, l && p.trigger(i ? "ajaxSuccess" : "ajaxError", [w, d, i ? c : v]), m.fireWith(f, [w, T]), l && (p.trigger("ajaxComplete", [w, d]), --ot.active || ot.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, o, a, s, l, u, c, d = ot.ajaxSetup({}, t), f = d.context || d, p = d.context && (f.nodeType || f.jquery) ? ot(f) : ot.event, h = ot.Deferred(), m = ot.Callbacks("once memory"), g = d.statusCode || {}, v = {}, y = {}, b = 0, x = "canceled", w = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === b) {
                        if (!c)for (c = {}; t = Rn.exec(a);)c[t[1].toLowerCase()] = t[2];
                        t = c[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === b ? a : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return b || (e = y[n] = y[n] || e, v[e] = t), this
                },
                overrideMimeType: function (e) {
                    return b || (d.mimeType = e), this
                },
                statusCode: function (e) {
                    var t;
                    if (e)if (2 > b)for (t in e)g[t] = [g[t], e[t]]; else w.always(e[w.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || x;
                    return u && u.abort(t), n(0, t), this
                }
            };
            if (h.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, d.url = ((e || d.url || On) + "").replace(Mn, "").replace(Wn, qn[1] + "//"), d.type = t.method || t.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(xt) || [""], null == d.crossDomain && (r = In.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] === qn[1] && r[2] === qn[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (qn[3] || ("http:" === qn[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), B(zn, d, t, w), 2 === b)return w;
            l = d.global, l && 0 === ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Pn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (_n.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Fn.test(o) ? o.replace(Fn, "$1_=" + $n++) : o + (_n.test(o) ? "&" : "?") + "_=" + $n++)), d.ifModified && (ot.lastModified[o] && w.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && w.setRequestHeader("If-None-Match", ot.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", d.contentType), w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Xn + "; q=0.01" : "") : d.accepts["*"]);
            for (i in d.headers)w.setRequestHeader(i, d.headers[i]);
            if (d.beforeSend && (d.beforeSend.call(f, w, d) === !1 || 2 === b))return w.abort();
            x = "abort";
            for (i in{success: 1, error: 1, complete: 1})w[i](d[i]);
            if (u = B(Un, d, t, w)) {
                w.readyState = 1, l && p.trigger("ajaxSend", [w, d]), d.async && d.timeout > 0 && (s = setTimeout(function () {
                    w.abort("timeout")
                }, d.timeout));
                try {
                    b = 1, u.send(v, n)
                } catch (T) {
                    if (!(2 > b))throw T;
                    n(-1, T)
                }
            } else n(-1, "No Transport");
            return w
        },
        getJSON: function (e, t, n) {
            return ot.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return ot.get(e, void 0, t, "script")
        }
    }), ot.each(["get", "post"], function (e, t) {
        ot[t] = function (e, n, r, i) {
            return ot.isFunction(n) && (i = i || r, r = n, n = void 0), ot.ajax({
                url: e,
                type: t,
                dataType: i,
                data: n,
                success: r
            })
        }
    }), ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        ot.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), ot._evalUrl = function (e) {
        return ot.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, ot.fn.extend({
        wrapAll: function (e) {
            if (ot.isFunction(e))return this.each(function (t) {
                ot(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ot(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        }, wrapInner: function (e) {
            return this.each(ot.isFunction(e) ? function (t) {
                ot(this).wrapInner(e.call(this, t))
            } : function () {
                var t = ot(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = ot.isFunction(e);
            return this.each(function (n) {
                ot(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
            }).end()
        }
    }), ot.expr.filters.hidden = function (e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !rt.reliableHiddenOffsets() && "none" === (e.style && e.style.display || ot.css(e, "display"))
    }, ot.expr.filters.visible = function (e) {
        return !ot.expr.filters.hidden(e)
    };
    var Vn = /%20/g, Yn = /\[\]$/, Jn = /\r?\n/g, Qn = /^(?:submit|button|image|reset|file)$/i, Kn = /^(?:input|select|textarea|keygen)/i;
    ot.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = ot.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(e) || e.jquery && !ot.isPlainObject(e))ot.each(e, function () {
            i(this.name, this.value)
        }); else for (n in e)z(n, e[n], t, i);
        return r.join("&").replace(Vn, "+")
    }, ot.fn.extend({
        serialize: function () {
            return ot.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = ot.prop(this, "elements");
                return e ? ot.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !ot(this).is(":disabled") && Kn.test(this.nodeName) && !Qn.test(e) && (this.checked || !Lt.test(e))
            }).map(function (e, t) {
                var n = ot(this).val();
                return null == n ? null : ot.isArray(n) ? ot.map(n, function (e) {
                    return {name: t.name, value: e.replace(Jn, "\r\n")}
                }) : {name: t.name, value: n.replace(Jn, "\r\n")}
            }).get()
        }
    }), ot.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && U() || X()
    } : U;
    var Zn = 0, er = {}, tr = ot.ajaxSettings.xhr();
    e.ActiveXObject && ot(e).on("unload", function () {
        for (var e in er)er[e](void 0, !0)
    }), rt.cors = !!tr && "withCredentials"in tr, tr = rt.ajax = !!tr, tr && ot.ajaxTransport(function (e) {
        if (!e.crossDomain || rt.cors) {
            var t;
            return {
                send: function (n, r) {
                    var i, o = e.xhr(), a = ++Zn;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)o[i] = e.xhrFields[i];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (i in n)void 0 !== n[i] && o.setRequestHeader(i, n[i] + "");
                    o.send(e.hasContent && e.data || null), t = function (n, i) {
                        var s, l, u;
                        if (t && (i || 4 === o.readyState))if (delete er[a], t = void 0, o.onreadystatechange = ot.noop, i)4 !== o.readyState && o.abort(); else {
                            u = {}, s = o.status, "string" == typeof o.responseText && (u.text = o.responseText);
                            try {
                                l = o.statusText
                            } catch (c) {
                                l = ""
                            }
                            s || !e.isLocal || e.crossDomain ? 1223 === s && (s = 204) : s = u.text ? 200 : 404
                        }
                        u && r(s, l, u, o.getAllResponseHeaders())
                    }, e.async ? 4 === o.readyState ? setTimeout(t) : o.onreadystatechange = er[a] = t : t()
                }, abort: function () {
                    t && t(void 0, !0)
                }
            }
        }
    }), ot.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return ot.globalEval(e), e
            }
        }
    }), ot.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ot.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n = mt.head || ot("head")[0] || mt.documentElement;
            return {
                send: function (r, i) {
                    t = mt.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                        (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success"))
                    }, n.insertBefore(t, n.firstChild)
                }, abort: function () {
                    t && t.onload(void 0, !0)
                }
            }
        }
    });
    var nr = [], rr = /(=)\?(?=&|$)|\?\?/;
    ot.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = nr.pop() || ot.expando + "_" + $n++;
            return this[e] = !0, e
        }
    }), ot.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i, o, a, s = t.jsonp !== !1 && (rr.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && rr.test(t.data) && "data");
        return s || "jsonp" === t.dataTypes[0] ? (i = t.jsonpCallback = ot.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(rr, "$1" + i) : t.jsonp !== !1 && (t.url += (_n.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
            return a || ot.error(i + " was not called"), a[0]
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
            a = arguments
        }, r.always(function () {
            e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, nr.push(i)), a && ot.isFunction(o) && o(a[0]), a = o = void 0
        }), "script") : void 0
    }), ot.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || mt;
        var r = ft.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = ot.buildFragment([e], t, i), i && i.length && ot(i).remove(), ot.merge([], r.childNodes))
    };
    var ir = ot.fn.load;
    ot.fn.load = function (e, t, n) {
        if ("string" != typeof e && ir)return ir.apply(this, arguments);
        var r, i, o, a = this, s = e.indexOf(" ");
        return s >= 0 && (r = e.slice(s, e.length), e = e.slice(0, s)), ot.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (o = "POST"), a.length > 0 && ot.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: t
        }).done(function (e) {
            i = arguments, a.html(r ? ot("<div>").append(ot.parseHTML(e)).find(r) : e)
        }).complete(n && function (e, t) {
                a.each(n, i || [e.responseText, t, e])
            }), this
    }, ot.expr.filters.animated = function (e) {
        return ot.grep(ot.timers, function (t) {
            return e === t.elem
        }).length
    };
    var or = e.document.documentElement;
    ot.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, a, s, l, u, c = ot.css(e, "position"), d = ot(e), f = {};
            "static" === c && (e.style.position = "relative"), s = d.offset(), o = ot.css(e, "top"), l = ot.css(e, "left"), u = ("absolute" === c || "fixed" === c) && ot.inArray("auto", [o, l]) > -1, u ? (r = d.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), ot.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using"in t ? t.using.call(e, f) : d.css(f)
        }
    }, ot.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                ot.offset.setOffset(this, e, t)
            });
            var t, n, r = {top: 0, left: 0}, i = this[0], o = i && i.ownerDocument;
            return o ? (t = o.documentElement, ot.contains(t, i) ? (typeof i.getBoundingClientRect !== Et && (r = i.getBoundingClientRect()), n = G(o), {
                top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
            }) : r) : void 0
        }, position: function () {
            if (this[0]) {
                var e, t, n = {top: 0, left: 0}, r = this[0];
                return "fixed" === ot.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ot.nodeName(e[0], "html") || (n = e.offset()), n.top += ot.css(e[0], "borderTopWidth", !0), n.left += ot.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - ot.css(r, "marginTop", !0),
                    left: t.left - n.left - ot.css(r, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent || or; e && !ot.nodeName(e, "html") && "static" === ot.css(e, "position");)e = e.offsetParent;
                return e || or
            })
        }
    }), ot.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = /Y/.test(t);
        ot.fn[e] = function (r) {
            return Dt(this, function (e, r, i) {
                var o = G(e);
                return void 0 === i ? o ? t in o ? o[t] : o.document.documentElement[r] : e[r] : void(o ? o.scrollTo(n ? ot(o).scrollLeft() : i, n ? i : ot(o).scrollTop()) : e[r] = i)
            }, e, r, arguments.length, null)
        }
    }), ot.each(["top", "left"], function (e, t) {
        ot.cssHooks[t] = k(rt.pixelPosition, function (e, n) {
            return n ? (n = nn(e, t), on.test(n) ? ot(e).position()[t] + "px" : n) : void 0
        })
    }), ot.each({Height: "height", Width: "width"}, function (e, t) {
        ot.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, r) {
            ot.fn[r] = function (r, i) {
                var o = arguments.length && (n || "boolean" != typeof r), a = n || (r === !0 || i === !0 ? "margin" : "border");
                return Dt(this, function (t, n, r) {
                    var i;
                    return ot.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? ot.css(t, n, a) : ot.style(t, n, r, a)
                }, t, o ? r : void 0, o, null)
            }
        })
    }), ot.fn.size = function () {
        return this.length
    }, ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return ot
    });
    var ar = e.jQuery, sr = e.$;
    return ot.noConflict = function (t) {
        return e.$ === ot && (e.$ = sr), t && e.jQuery === ot && (e.jQuery = ar), ot
    }, typeof t === Et && (e.jQuery = e.$ = ot), ot
}), function (e, t) {
    function n(e) {
        return function (t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    }

    function r() {
        return m++
    }

    function i(e, t) {
        var n;
        if (n = e.charAt(0), k.test(e))n = e; else if ("." === n)for (n = (t ? t.match(w)[0] : c.cwd) + e, n = n.replace(T, "/"); n.match(C);)n = n.replace(C, "/"); else n = "/" === n ? (n = c.cwd.match(j)) ? n[0] + e.substring(1) : e : c.base + e;
        return n
    }

    function o(e, t) {
        if (!e)return "";
        var n, r = e, o = c.alias, r = e = o && f(o[r]) ? o[r] : r, o = c.paths;
        o && (n = r.match(E)) && f(o[n[1]]) && (r = o[n[1]] + n[2]), n = r;
        var a = c.vars;
        a && n.indexOf("{") > -1 && (n = n.replace(N, function (e, t) {
            return f(a[t]) ? a[t] : e
        })), r = n.length - 1, o = n.charAt(r), e = "#" === o ? n.substring(0, r) : ".js" === n.substring(r - 2) || n.indexOf("?") > 0 || ".css" === n.substring(r - 3) || "/" === o ? n : n + ".js", n = i(e, t);
        var r = c.map, s = n;
        if (r)for (var o = 0, l = r.length; l > o && (s = r[o], s = h(s) ? s(n) || n : n.replace(s[0], s[1]), !(s !== n)); o++);
        return s
    }

    function a(e, t) {
        var n, r = e.sheet;
        if (O)r && (n = !0); else if (r)try {
            r.cssRules && (n = !0)
        } catch (i) {
            "NS_ERROR_DOM_SECURITY_ERR" === i.name && (n = !0)
        }
        setTimeout(function () {
            n ? t() : a(e, t)
        }, 20)
    }

    function s() {
        if (v)return v;
        if (y && "interactive" === y.readyState)return y;
        for (var e = $.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
            var n = e[t];
            if ("interactive" === n.readyState)return y = n
        }
    }

    function l(e, t) {
        this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (!e.seajs) {
        var u = e.seajs = {version: "2.1.1"}, c = u.data = {}, d = n("Object"), f = n("String"), p = Array.isArray || n("Array"), h = n("Function"), m = 0, g = c.events = {};
        u.on = function (e, t) {
            return (g[e] || (g[e] = [])).push(t), u
        }, u.off = function (e, t) {
            if (!e && !t)return g = c.events = {}, u;
            var n = g[e];
            if (n)if (t)for (var r = n.length - 1; r >= 0; r--)n[r] === t && n.splice(r, 1); else delete g[e];
            return u
        };
        var v, y, b, x = u.emit = function (e, t) {
            var n, r = g[e];
            if (r)for (r = r.slice(); n = r.shift();)n(t);
            return u
        }, w = /[^?#]*\//, T = /\/\.\//g, C = /\/[^/]+\/\.\.\//, E = /^([^/:]+)(\/.+)$/, N = /{([^{]+)}/g, k = /^\/\/.|:\//, j = /^.*?\/\/.*?\//, S = document, A = location, D = A.href.match(w)[0], L = S.getElementsByTagName("script"), L = S.getElementById("seajsnode") || L[L.length - 1], L = ((L.hasAttribute ? L.src : L.getAttribute("src", 4)) || D).match(w)[0], $ = S.getElementsByTagName("head")[0] || S.documentElement, _ = $.getElementsByTagName("base")[0], H = /\.css(?:\?|$)/i, q = /^(?:loaded|complete|undefined)$/, O = 536 > 1 * navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1"), M = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g, F = /\\\\/g, R = u.cache = {}, B = {}, P = {}, W = {}, I = l.STATUS = {
            FETCHING: 1,
            SAVED: 2,
            LOADING: 3,
            LOADED: 4,
            EXECUTING: 5,
            EXECUTED: 6
        };
        l.prototype.resolve = function () {
            for (var e = this.dependencies, t = [], n = 0, r = e.length; r > n; n++)t[n] = l.resolve(e[n], this.uri);
            return t
        }, l.prototype.load = function () {
            if (!(this.status >= I.LOADING)) {
                this.status = I.LOADING;
                var e = this.resolve();
                x("load", e);
                for (var t, n = this._remain = e.length, r = 0; n > r; r++)t = l.get(e[r]), t.status < I.LOADED ? t._waitings[this.uri] = (t._waitings[this.uri] || 0) + 1 : this._remain--;
                if (0 === this._remain)this.onload(); else {
                    for (var i = {}, r = 0; n > r; r++)t = R[e[r]], t.status < I.FETCHING ? t.fetch(i) : t.status === I.SAVED && t.load();
                    for (var o in i)i.hasOwnProperty(o) && i[o]()
                }
            }
        }, l.prototype.onload = function () {
            this.status = I.LOADED, this.callback && this.callback();
            var e, t, n = this._waitings;
            for (e in n)n.hasOwnProperty(e) && (t = R[e], t._remain -= n[e], 0 === t._remain) && t.onload();
            delete this._waitings, delete this._remain
        }, l.prototype.fetch = function (e) {
            function t() {
                var e = i.requestUri, t = i.onRequest, n = i.charset, r = H.test(e), o = S.createElement(r ? "link" : "script");
                n && (n = h(n) ? n(e) : n) && (o.charset = n);
                var s = o;
                !r || !O && "onload"in s ? s.onload = s.onerror = s.onreadystatechange = function () {
                    q.test(s.readyState) && (s.onload = s.onerror = s.onreadystatechange = null, !r && !c.debug && $.removeChild(s), s = null, t())
                } : setTimeout(function () {
                    a(s, t)
                }, 1), r ? (o.rel = "stylesheet", o.href = e) : (o.async = !0, o.src = e), v = o, _ ? $.insertBefore(o, _) : $.appendChild(o), v = null
            }

            function n() {
                delete B[o], P[o] = !0, b && (l.save(r, b), b = null);
                var e, t = W[o];
                for (delete W[o]; e = t.shift();)e.load()
            }

            var r = this.uri;
            this.status = I.FETCHING;
            var i = {uri: r};
            x("fetch", i);
            var o = i.requestUri || r;
            !o || P[o] ? this.load() : B[o] ? W[o].push(this) : (B[o] = !0, W[o] = [this], x("request", i = {
                uri: r,
                requestUri: o,
                onRequest: n,
                charset: c.charset
            }), i.requested || (e ? e[i.requestUri] = t : t()))
        }, l.prototype.exec = function () {
            function e(t) {
                return l.get(e.resolve(t)).exec()
            }

            if (this.status >= I.EXECUTING)return this.exports;
            this.status = I.EXECUTING;
            var n = this.uri;
            e.resolve = function (e) {
                return l.resolve(e, n)
            }, e.async = function (t, r) {
                return l.use(t, r, n + "_async_" + m++), e
            };
            var r = this.factory, r = h(r) ? r(e, this.exports = {}, this) : r;
            return r === t && (r = this.exports), null === r && !H.test(n) && x("error", this), delete this.factory, this.exports = r, this.status = I.EXECUTED, x("exec", this), r
        }, l.resolve = function (e, t) {
            var n = {id: e, refUri: t};
            return x("resolve", n), n.uri || o(n.id, t)
        }, l.define = function (e, n, r) {
            var i = arguments.length;
            if (1 === i ? (r = e, e = t) : 2 === i && (r = n, p(e) ? (n = e, e = t) : n = t), !p(n) && h(r)) {
                var o = [];
                ("" + r).replace(F, "").replace(M, function (e, t, n) {
                    n && o.push(n)
                }), n = o
            }
            if (i = {id: e, uri: l.resolve(e), deps: n, factory: r}, !i.uri && S.attachEvent) {
                var a = s();
                a && (i.uri = a.src)
            }
            x("define", i), i.uri ? l.save(i.uri, i) : b = i
        }, l.save = function (e, t) {
            var n = l.get(e);
            n.status < I.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = I.SAVED)
        }, l.get = function (e, t) {
            return R[e] || (R[e] = new l(e, t))
        }, l.use = function (t, n, r) {
            var i = l.get(r, p(t) ? t : [t]);
            i.callback = function () {
                for (var t = [], r = i.resolve(), o = 0, a = r.length; a > o; o++)t[o] = R[r[o]].exec();
                n && n.apply(e, t), delete i.callback
            }, i.load()
        }, l.preload = function (e) {
            var t = c.preload, n = t.length;
            n ? l.use(t, function () {
                t.splice(0, n), l.preload(e)
            }, c.cwd + "_preload_" + m++) : e()
        }, u.use = function (e, t) {
            return l.preload(function () {
                l.use(e, t, c.cwd + "_use_" + m++)
            }), u
        }, l.define.cmd = {}, e.define = l.define, u.Module = l, c.fetchedList = P, c.cid = r, u.resolve = o, u.require = function (e) {
            return (R[l.resolve(e)] || {}).exports
        }, c.base = (L.match(/^(.+?\/)(\?\?)?(seajs\/)+/) || ["", L])[1], c.dir = L, c.cwd = D, c.charset = "utf-8";
        var D = c, z = [], A = A.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2"), A = A + (" " + S.cookie);
        A.replace(/(seajs-\w+)=1/g, function (e, t) {
            z.push(t)
        }), D.preload = z, u.config = function (e) {
            for (var t in e) {
                var n = e[t], r = c[t];
                if (r && d(r))for (var o in n)r[o] = n[o]; else p(r) ? n = r.concat(n) : "base" === t && ("/" === n.slice(-1) || (n += "/"), n = i(n)), c[t] = n
            }
            return x("config", e), u
        }
    }
}(this),
    window.UMEDITOR_HOME_URL = "/scripts/gallery/editor/1.0.0/",
    window.SWF_UPLOAD_URL = "/scripts/gallery/swfupload/0.1.1/swfupload.swf",
    window.SWF_ZeroClipboard_URL = "/scripts/gallery/zeroclipboard/1.2.2/ZeroClipboard.swf",
    window.SWF_Video_URL = "/scripts/gallery/swfobject/2.2.1/CuPlayerMiniV4.swf",
    window.SWF_Video_File = "/scripts/gallery/swfobject/2.2.1/data.xml",
    window.SWF_IMAGE_FILE = "/uploads/start.jpg",
    window.UPLOAD_IMAGE_PATH = "/common/editor/upfile",
    window.IMAGE_DOMIAN = "http://172.16.1.8:81",
    seajs.config({
    base: window.IMAGE_DOMIAN + "/scripts",
    alias: {
        $: "jquery/jquery/1.7.2/jquery",
        widget: "arale/widget/1.1.1/widget",
        placeholders: "gallery/placeholders/3.0.2/placeholders",
        templatable: "arale/templatable/0.9.2/templatable",
        slide: "arale/switchable/1.0.1/slide",
        autocomplete: "arale/autocomplete/1.3.0/autocomplete",
        carousel: "arale/switchable/1.0.1/carousel",
        validator: "arale/validator/0.9.6/validator",
        calendar: "arale/calendar/1.0.0/calendar",
        calendar_style: "arale/calendar/1.0.0/calendar.css",
        dialog: "arale/dialog/1.2.5/dialog",
        dialog_style: "arale/dialog/1.2.5/dialog.css",
        confirmbox: "arale/dialog/1.2.5/confirmbox",
        popup: "arale/popup/1.1.5/popup",
        tip: "arale/tip/1.2.1/tip",
        accordion: "arale/switchable/1.0.1/accordion",
        select: "arale/select/0.9.9/select",
        moment: "gallery/moment/2.0.0/moment",
        umeditor: "gallery/editor/1.0.0/umeditor",
        umeditor_config: "gallery/editor/1.0.0/umeditor.config",
        umdeitor_style: "gallery/editor/1.0.0/themes/default/css/umeditor.min.css",
        jscroll: "gallery/jsrollbar/1.0.2/jscrollbar",
        ztree: "gallery/ztree/3.5.3/ztree",
        pagination: "gallery/pagination/0.1.1/pagination",
        underscore: "gallery/underscore/1.6.0/underscore",
        ajaxFileUpload: "gallery/ajaxFileUpload/0.1.1/ajaxFileUpload",
        swfupload: "gallery/swfupload/0.1.1/jquery.swfu",
        zeroclipboard: "gallery/zeroclipboard/1.2.2/zeroclipboard",
        swfobject: "gallery/swfobject/2.2.0/swfobject",
        video: "gallery/swfobject/2.2.1/video",
        template: "gallery/template/1.0.1/template",
        lightbox: "gallery/lightbox/1.0.0/lightbox",
        my97DatePicker: "gallery/my97DatePicker/1.0.0/WdatePicker",
        pcas: "gallery/area/1.0.0/PCAS.js",
        validateForm: "gallery/validateForm/1.0.0/validateForm",
        sticky: "arale/sticky/1.3.1/sticky",
        morris: "gallery/morris/0.5.0/morris",
        mouseDelay: "gallery/mouseDelay/1.0.0/mouseDelay"
    }
}), $(function () {
    $.browser = {
        mozilla: function () {
            return /firefox/.test(navigator.userAgent.toLowerCase())
        }, webkit: function () {
            return /webkit/.test(navigator.userAgent.toLowerCase())
        }, opera: function () {
            return /opera/.test(navigator.userAgent.toLowerCase())
        }, msie: function () {
            return /msie/.test(navigator.userAgent.toLowerCase())
        }, msie6: function () {
            return /msie 6\.0/i.test(navigator.userAgent.toLowerCase())
        }, msie7: function () {
            return /msie 7\.0/i.test(navigator.userAgent.toLowerCase())
        }, msie8: function () {
            return /msie 8\.0/i.test(navigator.userAgent.toLowerCase())
        }
    }, $.browser.msie6() && $.getScript("/scripts/DD_belatedPNG.js", function () {
        DD_belatedPNG.fix("*")
    }), $("[data-deftxt]").css({color: "#bbb"}).focus(function () {
        $(this).val() == $(this).data("deftxt") && $(this).val("").css({color: "#666"})
    }).blur(function () {
        "" == $(this).val() && $(this).val($(this).data("deftxt")).css({color: "#bbb"})
    });
    var e = {
        init: function () {
            this.topMenu(), this.footerAttr(), this.navHover(), this.navBrand(), this.navLogoMove(), this.backToTop(), this.handleSearch(), this.loadHotList()
        }, topMenu: function () {
            $(".site-nav-bd .top-menu").hover(function () {
                var e = $(this).find(".menu-bd");
                1 == e.length && ($(this).addClass("hover"), e.show())
            }, function () {
                var e = $(this).find(".menu-bd");
                1 == e.length && ($(this).removeClass("hover"), e.hide())
            })
        }, footerAttr: function () {
            var e = $(".footer-show-hover");
            $(".footer-show-sinaWb");
            var t = $(".footer-show-qcode");
            $(".footer-wx").hover(function () {
                e.show(), t.show()
            }, function () {
                e.hide(), t.hide()
            })
        }, navHover: function () {
            if ($(".js-nav-items").length > 0) {
                var e = $(".js-nav-items"), t = $(".nav-items li.on a"), n = $(".nav-move-item"), r = $("a", e.children()), i = t.position().left, o = t.outerWidth(!0), a = $("li.on", e).index();
                n.css({width: o, left: i}), r.not("li", e).each(function () {
                    var e = $(this).position().left, t = $(this).outerWidth(!0);
                    $(this).mouseenter(function () {
                        n.stop().animate({
                            width: t,
                            left: e
                        }, 250), $(this).parent().addClass("on").siblings().removeClass("on")
                    })
                }), e.mouseleave(function () {
                    n.stop().animate({
                        width: o,
                        left: i
                    }, 250), r.parent(":eq(" + a + ")").addClass("on").siblings().removeClass("on")
                })
            }
        }, loginTabs: function () {
            var e = $(".login-dialog-tabmenu li");
            e.click(function () {
                var e = $(this), t = e.index();
                e.addClass("selected").siblings().removeClass("selected"), $(".login-dialog-tabcon .login-dialog-tabitems").siblings().hide().eq(t).show()
            })
        }, headChange: function () {
            function e() {
                t++, t == n && (t = 1), r.css({background: 'url("/images/common/temp/headbg-pic0' + t + '.png") no-repeat center top'}), i.css({background: 'url("/images/common/temp/headbg-pic-small0' + t + '.png") no-repeat center top'})
            }

            var t = 1, n = 5, r = $(".header-round"), i = $(".header");
            setInterval(function () {
                e()
            }, 5e3)
        }, navBrand: function () {
            $(".js-recoment").length > 0 && $(".nav-brand").hover(function () {
                $(".js-recoment").toggle()
            })
        }, navLogoMove: function () {
            var e = $(".nav-brand-recoment .recoment-dl dd a");
            e.hover(function () {
                var e = $(this).find("img").attr("alt"), t = '<p class="caption" style="width:70px;height:20px;text-align:center;padding:0 5px;position: absolute; bottom: -60px; color:#fff;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;background:#000;">' + e + "</p>";
                $(this).parent().css({position: "relative"}), 0 == $(this).find(".caption").length && $(this).append(t), $(this).find(".caption").css({opacity: .8}).stop().animate({bottom: 0}, 200).prev().css("position", "absolute").stop().animate({top: -20})
            }, function () {
                $(this).find(".caption").stop().animate({bottom: -20}, 200).prev().stop().animate({top: 0})
            })
        }, backToTop: function () {
            var e = $(window).innerHeight();
            $(window).scroll(function () {
                $(".ui-scrolltop").css({display: $(window).scrollTop() > e ? "block" : "none"})
            }), $(".ui-scrolltop").click(function () {
                $("html,body").animate({scrollTop: 0}, 500)
            }), $.browser.msie6() && $(window).scroll(function () {
                $(".ui-scrolltop").css({top: $(window).scrollTop() + $(window).innerHeight() - 150})
            })
        }, handleSearch: function () {
            function e() {
                var e = encodeURIComponent($.trim($("#search_form input[id=q]").val())), t = $("#key_type").val();
                0 == t ? window.location.href = "/market/brands/search?q=" + e : 1 == t && (window.location.href = "/article/search?q=" + e)
            }

            var t = $(".search-select");
            $(t).hover(function () {
                $(this).find("span").next().show()
            }, function () {
                $(this).find("span").next().hide()
            }).find("dl").find("dd").click(function () {
                $(t).find("input[type=hidden]").val($(this).attr("value")).next().text($(this).text()), $(this).parent().hide()
            });
            var n = {0: "品牌", 1: "资讯"}, r = $("#key_type").val();
            $(".search-select span").text(n[r]), $("#btn_header_search").click(function () {
                e()
            }), $("#q").keypress(function (t) {
                (13 == t.which || 10 == t.which) && e()
            })
        }, loadHotList: function () {
        }
    };
    e.init()
}), $(".js_img_center,.js-img-center").each(function () {
    $("<span></span>").appendTo($(this))
});