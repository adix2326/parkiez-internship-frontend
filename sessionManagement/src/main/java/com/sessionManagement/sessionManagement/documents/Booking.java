package com.sessionManagement.sessionManagement.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "Booking")
public class Booking
{
    @Id
    private String bookingId;

    private String parkingId;
    private String paymentType;
    private LocalDateTime inTime;
    private LocalDateTime outTime;
    private String vehicleNo;

    private String vehicleType;
    private String phoneNo;
    private String transactionId;
    private String attendantPhoneNo;

    private int amountPaid;

    public int getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(int amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Booking(String paymentType, String vehicleNo, String vehicleType, String phoneNo) {
        this.paymentType = paymentType;
        this.vehicleNo = vehicleNo;
        this.vehicleType = vehicleType;
        this.phoneNo = phoneNo;
    }

    public Booking(String parkingId, String paymentType, LocalDateTime inTime, LocalDateTime outTime, String vehicleNo, String vehicleType, String phoneNo, String transactionId, String attendantPhoneNo) {
        this.parkingId = parkingId;
        this.paymentType = paymentType;
        this.inTime = inTime;
        this.outTime = outTime;
        this.vehicleNo = vehicleNo;
        this.vehicleType = vehicleType;
        this.phoneNo = phoneNo;
        this.transactionId = transactionId;
        this.attendantPhoneNo = attendantPhoneNo;
    }

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

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
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

    public LocalDate getInDate()
    {
        return inTime.toLocalDate();
    }

    public LocalDate getOutDate()
    {
        return outTime.toLocalDate();
    }

//    public LocalTime getInTime()
//    {
//        return inTime.toLocalTime();
//    }
public Booking() {
}

}
