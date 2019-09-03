package com.dit.ebay.xml_model;

import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "Items")
@XmlAccessorType(XmlAccessType.FIELD)
public class XMLItems {

    @XmlElement(name = "Item")
    private List<XMLItem> xmlItems = null;

    public List<XMLItem> getXmlItems() {
        return xmlItems;
    }

    public void setXmlItems(List<XMLItem> xmlItems) {
        this.xmlItems = xmlItems;
    }

    public void addItem(XMLItem xmlItem) {
        if (xmlItems == null) xmlItems = new ArrayList<>();
        xmlItems.add(xmlItem);
    }

    @Override
    public String toString() {
        return "XMLItems{" +
                "xmlItems=" + xmlItems +
                "}\n";
    }
}
