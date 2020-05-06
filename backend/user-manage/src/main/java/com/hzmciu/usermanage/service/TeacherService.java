package com.hzmciu.usermanage.service;

import com.hzmciu.usermanage.entity.Teacher;
import com.hzmciu.usermanage.mapper.TeacherMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherMapper teacherMapper;
    public boolean checkAccount(String account,String password){
        Teacher teacher=teacherMapper.getTeacherByAccount(account);
        if(teacher!=null&&teacher.getTeacher_password().equals(password)){
            return true;
        }
        return false;
    }
}
