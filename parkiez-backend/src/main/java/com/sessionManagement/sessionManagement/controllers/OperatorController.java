package com.sessionManagement.sessionManagement.controllers;


import com.sessionManagement.sessionManagement.documents.*;
import com.sessionManagement.sessionManagement.repo.*;
import com.sessionManagement.sessionManagement.services.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/operator")
@PreAuthorize("hasRole('ROLE_OPERATOR')")
public class OperatorController
{
    private BookingService bookingService;

    @Autowired
    OperatorRepo operatorRepo;

    @Autowired
    AttendantRepo attendantRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    ParkingRepo parkingRepo;

    @Autowired
    PasswordEncoder encoder;
    @Autowired
    BookingRepo bookingRepo;


    @GetMapping("/forOperator")
    public String forOperatorTest()
    {
        return "You have access(Operator's)";
    }


    @PostMapping("/addAttendant")
    public ResponseEntity<?> addAttendant(@Valid @RequestBody Attendant attendant)
    {
        if( attendantRepo.existsByPhoneNo(attendant.getPhoneNo()) || attendantRepo.existsByUserId(attendant.getUserId()) )
        {
            return ResponseEntity.badRequest().body("Attendant already exists");
        }
        if( !parkingRepo.existsById( attendant.getParkingId() ) )
        {
            return ResponseEntity.badRequest().body("Parking with specified parking ID does not exist");
        }

        Map<String, String> errors = getErrors(attendant);

        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(errors);

        Set<Role> roles = new HashSet<>();

        Role adminRole = roleRepo.findByName(ERole.ROLE_ATTENDANT)
                .orElseThrow( () -> new RuntimeException("Error: Role is not found") );
        roles.add(adminRole);
        attendant.setRoles(roles);
        attendant.setPassword(encoder.encode(attendant.getPassword()));
        return ResponseEntity.ok(attendantRepo.save(attendant));
    }

    private static Map<String, String> getErrors(Attendant attendant) {
        Map<String, String> errors = new HashMap<>();
        if (attendant.getParkingId() == null || attendant.getParkingId().isEmpty())
            errors.put("parkingId", "Parking ID is required");
        if (attendant.getName() == null || attendant.getName().isEmpty())
            errors.put("name", "Name is required");
        if (attendant.getPhoneNo() == null || attendant.getPhoneNo().isEmpty())
            errors.put("phoneNo.", "Phone number is required");
        if (attendant.getPassword() == null || attendant.getPassword().isEmpty())
            errors.put("Password.", "Password number is required");
        return errors;
    }

    @PostMapping("/addBooking")
    public ResponseEntity<?> addBooking(@Valid @RequestBody Booking booking) {
        if (!parkingRepo.existsById(booking.getParkingId())) {
            return ResponseEntity.badRequest().body("Parking with specified parking ID does not exist");
        }
        if (!attendantRepo.existsByPhoneNo(booking.getAttendantPhoneNo())) {
            return ResponseEntity.badRequest().body("Attendant with specified phone number does not exist");
        }
        return ResponseEntity.ok(bookingRepo.save(booking));
    }



    @GetMapping("/totalParkedFourWheelers")
    public ResponseEntity<?> getTotalParkedFourWheelers(@Valid @RequestBody Booking booking) {
        if (!parkingRepo.existsById(booking.getParkingId())) {
            return ResponseEntity.badRequest().body("Parking with specified parking ID does not exist");
        }
        if (!attendantRepo.existsByPhoneNo(booking.getAttendantPhoneNo())) {
            return ResponseEntity.badRequest().body("Attendant with specified phone number does not exist");
        }

        long totalParkedFourWheelers = bookingRepo.countParkedFourWheelers(booking.getParkingId());
        return ResponseEntity.ok(totalParkedFourWheelers);
    }
    @GetMapping("/totalParkedTwoWheelers")
    public ResponseEntity<?> getTotalParkedTwoWheelers(@Valid @RequestBody Booking booking) {
        if (!parkingRepo.existsById(booking.getParkingId())) {
            return ResponseEntity.badRequest().body("Parking with specified parking ID does not exist");
        }
        if (!attendantRepo.existsByPhoneNo(booking.getAttendantPhoneNo())) {
            return ResponseEntity.badRequest().body("Attendant with specified phone number does not exist");
        }

        long totalParkedTwoWheelers = bookingRepo.countParkedTwoWheelers(booking.getParkingId());
        return ResponseEntity.ok(totalParkedTwoWheelers);
    }

    @GetMapping("/countFourWheelerToday")
    public long countFourWheelerBookingsToday(@RequestParam String parkingId) {
        return bookingService.countFourWheelerBookingsToday(parkingId);
    }
    @GetMapping("/countTwoWheelerToday")
    public long countTwoWheelerBookingsToday(@RequestParam String parkingId) {
        return bookingService.countTwoWheelerBookingsToday(parkingId);
    }
}
