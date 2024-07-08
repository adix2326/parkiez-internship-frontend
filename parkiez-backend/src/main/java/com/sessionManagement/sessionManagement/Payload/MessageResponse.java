package com.sessionManagement.sessionManagement.Payload;

public class MessageResponse
{
    private String message;

    public MessageResponse(String s) {
        message = s;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
