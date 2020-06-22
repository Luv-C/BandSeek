package com.tongji.bandseek.dao;

import com.tongji.bandseek.model.Mail;

import java.util.ArrayList;

public interface IMailDao {
    ArrayList<Mail> findByReceiver(String receiver_name);
    int addMail(Mail mail);
    int deleteMail(Mail mail);
}
