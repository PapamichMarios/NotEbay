package com.dit.ebay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories", schema = "ted_db")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "category")
    private String category;

    public Category() {

    }

    public Category(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
