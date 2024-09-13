//You can manually convert the IST time to UTC before storing it in MongoDB:

//ZonedDateTime istTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
//ZonedDateTime utcTime = istTime.withZoneSameInstant(ZoneId.of("UTC"));
//booking.setInTime(utcTime.toLocalDateTime());

//This ensures that the time is stored in UTC, and when you retrieve it, you'll convert it back to IST:

//ZonedDateTime utcTime = booking.getInTime().atZone(ZoneId.of("UTC"));
//ZonedDateTime istTime = utcTime.withZoneSameInstant(ZoneId.of("Asia/Kolkata"));


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
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
    public ResponseEntity<?> currentlyParkedVehicles(@RequestParam String phoneNo){
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

            Optional<Parking> parkingOpt = parkingRepo.findById(parkingId);
            if (parkingOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Parking details not found for the attendant.");
            }
            Parking parking = parkingOpt.get();
            String costingType = parking.getCostingType();

//            System.out.println("Costing type: "+ costingType);

            List<Booking> fourWheelerBookings = bookingRepo.findAllByParkingIdAndVehicleTypeAndOutTimeIsNull(parkingId, "4wheeler");
            long currentlyParkedFourWheelers = fourWheelerBookings.size();
            List<Booking> twoWheelerBookings = bookingRepo.findAllByParkingIdAndVehicleTypeAndOutTimeIsNull(parkingId, "2wheeler");
            long currentlyParkedTwoWheelers = twoWheelerBookings.size();

            pair.put("4w_currently", currentlyParkedFourWheelers);
            pair.put("2w_currently", currentlyParkedTwoWheelers);

            List<Booking> fourWheelerBookings1 = bookingRepo.findAllByParkingIdAndVehicleType(parkingId, "4wheeler");
            long tillNowParkedFourWheelers = fourWheelerBookings1.size();
            List<Booking> twoWheelerBookings1 = bookingRepo.findAllByParkingIdAndVehicleType(parkingId, "2wheeler");
            long tillNowParkedTwoWheelers = twoWheelerBookings1.size();

            pair.put("4w_tillNow", tillNowParkedFourWheelers);
            pair.put("2w_tillNow", tillNowParkedTwoWheelers);

            long total4WheelerRevenue = 0;
            long total2WheelerRevenue = 0;

            if (costingType.equalsIgnoreCase("fixed")) {
                // Fixed costing calculation
                total4WheelerRevenue = (long) (tillNowParkedFourWheelers * parking.getCost4wheeler());
                total2WheelerRevenue = (long) (tillNowParkedTwoWheelers * parking.getCost2wheeler());
            } else if (costingType.equalsIgnoreCase("hourly")) {
                // Hourly costing calculation
                for (Booking booking : fourWheelerBookings) {
                    long durationMinutes = java.time.Duration.between(booking.getInTime(), booking.getOutTime()).toMinutes();
                    total4WheelerRevenue += (long) ((durationMinutes / 60.0) * parking.getCost4wheeler());
                }
                for (Booking booking : twoWheelerBookings) {
                    long durationMinutes = java.time.Duration.between(booking.getInTime(), booking.getOutTime()).toMinutes();
                    total2WheelerRevenue += (long) ((durationMinutes / 60.0) * parking.getCost2wheeler());
                }
            }

            pair.put("4w_revenue", total4WheelerRevenue);
            pair.put("2w_revenue", total2WheelerRevenue);

        }

        return ResponseEntity.ok(pair);
    }

    @PostMapping("/addBooking")
    public ResponseEntity<?> addBooking(@Valid @RequestParam String paymentType,
                                               @RequestParam String vehicleNo,
                                               @RequestParam String vehicleType,
                                               @RequestParam String phoneNo,
                                               @RequestParam String attendantPhoneNo) {
//        System.out.println("hi dhamale");
        Optional<Attendant> attendantOpt = attendantRepo.findByPhoneNo(attendantPhoneNo);

        if (!attendantOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Attendant not found with phone number: " + attendantPhoneNo);
        }

        if( bookingRepo.existsByVehicleNoAndOutTimeIsNull(vehicleNo) )
        {
//            System.out.println("in if");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vehicle Already parked");
        }

        Attendant attendant = attendantOpt.get();
        String parkingId = attendant.getParkingId();

        Booking booking = new Booking(paymentType, vehicleNo, vehicleType, phoneNo);
        booking.setAttendantPhoneNo(attendantPhoneNo);

        booking.setParkingId(parkingId);

//        ZonedDateTime istTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
//        ZonedDateTime utcTime = istTime.withZoneSameInstant(ZoneId.of("UTC"));
//        booking.setInTime(utcTime.toLocalDateTime());

//        System.out.println("utc time add bokking: " + utcTime.toLocalDateTime());

        booking.setInTime(LocalDateTime.now());
//        booking.setOutTime(LocalDateTime.now());
        booking.setAmountPaid(0);
        long transactionId = transactionIdSequenceService.generateSequence("transaction_sequence");
        booking.setTransactionId(String.valueOf(transactionId));

        return ResponseEntity.ok(bookingRepo.save(booking));
    }

    @PostMapping("/exit")
    public ResponseEntity<?> exitParking(@RequestParam String vehicleNo) {

        List<Booking> bookings = bookingRepo.findAllBookingByVehicleNoAndOutTimeIsNull(vehicleNo);
        if(bookings.size()>1)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Check database entries, contact Administrator immediately");
        }
        if(bookings.size() == 0)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No such parked vehicle");
        }
        Booking booking = bookings.get(0);
//        Optional<Booking> bookingOpt = bookingRepo.findBookingsByVehicleNo(vehicleNo);


//        System.out.println(booking.getInTime());
//
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

