package com.dit.ebay.xml_model;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "Items")
@XmlAccessorType(XmlAccessType.FIELD)
public class XmlItems {

    @XmlElement(name = "Item")
    private List<XmlItem> xmlItems = new ArrayList<>();

    public XmlItems() {

    }

    public List<XmlItem> getXmlItems() {
        return xmlItems;
    }

    public void setXmlItems(List<XmlItem> xmlItems) {
        this.xmlItems = xmlItems;
    }

    public void addItem(XmlItem xmlItem) {
       // if (xmlItems == null) xmlItems = new ArrayList<>();
        xmlItems.add(xmlItem);
    }

    @Override
    public String toString() {
        return "XmlItems{" +
                "xmlItems=" + xmlItems +
                "}\n";
    }
}
