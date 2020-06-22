package com.tongji.bandseek.dao.Implementation;

import com.tongji.bandseek.dao.IBandDao;
import com.tongji.bandseek.model.Band;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


@Repository
public class BandDaoImpl implements IBandDao{
    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Override
    public ArrayList<Band> findAll(){
        ArrayList<Band> allBands = new ArrayList<>();
        String sql = "SELECT * FROM band";
        jdbcTemplate.query(sql, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                Band band = new Band();
                band.setBand_id(resultSet.getInt("band_id"));
                band.setBand_name(resultSet.getString("band_name"));
                band.setBand_num(resultSet.getInt("band_num"));
                band.setBand_description(resultSet.getString("band_description"));
                allBands.add(band);
            }
        });
        return allBands;
    }

    @Override
    public Band findById(int band_id){
        String sql = "SELECT * FROM band WHERE band_id = ?";
        Band band = new Band();
        jdbcTemplate.query(sql, new Object[]{band_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                band.setBand_id(band_id);
                band.setBand_name(rs.getString("band_name"));
                band.setBand_num(rs.getInt("band_num"));
                band.setBand_description(rs.getString("band_description"));

            }
        });
        return band;
    }

    @Override
    public Band findByName(String band_name){
        String sql = "SELECT * FROM band WHERE band_name = ?";
        Band band = new Band();
        jdbcTemplate.query(sql, new Object[]{band_name}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                band.setBand_id(rs.getInt("band_id"));
                band.setBand_name(rs.getString("band_name"));
                band.setBand_num(rs.getInt("band_num"));
                band.setBand_description(rs.getString("band_description"));

            }
        });
        return band;
    }

    @Override
    public int addBand(Band band){
        int flag = 2;
        if(!findByName(band.getBand_name()).getBand_name().equals("")){
            return flag;//2 presents band name already exists
        }
        String sql="INSERT INTO band(band_name,band_num,band_description) VALUES(?,?,?)";
        jdbcTemplate.update(sql,band.getBand_name(),band.getBand_num(),band.getBand_description());
        flag=1;
        return flag;//1 presents success

    }
    @Override
    public int deleteBand(int band_id){
        int flag = 2;
        Band band=findById(band_id);
        if(findById(band_id).getBand_name().equals("")){
            return flag;//2 presents band does not exist
        }
        flag =1;
        String sql="DELETE FROM band WHERE band_id = ?";
        jdbcTemplate.update(sql,band_id);
        band.setBand_num(band.getBand_num()-1);
        return flag;//1 presents success
    }

    @Override
    public int editBand(Band band){
        String sql = "UPDATE band set band_name=? WHERE band_id=?";
        jdbcTemplate.update(sql,band.getBand_name(),band.getBand_id());
        sql = "UPDATE band set band_num=? WHERE band_id=?";
        jdbcTemplate.update(sql,band.getBand_num(),band.getBand_id());
        sql = "UPDATE band set band_description=? WHERE band_id=?";
        jdbcTemplate.update(sql,band.getBand_description(),band.getBand_id());
        return 1;
    }


    @Override
    public int addBandUser(String user_id,int band_id,int isLeader){
        Band band=findById(band_id);
        int band_num = band.getBand_num();
        if(band_num==10){
            return 3;
            //3:the band is full
        }
        else {
            String sql = "INSERT INTO user_band (user_id,band_id,isLeader) VALUES(?,?,?)";
            jdbcTemplate.update(sql,user_id,band_id,isLeader);
            //band_num++
            band.setBand_num(band_num+1);
            editBand(band);
            return 1;
        }
    }

    @Override
    public int deleteBandUser(String user_id,int band_id){
        String sql = "DELETE FROM user_band WHERE user_id = ? AND band_id = ?";
        jdbcTemplate.update(sql,user_id,band_id);
        return 1;
    }
    @Override
    public ArrayList<String> findBandUser(int band_id){
        ArrayList<String> bandUser = new ArrayList<>();
        String sql = "SELECT * FROM user_band WHERE band_id = ?";
        jdbcTemplate.query(sql, new Object[]{band_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                bandUser.add(rs.getString("user_id"));
            }
        });
        return bandUser;
    }
    @Override
    public ArrayList<Integer> findUserBand(String user_id){
        ArrayList<Integer> userBand = new ArrayList<>();
        String sql = "SELECT * FROM user_band WHERE user_id = ?";
        jdbcTemplate.query(sql, new Object[]{user_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                userBand.add(rs.getInt("band_id"));
            }
        });
        return userBand;
    }
    @Override
    public int IsLeader(String user_id,int band_id){
        ArrayList<Integer> judge= new ArrayList<>();
        String sql = "SELECT * FROM user_band WHERE user_id = ? AND band_id = ?";
        jdbcTemplate .query(sql, new Object[]{user_id, band_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet rs) throws SQLException {
                 judge.add(rs.getInt("isLeader"));
            }
        });
        return judge.get(0);
    }

    @Override
    public String getBandLeader(int band_id){
        String sql = "SELECT * FROM user_band WHERE band_id=? And isLeader=1";
        ArrayList<String> user_id = new ArrayList<>();
        jdbcTemplate.query(sql, new Object[]{band_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                user_id.add(resultSet.getString("user_id"));
            }
        });
        return user_id.get(0);
    }
    @Override
    public int getLeaderBand(String user_id){
        String sql ="SELECT * FROM user_band WHERE user_id=? AND isLeader=1";
        ArrayList<Integer> band_id = new ArrayList<>();
        jdbcTemplate.query(sql, new Object[]{user_id}, new RowCallbackHandler() {
            @Override
            public void processRow(ResultSet resultSet) throws SQLException {
                band_id.add(resultSet.getInt("band_id"));
            }
        });

        if(band_id.size()==0){
            return -1;
        }
        return band_id.get(0);
    }
    @Override
    public  int transferLeader(String old_id,String new_id,int band_id){
        String sql = "UPDATE user_band set isLeader = ? WHERE user_id = ? AND band_id=?";
        jdbcTemplate.update(sql,0,old_id,band_id);
        jdbcTemplate.update(sql,1,new_id,band_id);
        return 1;
    }


}
