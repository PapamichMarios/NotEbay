package com.dit.ebay.json_model;

import com.fasterxml.jackson.annotation.*;

import java.util.ArrayList;
import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonRootName("Items")
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
