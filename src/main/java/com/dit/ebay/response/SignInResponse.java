package com.dit.ebay.response;

public class SignInResponse {

    private String accessToken;
    private String tokenType = "Bearer";

    private String username;
    private String firstName;
    private String lastName;
    private boolean isAdmin; // True is admin else false

    public SignInResponse(String accessToken, String username, String firstName, String lastName, boolean isAdmin) {
        this.accessToken = accessToken;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isAdmin() { return isAdmin; }

    public void setAdmin(boolean admin) { isAdmin = admin; }
}