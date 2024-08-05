package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.ParkingIdSequence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ParkingIdSequenceRepo extends MongoRepository<ParkingIdSequence, String> {
}
