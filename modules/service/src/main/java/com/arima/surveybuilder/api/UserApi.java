package com.arima.surveybuilder.api;

import com.arima.surveybuilder.domain.User;
import com.arima.surveybuilder.message.PasswordChangeReq;
import com.arima.surveybuilder.message.SBResponse;
import com.arima.surveybuilder.service.UserService;
import com.arima.surveybuilder.util.Authorize;
import com.arima.surveybuilder.util.SBException;
import org.apache.cxf.rs.security.cors.CrossOriginResourceSharing;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Produces("application/json")
@CrossOriginResourceSharing(
        allowAllOrigins = true,
        allowCredentials = true,
        allowHeaders = {"Origin", "Content-Type", "Accept", "Authorization"}
)
@Path("surveybuilder/service/user")
public class UserApi {
    @Autowired
    UserService userService;

    @POST
    public SBResponse<User> registerUser(User user) throws SBException {
        return new SBResponse<>(userService.registerUser(user));
    }

    @POST
    @Path("authenticate")
    public SBResponse<User> authenticate(User user) throws SBException {
        return new SBResponse<>(userService.authenticate(user));
    }

    @POST
    @Path("/refresh")
    @Authorize
    public SBResponse<User> refresh(User user) throws SBException {
        return new SBResponse<>(userService.refresh(user));
    }

    @PUT
    @Path("/password")
    @Authorize
    public SBResponse<String> updatePassword(PasswordChangeReq req) throws SBException {
        return new SBResponse<>(userService.updatePassword(req));
    }

    @PUT
    @Path("/basicConfig")
    @Authorize
    public SBResponse<User> updateBasicConfig(User user) throws SBException {
        return new SBResponse<>(userService.updateBasicConfig(user));
    }

}
