package com.equipment.model.system;

import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * <p>
 * 
 * </p>
 *
 * @author atguigu
 * @since 2024-06-11
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class WqS implements Serializable {

    private static final long serialVersionUID = 1L;

      private Integer id;

    private String name;

    private String xb;

    private String df;

    private String dd;


}
