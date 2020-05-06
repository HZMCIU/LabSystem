package com.hzmciu.experimentmanage.service;

import com.hzmciu.experimentmanage.entity.Experiment;
import com.hzmciu.experimentmanage.mapper.ExperimentMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ExperimentService {
    @Autowired
    ExperimentMapper experimentMapper;

    public List<Experiment> getAllExperiment(){
        return experimentMapper.getAllList();
    }
    public void addExperiment(String exp_name, String exp_creator, Date exp_start,Date exp_end, String exp_latex,String exp_matlab){
        experimentMapper.addExperiment(exp_name,exp_creator,exp_start,exp_end,exp_latex,exp_matlab);
    }
    public void deleteExperiment(int exp_id){
        experimentMapper.deleteExperiment(exp_id);
    }
}
