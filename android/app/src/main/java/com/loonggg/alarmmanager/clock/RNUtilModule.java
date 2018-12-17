package com.loonggg.alarmmanager.clock;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechUtility;

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
    public void setRNClock(String time,int cycle,int ring){//设置闹钟时间
        ClockModule.setClock(reactContext.getCurrentActivity(),time,cycle,ring);
    }
    @Override
    public String getName() {
        return "RNUtilModules";
    }
}
