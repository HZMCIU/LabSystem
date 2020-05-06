package com.hzmciu.usermanage.controller;

import com.hzmciu.usermanage.entity.Student;
import com.hzmciu.usermanage.entity.Teacher;
import com.hzmciu.usermanage.mapper.StudentMapper;
import com.hzmciu.usermanage.mapper.TeacherMapper;
import com.hzmciu.usermanage.service.StudentService;
import com.hzmciu.usermanage.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private StudentMapper studentMapper;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TeacherMapper teacherMapper;
    @Autowired
    private TeacherService teacherService;
    @GetMapping("getStudent")
    public Student getStudent(@RequestParam int id){
        Student student=studentMapper.getStudent(id);
        return student;
    }
    @CrossOrigin(origins = {"http://localhost:80", "null"})
    @PostMapping("addStudent")
    public void addStudent(@RequestParam String account,@RequestParam String password){
        studentMapper.addStudent(account,password);
    }

    @CrossOrigin(origins = {"http://localhost:80", "null"})
    @PostMapping("studentLogin")
    public String studentLogin(@RequestParam String account,@RequestParam String password){
        System.out.println(account+"  "+password);
        if(studentService.checkAccount(account,password)){
            return "success";
        }
        return "fail";
    }

    @GetMapping("getTeacher")
    public Teacher getTeacher(@RequestParam int id){
        return teacherMapper.getTeacher(id);
    }
    @GetMapping("addTeacher")
    public void addTeacher(@RequestParam String account,@RequestParam String password){
        teacherMapper.addTeacher(account,password);
    }

    @PostMapping("teacherLogin")
    public String teacherLogin(@RequestParam String account,@RequestParam String password){
        System.out.println(account+"  "+password);
        if(teacherService.checkAccount(account,password)){
            return "success";
        }
        return "fail";
    }
}
