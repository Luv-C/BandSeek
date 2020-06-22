package com.tongji.bandseek.dao;

import com.tongji.bandseek.model.User;

import java.util.ArrayList;

public interface IUserDao {
    User findById(String id);
    User findByName(String name);
    int addUser(User user);
    int editInfo(User user);
    int delete(String id);
    ArrayList<User> findByType(int type);
}
