package com.sessionManagement.sessionManagement.controllers;


import com.sessionManagement.sessionManagement.documents.*;
import com.sessionManagement.sessionManagement.repo.*;
import com.sessionManagement.sessionManagement.services.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.sessionManagement.sessionManagement.controllers.AttendantController;

import java.util.*;

import static com.sessionManagement.sessionManagement.controllers.AdminController.getErrorsParking;

@RestController
@RequestMapping("/api/operator")
@CrossOrigin( origins = "http://localhost:5173/", allowCredentials = "true")
@PreAuthorize("hasRole('ROLE_OPERATOR')")
public class OperatorController
{
    private BookingService bookingService;

    @Autowired
    private OperatorRepo operatorRepo;

    @Autowired
    private AttendantController attendantController;

    @Autowired
    private OperatorService operatorService;

    @Autowired
    private AttendantRepo attendantRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private ParkingRepo parkingRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private ParkingIdSequenceService parkingIdSequenceService;

    @Autowired
    private AttendantService attendantService;

    @PostMapping("/addAttendant")
    public ResponseEntity<?> addAttendant(@Valid @RequestBody Attendant attendant) {
        if (attendantRepo.existsByPhoneNo(attendant.getPhoneNo())) {
            return ResponseEntity.badRequest().body("Attendant with provided phone number already exists");
        }

//        System.out.println(attendant.toString());

        Map<String, String> errors = getErrors(attendant);
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        Set<Role> roles = new HashSet<>();
        Role attendantRole = roleRepo.findByName(ERole.ROLE_ATTENDANT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(attendantRole);

        attendant.setRoles(roles);
        attendant.setPassword(encoder.encode(attendant.getPassword()));

        return ResponseEntity.ok(attendantRepo.save(attendant));
    }

    @GetMapping("/currentlyParkedVehicles")
    public ResponseEntity<?> currentlyParkedVehicles(@RequestParam String parkingId) throws RuntimeException{
        return ResponseEntity.ok(attendantController.currentlyParkedVehiclesUsingParkingId(parkingId));
    }

    @GetMapping("/forOperator")
    public String forOperatorTest()
    {
        return "You have access(Operator's)";
    }

    @PostMapping("/addParking")
    public ResponseEntity<?> addParking(@Valid
                                        @RequestParam String operatorId,
                                        @RequestParam String title,
                                        @RequestParam String costingType,
                                        @RequestParam String description,
                                        @RequestParam int cost2wheeler,
                                        @RequestParam int cost4wheeler,
                                        @RequestParam String latitude,
                                        @RequestParam String longitude,
                                        @RequestParam boolean availability,
                                        @RequestParam int capacity2wheeler,
                                        @RequestParam int capacity4wheeler,
                                        @RequestParam String address,
                                        @RequestParam String pinCode) {

        Parking parking = new Parking();

        parking.setParkingId(parkingIdSequenceService.generateSequence("parkingid_sequence"));
        parking.setOperatorId(operatorId);
        parking.setTitle(title);
        parking.setCostingType(costingType);
        parking.setDescription(description);
        parking.setCost2wheeler(cost2wheeler);
        parking.setCost4wheeler(cost4wheeler);
        parking.setLatitude(latitude);
        parking.setLongitude(longitude);
        parking.setAvailability(availability);
        parking.setCapacity2wheeler(capacity2wheeler);
        parking.setCapacity4wheeler(capacity4wheeler);
        parking.setAddress(address);
        parking.setPinCode(pinCode);

        if (parkingRepo.existsById(parking.getParkingId()) ||
                parkingRepo.existsByTitle(parking.getTitle())
        ) {
            return ResponseEntity.badRequest().body("Parking with provided Name or/and Parking ID already exists");
        }
        Map<String, String> errors = getErrorsParking(parking);

        if (!errors.isEmpty())
            return ResponseEntity.badRequest().body(errors);

        return ResponseEntity.ok(parkingRepo.save(parking));
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



    @GetMapping("/currentlyParkedFourWheelers")
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
    @GetMapping("/currentlyParkedTwoWheelers")
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

    @PreAuthorize("hasAnyRole('ROLE_OPERATOR', 'ROLE_ATTENDANT')")
    @GetMapping("/getUsername")
    public String getUsername(@RequestParam String phoneNo)
    {
//        System.out.println(phoneNo);
        String username = attendantService.findUsernameByPhoneNo(phoneNo);
        if (username != null) {
            return username;
        } else {
            return "Username not found for the provided phone number.";
        }
    }

    @GetMapping("/getParkings")
    public ResponseEntity<List<Parking>> getParkings(@RequestParam String phoneNo) {
//        System.out.println("in getParkings" +
//                "");
        String operatorId = operatorService.getOperatorIdByPhoneNo(phoneNo);
        if (operatorId == null) {
            return ResponseEntity.badRequest().body(Collections.emptyList());
        }
        return ResponseEntity.ok(parkingRepo.findByOperatorId(operatorId));
    }

}
