package com.dit.ebay.json_model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import java.util.ArrayList;
import java.util.List;


//@JsonRootName(value = "Items")
public class JsonItems {

    @JsonProperty("Items")
    private List<JsonItem> jsonItems = new ArrayList<>();

    public JsonItems() {
    }

    public List<JsonItem> getJsonItems() {
        return jsonItems;
    }

    public void setJsonItems(List<JsonItem> jsonItems) {
        this.jsonItems = jsonItems;
    }

    public void addItem(JsonItem jsonItem) {
        jsonItems.add(jsonItem);
    }
}
