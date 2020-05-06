package com.hzmciu.experimentmanage.annotation;

import com.hzmciu.experimentmanage.configuration.MultipleDataSourceHelper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class DSSelectorImpl {
    @Before("com.hzmciu.experimentmanage.annotation.DSPointcut.DSSelector()")
    public void changeDS(JoinPoint joinPoint){
        MethodSignature methodSignature=(MethodSignature) joinPoint.getSignature();
        Method method=methodSignature.getMethod();
        DSSelector dsSelector=method.getAnnotation(DSSelector.class);
        if(dsSelector==null) return ;
        MultipleDataSourceHelper.set(dsSelector.value());
    }
}
