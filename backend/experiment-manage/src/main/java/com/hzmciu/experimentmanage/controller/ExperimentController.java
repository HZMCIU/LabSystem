package com.hzmciu.experimentmanage.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzmciu.experimentmanage.entity.Experiment;
import com.hzmciu.experimentmanage.service.ExperimentService;
//import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/experiment")
public class ExperimentController {

    @Autowired
    ExperimentService experimentService;


//    @CrossOrigin(value = "http://localhost:3000")
    @GetMapping("/getAll")
    public List<Experiment> getAllExperiment(){
        return experimentService.getAllExperiment();
    }
//    @CrossOrigin(value = "http://localhost:3000")
    @PostMapping("/addExperiment")
    public void addExperiment(@RequestBody String info){
        ObjectMapper objectMapper=new ObjectMapper();
        String exp_latex="";
        String exp_matlab="";
        String exp_name="";
        String exp_creator="";
        Date exp_start=null;
        Date exp_end=null;
        System.out.println(info);
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        try{
            Map t_code=objectMapper.readValue(info, new TypeReference<Map>() {});
            exp_latex=(String)t_code.get("experiment_latex");
            exp_matlab=(String)t_code.get("experiment_matlab");
            exp_name=(String)t_code.get("experiment_name");
            exp_creator=(String)t_code.get("experiment_creator");
            System.out.println((String)t_code.get("experiment_start"));
            System.out.println((String)t_code.get("experiment_end"));
            System.out.println(t_code.get("experiment_start").toString());
            exp_start=Date.valueOf((String)t_code.get("experiment_start"));
            exp_end=Date.valueOf((String)t_code.get("experiment_end"));
        }catch (Exception e){
            e.printStackTrace();
        }
        experimentService.addExperiment(exp_name,exp_creator,exp_start,exp_end,exp_latex,exp_matlab);
    }
//    @CrossOrigin(value = "http://localhost:3000")
    @GetMapping("/delete")
    public void deleteExperiment(@RequestParam("experiment_id") int exp_id){
        experimentService.deleteExperiment(exp_id);
    }
}
