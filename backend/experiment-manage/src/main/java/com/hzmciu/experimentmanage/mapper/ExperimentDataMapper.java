package com.hzmciu.experimentmanage.mapper;

import com.hzmciu.experimentmanage.annotation.DSSelector;
import com.hzmciu.experimentmanage.configuration.MultipleDataSourceHelper;
import com.hzmciu.experimentmanage.entity.ExperimentData;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface ExperimentDataMapper {
    @Insert("insert into experiment_data(username,experiment_id,time,data,matlab)" +
            "values(#{username},#{experiment_id},#{time},#{data},#{matlab})")
    @DSSelector(MultipleDataSourceHelper.MASTER)
    void addData(@Param("username") String username,@Param("experiment_id") int experiment_id,
                    @Param("time") Date time,@Param("data") String data,@Param("matlab") String matlab);

    @Select("select * from experiment_data where experiment_id=#{experiment_id}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    List<Map> getDataByExperiemtId(@Param("experiment_id") int experiment_id);

    @Select("select * from experiment_data where username=#{username}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    List<ExperimentData> getDataByUsername(@Param("username") String username);
}
