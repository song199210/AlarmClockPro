package com.loonggg.alarmmanager.clock;
import android.app.Activity;
import android.content.Context;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.loonggg.alarmmanager.clock.view.SelectRemindCyclePopup;
import com.loonggg.alarmmanager.clock.view.SelectRemindWayPopup;
import com.loonggg.lib.alarmmanager.clock.AlarmManagerUtil;

import java.text.SimpleDateFormat;
import java.util.Date;


public class ClockModule {
        private String time;
        private int cycle;
        private int ring;

        public static String getTime(Date date) {
            SimpleDateFormat format = new SimpleDateFormat("HH:mm");
            return format.format(date);
        }

        public static void setClock(Activity _that, String time, int cycle,int ring) { //time设置时间,cycle闹钟频率,ring提醒模式
            if (time != null && time.length() > 0) {
                String[] times = time.split(":");
                int vibratorTyppe = 0;
                if (cycle == 0) {//是每天的闹钟
                    AlarmManagerUtil.setAlarm(_that, 0, Integer.parseInt(times[0]), Integer.parseInt
                            (times[1]), 0, 0, "闹钟响了", ring, vibratorTyppe);
                }
                if (cycle == -1) {//是只响一次的闹钟
                    AlarmManagerUtil.setAlarm(_that, 1, Integer.parseInt(times[0]), Integer.parseInt
                            (times[1]), 0, 0, "闹钟响了", ring, vibratorTyppe);
                } else {//多选，周几的闹钟
                    String weeksStr = parseRepeat(cycle, 1);
                    String[] weeks = weeksStr.split(",");
                    for (int i = 0; i < weeks.length; i++) {
                        AlarmManagerUtil.setAlarm(_that, 2, Integer.parseInt(times[0]), Integer
                                .parseInt(times[1]), i, Integer.parseInt(weeks[i]), "闹钟响了", ring, vibratorTyppe);
                    }
                }
                Toast.makeText(_that, "闹钟设置成功", Toast.LENGTH_LONG).show();
            }

        }


        /**
         * @param repeat 解析二进制闹钟周期
         * @param flag   flag=0返回带有汉字的周一，周二cycle等，flag=1,返回weeks(1,2,3)
         * @return
         */
        public static String parseRepeat(int repeat, int flag) {
            String cycle = "";
            String weeks = "";
            if (repeat == 0) {
                repeat = 127;
            }
            if (repeat % 2 == 1) {
                cycle = "周一";
                weeks = "1";
            }
            if (repeat % 4 >= 2) {
                if ("".equals(cycle)) {
                    cycle = "周二";
                    weeks = "2";
                } else {
                    cycle = cycle + "," + "周二";
                    weeks = weeks + "," + "2";
                }
            }
            if (repeat % 8 >= 4) {
                if ("".equals(cycle)) {
                    cycle = "周三";
                    weeks = "3";
                } else {
                    cycle = cycle + "," + "周三";
                    weeks = weeks + "," + "3";
                }
            }
            if (repeat % 16 >= 8) {
                if ("".equals(cycle)) {
                    cycle = "周四";
                    weeks = "4";
                } else {
                    cycle = cycle + "," + "周四";
                    weeks = weeks + "," + "4";
                }
            }
            if (repeat % 32 >= 16) {
                if ("".equals(cycle)) {
                    cycle = "周五";
                    weeks = "5";
                } else {
                    cycle = cycle + "," + "周五";
                    weeks = weeks + "," + "5";
                }
            }
            if (repeat % 64 >= 32) {
                if ("".equals(cycle)) {
                    cycle = "周六";
                    weeks = "6";
                } else {
                    cycle = cycle + "," + "周六";
                    weeks = weeks + "," + "6";
                }
            }
            if (repeat / 64 == 1) {
                if ("".equals(cycle)) {
                    cycle = "周日";
                    weeks = "7";
                } else {
                    cycle = cycle + "," + "周日";
                    weeks = weeks + "," + "7";
                }
            }

            return flag == 0 ? cycle : weeks;
        }

}
