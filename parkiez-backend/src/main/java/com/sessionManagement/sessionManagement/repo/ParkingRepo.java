package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Parking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ParkingRepo extends MongoRepository<Parking, String>
{

    boolean existsByTitle(String title);
}
