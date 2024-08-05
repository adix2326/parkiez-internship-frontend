package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Attendant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface AttendantRepo extends MongoRepository<Attendant, String> {

    boolean existsByPhoneNo(String phoneNo);

    boolean existsByUserId(String userId);

    @Query("{'phoneNo': ?0}")
    Optional<Attendant> findByPhoneNo(String phoneNo);

    // Removed incorrect method (as it pertains to Operators)
    // Optional<Operators> findusernameByPhoneNo(String phoneNo);
}
