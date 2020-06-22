package com.tongji.bandseek.dao.Implementation;

import com.tongji.bandseek.dao.IMailDao;
import com.tongji.bandseek.model.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Repository
public class MailDaoImpl implements IMailDao {
    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Override
    public ArrayList<Mail> findByReceiver(String receiver_name){
        ArrayList<Mail> mails = new ArrayList<>();
        String sql = "SELECT * FROM mail WHERE receiver_name = ?";
        jdbcTemplate.query(sql, new Object[]{receiver_name}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                Mail mail=new Mail();
                mail.setMail_date(resultSet.getString("mail_date"));
                mail.setSender_name(resultSet.getString("sender_name"));
                mail.setReceiver_name(resultSet.getString("receiver_name"));
                mail.setContent(resultSet.getString("content"));
                mails.add(mail);
            }
        });
        return mails;
    }
    public int addMail(Mail mail){
        String sql = "INSERT INTO mail (mail_date,sender_name,receiver_name,content) VALUES(?,?,?,?)";
        jdbcTemplate.update(sql,mail.getMail_date(),mail.getSender_name(),mail.getReceiver_name(),mail.getContent());
        return 1;
    }
    public int deleteMail(Mail mail){
        //System.out.println(mail.getMail_date());
        String sql = "DELETE FROM mail WHERE mail_date=? AND receiver_name=?";
        jdbcTemplate.update(sql,mail.getMail_date(),mail.getReceiver_name());
        return 1;
    }
}
