package com.arima.surveybuilder.util;

import com.arima.surveybuilder.message.SBResponse;
import com.arima.surveybuilder.message.SBStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ApiExceptionHandler implements ExceptionMapper<Exception> {

    private static Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @Override
    @Produces(MediaType.APPLICATION_JSON)
    public Response toResponse(Exception e) {

        SBResponse sbResponse;
        if (e instanceof SBException) {
            logger.debug("SurveyBuilderException handled: {}", e.toString());
            SBStatus status = ((SBException) e).status;
            sbResponse = new SBResponse(status);
        } else {
            logger.error("Exception ", e);
            sbResponse = new SBResponse(SBStatus.ERROR);
        }

        return Response
                .ok()
                .entity(sbResponse)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
