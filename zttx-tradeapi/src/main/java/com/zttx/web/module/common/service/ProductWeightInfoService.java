/*
 * Copyright 2015 Zttx, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.module.common.service;

import com.zttx.sdk.bean.PaginateResult;
import com.zttx.sdk.bean.Pagination;
import com.zttx.sdk.core.GenericServiceApi;
import com.zttx.web.module.common.entity.ProductWeightInfo;
/**
 * ProductWeightInfo 服务接口
 * <p>File：ProductWeightInfoService.java </p>
 * <p>Title: ProductWeightInfoService </p>
 * <p>Description:ProductWeightInfoService </p>
 * <p>Copyright: Copyright (c) May 26, 2015</p>
 * <p>Company: 8637.com</p>
 * @author Playguy
 * @version 1.0
 */
public interface ProductWeightInfoService extends GenericServiceApi<ProductWeightInfo>{
    /**
     * 分页查询
     * @param searchBean 查询条件
     * @param page 分页条件
     * @return
     */
    PaginateResult<ProductWeightInfo> searchByClient(ProductWeightInfo searchBean, Pagination page);
}
