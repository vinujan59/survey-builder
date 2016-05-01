package com.arima.surveybuilder.message;

public enum SBStatus {

    SUCCESS("S1000", "Success"),
    ERROR("E1000", "Unknown error occurred in operation");

    public final String statusCode;
    public final String statusDescription;

    SBStatus(String statusCode, String successDescription) {
        this.statusCode = statusCode;
        this.statusDescription = successDescription;
    }

    public boolean isSuccess() {
        return this.statusCode.equals(SBStatus.SUCCESS.statusCode);
    }
}
