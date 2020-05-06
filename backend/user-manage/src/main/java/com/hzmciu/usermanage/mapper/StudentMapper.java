package com.hzmciu.usermanage.mapper;

import com.hzmciu.usermanage.annotation.DSSelector;
import com.hzmciu.usermanage.configuration.MultipleDataSourceHelper;
import com.hzmciu.usermanage.entity.Student;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface StudentMapper {

    @Select("select * from student where student_id = #{id}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    Student getStudent(@Param("id") int id);

    @Insert("insert into student(student_account,student_password)" +
            "values (#{account},#{password})")
    @DSSelector(MultipleDataSourceHelper.MASTER)
    void addStudent(@Param("account") String account,@Param("password") String password);

    @Select("select * from student where student_account=#{account}")
    @DSSelector(MultipleDataSourceHelper.MASTER)
    Student getStudentByAccount(@Param("account") String account);
}
