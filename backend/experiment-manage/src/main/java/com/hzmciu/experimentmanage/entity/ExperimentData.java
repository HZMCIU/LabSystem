package com.hzmciu.experimentmanage.entity;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class ExperimentData {
    private String username;
    private int experiment_id;
    private List<Point> data;
    private Date time;
    private String matlab;
}
