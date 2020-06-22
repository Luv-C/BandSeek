package com.tongji.bandseek.controller;

import com.alibaba.fastjson.JSONObject;
import com.tongji.bandseek.model.User;
import com.tongji.bandseek.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@CrossOrigin(maxAge = 3600,origins = "*")
@ResponseBody
@RequestMapping("/user")
public class UserController {
    @Autowired
    public IUserService iUserService;

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String UserLogin(@RequestParam String user_id, String user_pwd){
        if(iUserService.findById(user_id).getUser_id().equals("")){
            return JSONObject.toJSONString(2);
        }
        if(!iUserService.findById(user_id).getUser_pwd().equals(user_pwd)){
            return JSONObject.toJSONString(3);
        }
        return JSONObject.toJSONString(1);
        //1 presents success, 2 presents on such user, 3 presents wrong password
    }

    @RequestMapping(value = "register",method = RequestMethod.POST)
    public String UserRegister(@RequestParam String user_id,String user_pwd,String user_name,int user_type,String self_intro){
        User user = new User(user_id,user_pwd,user_name,user_type);
        if(iUserService.findById(user_id).getUser_id().equals("")) {
            int err_code = iUserService.addUser(user);
            return JSONObject.toJSONString(err_code);
        }
        else{
            return JSONObject.toJSONString(2);
            //2 presents id already exists
        }
    }

    @RequestMapping(value = "findType",method = RequestMethod.POST)
    public ArrayList<User> findType(@RequestParam int type){
        ArrayList<User> userList = iUserService.findByType(type);
        //System.out.println(userList.size());
        if(userList.size()==0){
            return null;
        }
        else
            return userList;
    }

    @RequestMapping(value = "findUser",method = RequestMethod.POST)
    public User findUser(@RequestParam String id){
        if(iUserService.findById(id).getUser_id().equals("")){
            return null;
        }
        else
            return iUserService.findById(id);
    }

    @RequestMapping(value = "findByUserName",method = RequestMethod.POST)
    public User findByUserNAme(@RequestParam String name){
        if(iUserService.findByName(name).getUser_id().equals("")){
            return null;
        }
        else
            return iUserService.findByName(name);
    }

    @RequestMapping(value = "editUserInfo",method = RequestMethod.POST)
    public int editUserInfo(@RequestParam String user_id,String user_name,String user_pwd,int user_type,String user_intro){
        User user = new User(user_id,user_pwd,user_name,user_type);
        user.setSelf_intro(user_intro);
        return iUserService.editInfo(user);
    }
}
