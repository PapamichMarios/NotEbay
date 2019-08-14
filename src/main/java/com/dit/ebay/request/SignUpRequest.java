package com.dit.ebay.request;

import javax.validation.constraints.*;

import com.dit.ebay.util.JsonGeoPoint;

public class SignUpRequest {

    @NotNull
    @Size(min = 2, max = 80)
    private String firstName;

    @NotNull
    @Size(min = 2, max = 80)
    private String lastName;

    @NotNull
    @Size(min = 4, max = 80)
    private String username;

    @NotNull
    @Size(min = 8, max = 45)
    private String password;

    @NotNull
    @Size(max = 80)
    @Email
    private String email;

    @Size(max = 80)
    private String tin; // AFM

    @Size(max = 150)
    private String streetAddress;

    private JsonGeoPoint jgp;  // TODO : Marios add geoLocation to your rest call

    @Size(max = 45)
    private String postalCode;

    @Size(max = 45)
    private String country;

    @Size(max = 45)
    private String city;

    @Size(max = 45)
    private String phone;

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getTin() { return tin; }

    public void setTin(String tin) { this.tin = tin; }

    public String getStreetAddress() { return streetAddress; }

    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public String getPostalCode() { return postalCode; }

    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getCountry() { return country; }

    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }

    public void setCity(String city) { this.city = city; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public JsonGeoPoint getJgp() {
        return jgp;
    }

    public void setJgp(JsonGeoPoint jgp) {
        this.jgp = jgp;
    }
}