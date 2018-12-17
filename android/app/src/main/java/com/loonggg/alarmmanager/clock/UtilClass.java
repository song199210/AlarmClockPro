package com.loonggg.alarmmanager.clock;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.util.Log;
import android.widget.Toast;

import com.iflytek.cloud.SpeechConstant;
import com.iflytek.cloud.SpeechError;
import com.iflytek.cloud.SpeechSynthesizer;
import com.iflytek.cloud.SynthesizerListener;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class UtilClass {//包含讯飞在线语音合成和手机定位功能

    private static Activity _that;

    public static void SetActivity(Activity context){ //初始化Activity
        _that=context;
    }
    //合成监听器
    static final SynthesizerListener mSynListener = new SynthesizerListener(){
        //会话结束回调接口，没有错误时， error为null
        public void onCompleted(SpeechError error) {}
        //缓冲进度回调
        //percent为缓冲进度0~100， beginPos为缓冲音频在文本中开始位置， endPos表示缓冲音频在
        //文本中结束位置， info为附加信息。
        public void onBufferProgress(int percent, int beginPos, int endPos, String info) {}
        //开始播放
        public void onSpeakBegin() {}
        //暂停播放
        public void onSpeakPaused() {}
        //播放进度回调
        //percent为播放进度0~100,beginPos为播放音频在文本中开始位置， endPos表示播放音频在文
        //本中结束位置.
        public void onSpeakProgress(int percent, int beginPos, int endPos) {}
        //恢复播放回调接口
        public void onSpeakResumed() {}
        //会话事件回调接口
        public void onEvent(int arg0, int arg1, int arg2, Bundle arg3) {}
    };

    public static void startSpeek(String text){
        SpeechSynthesizer mTts=SpeechSynthesizer.createSynthesizer(_that, null);

        mTts.setParameter( SpeechConstant.VOICE_NAME, "xiaoyan" );
        mTts.setParameter(SpeechConstant.SPEED, "50");//设置语速
        mTts.setParameter(SpeechConstant.VOLUME, "80");//设置音量，范围 0~100
        mTts.setParameter( SpeechConstant.ENGINE_TYPE, SpeechConstant.TYPE_CLOUD);

        final String strTextToSpeech = text;
        mTts.startSpeaking( strTextToSpeech, mSynListener);
    }
    //初始化定位权限
    public static void SetLocationPermission(Context _this){
        //获取权限
        if (ActivityCompat.checkSelfPermission(_this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            ActivityCompat.requestPermissions(_that, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 200);
            return;
        } else {
            Toast.makeText(_that, "已经获取该权限", Toast.LENGTH_SHORT).show();
        }
    }
    public static void getLocation() {//获取位置管理器
        String locationProvider;
        //获取地理位置管理器
        LocationManager locationManager = (LocationManager) _that.getSystemService(Context.LOCATION_SERVICE);
        //获取所有可用的位置提供器
        List<String> providers = locationManager.getProviders(true);
        for (String string : providers) {
            Log.v("位置提供器", string);
        }
        if (providers.contains(LocationManager.GPS_PROVIDER)) {
            //如果是GPS
            locationProvider = LocationManager.GPS_PROVIDER;
        } else if (providers.contains(LocationManager.NETWORK_PROVIDER)) {
            //如果是Network
            locationProvider = LocationManager.NETWORK_PROVIDER;
        } else {
            Toast.makeText(_that, "没有可用的位置提供器", Toast.LENGTH_SHORT).show();
            return;
        }
        if (ActivityCompat.checkSelfPermission(_that, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            ActivityCompat.requestPermissions(_that, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, 300);
            return;
        }
        Location bestLocation = null;
        for (String provider : providers) {
            Location l = locationManager.getLastKnownLocation(provider);
            if (l == null) {
                continue;
            }
            if (bestLocation == null || l.getAccuracy() < bestLocation.getAccuracy()) {
                // Found best last known location: %s", l);
                bestLocation = l;
            }
        }
        if (bestLocation != null) {
            //不为空,显示地理位置经纬度
            UtilClass.showLocation(bestLocation);
        }
        //监视地理位置变化
        locationManager.requestLocationUpdates(locationProvider, 3000, 1, locationListener);
    }


    /**
     * 显示地理位置经度和纬度信息
     *
     * @param location
     */
    private static void showLocation(Location location){//获取手机定位位置
        String locationStr = location.getLatitude() +","+ location.getLongitude();
        Log.v("经纬度",locationStr);
        String httpStr="http://api.map.baidu.com/geocoder?output=json&location="+locationStr+"&ak=esNPFDwwsXWtsQfw4NMNmur1";
        HttpRequest.SendHttpRequest(httpStr,new HttpRequest.HttpCallbackListener() {
            @Override
            public void onFinish(String response) throws JSONException {
                JSONObject jsonObj=parseJson(response);
                JSONObject resJson=jsonObj.getJSONObject("result");
                JSONObject cityJson=resJson.getJSONObject("addressComponent");
                String cityStr=cityJson.getString("city");
                if(cityStr.contains("市")){
                    cityStr=cityStr.substring(0,cityStr.length()-1);
                }
                Log.v("城市:",cityStr);
                String weather_url="https://www.tianqiapi.com/api/?version=v1&city="+cityStr;
                HttpRequest.SendHttpRequest(weather_url,new HttpRequest.HttpCallbackListener() {
                    @Override
                    public void onFinish(String response) throws JSONException {
                        JSONObject jsonObj=UtilClass.parseJson(response);
//                        Log.v("天气结果:",jsonObj.toString());
                        String cityStr=jsonObj.getString("city"); //城市
                        JSONArray data=jsonObj.getJSONArray("data");
                        String weather_status=data.getJSONObject(0).getString("wea"); //天气状况
                        String air_status=data.getJSONObject(0).getString("air_level"); //空气质量
                        String tem1=data.getJSONObject(0).getString("tem1"); //最高气温
                        String tem2=data.getJSONObject(0).getString("tem2"); //最低气温
                        String textStr=cityStr+";今日天气:"+weather_status+";最高气温:"+tem1+";最低气温:"+tem2+";空气质量:"+air_status;
                        startSpeek(textStr);
                    }

                    @Override
                    public void onError(Exception e) {
                        Log.e("请求失败:", e.toString());
                    }
                });
            }

            @Override
            public void onError(Exception e) {
                Log.e("请求失败:", e.toString());
            }
        });
    }

    /**
     * LocationListern监听器
     * 参数：地理位置提供器、监听位置变化的时间间隔、位置变化的距离间隔、LocationListener监听器
     */

    public static LocationListener locationListener = new LocationListener() {

        @Override
        public void onStatusChanged(String provider, int status, Bundle arg2) {

        }

        @Override
        public void onProviderEnabled(String provider) {

        }

        @Override
        public void onProviderDisabled(String provider) {

        }

        @Override
        public void onLocationChanged(Location location) {
            //如果位置发生变化,重新显示
            showLocation(location);
        }
    };

    private static JSONObject parseJson(String data) {
        JSONObject jsonObject=new JSONObject();
        try {
            System.out.print(data);
            jsonObject = new JSONObject(data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonObject;
    }
}
