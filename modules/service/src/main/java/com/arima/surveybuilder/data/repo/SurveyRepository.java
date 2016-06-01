package com.arima.surveybuilder.data.repo;

import com.arima.surveybuilder.domain.Questions;
import com.arima.surveybuilder.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SurveyRepository extends MongoRepository<Questions, String> {
    List<Questions> findAll();
}
