package com.dit.ebay.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class User {

    private @Id @GeneratedValue Long id;
    private @NotBlank String email;
    private @NotBlank String username;

    private User() {}

    public User(String email, String username){
        this.email = email;
        this.username = username;
    }
}