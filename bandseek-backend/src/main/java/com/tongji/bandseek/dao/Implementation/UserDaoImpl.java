package com.tongji.bandseek.dao.Implementation;

import com.tongji.bandseek.dao.IUserDao;
import com.tongji.bandseek.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Repository
public class UserDaoImpl implements IUserDao {
    @Autowired
    JdbcTemplate jdbcTemplate;
    @Override
    public User findByName(String name){
        String sql = "SELECT * FROM user WHERE user_name=?";
        User returnUser = new User();
        jdbcTemplate.query(sql, new Object[]{name}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                returnUser.setUser_id(rs.getString("user_id"));
                returnUser.setUser_pwd(rs.getString("user_pwd"));
                returnUser.setUser_name(name);
                returnUser.setUser_type(rs.getInt("user_type"));
                returnUser.setSelf_intro(rs.getString("self_intro"));
            }
        });
        return returnUser;
    }

    @Override
    public User findById(String id){
        String sql = "SELECT * FROM user WHERE user_id=?";
        User returnUser = new User();
        jdbcTemplate.query(sql, new Object[]{id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                returnUser.setUser_id(id);
                returnUser.setUser_pwd(rs.getString("user_pwd"));
                returnUser.setUser_name(rs.getString("user_name"));
                returnUser.setUser_type(rs.getInt("user_type"));
                returnUser.setSelf_intro(rs.getString("self_intro"));
            }
        });
        return returnUser;

    }
    @Override
    public int addUser(User user){
        int flag = 2;
        if(findById(user.getUser_id()).getUser_id().equals(""))
        {
            flag=1;
            String sql = "INSERT INTO user(user_id,user_pwd,user_name,user_type,self_intro) VALUES(?,?,?,?,'这个家伙很懒，什么都没有写')";
            jdbcTemplate.update(sql,user.getUser_id(),user.getUser_pwd(),user.getUser_name(),user.getUser_type());
        }
        //System.out.println(flag);
        return flag;//1注册成功 2注册失败
    }
    @Override
    public int editInfo(User user){
        String sql = "UPDATE User set user_name=? WHERE user_id=?";
        jdbcTemplate.update(sql,user.getUser_name(),user.getUser_id());
        sql = "UPDATE User set user_type=? WHERE user_id=?";
        jdbcTemplate.update(sql,user.getUser_type(),user.getUser_id());
        sql = "UPDATE User set user_pwd=? WHERE user_id=?";
        jdbcTemplate.update(sql,user.getUser_pwd(),user.getUser_id());
        sql = "UPDATE User set self_intro=? WHERE user_id=?";
        jdbcTemplate.update(sql,user.getSelf_intro(),user.getUser_id());
        return 1;
    }
    @Override
    public int delete(String id){
        int flag=2;
        if(findById(id).getUser_name().equals(""))
        {
            return flag;//the id does not exist
        }
        flag=1;
        String sql = "DELETE FROM user WHERE user_id = ?";
        jdbcTemplate.update(sql,id);
        return flag;
    }
    @Override
    public ArrayList<User> findByType(int type){
        ArrayList<User> userList = new ArrayList<>();
        String sql = "SELECT * FROM user WHERE user_type = ?";
        jdbcTemplate.query(sql, new Object[]{type}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                User user = new User();
                user.setUser_id(rs.getString("user_id"));
                user.setUser_pwd("******");
                user.setUser_name(rs.getString("user_name"));
                user.setUser_type(type);
                user.setSelf_intro(rs.getString("self_intro"));
                userList.add(user);

            }
        });
        return userList;
    }
}
