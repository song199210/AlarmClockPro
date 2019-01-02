package com.loonggg.alarmmanager.clock;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechUtility;
import com.loonggg.lib.alarmmanager.clock.AlarmManagerUtil;

import java.util.List;

public class RNUtilModule extends ReactContextBaseJavaModule {
    public ReactApplicationContext reactContext;
    public RNUtilModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext=reactContext;
    }
    @ReactMethod
    public void getRNLocation(){//获取位置
        UtilClass.SetActivity(reactContext.getCurrentActivity()); //初始化UtilClass类中Activity
        SpeechUtility.createUtility(reactContext, SpeechConstant.APPID + "=5c11bd37");
        //获取位置权限
        UtilClass.SetLocationPermission(reactContext);
        UtilClass.getLocation();
    }
    /**
     * @param flaglist 重复方式
     * @param clockMode 闹钟模式：1铃声;0震动;2铃声和震动
    */
    @ReactMethod
    public void setRNClock(String time, ReadableArray flaglist, int clockMode, int vibratorTyppe, int ringType,String idStr){
        ClockModule.setClock(reactContext.getCurrentActivity(),time,flaglist,clockMode,vibratorTyppe,ringType,idStr);
    }
    @ReactMethod
    public void cancleRNClock(String idStr){
        AlarmManagerUtil.cancleAlarm(reactContext.getCurrentActivity(),idStr);
    }
    @ReactMethod
    public void setShockType(String typeStr){//设置震动模式
        Integer typeInt=Integer.parseInt(typeStr);
        ClockModule.testShockClock(reactContext.getCurrentActivity(),typeInt);
    }
    @ReactMethod
    public void setRingType(String typeStr){
        Integer typeInt=Integer.parseInt(typeStr);
        ClockModule.testRingClock(reactContext.getCurrentActivity(),typeInt);
    }
    @Override
    public String getName() {
        return "RNUtilModules";
    }
}
