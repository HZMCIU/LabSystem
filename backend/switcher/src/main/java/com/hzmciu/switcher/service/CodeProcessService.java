package com.hzmciu.switcher.service;

import com.hzmciu.switcher.entity.Point;
import feign.ExceptionPropagationPolicy;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.ReferenceUriSchemesSupported;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class CodeProcessService {

    public List<Point> compileAndGetData(String code){
        String func="PID";
        saveCode(code,func);
        compileCode(code,func);
        List<Point> res=gatherDataFromFile();
        return res;
    }

    public void deployCode(String code){
        String func="PID";
        saveCode(code,func);
        String deployCMD="cmd.exe /c cd codes & mcc -W CTF:"+func+" -U "+func+".m";
        String destDir="F:\\WorkSpace\\MatlabDashboard\\mps_workspace\\Instances\\mps_3\\auto_deploy";
        String transCMD="cmd.exe /c cd codes & copy /y \"./" +func+".ctf\" "  +"\""+destDir+"\"";
        try{
            Process process1=Runtime.getRuntime().exec(deployCMD);
            Process process2=Runtime.getRuntime().exec(transCMD);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    private void saveCode(String code,String filename){
        File codeDir =new File("./codes");
        if(!codeDir.exists()){
            codeDir.mkdir();
        }
        File codeFile=new File("./codes/"+filename+".m");
        try{
            BufferedWriter bufferedWriter=new BufferedWriter(new FileWriter(codeFile));
            bufferedWriter.write(code);
            bufferedWriter.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private void compileCode(String code,String functionName){
        saveCode(code,functionName);
        String exeCMD="cmd.exe /c cd codes & matlab -nosplash -nodesktop -minimize -r [y,t]="+functionName+";";
        String saveCMD="save('t.txt','t','-ascii');save('y.txt','y','-ascii');exit;";
        System.out.println(exeCMD+saveCMD);
        boolean intoDir=false;
        try{
            Process process=Runtime.getRuntime().exec(exeCMD+saveCMD);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private List<Point> gatherDataFromFile(){

        while(!isDataGenerated()){
            try{
                Thread.sleep(3000);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        List<Point> points=new ArrayList<>();
        try{
            File yFile=new File("./codes/y.txt");
            File tFile=new File("./codes/t.txt");
            BufferedReader ybr=new BufferedReader(new FileReader(yFile));
            BufferedReader tbr=new BufferedReader(new FileReader(tFile));
            String t_t=tbr.readLine();
            String t_y=ybr.readLine();
            while(t_t!=null&&t_y!=null){
                double t=Double.valueOf(t_t);
                double y=Double.valueOf(t_y);
                points.add(new Point(t,y));
                t_t=tbr.readLine();
                t_y=ybr.readLine();
            }
            ybr.close();
            tbr.close();
            yFile.delete();
            tFile.delete();
        }catch (Exception e){
            e.printStackTrace();
        }finally {
        }

        return points;
    }

    private boolean isDataGenerated(){
        File data=new File("./codes/t.txt");
        return data.exists();
    }
}