/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cmpe275.utility;

import java.util.Calendar;

/**
 *
 * @author Shreya Shah
 */
public class Constant {
    
    public static final String LAST_24_HOURS = "last24hrs";
    
    public static final String LAST_WEEK = "lastweek";
    
    public static final String LAST_MONTH = "lastmonth";
    
    public static final String MONTHLY_SUBSCRIPTION = "M";
    
    public static final String PAY_PER_VIEW = "V";
    
    public static final String PAID = "P";
    
    public static final Integer SUBSCRIPTION_FEES = 10;
    
    public static Calendar getDateFromTimestamp(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }
    
}
