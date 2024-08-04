package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.Booking;
import com.sessionManagement.sessionManagement.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService
{
    @Autowired
    private BookingRepo bookingRepo;
    public long countFourWheelerBookingsToday(String parkingId) {
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

        List<Booking> bookings = bookingRepo.find4WheelerBookingsByParkingIdAndDateRange(parkingId, startOfDay, endOfDay);

        return bookings.size();
    }
    public long countTwoWheelerBookingsToday(String parkingId) {
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

        List<Booking> bookings = bookingRepo.find2WheelerBookingsByParkingIdAndDateRange(parkingId, startOfDay, endOfDay);

        return bookings.size();
    }

    public Optional<Booking> findBookingWithSameInAndOutTime(String vehicleNo) {
        Optional<Booking> bookings = bookingRepo.findBookingsByVehicleNo(vehicleNo);
        return bookings.stream()
                .filter(booking -> booking.getInTime().equals(booking.getOutTime()))
                .findFirst();
    }
}
