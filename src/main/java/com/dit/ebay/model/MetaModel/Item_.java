package com.dit.ebay.model.MetaModel;


import com.dit.ebay.model.Category;
import com.dit.ebay.model.Item;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.math.BigDecimal;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Item.class)
public abstract class Item_ {

    public static volatile SingularAttribute<Item, Long> id;
    public static volatile SingularAttribute<Item, Category> category;
    public static volatile SingularAttribute<Item, String> location;
    public static volatile SingularAttribute<Item, String> country;
    public static volatile SingularAttribute<Item, BigDecimal> buyPrice ;
    public static volatile SingularAttribute<Item, String> name;
    public static volatile SingularAttribute<Item, String> description;
}
