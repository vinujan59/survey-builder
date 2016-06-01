package com.arima.surveybuilder.data.repo;

import com.arima.surveybuilder.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

    List<User> findAll();


    User findByEmail(String email);

}