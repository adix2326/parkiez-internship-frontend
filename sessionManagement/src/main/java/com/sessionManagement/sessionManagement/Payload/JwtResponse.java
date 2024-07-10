package com.sessionManagement.sessionManagement.Payload;

public class JwtResponse
{
    private String id;
    private String username;
    private String jwt;

    public JwtResponse(String id, String username, String jwt) {
        this.id = id;
        this.username = username;
        this.jwt = jwt;
    }
}
