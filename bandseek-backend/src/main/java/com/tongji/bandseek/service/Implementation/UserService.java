package com.tongji.bandseek.service.Implementation;

import com.tongji.bandseek.dao.IUserDao;
import com.tongji.bandseek.model.User;
import com.tongji.bandseek.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements IUserService {
    @Autowired
    public IUserDao iUserDao;
    @Override
    public User findById(String id){
        return iUserDao.findById(id);
    }

    @Override
    public User findByName(String name){
        return iUserDao.findByName(name);
    }

    @Override
    public int addUser(User user){
        return iUserDao.addUser(user);
    }
    @Override
    public int editInfo(User user){
        return iUserDao.editInfo(user);
    }
    @Override
    public int delete(String id){
        return iUserDao.delete(id);
    }
    @Override
    public ArrayList<User> findByType(int type){
        return iUserDao.findByType(type);
    }
}
