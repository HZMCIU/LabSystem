package com.hzmciu.experimentmanage.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class MyDataSource {
    @Bean
    @ConfigurationProperties("spring.datasource.master")
    public DataSource masterDataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.slave")
    public DataSource slaveDataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean
    public DataSource dynamicDataSource(){
        Map<Object,Object> dataSourceMap=new HashMap<>();
        dataSourceMap.put(MultipleDataSourceHelper.MASTER,masterDataSource());
        dataSourceMap.put(MultipleDataSourceHelper.SLAVE,slaveDataSource());
        DynamicDataSource dds=new DynamicDataSource();
        dds.setTargetDataSources(dataSourceMap);
        dds.setDefaultTargetDataSource(masterDataSource());
        return dds;
    }
}
