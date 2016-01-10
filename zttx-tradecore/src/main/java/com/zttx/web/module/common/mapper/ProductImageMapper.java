/*
 * Copyright 2015 Zttx, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.module.common.mapper;

import com.zttx.sdk.annotation.MyBatisDao;
import com.zttx.web.module.common.entity.ProductImage;

import java.util.List;

/**
 * 品牌商产品图片信息 持久层接口
 * <p>File：ProductImageDao.java </p>
 * <p>Title: ProductImageDao </p>
 * <p>Description:ProductImageDao </p>
 * <p>Copyright: Copyright (c) May 26, 2015</p>
 * <p>Company: 8637.com</p>
 * @author Playguy
 * @version 1.0
 */
@MyBatisDao
public interface ProductImageMapper
{
    /**
     * 根据产品编号取图片信息
     * @param productId
     * @return  {@link List}
     */
    List<ProductImage> getProductImagesByProductId(String productId);
}
