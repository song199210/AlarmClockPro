import React from "react";
import {View,StyleSheet,FlatList,Text,Dimensions,TouchableOpacity,Image,Button,Switch} from "react-native";
import Picker from "react-native-picker";
import CommonListCom from "../components/CommonListCom";

export default class AddClockView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            setlist:[
                {title: "重复",value:""},
                {title: "铃声",value:""},
                {title: "震动",value:""},
                {title: "天气预报",value:""},
            ],
            timeData:['上午','1','01']
        }
    }
    setTimeData=()=>{
        let time_data1 = ["上午","下午"];
        let time_data2 = [];
        let time_data3 = [];
        for(var i=1;i<=12;i++){
            var str=i.toString();
            time_data2.push(str);
        }
        for(var i=1;i<=60;i++){
            var str=i.toString();
            if(i<10){
                str="0"+str;
            }
            time_data3.push(str);
        }
        return [time_data1,time_data2,time_data3];
    }
    showPickerTime=()=>{
        const data=this.setTimeData();
        Picker.init({
            pickerTitleText:"时间选择",
            pickerConfirmBtnText:"确认",
            pickerCancelBtnText:"取消",
            pickerData: data,
            selectedValue:this.state.timeData,
            onPickerConfirm: data => {
                this.setState({
                    timeData:data
                });
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }
    showPickerFrequency=()=>{//设置重复频率
        const data=['重复','周一','周二','周三','周四','周五','周六','周日'];
        Picker.init({
            pickerTitleText:"重复",
            pickerConfirmBtnText:"确认",
            pickerCancelBtnText:"取消",
            pickerData: data,
            selectedValue:this.state.timeData,
            onPickerConfirm: data => {
                // this.setState({
                //     timeData:data
                // });
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }
    _renderItem1=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.showPickerFrequency() }>
                <Text style={styles.basicFont}>重复</Text>
                <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
            </TouchableOpacity>
        );
    }
    _renderItem2=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                <Text style={styles.basicFont}>雷达</Text>
                <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
            </TouchableOpacity>
        );
    }
    _renderItem3=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                <Text style={styles.basicFont}>心跳</Text>
                <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
            </TouchableOpacity>
        );
    }
    _renderItem4=()=>{
        return (
            <View style={[styles.set_list_right,{marginBottom:6}]}>
               <Switch
                onValueChange={(value) => this.setState({isSwitchOn: value})}
                value={this.state.isSwitchOn}
                onTintColor="#4bd863"
                thumbTintColor="#FFFFFF"
                tintColor="#8e8e93" />
            </View>
        );
    }
    saveClockData=()=>{//保存闹钟数据

    }
    render(){
        let time0=this.state.timeData[0];
        let time1=this.state.timeData[1];
        let time2=this.state.timeData[2];
        return (
            <View style={styles.addClockBox}>
                <View style={styles.selectTime}>
                    <TouchableOpacity style={[styles.set_list_right,{justifyContent:"center",height:100}]} onPress={ () => this.showPickerTime() }>
                        <Text style={styles.basicFont1}>{time0}</Text>
                        <Text style={[styles.basicFont1,{fontSize:48}]}>{time1}:{time2}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <CommonListCom title="重复" renderRightItem={this._renderItem1()} />
                    <CommonListCom title="铃声" renderRightItem={this._renderItem2()} />
                    <CommonListCom title="震动" renderRightItem={this._renderItem3()} />
                    <CommonListCom title="天气预报" renderRightItem={this._renderItem4()} />
                </View>
                <View style={styles.btnGroup}>
                    <View style={styles.btn}>
                        <Button
                        onPress={this.saveClockData}
                        title="取消"
                        color="red"
                        />
                    </View>
                    <View style={styles.btn}>
                        <Button
                        onPress={this.saveClockData}
                        title="设置"
                        color="#4bd863"
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    basicFont:{
        color:"#fff"
    },
    basicFont1:{
        fontSize:22,
        color:"#cccccc"
    },
    addClockBox:{
        flex:1,
        backgroundColor: '#171717',
        width:Dimensions.get('window').width
    },
    set_list_right:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    selectTime:{
        borderBottomColor: '#8e8e93',
        borderBottomWidth: 0.5,
        padding:8,
        height:120
    },
    btnGroup:{
        marginTop:40,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        width:100,
        marginLeft:8,
        marginRight:8
    },
    right_icon:{
        width:20,
        height:20
    }
})