package com.sessionManagement.sessionManagement.Payload.EntityInfo;

import java.util.List;

public class AdminUserInfoResponse
{
    private String id;
    private String username;
    private List<String> roles;

    public AdminUserInfoResponse(String id, String username, List<String> roles) {
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

    public AdminUserInfoResponse() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
