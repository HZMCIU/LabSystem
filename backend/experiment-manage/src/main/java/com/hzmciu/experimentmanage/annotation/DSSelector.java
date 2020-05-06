package com.hzmciu.experimentmanage.annotation;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DSSelector {
    String value();
}
