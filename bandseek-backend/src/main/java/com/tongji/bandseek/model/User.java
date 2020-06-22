package com.tongji.bandseek.model;

public class User {
    private String user_id;
    private String user_pwd;
    private String user_name;
    private int user_type;
    private String self_intro;

    public User(){
        this.self_intro="";
        this.user_id="";
        this.user_name="";
        this.user_pwd="";
        this.user_type=-1;
    }

    public User(String id,String pwd,String name,int type){
        this.self_intro="";
        this.user_id=id;
        this.user_name=name;
        this.user_pwd=pwd;
        this.user_type=type;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_pwd() {
        return user_pwd;
    }

    public void setUser_pwd(String user_pwd) {
        this.user_pwd = user_pwd;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public int getUser_type() {
        return user_type;
    }

    public void setUser_type(int user_type) {
        this.user_type = user_type;
    }

    public void setSelf_intro(String self_intro) {
        this.self_intro = self_intro;
    }

    public String getSelf_intro() {
        return self_intro;
    }
}
