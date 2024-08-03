package com.sessionManagement.sessionManagement.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "Attendant")
public class Attendant
{
    @Id
    private String userId;
    private String phoneNo;
    private String password;
    private String parkingId;
    private String name;
    private Set<Role> roles = new HashSet<>();

    @Override
    public String toString() {
        return "Attendant{" +
                "userId='" + userId + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", password='" + password + '\'' +
                ", parkingId='" + parkingId + '\'' +
                ", name='" + name + '\'' +
                ", roles=" + roles +
                '}';
    }

    public Attendant()
    {

    }

    public Attendant(String phoneNo, String parkingId, String name, String password)
    {
        this.phoneNo = phoneNo;
        this.parkingId = parkingId;
        this.name = name;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getParkingId() {
        return parkingId;
    }

    public void setParkingId(String parkingId) {
        this.parkingId = parkingId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
