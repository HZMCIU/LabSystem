package com.hzmciu.usermanage.mapper;

import com.hzmciu.usermanage.annotation.DSSelector;
import com.hzmciu.usermanage.configuration.MultipleDataSourceHelper;
import com.hzmciu.usermanage.entity.Teacher;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherMapper {

    @Select("select * from teacher where teacher_id=#{id}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    Teacher getTeacher(@Param("id") int id);

    @Insert("insert into teacher(teacher_account,teacher_password)" +
            " values (#{account},#{password})" )
    @DSSelector(MultipleDataSourceHelper.MASTER)
    void addTeacher(@Param("account") String account,@Param("password") String password);

    @Select("select * from teacher where teacher_account=#{account}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    Teacher getTeacherByAccount(@Param("account") String account);
}
