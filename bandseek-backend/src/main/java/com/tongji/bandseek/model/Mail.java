package com.tongji.bandseek.model;

public class Mail {
    private String mail_date;
    private String sender_name;
    private String receiver_name;
    private String content;

    public Mail(){
        this.mail_date="";
        this.sender_name="";
        this.receiver_name="";
        this.content="";
    }

    public Mail(String mail_date,String sender_name,String receiver_name,String content){
        this.mail_date=mail_date;
        this.sender_name=sender_name;
        this.receiver_name=receiver_name;
        this.content=content;
    }

    public void setMail_date(String mail_date) {
        this.mail_date = mail_date;
    }

    public String getMail_date() {
        return mail_date;
    }

    public void setSender_name(String sender_name) {
        this.sender_name = sender_name;
    }

    public String getSender_name() {
        return sender_name;
    }

    public void setReceiver_name(String receiver_name) {
        this.receiver_name = receiver_name;
    }

    public String getReceiver_name() {
        return receiver_name;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
