package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Parking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ParkingRepo extends MongoRepository<Parking, String>
{

    boolean existsByTitle(String title);

    List<Parking> findByOperatorId(String operatorId);
}
