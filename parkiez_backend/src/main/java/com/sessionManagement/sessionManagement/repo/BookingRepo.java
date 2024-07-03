package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface BookingRepo extends MongoRepository<Booking, String>
{
//    @Query(value = "{ 'outTime' : null, 'vehicleType' : 'four-wheeler' }", count = true)
//    long countParkedFourWheelers();

    @Query("{ 'vehicleType': 'four wheeler', 'outTime': null, 'parkingId': ?0 }")
    long countParkedFourWheelers(String parkingId);
    @Query("{ 'vehicleType': 'two wheeler', 'outTime': null, 'parkingId': ?0 }")
    long countParkedTwoWheelers(String parkingId);
}
