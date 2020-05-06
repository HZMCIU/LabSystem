package com.hzmciu.experimentmanage.annotation;

import org.aspectj.lang.annotation.Pointcut;

public class DSPointcut {
    @Pointcut("execution(public * com.hzmciu.experimentmanage.mapper.*.*(..))")
    public void DSSelector(){

    }
}
