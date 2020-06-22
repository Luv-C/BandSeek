package com.tongji.bandseek.service;

import com.tongji.bandseek.model.Band;

import java.util.ArrayList;

public interface IBandService {
    int addBand(Band band);
    int deleteBand(int band_id);
    int editBand(Band band);
    Band findById(int band_id);
    Band findByName(String band_name);
    ArrayList<Band> findAll();

    int addBandUser(String user_id,int band_id,int isLeader);
    int deleteBandUser(String user_id,int band_id);
    ArrayList<String> findBandUser(int band_id);
    ArrayList<Integer> findUserBand(String user_id);
    int IsLeader(String user_id,int band_id);
    String getBandLeader(int band_id);
    int getLeaderBand(String user_id);
    int transferLeader(String old_name,String new_name,int band_id);

}
