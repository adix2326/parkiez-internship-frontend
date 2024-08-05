package com.sessionManagement.sessionManagement.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Parking")
public class Parking
{
    @Id
    private String parkingId;

    private String operatorId;

    private String title;
    private String costingType;
    private String description;
    private int cost2wheeler;
    private int cost4wheeler;
    private String latitude;
    private String longitude;
    private boolean availability;
    private int capacity2wheeler;
    private int capacity4wheeler;
    private int remaining2wheeler;
    private int remaining4wheeler;
    private String address;
    private String pinCode;

    public Parking(String parkingId, String operatorId, String title, String costingType, String description, int cost2wheeler, int cost4wheeler, String latitude, String longitude, boolean availability, int capacity2wheeler, int capacity4wheeler, int remaining2wheeler, int remaining4wheeler, String address, String pinCode) {
        this.parkingId = parkingId;
        this.operatorId = operatorId;
        this.title = title;
        this.costingType = costingType;
        this.description = description;
        this.cost2wheeler = cost2wheeler;
        this.cost4wheeler = cost4wheeler;
        this.latitude = latitude;
        this.longitude = longitude;
        this.availability = availability;
        this.capacity2wheeler = capacity2wheeler;
        this.capacity4wheeler = capacity4wheeler;
        this.remaining2wheeler = capacity2wheeler;
        this.remaining4wheeler = capacity4wheeler;
        this.address = address;
        this.pinCode = pinCode;
    }

    public String getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(String operatorId) {
        this.operatorId = operatorId;
    }

    public String getParkingId() {
        return parkingId;
    }

    public void setParkingId(String parkingId) {
        this.parkingId = parkingId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCostingType() {
        return costingType;
    }

    public void setCostingType(String costingType) {
        this.costingType = costingType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getCost2wheeler() {
        return cost2wheeler;
    }

    public void setCost2wheeler(int cost2wheeler) {
        this.cost2wheeler = cost2wheeler;
    }

    public int getCost4wheeler() {
        return cost4wheeler;
    }

    public void setCost4wheeler(int cost4wheeler) {
        this.cost4wheeler = cost4wheeler;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public int getCapacity2wheeler() {
        return capacity2wheeler;
    }

    public void setCapacity2wheeler(int capacity2wheeler) {
        this.capacity2wheeler = capacity2wheeler;
    }

    public int getCapacity4wheeler() {
        return capacity4wheeler;
    }

    public void setCapacity4wheeler(int capacity4wheeler) {
        this.capacity4wheeler = capacity4wheeler;
    }

    public int getRemaining2wheeler() {
        return remaining2wheeler;
    }

    public void setRemaining2wheeler(int remaining2wheeler) {
        this.remaining2wheeler = remaining2wheeler;
    }

    public int getRemaining4wheeler() {
        return remaining4wheeler;
    }

    public void setRemaining4wheeler(int remaining4wheeler) {
        this.remaining4wheeler = remaining4wheeler;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public Parking() {
    }


}