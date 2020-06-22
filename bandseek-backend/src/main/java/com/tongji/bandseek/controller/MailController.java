package com.tongji.bandseek.controller;

import com.alibaba.fastjson.JSONObject;
import com.tongji.bandseek.model.Mail;
import com.tongji.bandseek.service.IMailService;
import com.tongji.bandseek.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@CrossOrigin(maxAge = 3600,origins = "*")
@ResponseBody
@RequestMapping("/mail")
public class MailController {
    @Autowired
    public IMailService iMailService;
    public IUserService iUserService;

    @RequestMapping(value="/getMails",method = RequestMethod.POST)
    public ArrayList<Mail> getMails(@RequestParam String receiver_name){
        ArrayList<Mail> mails = new ArrayList<>();
        //System.out.println(receiver_id);
//        System.out.println(iUserService.findById(receiver_id).getUser_name());
//        if(iUserService.findById(receiver_id).getUser_name().equals("")){
//            return mails;//return "",receiver doesn't exist
//        }
        return iMailService.findByReceiver(receiver_name);
    }

    @RequestMapping(value ="/addMail",method = RequestMethod.POST)
    public String addMail(@RequestParam String mail_date,String sender_name,String receiver_name,String content){
        Mail mail = new Mail(mail_date,sender_name,receiver_name,content);
//        if(iUserService.findById(receiver_name).getUser_name().equals("")){
//            return JSONObject.toJSONString(2);
//            //2: receiver doesn't exist
//        }
        return JSONObject.toJSONString(iMailService.addMail(mail));
    }

    @RequestMapping(value = "/deleteMail",method = RequestMethod.POST)
    public String deleteMail(@RequestParam String mail_date,String receiver_name){
        Mail mail = new Mail();
        mail.setMail_date(mail_date);
        mail.setReceiver_name(receiver_name);
//        if(iUserService.findById(receiver_name).getUser_name().equals("")){
//            return JSONObject.toJSONString(2);
//            //2: receiver doesn't exist
//        }
        return JSONObject.toJSONString(iMailService.deleteMail(mail));
    }

}
