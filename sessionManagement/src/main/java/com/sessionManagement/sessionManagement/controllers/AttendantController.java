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
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

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

    @GetMapping("/currentlyParkedVehicles")
    public ResponseEntity<?> currentlyParked2Wheelers(@RequestParam String phoneNo){
        HashMap<String, Long> pair = new HashMap<>();
        Optional<Attendant> attendant = attendantRepo.findByPhoneNo(phoneNo);
        if(attendant.isPresent()){
            Attendant attendant1  = attendant.get();
            if (!parkingRepo.existsById(attendant1.getParkingId())) {
                return ResponseEntity.badRequest().body("Parking with specified parking ID does not exist");
            }
            if (!attendantRepo.existsByPhoneNo(phoneNo)){
                return ResponseEntity.badRequest().body("Attendant with specified phone number does not exist");
            }

            String parkingId = attendant1.getParkingId();
            System.out.println(parkingId);
            long totalParkedFourWheelers = bookingRepo.countParkedFourWheelers(parkingId);
            long totalParkedTwoWheelers = bookingRepo.countParkedTwoWheelers(parkingId);
            pair.put("4w", totalParkedFourWheelers);
            pair.put("2w", totalParkedTwoWheelers);
        }

        return ResponseEntity.ok(pair);
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

        return ResponseEntity.ok(bookingRepo.save(booking));
    }

    @PostMapping("/exit")
    public ResponseEntity<?> exitParking(@RequestParam String vehicleNo) {

        Optional<Booking> bookingOpt = bookingRepo.findBookingsByVehicleNo(vehicleNo);

        if (!bookingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found with vehicle number: " + vehicleNo);
        }

        Booking booking = bookingOpt.get();
        booking.setOutTime(LocalDateTime.now());

        // Fetch the parking details using the parking ID from booking
        String parkingId = booking.getParkingId();
        Optional<Parking> parkingOpt = parkingRepo.findById(parkingId);

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
//            System.out.println("Duration in Minutes: " + durationMinutes);
//            System.out.println("Hourly Rate: " + hourlyRate);
//            System.out.println("Amount Paid: " + amountPaid);
        }

        booking.setAmountPaid(amountPaid);

        // Save the updated booking
        bookingRepo.save(booking);

        return ResponseEntity.ok(booking);
    }


}

