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

    @Column(name = "country")
    private String country;

    @JsonIgnore // maybe change it later
    @Column(name = "location", columnDefinition = "Point")
    private Point location;

    @JsonIgnore
    @Column(name = "image_path")
    private String imagePath;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
