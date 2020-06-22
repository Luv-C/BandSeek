package com.tongji.bandseek.service.Implementation;

import com.tongji.bandseek.dao.IMailDao;
import com.tongji.bandseek.model.Mail;
import com.tongji.bandseek.service.IMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MailService implements IMailService {
    @Autowired
    public IMailDao iMailDao;
    @Override
    public ArrayList<Mail> findByReceiver(String receiver_name){return iMailDao.findByReceiver(receiver_name);}
    @Override
    public int addMail(Mail mail){return iMailDao.addMail(mail);}
    @Override
    public int deleteMail(Mail mail){return iMailDao.deleteMail(mail);}
}
