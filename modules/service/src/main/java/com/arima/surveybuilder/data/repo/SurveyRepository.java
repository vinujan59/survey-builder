package com.arima.surveybuilder.data.repo;

import com.arima.surveybuilder.domain.Questions;
import com.arima.surveybuilder.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SurveyRepository extends MongoRepository<Questions, String> {
    List<Questions> findAll();
//    @Query("{ '_id' :'ObjectId(?0)' }")
//    void delete(String _id);
    @Query(value = "{ '_id': 'ObjectId(?0)' }")
    Questions findById(String _id);
}
