package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepo extends MongoRepository<Booking, String>
{
    @Query("{ 'vehicleNo': ?0 }")
    Optional<Booking> findBookingsByVehicleNo(String vehicleNo);

    @Query("{ 'vehicleType': '4wheeler', 'parkingId': ?0, 'outTime': null }")
    long countParkedFourWheelers(String parkingId);
    @Query("{ 'vehicleType': '2wheeler', 'outTime': null, 'parkingId': ?0 }")
    long countParkedTwoWheelers(String parkingId);

    List<Booking> findAllBookingByVehicleNoAndOutTimeIsNull(String vehicleNo);

//    @Query("{ 'parkingId': ?0, 'vehicleType': ?1 , 'outTime': {$exists:  false}}")
   List<Booking> findAllByParkingIdAndVehicleTypeAndOutTimeIsNull(String parkingId, String vehicleType);
   List<Booking> findAllByParkingIdAndVehicleType(String parkingId, String vehicleType);

    Boolean existsByVehicleNoAndOutTimeIsNull(String vehicleNo);

    @Query("{ 'parkingId': ?0, 'vehicleType': '4wheeler', 'inTime': { $gte: ?1, $lte: ?2 } }")
    List<Booking> find4WheelerBookingsByParkingIdAndDateRange(String parkingId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    @Query("{ 'parkingId': ?0, 'vehicleType': '2wheeler', 'inTime': { $gte: ?1, $lte: ?2 } }")
    List<Booking> find2WheelerBookingsByParkingIdAndDateRange(String parkingId, LocalDateTime startOfDay, LocalDateTime endOfDay);

}
