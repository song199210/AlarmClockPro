package com.loonggg.alarmmanager.clock;
import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.media.MediaPlayer;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReadableArray;
import com.loonggg.alarmmanager.clock.view.SelectRemindCyclePopup;
import com.loonggg.alarmmanager.clock.view.SelectRemindWayPopup;
import com.loonggg.lib.alarmmanager.clock.AlarmManagerUtil;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class ClockModule {
        private String time;
        private static int cycle;
        private int ring;

        public static MediaPlayer mediaPlayer;
        public static Vibrator vibrator;

        public static String getTime(Date date) {
            SimpleDateFormat format = new SimpleDateFormat("HH:mm");
            return format.format(date);
        }
        //测试震动模式-开始
        public static void testShockClock(Activity _that,int type){
            if(type == 7){
                if(vibrator != null){
                    vibrator.cancel();
                }
                return;
            }
            long[] long_type=null; //默认模式
            switch (type){//判断震动模式
                case 0: //断奏
                    long_type=new long[]{100, 150, 150, 1000};
                    break;
                case 1: //急促
                    long_type=new long[]{100, 100, 100, 100};
                    break;
                case 2: //交响乐
                    long_type=new long[]{100, 100, 100, 800};
                    break;
                case 3: //轻重音
                    long_type=new long[]{100, 50, 100, 600};
                    break;
                case 4: //提醒
                    long_type=new long[]{800, 1500, 800, 1500};
                    break;
                case 5: //心跳
                    long_type=new long[]{400, 200, 400, 200};
                    break;
                default:
                    long_type=new long[]{100, 60, 100, 600};
                    break;
            }
            vibrator = (Vibrator) _that.getSystemService(Service.VIBRATOR_SERVICE);
            vibrator.vibrate(long_type, -1);
        }
        //测试震动模式-关闭
        public static void stopTestShockClock(){
            vibrator.cancel();
        }
        public static void testRingClock(Activity _that,int type){
            if(mediaPlayer != null){
                mediaPlayer.stop();
            }
            switch (type){
                case 0:
                    mediaPlayer = MediaPlayer.create(_that, com.loonggg.lib.alarmmanager.clock.R.raw.beep);
                    break;
                case 1:
                    mediaPlayer = MediaPlayer.create(_that, com.loonggg.lib.alarmmanager.clock.R.raw.lingsheng2);
                case 2:
                    mediaPlayer = MediaPlayer.create(_that, com.loonggg.lib.alarmmanager.clock.R.raw.lingsheng3);
            }
            mediaPlayer.setLooping(false);
            mediaPlayer.start();
        }

        public static void selectRemindCycle(ReadableArray flagList) {//计算闹钟频率
            int ret=0;
            for (int i=0;i<flagList.size();i++){
                int flag=flagList.getInt(i);
                if(8 == flag){//判断list中是否有8，8表示每天重复
                    cycle=0;
                    break;
                }else{
                    if(flag != 0){
                        ret=ret+flag*2;
                    }else{
                        ret=ret+1;
                    }
                }
            }
            cycle = ret;
        }
        /**
         * @param flaglist 闹钟频率模式
         * @param clockMode 闹钟模式：1铃声;0震动;2铃声和震动
         * @param vibratorTyppe 震动模式
         * @param ringType 铃声模式
        * */
        public static void setClock(Activity _that, String time, ReadableArray flaglist, int clockMode, int vibratorTyppe, int ringType) {
            selectRemindCycle(flaglist); //初始化闹钟频率
            if (time != null && time.length() > 0) {
                String[] times = time.split(":");
                if (cycle == 0) {//是每天的闹钟
                    AlarmManagerUtil.setAlarm(_that, 0, Integer.parseInt(times[0]), Integer.parseInt
                            (times[1]), 0, 0, "闹钟响了", clockMode, vibratorTyppe,ringType);
                }
                if (cycle == -1) {//是只响一次的闹钟
                    AlarmManagerUtil.setAlarm(_that, 1, Integer.parseInt(times[0]), Integer.parseInt
                            (times[1]), 0, 0, "闹钟响了", clockMode, vibratorTyppe,ringType);
                } else {//多选，周几的闹钟
                    String weeksStr = parseRepeat(cycle, 1);
                    String[] weeks = weeksStr.split(",");
                    for (int i = 0; i < weeks.length; i++) {
                        AlarmManagerUtil.setAlarm(_that, 2, Integer.parseInt(times[0]), Integer
                                .parseInt(times[1]), i, Integer.parseInt(weeks[i]), "闹钟响了", clockMode, vibratorTyppe,ringType);
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
