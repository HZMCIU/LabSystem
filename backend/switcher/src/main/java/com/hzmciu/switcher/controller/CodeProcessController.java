package com.hzmciu.switcher.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzmciu.switcher.entity.Point;
import com.hzmciu.switcher.service.CodeProcessService;
import com.netflix.discovery.converters.Auto;
import feign.Param;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;

import java.net.URL;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Map;

import com.mathworks.mps.client.MWClient;
import com.mathworks.mps.client.MWHttpClient;
import com.mathworks.mps.client.MATLABException;
import com.mathworks.mps.client.MWInvokable;

@RestController
@RequestMapping("/switcher")
public class CodeProcessController {

//    @Autowired
//    ExperimentDataClient experimentDataClient;
    @Autowired
    CodeProcessService codeProcessService;
    @GetMapping("/get")
    public List<Point> get(@RequestParam("param") int param,@RequestParam("username") String username,
                            @RequestParam("experiment_id") int exp_id){
        List<Point> points=new ArrayList<>();
        try {
            MWClient myClient = new MWHttpClient();
            URL archiveURL = new URL("http://localhost:9910/PID");
            MWInvokable myProxy = myClient.createComponentProxy(archiveURL);
            Object[] PID = myProxy.invoke("PID", 2, Object[].class, param);
            double[] y = ((double[]) PID[0]);
            double[] t = ((double[]) PID[1]);
            for(int i=0;i<y.length;i++){
                points.add(new Point(t[i],y[i]));
            }
            ObjectMapper objectMapper=new ObjectMapper();
            String result=objectMapper.writeValueAsString(points);
//            experimentDataClient.saveData(points,username,exp_id);
            return points;
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return null;
    }
    @PostMapping("/run_code")
    public List<Point> compileCode(@RequestBody String info){
        ObjectMapper objectMapper=new ObjectMapper();
        String matlab_code="";
        System.out.println(info);
        try{
            Map t_info=objectMapper.readValue(info, new TypeReference<Map>() {});
//            System.out.println((String)t_info.get("code"));
            matlab_code=(String)t_info.get("matlab_code");
        }catch (Exception e){
            e.printStackTrace();
        }
        System.out.println(matlab_code);
        List<Point> result=codeProcessService.compileAndGetData(matlab_code);
        return result;
    }

    @PostMapping("deloy_code")
    public void deployCode(@RequestBody String code){

    }
    @FeignClient(name = "experiment-manage",path = "/experiment")
    public interface ExperimentDataClient {
        @GetMapping("/save_data")
        void saveData(@RequestBody List<Point> data, @RequestParam("username") String username,
                      @RequestParam("experiment_id") int exp_id);
    }
}
