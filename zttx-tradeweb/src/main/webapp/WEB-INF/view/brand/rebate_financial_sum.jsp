<!doctype html>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/taglib.jsp" %>
<%@ include file="/WEB-INF/view/include/indexKey.jsp" %>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>管理中心-产品管理-返点产品调价明细</title>
    <link rel="stylesheet" href="${res}/styles/brand/global.css"/>
    <link rel="stylesheet" href="${res}/styles/brand/factory.css"/>
</head>
<body>
<jsp:include page="/common/menuInfo/mainmenu"/>
<div class="main layout">
    <jsp:include page="/common/menuInfo/sidemenu"/>
    <div class="main_con">
        <div class="bread_nav">
            <div class="fl">
                <a class="link" href="${ctx}/brand/center">管理中心</a>
                <span class="arrow">&gt;&gt;</span>
                <span>终端商财务账</span>
                <span class="arrow">&gt;</span>
                <span class="current">返点产品调价明细</span>
            </div>
            <div class="fr">
                <jsp:include page="/WEB-INF/view/brand/common_quick_bar.jsp"/>
            </div>
        </div>
        <div class="inner">
            <!-- 内容都放这个地方 -->
            <form:form id="favorite" name="" class="ui-form" onsubmit="return false;" style="padding-top:20px;">
                <div class="ui-form-item">
                    <label class="ui-label">
                        终端商名称：
                    </label>
                    <input type="text" class="ui-input" name="dealerName"/>
                    <input type="button" class="ui_button ui_button_morange event-query" style="vertical-align: -1px" value='搜 索'/>
                </div>
            </form:form>
            <div>
                <table class="factory-count-table">
                    <colgroup>
                        <col width="165"/>
                        <col width="115"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="125"/>
                        <col width="100"/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>终端商名称</th>
                        <th>总销量</th>
                        <th>总销售额</th>
                        <th>总返点金额</th>
                        <th>总返点应收款</th>
                        <th>总返点已收款</th>
                        <th>返点欠收款</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div id="pagination"></div>
                <div class="factory-count-box clearfix" style="font-size: 12px;"></div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="/WEB-INF/view/brand/bottom.jsp"/>
<jsp:include page="/WEB-INF/view/brand/import_javascript.jsp"/>
<script id="data-template" type="text/html">
    {{if null||length==0}}
    <tr>
        <td colspan="8">暂无数据！</td>
    </tr>
    {{else}}
    {{each}}
    <tr>
        <td>{{$value.dealerName}}</td>
        <td>{{ $value.allSaleNumSum}}</td>
        <td>{{ $value.allSalePriceSum}}</td>
        <td>{{ $value.allPointPriceSum}}</td>
        <td>{{ $value.allCostPriceSum}}</td>
        <td>{{ $value.allPaidPriceSum}}</td>
        <td>{{ $value.allDebtPriceSum}}</td>
        <td>
            <span><a href="${crx}/brand/brandFinancialPoint/saleSum?dealerId={{$value.dealerId}}" class="link">查看明细</a></span></p>
            <span><a href="${crx}/brand/brandFinancialPoint/stockCountByDate?dealerId={{$value.dealerId}}" class="link">库存明细</a></span>
        </td>
    </tr>
    {{/each}}
    {{/if}}
</script>

<script id="count-template" type="text/html">
    <div class="fr">
        合计&nbsp;应收款:
        <span class="consult" style="color: #f00;">
        {{if count!=0}}{{ $formatPrice sumCostPriceSum}}{{else}}0.00{{/if}}
        </span>&nbsp; 已收款： <span class="consult" style="color: #f00;">
        {{if count!=0}}{{ $formatPrice sumPaidPriceSum}}{{else}}0.00{{/if}}
        </span>&nbsp; 欠收款：<span class="consult" style="color: #f00;">
        {{if count!=0}}{{ $formatPrice sumDebtPriceSum}}{{else}}0.00{{/if}}
        </span>&nbsp;
        共 <span class="consult" style="color: #f00;">{{count}}</span> 条
    </div>
</script>

<script>
    $(function () {
        seajs.use(["pagination", "template", "moment"], function (Pagination, template, moment) {
            template.helper('$formatPrice', function (price) {
                if (isNaN(price)) {
                    return price;
                } else {
                    return price.toFixed(2);
                }
            });
            template.helper('$formatDate', function (millsec) {
                return moment(millsec).format("YYYY-MM-DD HH:mm:00");
            });
            window['g_pagination'] = new Pagination({
                url: "${ctx}/brand/brandFinancialPoint/priceSum/data",
                elem: "#pagination",
                form: "#favorite",
                method: "post",
                handleData: function (json) {
                    if (json.code == 126000) {
                        var html1 = template.render("data-template", json.rows);
                        var html2 = template.render("count-template", json.object);
                        $(".factory-count-table tbody").html(html1);
                        $(".factory-count-box").html(html2);
                    } else {
                        remind("error", json.message);
                    }
                }
            });
        });
        $(".event-query").click(function () {
            g_pagination.goTo(1);
        });
    });
</script>
</body>
</html>