package com.dit.ebay.xml_model;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class XMLDollarAdapter extends XmlAdapter<String, Double> {

    public Double unmarshal(String val) throws Exception {
        String newVal = val.replace("$", "");
        return Double.parseDouble(newVal);
    }

    public String marshal(Double val) throws Exception {
        return "$" + val.toString();
    }
}