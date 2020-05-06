package com.hzmciu.experimentmanage.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzmciu.experimentmanage.entity.ExperimentData;
import com.hzmciu.experimentmanage.entity.Point;
import com.hzmciu.experimentmanage.mapper.ExperimentDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.net.URLDecoder;
@Service
public class ExperimentDataService {
    @Autowired
    ExperimentDataMapper experimentDataMapper;
    public void addData(String username,int exp_id,Date time,List<Point> data,String matalb) {
        ObjectMapper objectMapper=new ObjectMapper();
        String sData="";
        try{
             sData=objectMapper.writeValueAsString(data);
             experimentDataMapper.addData(username,exp_id,time,sData,matalb);
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    public List<ExperimentData> getDataById(int id) {

        //experiment_data中的data字段为String需要转化为实体类，这样传递给前端正确的JSON格式数据
        List<ExperimentData> data=new ArrayList<>();
        List<Map> origin=experimentDataMapper.getDataByExperiemtId(id);
        ObjectMapper objectMapper=new ObjectMapper();
        for(Map obj:origin){
            ExperimentData tmpData=new ExperimentData();

            tmpData.setUsername((String)obj.get("username"));
            tmpData.setTime((Date)obj.get("time"));
            tmpData.setExperiment_id((int)obj.get("experiment_id"));

            try{
                List<Point> points=objectMapper.readValue((String)obj.get("data"), new TypeReference<List<Point>>() {});
                tmpData.setData(points);
            }catch (Exception e){
                e.printStackTrace();
            }
            data.add(tmpData);
        }
        return data;
    }
}
