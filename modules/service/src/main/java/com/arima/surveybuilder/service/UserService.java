package com.arima.surveybuilder.service;

import com.arima.surveybuilder.data.repo.UserRepository;
import com.arima.surveybuilder.domain.User;
import com.arima.surveybuilder.message.PasswordChangeReq;
import com.arima.surveybuilder.message.SBStatus;
import com.arima.surveybuilder.util.MD5;
import com.arima.surveybuilder.util.SBException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthService authService;

    public User registerUser(User user) throws SBException {
        LOGGER.debug("User registerUser req received with params : {}", user);

        if (!user.validateRegister()) {
            throw new SBException(SBStatus.MISSING_REQUIRED_PARAMS);
        }
        if(userRepository.findByEmail(user.email)!=null){
            throw new SBException(SBStatus.USER_EMAIL_NOT_AVAILABLE);
        }
        user.password = MD5.getMD5(user.password);
        user.role = "normal";
        User savedUser = userRepository.save(user);
        if (savedUser == null) {
            throw new SBException(SBStatus.DB_ERROR);
        }
        user.accessToken = authService.createJWT(savedUser.id, savedUser.email, 60*24*365);
        userRepository.save(user);

        savedUser.maskPassword();

        return savedUser;
    }

    public User authenticate(User user) throws SBException {
        LOGGER.debug("User authenticate req received with params : {}", user);

        if (!user.validateRegister()) {
            throw new SBException(SBStatus.MISSING_REQUIRED_PARAMS);
        }
        User userExists = userRepository.findByEmail(user.email);
        if(userExists==null){
            throw new SBException(SBStatus.NO_ENTRY_FOUND);
        }
        if (!Objects.equals(userExists.password, MD5.getMD5(user.password))) {
            throw new SBException(SBStatus.WRONG_CREDENTIALS);
        }
        userExists.accessToken = authService.createJWT(userExists.id, userExists.email, 60*24*365);
        userRepository.save(userExists);

        userExists.maskPassword();

        return userExists;
    }

    public User refresh(User user) throws SBException {
        LOGGER.debug("Media refresh request received with params : {}", user);


        User savedUser = userRepository.findByEmail(user.email);
        if (savedUser == null) {
            throw new SBException(SBStatus.NO_SUCH_USER);
        }
        //24 hours non-expire token
        String accessToken = authService.createJWT(savedUser.id, user.email, 1440);
        savedUser.maskPassword();

        LOGGER.debug("Media refresh response with success mediaId : {}", savedUser.id);
        return savedUser;

    }

    public String updatePassword(PasswordChangeReq req) throws SBException {
        LOGGER.debug("Media updatePassword request received with id: {}", req.userId);
        User user = userRepository.findOne(req.userId);
        if (user == null) {
            throw new SBException(SBStatus.NO_SUCH_USER);
        }
        if (!Objects.equals(user.password, MD5.getMD5(req.oldPassword))) {
            throw new SBException(SBStatus.WRONG_CREDENTIALS);
        }
        user.password = MD5.getMD5(req.newPassword);
        userRepository.save(user);
        return "SUCCESS";
    }

    public User updateBasicConfig(User user) throws SBException {
        LOGGER.debug("Media updateBasicConfig request received with id: {}", user.id);

        User oldUser = userRepository.findOne(user.id);
        if (oldUser == null) {
            throw new SBException(SBStatus.NO_SUCH_USER);
        }
        if (!Objects.equals(oldUser.password, MD5.getMD5(user.password))) {
            throw new SBException(SBStatus.WRONG_CREDENTIALS);
        }
//        oldUser.updateBasicConfig(user);
//        mediaRepository.save(oldMedia);
//
//        return oldMedia.maskPassword();
        return null;
    }

}
