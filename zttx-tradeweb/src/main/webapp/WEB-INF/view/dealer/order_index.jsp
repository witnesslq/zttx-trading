﻿<%@ page import="com.zttx.web.consts.DealerConstant" %>
<%@ page import="com.zttx.web.consts.ApplicationConst" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/view/include/taglib.jsp" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>管理中心-所有订单</title>
    <link href="${res}/styles/dealer/global.css" rel="stylesheet"/>
    <link href="${res}/styles/dealer/alreas.css" rel="stylesheet"/>
</head>
<body>
<div class="container">
    <jsp:include page="${ctx}/common/menuInfo/mainmenu"/>
    <div class="em100">
        <div class="main clearfix pr">
            <!--侧边导航-->
            <jsp:include page="${ctx}/common/menuInfo/sidemenu"/>
            <!--主体内容-->
            <div class="main-right">
                <!--面包屑-->
                <div class="main-grid mb10">
                    <div class="panel-crumbs">
                        <i class="icon i-setting"></i><a href="${ctx}/dealer/center">管理中心</a>
                        >> <a href="${ctx}/dealer/dealerOrder/order" title="">订单管理</a> >
                        <c:choose>
                            <c:when test="${dealerOrder.orderMuiltStatus==0}">所有订单</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==1}">等待付款</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==2}">等待发货</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==3}">等待收货</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==4}">成交的订单</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==5}">关闭的订单</c:when>
                            <c:when test="${dealerOrder.orderMuiltStatus==6}">退款订单</c:when>
                            <%--<c:when test="${dealerOrder.orderMuiltStatus==7}">预定订单</c:when>--%>
                            <c:when test="${dealerOrder.orderMuiltStatus==8}">尾款订单</c:when>
                        </c:choose>
                        <a class="panel-crumbs-help" href="${ctx}/help/index"><i class="icon i-help"></i>帮助中心</a>
                    </div>
                </div>
                <div class="inner">
                    <div class="panel-filtrate clearfix">
                        <form:form id="search-form" method="get" class="ui-form">
                            <div class="ui-form-row">
                                <label>产品名称：</label>
                                <input type="text" name="productTitle" class="ui-input long"
                                       value="${dealerOrder.productTitle}" maxlength="128"/>
                                <label>订 单 号：</label>
                                <input type="text" name="orderId" class="ui-input js-number"
                                       value="${dealerOrder.orderId}" maxlength="20"/>
                                <label>品牌名称：</label>

                                <div class="pr inline-block">
                                    <select class="ui-select js_select" name="brandsId" id="brandsId">
                                        <option value="">全部品牌</option>
                                        <c:forEach items="${joinList}" var="join">
                                            <option value="${join.brandsId}" ${dealerOrder.brandsId == join.brandsId ? 'selected="selected"':''}>${join.brandsName}</option>
                                        </c:forEach>
                                    </select>
                                </div>
                            </div>
                            <div class="ui-form-row">
                                <label>下单时间：</label>
                                     <input type="text" name="startTime" class="ui-input date" id="start-cal" value="<fmt:formatDate value="${dealerOrder.startTime}" pattern="<%=ApplicationConst.DATE_FORMAT_YMD%>"/>" readonly="true"/>
                                     -
                                     <input type="text" name="endTime" class="ui-input date" id="end-cal" value="<fmt:formatDate value="${dealerOrder.endTime}" pattern="<%=ApplicationConst.DATE_FORMAT_YMD%>"/>" readonly="true"/>

                                <label>订单状态：</label>

                                <div class="pr inline-block">
                                    <select class="ui-select js_select" name="orderMuiltStatus">
                                        <option value="0" ${dealerOrder.orderMuiltStatus==0?'selected':'' }>所有订单
                                        </option>
                                        <option value="1" ${dealerOrder.orderMuiltStatus==1?'selected':'' }>等待付款
                                        </option>
                                        <option value="2" ${dealerOrder.orderMuiltStatus==2?'selected':'' }>等待发货
                                        </option>
                                        <option value="3" ${dealerOrder.orderMuiltStatus==3?'selected':'' }>等待收货
                                        </option>
                                        <option value="4" ${dealerOrder.orderMuiltStatus==4?'selected':'' }>成交的订单
                                        </option>
                                        <option value="5" ${dealerOrder.orderMuiltStatus==5?'selected':'' }>关闭的订单
                                        </option>
                                        <option value="6" ${dealerOrder.orderMuiltStatus==6?'selected':'' }>退款订单
                                        </option>
                                        <%--<option value="7" ${dealerOrder.orderMuiltStatus==7?'selected':'' }>预定订单
                                        </option>--%>
                                        <option value="8" ${dealerOrder.orderMuiltStatus==8?'selected':'' }>尾款订单
                                        </option>
                                    </select>
                                </div>
                                <label>订单类型：</label>
                                <div class="pr inline-block">
                                    <select class="ui-select js_select" name="dealerOrderType">
                                        <option value="">请选择</option>
                                        <c:set var="cash" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_CASH%>"/>
                                        <c:set var="credit" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_CREDIT%>"/>
                                        <c:set var="point" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_POINT%>"/>
                                        <option value="${cash}" ${dealerOrder.dealerOrderType == cash ?'selected':''}>现款</option>
                                        <option value="${credit}" ${dealerOrder.dealerOrderType == credit ?'selected':''}>授信</option>
                                        <option value="${point}" ${dealerOrder.dealerOrderType == point ?'selected':''}>返点</option>
                                    </select>
                                </div>
                            </div>
                            <div class="ui-form-row clearfix">
                                <div class="inline-block" style="margin-left: 23px;">
                                    <%--<c:if test="${dealerOrderType.cash && dealerOrderType.sam}"><input type="checkbox" name="isSampleOrder">拿样订单</c:if>--%>
                                    <c:choose>
                                        <c:when test="${dealerOrder.isSampleOrder}">
                                            <input type="checkbox" name="isSampleOrder" value="1" checked/>拿样订单
                                        </c:when>
                                        <c:otherwise>
                                            <input type="checkbox" name="isSampleOrder" value="1"/>拿样订单
                                        </c:otherwise>
                                    </c:choose>
                                </div>
                                <input class="ui-button ui-button-lwhite ml10 fr" style="vertical-align: top;margin-right: 89px;"
                                       type="submit" value="搜 索"/>
                                    <%--<input class="ui-button ui-button-morange ml10 btndaochu" type="button" value="批量导出订单"/>--%>
                            </div>
                        </form:form>
                    </div>
                    <div class="panel-tabs">
                        <div class="panel-head">
                            <ul class="clearfix">
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==0?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=0">所有订单</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==1?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=1">等待付款</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==2?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=2">等待发货</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==3?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=3">等待收货</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==4?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=4">成交的订单</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==5?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=5">关闭的订单</a>
                                </li>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==6?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=6">退款订单</a>
                                </li>
                                <%--<li class="js-order-status ${dealerOrder.orderMuiltStatus==7?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=7">预定订单</a>
                                </li>--%>
                                <li class="js-order-status ${dealerOrder.orderMuiltStatus==8?'on':'' }">
                                    <a href="${ctx}/dealer/dealerOrder/order?orderMuiltStatus=8">尾款订单</a>
                                </li>

                            </ul>
                        </div>
                        <div class="panel-content">
                            <div class="tab-item"></div>
                            <div class="order-list">
                                <ul>
                                    <c:if test="${fn:length(pageResult.list)==0}">
                                        <li style="text-align: center"><img src="${res}/images/common/null.png"></li>
                                    </c:if>
                                    <c:forEach items="${pageResult.list}" var="order">
                                        <li>
                                            <div class="ui-box">
                                                <div class="ui-box-head ${order.isAdvancePayment?'bgc-dy':'bgc-dh'} ">
                                                    <div class="ui-box-head-title">
                                                        <label> 订单号：${order.orderId}</label>
                                                    </div>
                                                    <div class="ui-box-head-text">
                                                        <span class="ml20 c-h">订货日期：${fns:getTimeFromLong(order.createTime,"yyyy-MM-dd HH:mm:ss")}</span>
                                                    </div>
                                                    <div class="ui-box-head-text">
                                                        <span class="ml20 c-h">品牌：${order.brandsName}</span>
                                                    </div>
                                                    <div class="ui-box-head-text">
                                                        <span class="ml20 c-h">
                                                            采购类型：
                                                            <c:if test="${order.dealerOrderType eq cash}">
                                                                <c:if test="${order.isSampleOrder}">拿样</c:if>
                                                                <c:if test="${!order.isSampleOrder}">现款</c:if>
                                                            </c:if>
                                                            <c:if test="${order.dealerOrderType eq credit}">授信</c:if>
                                                            <c:if test="${order.dealerOrderType eq point}">返点</c:if>
                                                        </span>
                                                    </div>
                                                    <div class="ui-box-head-more">
                                                        <c:if test="${order.isAdvancePayment}">
                                                            <span class="progress c-r"><i></i>该订单为预定订单</span>
                                                        </c:if>
                                                        <a class="link" href="javascript:order_index.copyOrderIntoShopper('${order.refrenceId}');">复制订单</a>
                                                    </div>
                                                </div>
                                                <div class="ui-box-container">
                                                    <div class="ui-box-content">
                                                        <div class="clearfix">
                                                            <ul class="amount">
                                                                <li>
                                                                    <label>订货总量：</label><span>${order.productCount}</span>
                                                                </li>
                                                                <li>
                                                                    <label>总 货 款：</label>
                                                                    <span>
                                                                    <fmt:formatNumber  pattern="0.00">${order.productPrice + order.adjustPrice + order.adjustFreight} </fmt:formatNumber>
                                                                        <c:if test="${order.frePayType==60 }">(包邮)</c:if>
                                                                        <c:if test="${order.frePayType==1 }">(含快递:${order.adjustFreight }元)</c:if>
                                                                        <c:if test="${order.frePayType==2 }">(含物流:${order.adjustFreight }元)</c:if>
                                                                        <c:if test="${order.frePayType==3 }">(快递到付)</c:if>
                                                                        <c:if test="${order.frePayType==4 }">(物流到付)</c:if>
                                                                   </span>
                                                                </li>
                                                            </ul>
                                                            <ul class="state" style="width: 260px;">
                                                                <li>
                                                                    <label>留言：</label><span
                                                                        title="${order.remark}">${fns:trimLongText(order.remark, 40)}</span>
                                                                </li>
                                                                <c:set var="cash" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_CASH%>"/>
                                                                <c:set var="credit" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_CREDIT%>"/>
                                                                <c:set var="point" value="<%=DealerConstant.DealerOrder.ORDER_TYPE_POINT%>"/>


                                                            </ul>
                                                            <ul class="amount">
                                                                <%--<li>
                                                                    <label>订单状态：</label><strong>${}</strong>
                                                                </li>--%>
                                                                <c:if test="${null != order.logisticName }">
                                                                    <li>
                                                                        <label>物流：</label><span>${order.logisticName }</span>
                                                                    </li>
                                                                    <li>
                                                                        <label class="waybill">运单号：</label><span>${order.shipNumber }</span>
                                                                    </li>
                                                                </c:if>
                                                            </ul>
                                                            <ul class="handle" data-id="${order.refrenceId}">
                                                                <c:choose>
                                                                    <%-- 1.优先显示 有退款 --%>
                                                                    <c:when test="${not empty order.refundStatus&&order.refundStatus!=9&&order.refundStatus!=10&&order.orderStatus!=9&&order.orderStatus!=10}">
                                                                        <c:choose>
                                                                            <c:when test="${order.refundStatus == 1}">
                                                                                <c:if test="${order.serProStatus == 2}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                           class="link"><i
                                                                                                class="icon i-clock"></i>纠纷处理中</a>
                                                                                    </li>
                                                                                </c:if>
                                                                                <c:if test="${order.serProStatus != 2}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                           class="link"><i
                                                                                                class="icon i-alert-y"></i>申请退款中</a>
                                                                                    </li>
                                                                                </c:if>

                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 2}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-alert-y"></i>请退货</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 3}">
                                                                                <c:if test="${order.serProStatus == 2}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                           class="link"><i
                                                                                                class="icon i-clock"></i>纠纷处理中</a>
                                                                                    </li>
                                                                                </c:if>
                                                                                <c:if test="${order.serProStatus != 2}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                           class="link"><i
                                                                                                class="icon i-alert-y"></i>等待品牌商收货</a>
                                                                                    </li>
                                                                                </c:if>
                                                                                <c:set var="needRecved" value="true"/>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 4}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-wrong"></i>品牌商拒绝退款</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 5}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-wrong"></i>品牌商拒绝退款</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 6}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-close--"></i>退款关闭</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 7}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-close--"></i>退款关闭</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <%-- 9/10 两条件不会发生 --%>
                                                                            <c:when test="${order.refundStatus == 9}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-right"></i>退款完成</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:when test="${order.refundStatus == 10}">
                                                                                <li>
                                                                                    <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                       class="link"><i
                                                                                            class="icon i-right"></i>退款完成</a>
                                                                                </li>
                                                                            </c:when>
                                                                        </c:choose>
                                                                        <c:if test="${order.orderStatus == 4&&needRecved==null}">
                                                                            <li>
                                                                                <c:if test="${order.frePayState == 1&&order.payState==2}">
                                                                                    <a href="${ctx }/dealer/dealerOrder/receive/${order.refrenceId}"
                                                                                       class="ui-button ui-button-mblue">确认收货</a>
                                                                                </c:if>
                                                                            </li>
                                                                        </c:if>
                                                                    </c:when>
                                                                    <%-- 交易完成 --%>
                                                                    <c:when test="${order.orderStatus == 9}">
                                                                        <c:choose>
                                                                            <c:when test="${order.complainable}">
                                                                                <li>
                                                                                    <a href="javascript:;"
                                                                                       data-complaint-id="${order.refrenceId}"
                                                                                       data-serial="${order.orderId}"
                                                                                       data-brand-name="${order.brandName}"
                                                                                       class="link">投诉</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:otherwise>
                                                                                <c:choose>
                                                                                    <c:when test="${empty order.complaintState}">
                                                                                        <li>
                                                                                            <span class="c-hh">投诉期限已过</span>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 0}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-clock"></i>已递交投诉，等待处理</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 1}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-clock"></i>客服已介入投诉</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 2}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-right"></i>投诉处理完成</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 3}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-close--"></i>终端商撤销投诉</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:otherwise></c:otherwise>
                                                                                </c:choose>
                                                                            </c:otherwise>
                                                                        </c:choose>
                                                                        <li>
                                                                            <span class="c-o">交易完成</span>
                                                                        </li>
                                                                        <c:if test="${order.refundStatus ==9||order.refundStatus ==10 }">
                                                                            <li>
                                                                                <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                   class="link"><i
                                                                                        class="icon i-right"></i>退款完成</a>
                                                                            </li>
                                                                        </c:if>
                                                                        <c:if test="${order.refundStatus ==6||order.refundStatus ==7 }">
                                                                            <li>
                                                                                <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                   class="link"><i
                                                                                        class="icon i-close--"></i>退款关闭</a>
                                                                            </li>
                                                                        </c:if>
                                                                    </c:when>
                                                                    <%-- 交易关闭 --%>
                                                                    <c:when test="${order.orderStatus == 10}">
                                                                        <c:choose>
                                                                            <c:when test="${order.complainable}">
                                                                                <li>
                                                                                    <a href="javascript:;"
                                                                                       data-complaint-id="${order.refrenceId}"
                                                                                       data-serial="${order.orderId}"
                                                                                       data-brand-name="${order.brandName}"
                                                                                       class="link">投诉</a>
                                                                                </li>
                                                                            </c:when>
                                                                            <c:otherwise>
                                                                                <c:choose>
                                                                                    <c:when test="${empty order.complaintState}">
                                                                                        <li>
                                                                                            <span class="c-hh">投诉期限已过</span>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 0}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-clock"></i>已递交投诉，等待处理</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 1}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-clock"></i>客服已介入投诉</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 2}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-right"></i>投诉处理完成</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                    <c:when test="${order.complaintState == 3}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/dealerComplaint/process/${order.dealerComplaintId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-close--"></i>终端商撤销投诉</a>
                                                                                        </li>
                                                                                    </c:when>
                                                                                </c:choose>
                                                                            </c:otherwise>
                                                                        </c:choose>
                                                                        <li>
                                                                            <span class="c-hh">交易关闭</span>
                                                                        </li>
                                                                        <c:if test="${order.refundStatus ==9||order.refundStatus ==10}">
                                                                            <li>
                                                                                <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                   class="link"><i
                                                                                        class="icon i-right"></i>退款成功</a>
                                                                            </li>
                                                                        </c:if>
                                                                        <c:if test="${order.refundStatus ==6||order.refundStatus ==7}">
                                                                            <li>
                                                                                <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                   class="link"><i
                                                                                        class="icon i-close--"></i>退款关闭</a>
                                                                            </li>
                                                                        </c:if>
                                                                    </c:when>
                                                                    <%-- 2.未付款 --%>
                                                                    <c:when test="${order.payState == 0}">
                                                                        <li>
                                                                            <a href="${ctx}/dealer/dealerOrder/payment/${order.refrenceId}"
                                                                               class="ui-button ui-button-mred"
                                                                               target="_blank">付 款 </a>
                                                                        </li>
                                                                        <c:if test="${(order.dealerOrderType==1 && order.frePayState==0 && order.payState==0) or (order.dealerOrderType==2 && (order.orderStatus==1 && order.frePayState==0 && order.payState==0 && order.adjustFreight.doubleValue()==0 && order.payment.doubleValue()==0) )}">
                                                                            <li>
                                                                                <a href="javascript:void(0)"
                                                                                   data-close-number="${order.orderId}"
                                                                                   data-close-id="${order.refrenceId}"
                                                                                   data-close-brandname="${order.brandName}"
                                                                                   class="link">关闭订单</a>
                                                                            </li>
                                                                        </c:if>
                                                                        <c:if test="${order.dealerOrderType != 3}">
                                                                        <c:if test="${order.adjustFreight ==null}">
                                                                            <li>
                                                                                <a href="javascript:void(0)"
                                                                                   data-remind="2" class="link"
                                                                                   data-brandid='${order.brandId}'
                                                                                   data-orderid='${order.orderId}'>通知品牌商修改运费</a>
                                                                            </li>
                                                                        </c:if>
                                                                        </c:if>
                                                                    </c:when>
                                                                    <%-- 3.部分付款 --%>
                                                                    <c:when test="${order.payState == 1}">
                                                                        <li>
                                                                            <span class="c-y">已部分付款</span>
                                                                        </li>
                                                                        <li>
                                                                            <a href="${ctx}/dealer/dealerOrder/payment/${order.refrenceId}"
                                                                               class="ui-button ui-button-mred"
                                                                               target="_blank">继续付款</a>
                                                                        </li>
                                                                        <c:if test="${order.dealerOrderType != 3}">
                                                                        <c:if test="${order.adjustFreight ==null }">
                                                                            <li>
                                                                                <a href="javascript:void(0)"
                                                                                   data-remind="2" class="link"
                                                                                   data-brandid='${order.brandId}'
                                                                                   data-orderid='${order.orderId}'>通知品牌商修改运费</a>
                                                                            </li>
                                                                        </c:if>
                                                                        </c:if>
                                                                    </c:when>
                                                                    <c:when test="${order.payState == 2}">
                                                                        <c:choose>
                                                                            <c:when test="${order.orderStatus == 2}">
                                                                            	<c:choose>
                                                                            		<c:when test="${order.dealerOrderType == 3}">
                                                                            			<li>
	                                                                                        <span class="c-y">等待发货</span>
	                                                                                    </li>
	                                                                                    <li>
			                                                                                <a href="javascript:void(0)"
			                                                                                   data-close-number="${order.orderId}"
			                                                                                   data-close-id="${order.refrenceId}"
			                                                                                   data-close-brandname="${order.brandName}"
			                                                                                   class="link">关闭订单</a>
			                                                                            </li>
                                                                            		</c:when>
                                                                            		<c:otherwise>
                                                                            			<c:if test="${order.frePayState == 1}">
		                                                                                    <li>
		                                                                                        <span class="c-y">已付款,等待发货</span>
		                                                                                    </li>
		                                                                                    <c:if test="${order.refundStatus  == 7}">
		                                                                                        <li>
		                                                                                            <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
		                                                                                               class="link"><i
		                                                                                                    class="icon i-close--"></i>退款关闭</a>
		                                                                                        </li>
		                                                                                    </c:if>
		                                                                                    <%--<c:if test="${order.refundStatus  == null && !order.isSampleOrder}">
		                                                                                        <li>
		                                                                                            <a href="${ctx}/dealer/refund/apply?orderNumber=${order.orderId}"
		                                                                                               class="link">申请退款</a>
		                                                                                        </li>
		                                                                                    </c:if>--%>
		                                                                                </c:if>
		                                                                                <c:if test="${order.frePayState != 1}">
		                                                                                	<c:if test="${order.dealerOrderType != 3}">
		                                                                                    <c:if test="${null == order.adjustFreight}">
		                                                                                        <li>
		                                                                                            <span class="c-y">等待品牌商修改运费</span>
		                                                                                        </li>
		                                                                                        <li>
		                                                                                            <a href="javascript:void(0)"
		                                                                                               data-remind="2"
		                                                                                               class="link"
		                                                                                               data-brandid='${order.brandId}'
		                                                                                               data-orderid='${order.orderId}'>通知品牌商修改运费</a>
		                                                                                        </li>
		                                                                                    </c:if>
		                                                                                    </c:if>
		                                                                                    <c:if test="${null != order.adjustFreight}">
		                                                                                        <li>
		                                                                                            <a href="${ctx}/dealer/order/freight/${order.refrenceId}"
		                                                                                               class="ui-button ui-button-mred"
		                                                                                               target="_blank">支付运费 </a>
		                                                                                        </li>
		                                                                                    </c:if>
		                                                                                </c:if>
                                                                            		</c:otherwise>
                                                                            	</c:choose>
                                                                            </c:when>
                                                                            <c:when test="${order.orderStatus == 3}">
                                                                                <li>
                                                                                    <span class="c-r">品牌商已部分发货</span>
                                                                                </li>
                                                                                <c:if test="${order.adjustFreight!=null&&order.frePayState != 1}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/order/freight/${order.refrenceId}"
                                                                                           class="ui-button ui-button-mred"
                                                                                           target="_blank">支付运费 </a>
                                                                                    </li>
                                                                                </c:if>
                                                                                <c:if test="${order.dealerOrderType != 3}">
                                                                                <c:if test="${null == order.adjustFreight}">
                                                                                    <li>
                                                                                        <a href="javascript:void(0)"
                                                                                           data-remind="2" class="link"
                                                                                           data-brandid='${order.brandId}'
                                                                                           data-orderid='${order.orderId}'>通知品牌商修改运费</a>
                                                                                    </li>
                                                                                </c:if>
                                                                                </c:if>
                                                                            </c:when>
                                                                            <c:when test="${order.orderStatus == 4}">

                                                                                <c:if test="${order.frePayState == 1}">
                                                                                    <li>
                                                                                        <a href="${ctx }/dealer/dealerOrder/receive/${order.refrenceId}"
                                                                                           class="ui-button ui-button-mblue">确认收货</a>
                                                                                    </li>
                                                                                    <c:if test="${order.refundStatus != 6 && order.refundStatus != 7 && order.refundStatus != 9 && order.refundStatus != 10 && !order.isSampleOrder}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/refund/apply?orderNumber=${order.orderId}"
                                                                                               class="link">申请退款/退货</a>
                                                                                        </li>
                                                                                    </c:if>
                                                                                    <c:if test="${order.refundStatus == 9}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-right"></i>退款完成</a>
                                                                                        </li>
                                                                                    </c:if>
                                                                                    <c:if test="${order.refundStatus == 6}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                               class="link"><i
                                                                                                    class="icon i-close--"></i>退款关闭</a>
                                                                                        </li>
                                                                                    </c:if>
                                                                                </c:if>
                                                                                <c:if test="${order.dealerOrderType != 3}">
                                                                                <c:if test="${order.frePayState != 1}">
                                                                                    <c:if test="${null == order.adjustFreight}">
                                                                                        <li>
                                                                                            <a href="javascript:void(0)"
                                                                                               data-remind="2"
                                                                                               class="link"
                                                                                               data-brandid='${order.brandId}'
                                                                                               data-orderid='${order.orderId}'>通知品牌商修改运费</a>
                                                                                        </li>
                                                                                    </c:if>
                                                                                    <c:if test="${null != order.adjustFreight}">
                                                                                        <li>
                                                                                            <a href="${ctx}/dealer/order/freight/${order.refrenceId}"
                                                                                               class="ui-button ui-button-mred"
                                                                                               target="_blank">支付运费 </a>
                                                                                        </li>
                                                                                    </c:if>
                                                                                </c:if>
                                                                                </c:if>
                                                                                <c:if test="${order.refundStatus == 7}">
                                                                                    <li>
                                                                                        <a href="${ctx}/dealer/refund/details?orderNumber=${order.orderId}"
                                                                                           class="link"><i
                                                                                                class="icon i-close--"></i>退款关闭</a>
                                                                                    </li>
                                                                                </c:if>

                                                                            </c:when>
                                                                        </c:choose>
                                                                    </c:when>
                                                                </c:choose>
                                                                <li>
                                                                    <a href="${ctx}/dealer/dealerOrder/orderDetail/${order.refrenceId}"
                                                                       target="_blank" class="link">查看订单详情</a>
                                                                </li>
                                                                <%--<li>
                                                                    <a href="javascript:order_index.copyOrderIntoShopper('${order.refrenceId}')"
                                                                       class="link">复制订单</a>
                                                                </li>--%>
                                                            </ul>

                                                        </div>
                                                        <div>
                                                            <ul class="product">
                                                                <c:forEach items="${order.items}" var="item">
                                                                    <li>
                                                                        <a href="${ctx}/market/product/${item.productId}"
                                                                           target="_blank"
                                                                           data-order-refrenceid='${order.refrenceId}'
                                                                           data-product-id="${item.productId}"
                                                                           data-pno="${item.productNo}"
                                                                           data-ptitle="${item.productTitle}">
                                                                            <c:if test="${not empty item.image}">
                                                                                <div class="js-img-center inline-block"
                                                                                     style="width:40px;height:40px;overflow: hidden;display:inline-block;">
                                                                                    <img src="${res}${fns:getImageDomainPath(item.image,220, 220)}"
                                                                                         style="width:100%;"/></div>
                                                                            </c:if>
                                                                            <h4>${item.productNo}</h4>
                                                                        </a>
                                                                    </li>
                                                                </c:forEach>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </c:forEach>
                                </ul>
                            </div>
                            <div class="mt10">
                                <div id="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="/WEB-INF/view/dealer/agency_footer.jsp"/>
</div>
<div class="hide">
    <!--关闭交易-->
    <div id="closePanel" class="clearfix">
        <div class="ui-head">
            <h3>我要关闭交易</h3>
        </div>
        <form:form id="close-form" class="ui-form">
            <fieldset>
                <legend>我要关闭交易</legend>
                <div class="ui-form-item">
                    <label class="ui-label">申请关闭交易的原因：</label>
                    <select name="code" class="ui-select">
                        <option value="0">我不想买了</option>
                        <option value="1">信息填写错误</option>
                        <option value="2">品牌商缺货</option>
                        <option value="3">其他原因</option>
                    </select>
                </div>
                <input type="hidden" name="orderId"/>
                <input type="hidden" name="brandName"/>
                <input type="hidden" name="number"/>

                <div style="padding-left: 60px;" class="ui-form-item close-operate">
                    <input type="submit" class="ui-button ui-button-mred" value="提 交"/>
                    <input type="button" id="refund_Cancel" class="ui-button ui-button-morange" value="取 消"/>
                </div>
            </fieldset>
        </form:form>
    </div>

    <div id="complaintPanel" class="clearfix">
        <div class="ui-head">
            <h3>我要投诉</h3>
        </div>
        <form:form id="complain-form" class="ui-form" action="Purchases-complain.jsp">
            <fieldset>
                <legend>我要投诉</legend>
                <div class="ui-form-item">
                    <label for="" class="ui-label">订单号：</label>

                    <p class="ui-form-text" id="serial"></p>
                </div>
                <div class="ui-form-item">
                    <label for="" class="ui-label">品牌商：</label>

                    <p class="ui-form-text" id="brand-name"></p>
                </div>
                <div class="ui-form-item">
                    <label for="" class="ui-label">投诉原因：</label>
                    <select name="complaintCause" class="ui-select">
                        <option value="1">未按约定时间发货</option>
                        <option value="2">未按成交价格进行交易</option>
                        <option value="3">承诺的没做到</option>
                        <option value="4">违反交易流程</option>
                    </select>
                </div>
                <div class="ui-form-item">
                    <label for="" class="ui-label">备注：</label>
                    <textarea id="complaintname_id" name="complaintName" class="ui-textarea"></textarea>
                </div>
                <input type="hidden" name="orderId"/>

                <div class="ui-form-item complaint-operate">
                    <input type="submit" class="ui-button ui-button-mred" value="确定投诉"/>
                    <input type="button" class="ui-button ui-button-morange" value="取消投诉"/>
                </div>
                <div>
                    <span class="c-r">*</span><span class="c-h">收到您的投诉申请后,8637品牌超级代理工作人员将在${dictValue }个工作日内对您的投诉做出反馈,请耐心等待...</span>
                </div>
            </fieldset>
        </form:form>
    </div>
</div>
<div id="detailPanel" class="detailPanel hide clearfix"></div>
<script id="detail-template" type="text/html">
    <div class="panel-table">
        <div class="panel-table-title">
            <h4 class="fs14 ta-c" title="{{ptitle}}">{{$trimLongString ptitle 20}}</h4>
        </div>
        <div class="panel-table-content" style="max-height:175px;_height:175px;overflow:auto;">
            <table class="ui-table">
                <thead>
                <tr>
                    <th>颜色/尺码</th>
                    <th>单价</th>
                    <th>数量</th>
                    <th>状态</th>
                </tr>
                </thead>
                <tbody>
                {{each rows}}
                {{if $index<6}}
                <tr>
                    <td>
                        <%--    {{if $value.icon}}
                            <img src="${res}{{$value.}}" style="vertical-align: middle;" class="mr5" />
                            {{/if}}--%>
                        {{$value.productSkuName}}
                    </td>
                    <td>
                        {{if $value.adjustPrice != null}}
                            {{formatNumber $value.adjustPrice/$value.quantity}}
                        {{else}}
                            {{if $value.oldPrice != null}}
                                {{formatNumber $value.price}}
                            {{else}}
                                {{if $value.discount != null}}
                                    {{formatNumber $value.price*$value.discount}}
                                {{else}}
                                    {{formatNumber $value.price}}
                                {{/if}}
                            {{/if}}
                        {{/if}}
                    </td>
                    <td>{{$value.quantity}}</td>
                    <td>{{if $value.quantity == $value.shipCount}}
                        <span class="c-o">已全部发货</span>
                        {{else if $value.shipCount == null || $value.shipCount == 0}}
                        <span class="c-b">等待发货</span>
                        {{else}}
                        <span class="c-b">已发{{$value.shipCount}}件</span>
                        {{/if}}
                    </td>
                </tr>
                {{else}}
                {{if $index==6}}
                <tr>
                    <td colspan="5"><a target='_blank' href='${ctx}/dealer/dealerOrder/orderDetail/{{orderId}}'>查看更多</a></td>
                </tr>
                {{/if}}
                {{/if}}
                {{/each}}
                </tbody>
            </table>
        </div>
    </div>
</script>
<jsp:include page="/WEB-INF/view/dealer/import_javascript.jsp"/>
<script src="${src}/dealer/order.js"></script>
<script>
    var totalPage = ${pageResult.page.totalPage};
    var currentPage = ${pageResult.page.currentPage};
    order_index.init();


</script>
</body>
</html>
