package com.tongji.bandseek.model;

public class Band {
    private int band_id;
    private String band_name;
    private int band_num;
    private String band_description;

    public Band(){
        this.band_name="";
        this.band_num=-1;
        this.band_description="";
    }

    public Band(String band_name,int band_num,String band_description){
        this.band_name=band_name;
        this.band_num=band_num;
        this.band_description=band_description;
    }

    public String getBand_name() {
        return band_name;
    }

    public void setBand_name(String band_name) {
        this.band_name = band_name;
    }

    public int getBand_num() {
        return band_num;
    }

    public void setBand_num(int band_num) {
        this.band_num = band_num;
    }

    public String getBand_description() {
        return band_description;
    }

    public void setBand_description(String band_description) {
        this.band_description = band_description;
    }

    public void setBand_id(int band_id) {
        this.band_id = band_id;
    }

    public int getBand_id() {
        return band_id;
    }
}
