//
//
package com.equipment.model.vo;

import java.io.Serializable;

/**
 * <p>
 * 角色查询实体
 * </p>
 *
 * @author qy
 * @since 2019-11-08
 */
public class SysCertificateClassQueryVo implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String keyword;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
}

