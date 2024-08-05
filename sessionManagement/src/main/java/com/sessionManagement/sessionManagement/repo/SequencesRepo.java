package com.sessionManagement.sessionManagement.repo;

import com.sessionManagement.sessionManagement.documents.Sequences;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface SequencesRepo extends MongoRepository<Sequences, String> {
}
