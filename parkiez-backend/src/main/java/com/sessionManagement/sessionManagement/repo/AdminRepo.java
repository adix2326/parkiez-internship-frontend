package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepo extends MongoRepository<Admin, String>
{
    Optional<Admin> findByUsername(String userName);

    Boolean existsByUsername(String username);
}
