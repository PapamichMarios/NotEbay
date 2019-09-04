package com.dit.ebay.xml_model.xml_adapters;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class XmlDateAdapter extends XmlAdapter<String, Timestamp> {

    private SimpleDateFormat dateFormat = new SimpleDateFormat("MMM-dd-yy HH:mm:ss");

    @Override
    public String marshal(Timestamp v) throws Exception {
        return dateFormat.format(v);
    }

    @Override
    public Timestamp unmarshal(String v) throws Exception {
        Date date = dateFormat.parse(v);
        return new Timestamp(date.getTime());
    }

}