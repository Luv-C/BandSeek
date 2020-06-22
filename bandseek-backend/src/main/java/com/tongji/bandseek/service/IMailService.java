package com.tongji.bandseek.service;

import com.tongji.bandseek.model.Mail;

import java.util.ArrayList;

public interface IMailService {
    ArrayList<Mail> findByReceiver(String receiver_name);
    int addMail(Mail mail);
    int deleteMail(Mail mail);
}
