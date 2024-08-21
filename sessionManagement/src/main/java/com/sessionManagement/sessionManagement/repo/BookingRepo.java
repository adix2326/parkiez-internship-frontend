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

    @Query("{ 'vehicleType': 'four wheeler', 'parkingId': ?0, $expr: { $eq: ['$outTime', '$inTime'] } }")
    long countParkedFourWheelers(String parkingId);
    @Query("{ 'vehicleType': 'two wheeler', 'outTime': null, 'parkingId': ?0 }")
    long countParkedTwoWheelers(String parkingId);

    @Query("{ 'parkingId': ?0, 'vheicleType': '4Wheeler', 'inTime': { $gte: ?1, $lte: ?2 } }")
    List<Booking> find4WheelerBookingsByParkingIdAndDateRange(String parkingId, LocalDateTime startOfDay, LocalDateTime endOfDay);
    @Query("{ 'parkingId': ?0, 'vheicleType': '2Wheeler', 'inTime': { $gte: ?1, $lte: ?2 } }")
    List<Booking> find2WheelerBookingsByParkingIdAndDateRange(String parkingId, LocalDateTime startOfDay, LocalDateTime endOfDay);

}
