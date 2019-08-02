package com.dit.ebay.request;
import com.dit.ebay.model.RoleName;
import org.springframework.data.geo.Point;

import javax.validation.constraints.*;

public class SignUpRequest {

    @NotBlank
    @Size(min = 2, max = 80)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 80)
    private String lastName;

    @NotBlank
    @Size(min = 4, max = 80)
    private String username;

    @NotBlank
    @Size(min = 8, max = 45)
    private String password;

    @NotBlank
    @Size(max = 80)
    @Email
    private String email;

    private RoleName role;

    @Size(max = 80)
    private String tin; // AFM

    @Size(max = 150)
    private String streetAddress;

    private Point geo_location;

    @Size(max = 45)
    private String postalCode;

    @Size(max = 45)
    private String country;

    @Size(max = 45)
    private String city;

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

    public void setRole(RoleName role) { this.role = role; }

    public RoleName getRole() { return role; }

    public String getTin() { return tin; }

    public void setTin(String tin) { this.tin = tin; }

    public String getStreetAddress() { return streetAddress; }

    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }

    public Point getGeo_location() { return geo_location; }

    public void setGeo_location(Point geo_location) { this.geo_location = geo_location; }

    public String getPostalCode() { return postalCode; }

    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getCountry() { return country; }

    public void setCountry(String country) { this.country = country; }

    public String getCity() { return city; }

    public void setCity(String city) { this.city = city; }
}