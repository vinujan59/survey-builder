package com.arima.surveybuilder.util;


import com.arima.surveybuilder.message.SBStatus;

public class SBException extends Exception {

    public SBStatus status;

    public SBException(SBStatus status) {
        super(status.statusDescription);
        this.status = status;
    }

    @Override
    public String toString() {
        return "SoulException{" +
                "status=" + status +
                '}';
    }
}
