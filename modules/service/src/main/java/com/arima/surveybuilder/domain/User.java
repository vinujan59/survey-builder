package com.arima.surveybuilder.domain;

import com.arima.surveybuilder.util.ISODateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.joda.time.DateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Document(collection = "user")
public class User {

    @Id
    public String id;
    @Indexed(unique = true, sparse = true, name = "user_email")
    public String email;
    public String password;
    public String accessToken;
    public String role;


    @CreatedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime createdTime;
    @LastModifiedDate
    @JsonSerialize(using = ISODateTimeSerializer.class)
    public DateTime modifiedTime;

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", password='" + "********" + '\'' +
                ", role='" + role + '\'' +
                ", createdTime=" + createdTime +
                ", modifiedTime=" + modifiedTime +
                '}';
    }

    public boolean validateRegister() {
        return email != null && !email.trim().isEmpty() &&
                password != null && !password.trim().isEmpty();
    }

    public User maskPassword() {
        password = "********";
        return this;
    }

}
