package com.hzmciu.experimentmanage.configuration;

public class MultipleDataSourceHelper {
    public static final String MASTER="master";
    public static final String SLAVE="slave";
    private static ThreadLocal<String> holder=new ThreadLocal<>();

    public static void set(String db){
        holder.set(db);
    }

    public static String get(){
        return holder.get();
    }
}
