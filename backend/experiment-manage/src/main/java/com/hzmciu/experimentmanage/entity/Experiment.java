package com.hzmciu.experimentmanage.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Date;

@Data
public class Experiment {
    private int experiment_id;
    private String experiment_name;
    private String experiment_creator;
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    private Date experiment_start;
    @JsonFormat(timezone = "GMT+8",pattern = "yyyy-MM-dd")
    private Date experiment_end;
    private String experiment_latex;
    private String experiment_matlab;
}
