package com.tongji.bandseek.service.Implementation;

import com.tongji.bandseek.dao.IBandDao;
import com.tongji.bandseek.model.Band;
import com.tongji.bandseek.service.IBandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BandService implements IBandService {
    @Autowired
    public IBandDao iBandDao;

    @Override
    public ArrayList<Band> findAll(){return iBandDao.findAll();}
    @Override
    public int addBand(Band band){
        return iBandDao.addBand(band);
    }
    @Override
    public int deleteBand(int band_id){
        return iBandDao.deleteBand(band_id);
    }
    @Override
    public int editBand(Band band){
        return iBandDao.editBand(band);
    }
    @Override
    public Band findById(int band_id){
        return iBandDao.findById(band_id);
    }
    @Override
    public Band findByName(String band_name){return iBandDao.findByName(band_name);}


    @Override
    public int addBandUser(String user_id,int band_id,int isLeader){
        return iBandDao.addBandUser(user_id,band_id,isLeader);
    }
    @Override
    public int deleteBandUser(String user_id,int band_id){return iBandDao.deleteBandUser(user_id,band_id);}
    @Override
    public ArrayList<String> findBandUser(int band_id){
        return iBandDao.findBandUser(band_id);
    }
    @Override
    public ArrayList<Integer> findUserBand(String user_id){
        return iBandDao.findUserBand(user_id);
    }
    @Override
    public int IsLeader(String user_id,int band_id){
        return iBandDao.IsLeader(user_id,band_id);
    }
    @Override
    public String getBandLeader(int band_id){return iBandDao.getBandLeader(band_id);}
    @Override
    public int getLeaderBand(String user_id){return iBandDao.getLeaderBand(user_id);}
    @Override
    public int transferLeader(String old_id,String new_id,int band_id){
        return iBandDao.transferLeader(old_id,new_id,band_id);
    }
}
