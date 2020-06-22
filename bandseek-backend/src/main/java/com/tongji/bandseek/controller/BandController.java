package com.tongji.bandseek.controller;

import com.alibaba.fastjson.JSONObject;
import com.tongji.bandseek.model.Band;
import com.tongji.bandseek.model.User;
import com.tongji.bandseek.service.IBandService;
import com.tongji.bandseek.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Controller
@CrossOrigin(maxAge = 3600,origins = "*")
@ResponseBody
@RequestMapping("/band")
public class BandController {
    @Autowired
    public IBandService iBandService;
    @Autowired
    public IUserService iUserService;

    //对band表的操作
    @RequestMapping(value="/createBand",method = RequestMethod.POST)
    public String createBand(@RequestParam String band_name,String band_description,String user_id){
        Band band = new Band(band_name,0,band_description);
        int error_code = iBandService.addBand(band);
        if(error_code==2){
            return JSONObject.toJSONString(error_code);
            //2:band_name has already existed
        }
        band = iBandService.findByName(band_name);
        if(band.getBand_name().equals(""))
        {
            return JSONObject.toJSONString(3);
            //3:add to band database failed
        }
        iBandService.addBandUser(user_id,band.getBand_id(),1);
        return JSONObject.toJSONString(error_code);
        //1:success
    }

    @RequestMapping(value = "/editBand",method = RequestMethod.POST)
    public String editBand(@RequestParam int band_id,String band_name,String band_description){
        Band band = iBandService.findById(band_id);
        if(band.getBand_name().equals("")){
            return JSONObject.toJSONString(2);
            //2:do not exist such band
        }

        ArrayList<Band> allBands = iBandService.findAll();
        for (int i = 0;i<allBands.size();i++){
            if(allBands.get(i).getBand_name().equals(band_name)&&allBands.get(i).getBand_id()!=band_id){
                return JSONObject.toJSONString(3);
                //3：the name has already exits
            }
        }

        band.setBand_name(band_name);
        band.setBand_description(band_description);
        return JSONObject.toJSONString(iBandService.editBand(band));
        //1:success
    }

    @RequestMapping(value = "/disband",method = RequestMethod.POST)
    public String disband(@RequestParam String user_id, int band_id){
        iBandService.deleteBandUser(user_id,band_id);
        iBandService.deleteBand(band_id);
        return JSONObject.toJSONString(1);
    }

    @RequestMapping(value = "/findById",method = RequestMethod.POST)
    public Band findById(@RequestParam int band_id){
        return iBandService.findById(band_id);
    }

    @RequestMapping(value = "/findByName",method = RequestMethod.POST)
    public Band findByName(@RequestParam String band_name){return iBandService.findByName(band_name);}

    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public ArrayList<Band> findAll(){return iBandService.findAll();}


    //对user_band表的操作
    @RequestMapping(value = "/findUserBand",method = RequestMethod.POST)
    public ArrayList<Integer> findUserBand(@RequestParam String user_id){
        return iBandService.findUserBand(user_id);
    }

    @RequestMapping(value = "/findBandUser",method = RequestMethod.POST)
    public ArrayList<String> findBandUser(@RequestParam int band_id){return iBandService.findBandUser(band_id);}

    @RequestMapping(value = "/isLeader",method = RequestMethod.POST)
    public int isLeader(@RequestParam String user_id,int band_id){
        return iBandService.IsLeader(user_id,band_id);
    }

    @RequestMapping(value = "/getBandLeader",method =RequestMethod.POST)
    public String getBandLeader(@RequestParam int band_id){
        return iUserService.findById(iBandService.getBandLeader(band_id)).getUser_name();
    }

    @RequestMapping(value = "/getLeaderBand",method = RequestMethod.POST)
    public int getLeaderBand(@RequestParam String user_id){
        return iBandService.getLeaderBand(user_id);
    }

    @RequestMapping(value = "/addBandUser",method = RequestMethod.POST)
    public String addBandUser(@RequestParam String user_id,int band_id,int isLeader){
        if(iBandService.findBandUser(band_id).contains(user_id)){
            return JSONObject.toJSONString(2);
            //2 presents is already exits
        }
        int error_code=iBandService.addBandUser(user_id,band_id,isLeader);
        return JSONObject.toJSONString(error_code);
        //1 presents success
    }

    @RequestMapping(value = "/removeBandUser",method = RequestMethod.POST)
    public String removeBandUser(@RequestParam int band_id,String user_name){
        String user_id = iUserService.findByName(user_name).getUser_id();
        if(isLeader(user_id,band_id)==1){
            return JSONObject.toJSONString(2);
            //2:can't remove the band leader
        }
        iBandService.deleteBandUser(user_id,band_id);
        Band band=iBandService.findById(band_id);
        band.setBand_num(band.getBand_num()-1);
        return JSONObject.toJSONString(iBandService.editBand(band));
    }

    @RequestMapping(value = "/transferLeader",method = RequestMethod.POST)
    public String transferLeader(@RequestParam String old_name,String new_name,int band_id){
        User old_user=iUserService.findByName(old_name);
        User new_user=iUserService.findByName(new_name);

        return JSONObject.toJSONString(iBandService.transferLeader(old_user.getUser_id(),new_user.getUser_id(),band_id));
    }

}
