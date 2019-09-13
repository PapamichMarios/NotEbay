package com.dit.ebay.csv_model;

import com.opencsv.bean.CsvBindByName;

public class CsvCategory {

    @CsvBindByName(column ="category")
    private String categories;

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }
}
