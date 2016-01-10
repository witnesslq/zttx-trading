/*
 * @(#)BindingExcetionResolver 2014/4/17 13:36
 * Copyright 2014 夏铭, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.exception.handler;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.validation.BindException;
import org.springframework.validation.ObjectError;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;

import com.zttx.sdk.bean.JsonMessage;
import com.zttx.web.consts.CommonConst;

/**
 * <p>File：BindingExcetionResolver</p>
 * <p>Title: </p>
 * <p>Description: 参数验证、绑定异常处理类</p>
 * <p>Copyright: Copyright (c) 2014 2014/4/17 13:36</p>
 * <p>Company: 8637.com</p>
 *
 * @author 夏铭
 * @version 1.0
 */
public class BindingExcetionResolver extends AbstractBaseExceptionResolver
{
    @Override
    protected boolean isSupportedException(Exception ex)
    {
        return ex instanceof BindException;
    }
    
    @Override
    protected ModelAndView doNormalResolveHandlerMethodException(HttpServletRequest request, HttpServletResponse response, HandlerMethod handlerMethod, Exception ex)
    {
        BindException bindException = (BindException) ex;
        List<ObjectError> allErrors = bindException.getBindingResult().getAllErrors();
        StringBuilder messageBuilder = new StringBuilder();
        for (ObjectError error : allErrors)
            messageBuilder.append(error.getDefaultMessage()).append("<br />");
        return new ModelAndView("error/500", "message", messageBuilder.toString());
    }
    
    @Override
    protected ModelAndView doAjaxResolveHandlerMethodException(HttpServletRequest request, HttpServletResponse response, HandlerMethod handlerMethod, Exception ex)
    {
        BindException bindException = (BindException) ex;
        HttpMessageConverter<Object> messageConverter = getJsonMessageConverter();
        HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);
        outputMessage.getHeaders().add("Content-Type", "text/plain;charset=UTF-8");
        StringBuilder msgBuilder = new StringBuilder();
        for (ObjectError error : bindException.getAllErrors())
            msgBuilder.append(error.getDefaultMessage()).append("\n");
        JsonMessage jsonMessage = new JsonMessage();
        jsonMessage.setCode(CommonConst.PARAMS_VALID_ERR.getCode());
        jsonMessage.setMessage(StringEscapeUtils.escapeHtml4(msgBuilder.toString()));
        try
        {
            messageConverter.write(jsonMessage, MediaType.APPLICATION_JSON, outputMessage);
            return new ModelAndView();
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return null;
    }
}
