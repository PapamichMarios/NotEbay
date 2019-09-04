package com.dit.ebay.xml_model.xml_adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class XmlRatingAdapter extends XmlAdapter<String, Long> {

    public Long unmarshal(String val) throws Exception {
        return Long.parseLong(val);
    }

    public String marshal(Long val) throws Exception {
        return val != null ? val.toString() : null;
    }
}