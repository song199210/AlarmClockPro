package com.loonggg.alarmmanager.clock;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechUtility;

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
    @ReactMethod
    public void setRNClock(String time, ReadableArray flaglist, int ring, int vibratorTyppe, int ringType){//设置闹钟时间,ring选择方式:1表示只有铃声提醒，0表示只有震动提醒
        ClockModule.setClock(reactContext.getCurrentActivity(),time,flaglist,ring,vibratorTyppe,ringType);
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
