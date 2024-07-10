package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.ERole;
import com.sessionManagement.sessionManagement.documents.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface RoleRepo extends MongoRepository<Role, String>
{
    Optional<Role> findByName(ERole name);
}
