package com.sessionManagement.sessionManagement.controllers;

import com.sessionManagement.sessionManagement.documents.Attendant;
import com.sessionManagement.sessionManagement.documents.Booking;
import com.sessionManagement.sessionManagement.documents.Parking;
import com.sessionManagement.sessionManagement.repo.AttendantRepo;
import com.sessionManagement.sessionManagement.repo.BookingRepo;
import com.sessionManagement.sessionManagement.repo.TransactionIdSequenceRepo;
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
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.sessionManagement.sessionManagement.controllers.AdminController.getErrorsParking;

@RestController
@RequestMapping("api/attendant")
@PreAuthorize("hasRole('ATTENDANT')")
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
}

