package com.sessionManagement.sessionManagement.controllers;

import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.documents.Booking;
import com.sessionManagement.sessionManagement.documents.Parking;
import com.sessionManagement.sessionManagement.repo.AttendantRepo;
import com.sessionManagement.sessionManagement.repo.BookingRepo;
import com.sessionManagement.sessionManagement.repo.ParkingRepo;
import com.sessionManagement.sessionManagement.services.AttendantService;
import com.sessionManagement.sessionManagement.services.BookingService;
import com.sessionManagement.sessionManagement.services.TransactionIdSequenceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("api/attendant")
@PreAuthorize("hasRole('ROLE_ATTENDANT')")
@CrossOrigin( origins = "http://localhost:5173/", allowCredentials = "true")
public class AttendantController
{
    @Autowired
    private AttendantService attendantService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ParkingRepo parkingRepo;

    @Autowired
    private AttendantRepo attendantRepo;
    @Autowired
    private TransactionIdSequenceService transactionIdSequenceService;

    @GetMapping("/forAttendant")
    public  String forAttendantTest()
    {
        return "You have access(Attendant's)";
    }

    @PostMapping("/addBooking")
    public ResponseEntity<?> addBooking(@Valid @RequestParam String paymentType,
                                               @RequestParam String vehicleNo,
                                               @RequestParam String vehicleType,
                                               @RequestParam String phoneNo,
                                               @RequestParam String attendantPhoneNo) {
        System.out.println("hi dhamale");
        Optional<Attendant> attendantOpt = attendantRepo.findByPhoneNo(attendantPhoneNo);

        if (!attendantOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Attendant not found with phone number: " + attendantPhoneNo);
        }

        Attendant attendant = attendantOpt.get();
        String parkingId = attendant.getParkingId();

        Booking booking = new Booking(paymentType, vehicleNo, vehicleType, phoneNo);
        booking.setAttendantPhoneNo(attendantPhoneNo);

        booking.setParkingId(parkingId);
        booking.setInTime(LocalDateTime.now());
        booking.setOutTime(LocalDateTime.now());
        booking.setAmountPaid(0);
        long transactionId = transactionIdSequenceService.generateSequence("transaction_sequence");
        booking.setTransactionId(String.valueOf(transactionId));
//        System.out.println(booking.toString());
        return ResponseEntity.ok(bookingRepo.save(booking));
    }

    @PostMapping("/exit")
    public ResponseEntity<?> exitParking(@RequestParam String vehicleNo) {
        System.out.println("exitParking method called with vehicleNo: " + vehicleNo);

        // Fetch the booking details using the vehicle number
        Optional<Booking> bookingOpt = bookingRepo.findBookingsByVehicleNo(vehicleNo);


        System.out.println("Booking found: " + bookingOpt);

        if (!bookingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found with vehicle number: " + vehicleNo);
        }

        Booking booking = bookingOpt.get();
        booking.setOutTime(LocalDateTime.now());

        // Fetch the parking details using the parking ID from booking
        String parkingId = booking.getParkingId();
        System.out.println("Parking ID: " + parkingId);
        Optional<Parking> parkingOpt = parkingRepo.findById(parkingId);
        System.out.println("Parking found: " + parkingOpt);

        if (!parkingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Parking details not found for the booking.");
        }

        Parking parking = parkingOpt.get();
        String costingType = parking.getCostingType();
        int amountPaid = 0;

        // Calculate the amount to be paid based on costing type
        if (costingType.equalsIgnoreCase("fixed")) {
            if (booking.getVehicleType().equalsIgnoreCase("2wheeler")) {
                amountPaid = parking.getCost2wheeler();
            } else if (booking.getVehicleType().equalsIgnoreCase("4wheeler")) {
                amountPaid = parking.getCost4wheeler();
            }
        } else if (costingType.equalsIgnoreCase("hourly")) {
            long durationMinutes = java.time.Duration.between(booking.getInTime(), booking.getOutTime()).toMinutes();
            int hourlyRate = booking.getVehicleType().equalsIgnoreCase("2wheeler") ?
                    parking.getCost2wheeler() : parking.getCost4wheeler();
            amountPaid = (int) ((durationMinutes / 60.0) * hourlyRate);
            System.out.println("Duration in Minutes: " + durationMinutes);
            System.out.println("Hourly Rate: " + hourlyRate);
            System.out.println("Amount Paid: " + amountPaid);
        }

        booking.setAmountPaid(amountPaid);

        // Save the updated booking
        bookingRepo.save(booking);

        return ResponseEntity.ok(booking);
    }


}

