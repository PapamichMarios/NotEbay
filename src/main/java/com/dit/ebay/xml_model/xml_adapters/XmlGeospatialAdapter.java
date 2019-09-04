package com.dit.ebay.xml_model.xml_adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.math.BigDecimal;


public class XmlGeospatialAdapter extends XmlAdapter<String, BigDecimal> {

    public BigDecimal unmarshal(String val) throws Exception {
        return new BigDecimal(val);
    }

    public String marshal(BigDecimal val) throws Exception {
        return val != null ? val.toString() : null;
    }
}
