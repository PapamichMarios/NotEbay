package com.dit.ebay.util;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.SqlResultSetMapping;

public class LevelCategory {
    private Long id;
    private String name;
    private Long lvl;

    public LevelCategory(Long id, String name, Long lvl) {
        this.id = id;
        this.name = name;
        this.lvl = lvl-1;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLvl() {
        return lvl;
    }

    public void setLvl(Long lvl) {
        this.lvl = lvl;
    }
}
