package com.hzmciu.experimentmanage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzmciu.experimentmanage.entity.ExperimentData;
import com.hzmciu.experimentmanage.entity.Point;
import com.hzmciu.experimentmanage.service.ExperimentDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.net.URLDecoder;
import java.sql.Date;
import java.util.List;
import java.util.Map;

//switcher返回给用户数据的时候，调用该接口储存数据，储存的数据为教师查看
@RestController
@RequestMapping("/experiment")
public class ExperimentDataController {

    @Autowired
    ExperimentDataService experimentDataService;

    @PostMapping("/save_data")
    public void saveData (@RequestBody  List<Point> data ,@RequestParam("username")String username,
                          @RequestParam("experiment_id") int exp_id,@RequestParam("matlab_code") String matlab)
            throws Exception{
        matlab=URLDecoder.decode(matlab,"utf-8");
        Date time=new Date(System.currentTimeMillis());
        experimentDataService.addData(username,exp_id,time,data,matlab);
    }
    @GetMapping("/get_data")
    public List<ExperimentData> retriveData(@RequestParam("experiment_id") int exp_id) {
        return experimentDataService.getDataById(exp_id);
    }
}
