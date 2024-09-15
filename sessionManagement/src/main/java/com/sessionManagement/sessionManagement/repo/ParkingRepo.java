package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Parking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ParkingRepo extends MongoRepository<Parking, String>
{

    boolean existsByTitle(String title);

    Parking findByParkingId(String parkingId);

    List<Parking> findByOperatorId(String operatorId);

    @Override
    Optional<Parking> findById(String s);

}
