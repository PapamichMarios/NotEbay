package com.dit.ebay.xml_model.xml_adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class XMLRatingAdapter extends XmlAdapter<String, Double> {

    public Double unmarshal(String val) throws Exception {
        return Double.parseDouble(val);
    }

    public String marshal(Double val) throws Exception {
        return val.toString();
    }
}