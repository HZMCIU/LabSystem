package com.hzmciu.usermanage.service;

import com.hzmciu.usermanage.entity.Student;
import com.hzmciu.usermanage.mapper.StudentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentMapper studentMapper;
    public boolean checkAccount(String account,String password){
        Student student=studentMapper.getStudentByAccount(account);
        if(student!=null&&student.getStudent_password().equals(password)){
            return true;
        }
        return false;
    }
}
