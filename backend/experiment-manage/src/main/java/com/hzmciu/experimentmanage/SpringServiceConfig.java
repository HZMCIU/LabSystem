package com.hzmciu.experimentmanage;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class SpringServiceConfig extends WebMvcConfigurationSupport {
    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        // to  avoid HttpMediaTypeNotAcceptableException on standalone tomcat
        configurer.favorPathExtension(false);
    }

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);
    }
}
