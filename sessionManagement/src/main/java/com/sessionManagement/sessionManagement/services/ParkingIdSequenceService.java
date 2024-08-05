package com.sessionManagement.sessionManagement.services;

import com.sessionManagement.sessionManagement.documents.OperatorIdSequence;
import com.sessionManagement.sessionManagement.repo.ParkingIdSequenceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ParkingIdSequenceService {
    @Autowired
    private MongoOperations mongoOperations;

    @Autowired
    private ParkingIdSequenceRepo parkingIdSequenceRepo;

    public String generateSequence(String seqName) {
        Query query = new Query(Criteria.where("_id").is(seqName));
        Update update = new Update().inc("seq", 1);
        FindAndModifyOptions options = new FindAndModifyOptions().returnNew(true).upsert(true);

        OperatorIdSequence sequence = mongoOperations.findAndModify(query, update, options, OperatorIdSequence.class);
        String parkingid = sequence != null ? "Parking" + sequence.getSeq() : "Parking" + 1;
        System.out.println(parkingid);
        return parkingid;
    }
}
