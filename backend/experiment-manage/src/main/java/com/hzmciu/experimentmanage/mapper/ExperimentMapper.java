package com.hzmciu.experimentmanage.mapper;
import com.hzmciu.experimentmanage.annotation.DSSelector;
import com.hzmciu.experimentmanage.configuration.MultipleDataSourceHelper;
import com.hzmciu.experimentmanage.entity.Experiment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Mapper
@Repository
public interface ExperimentMapper {
    @Select("select * from experiment")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    List<Experiment> getAllList();
    @Insert({"insert into experiment(experiment_name,experiment_creator,experiment_start,experiment_end,experiment_latex,experiment_matlab)",
    "values(#{experiment_name},#{experiment_creator},#{experiment_start},#{experiment_end},#{experiment_latex},#{experiment_matlab})"})
    @DSSelector(MultipleDataSourceHelper.MASTER)
    void addExperiment(@Param("experiment_name") String experiment_name,
                       @Param("experiment_creator") String experiment_creator,
                       @Param("experiment_start") Date experiment_start,
                       @Param("experiment_end") Date experiment_end,
                       @Param("experiment_latex") String experiment_latex,
                       @Param("experiment_matlab") String experiment_matlab);
    @Delete("delete from experiment where experiment_id=#{experiment_id}")
    @DSSelector(MultipleDataSourceHelper.MASTER)
    void deleteExperiment(@Param("experiment_id")int experiment_id);

    @Select("select * from experiment where experiment_creator=#{experiment_creator}")
    @DSSelector(MultipleDataSourceHelper.SLAVE)
    List<Experiment> getExperimentsByCreator(@Param("experiment_creator")String creator);
}