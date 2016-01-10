/*
 * Copyright 2015 Zttx, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.module.exhibition.service;


import com.zttx.sdk.core.GenericServiceApiImpl;
import com.zttx.web.module.exhibition.entity.DecorateImage;
import com.zttx.web.module.exhibition.mapper.DecorateImageMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 展厅自定义滚动图片内容 服务实现类
 * <p>File：DecorateImage.java </p>
 * <p>Title: DecorateImage </p>
 * <p>Description:DecorateImage </p>
 * <p>Copyright: Copyright (c) May 26, 2015</p>
 * <p>Company: 8637.com</p>
 * @author Playguy
 * @version 1.0
 */
@Service
public class DecorateImageServiceImpl extends GenericServiceApiImpl<DecorateImage> implements DecorateImageService
{

    private DecorateImageMapper decorateImageMapper;

    @Autowired(required = true)
    public DecorateImageServiceImpl(DecorateImageMapper decorateImageMapper)
    {
        super(decorateImageMapper);
        this.decorateImageMapper = decorateImageMapper;
    }
}
