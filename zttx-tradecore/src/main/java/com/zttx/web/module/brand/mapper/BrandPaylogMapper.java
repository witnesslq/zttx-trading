/*
 * Copyright 2015 Zttx, Inc. All rights reserved. 8637.com
 * PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
package com.zttx.web.module.brand.mapper;

import com.zttx.sdk.annotation.MyBatisDao;
import com.zttx.sdk.core.GenericMapper;
import com.zttx.web.module.brand.entity.BrandPaylog;

/**
 * 支付密码修改历史 持久层接口
 * <p>File：BrandPaylogDao.java </p>
 * <p>Title: BrandPaylogDao </p>
 * <p>Description:BrandPaylogDao </p>
 * <p>Copyright: Copyright (c) May 26, 2015</p>
 * <p>Company: 8637.com</p>
 * @author Playguy
 * @version 1.0
 */
@MyBatisDao
public interface BrandPaylogMapper extends GenericMapper<BrandPaylog>
{
}
