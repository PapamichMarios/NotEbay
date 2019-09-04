package com.dit.ebay.xml_model.xml_adapters;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParsePosition;
import java.util.Locale;


public class XmlDollarAdapter extends XmlAdapter<String, BigDecimal> {

    private final Locale in_ID = new Locale("en","US");
    private final DecimalFormat dfImport = (DecimalFormat) NumberFormat.getInstance(in_ID);
    private final DecimalFormat dfExport = new DecimalFormat("#,###.00");

    public BigDecimal unmarshal(String money) throws Exception {
        money = money.replace("$","");
        dfImport.setParseBigDecimal(true);
        return (BigDecimal)dfImport.parse(money, new ParsePosition(0));
    }

    public String marshal(BigDecimal money) throws Exception {
        return "$" + dfExport.format(money);
    }
}