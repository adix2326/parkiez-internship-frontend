package com.sessionManagement.sessionManagement.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collation = "Booking")
public class Booking
{
    @Id
    private String bookingId;

    private String parkingId;
    private String paymentType;

    public Booking(String bookingId, String parkingId, String paymentType, String vheicleType, LocalDateTime inTime, LocalDateTime outTime, String vehicleNo, String phoneNo, String transactionId, String attendantPhoneNo) {
        this.bookingId = bookingId;
        this.parkingId = parkingId;
        this.paymentType = paymentType;
        this.vheicleType = vheicleType;
        this.inTime = inTime;
        this.outTime = outTime;
        this.vehicleNo = vehicleNo;
        this.phoneNo = phoneNo;
        this.transactionId = transactionId;
        this.attendantPhoneNo = attendantPhoneNo;
    }

    private String vheicleType;

    private LocalDateTime inTime;
    private LocalDateTime outTime;
    private String vehicleNo;
    private String phoneNo;
    private String transactionId;

    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getParkingId() {
        return parkingId;
    }

    public void setParkingId(String parkingId) {
        this.parkingId = parkingId;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public String getVheicleType() {
        return vheicleType;
    }

    public void setVheicleType(String vheicleType) {
        this.vheicleType = vheicleType;
    }

    public LocalDateTime getInTime() {
        return inTime;
    }

    public void setInTime(LocalDateTime inTime) {
        this.inTime = inTime;
    }

    public LocalDateTime getOutTime() {
        return outTime;
    }

    public void setOutTime(LocalDateTime outTime) {
        this.outTime = outTime;
    }

    public String getVehicleNo() {
        return vehicleNo;
    }

    public void setVehicleNo(String vehicleNo) {
        this.vehicleNo = vehicleNo;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getAttendantPhoneNo() {
        return attendantPhoneNo;
    }

    public void setAttendantPhoneNo(String attendantPhoneNo) {
        this.attendantPhoneNo = attendantPhoneNo;
    }

    private String attendantPhoneNo;



}
