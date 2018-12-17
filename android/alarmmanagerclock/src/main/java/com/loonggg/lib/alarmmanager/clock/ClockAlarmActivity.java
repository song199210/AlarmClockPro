package com.loonggg.lib.alarmmanager.clock;

import android.app.Activity;
import android.app.Service;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Vibrator;
import android.view.View;

import java.util.ArrayList;
import java.util.List;


public class ClockAlarmActivity extends Activity {
    private MediaPlayer mediaPlayer;
    private Vibrator vibrator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_clock_alarm);
        String message = this.getIntent().getStringExtra("msg");
        int flag = this.getIntent().getIntExtra("flag", 0);
        int type = this.getIntent().getIntExtra("type",0);
        showDialogInBroadcastReceiver(message, flag,type);
    }

    private void showDialogInBroadcastReceiver(String message, final int flag,final int type) {
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
        if (flag == 1 || flag == 2) {//创建铃声
            mediaPlayer = MediaPlayer.create(this, R.raw.in_call_alarm);
            mediaPlayer.setLooping(true);
            mediaPlayer.start();
        }
        //数组参数意义：第一个参数为等待指定时间后开始震动，震动时间为第二个参数。后边的参数依次为等待震动和震动的时间
        //第二个参数为重复次数，-1为不重复，0为一直震动
        if (flag == 0 || flag == 2) {//创建震动
            vibrator = (Vibrator) this.getSystemService(Service.VIBRATOR_SERVICE);
            vibrator.vibrate(long_type, 0);
        }

        final SimpleDialog dialog = new SimpleDialog(this, R.style.Theme_dialog);
        dialog.show();
        dialog.setTitle("闹钟提醒");
        dialog.setMessage(message);
        dialog.setClickListener(new View.OnClickListener() {//关闭闹钟
            @Override
            public void onClick(View v) {
                if (dialog.bt_confirm == v || dialog.bt_cancel == v) {
                    if (flag == 1 || flag == 2) {
                        mediaPlayer.stop();
                        mediaPlayer.release();
                    }
                    if (flag == 0 || flag == 2) {
                        vibrator.cancel();
                    }
                    dialog.dismiss();
                    finish();
                }
            }
        });


    }

}
