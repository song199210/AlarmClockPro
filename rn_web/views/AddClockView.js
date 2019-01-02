import React from "react";
import {connect} from "react-redux";
import {View,StyleSheet,FlatList,Text,Dimensions,TouchableOpacity,Image,Button,Switch,NativeModules} from "react-native";
import Picker from "react-native-picker";
import CommonListCom from "../components/CommonListCom";
import {add_clock,update_clock,ring_action,shock_action,repeat_action} from "../redux/action/index";
import {RingListData,ShockListData,RepeatListData} from "../assets/data";

class AddClockView extends React.Component {
    constructor(props){
        super(props);
        const date=new Date();
        this.state={
            key:"",//判断是新增还是编辑
            timeData:[
                date.getHours().toString(),
                date.getMinutes()<10?("0"+date.getMinutes().toString()):(date.getMinutes().toString())
            ]
        }
    }
    componentDidMount(){
        const state=this.props.navigation.state.params;
        if(typeof state == "undefined"){
            this.setState({
                key:""
            });
            return false;
        }
        this.setState({
            key:state['key'],
            timeData:state['timeData']
        });
        for(var i=0;i<RingListData.length;i++){
            if(RingListData[i]['key'] == state['ringType']){
                this.props.RingAction(RingListData[i]);
                break;
            }
        }
        for(var j=0;j<ShockListData.length;j++){
            if(ShockListData[j]['key'] == state['shockType']){
                this.props.ShockAction(ShockListData[j]);
                break;
            }
        }
        let arr_text=[];
        let arr1=state['repeatType'].split(",");
        var n=0,len1=arr1.length;
        var m=0,len2=RepeatListData.length;
        for(;n<len1;n++){
            for(;m<len2;m++){
                if(arr1[n] == RepeatListData[m]['key']){
                    arr_text.push(RepeatListData[m]['text'])
                    break;
                }
            }
        }
        this.props.RepeatAction({key:state['repeatType'],text:arr_text.join(",")});
    }
    setTimeData=()=>{
        let time_data1 = ["上午","下午"];
        let time_data2 = [];
        let time_data3 = [];
        for(var i=0;i<=23;i++){
            let str="";
            str=i.toString();
            if(i<10){
                str="0"+str;
            }
            time_data2.push(str);
        }
        for(var i=1;i<=60;i++){
            let str=i.toString();
            if(i<10){
                str="0"+str;
            }
            time_data3.push(str);
        }
        return [time_data2,time_data3];
    }
    showPickerTime=()=>{
        const data=this.setTimeData();
        Picker.init({
            pickerTitleText:"时间选择",
            pickerConfirmBtnText:"确认",
            pickerCancelBtnText:"取消",
            pickerData: data,
            isLoop:true,
            selectedValue:this.state.timeData,
            onPickerConfirm: data => {
                this.setState({
                    timeData:data
                });
            },
            onPickerCancel: data => {
                console.log(data);
            }
        });
        Picker.show();
    }
    _renderItem1=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.props.navigation.navigate("SelectRepeat") }>
                <Text style={styles.basicFont}>{this.props.RepeatType['text']}</Text>
                <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
            </TouchableOpacity>
        );
    }
    _renderItem2=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.props.navigation.navigate("SelectRing") }>
                <Text style={styles.basicFont}>{this.props.RingType['text']}</Text>
                <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
            </TouchableOpacity>
        );
    }
    _renderItem3=()=>{
        return (
            <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.props.navigation.navigate("SelectShock") }>
                <Text style={styles.basicFont}>{this.props.ShockType['text']}</Text>
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
    getTime=()=>{
        const timeData=this.state.timeData;
        return `${timeData[0]}:${timeData[1]}`;
    }
    saveClockData=()=>{//保存闹钟数据
        var clockObj={
            repeatType:this.props.RepeatType['key'], //闹钟重复频率
            shockType:this.props.ShockType['key'], //震动模式
            ringType:this.props.RingType['key'], //铃声模式
            timeData:this.state['timeData']
        };
        const timeStr=this.getTime();
        const repeat_arr=this.props.RepeatType['key'].split(",");
        const shockType=this.props.ShockType['key'];
        const ringType=this.props.RingType['key'];
        let clockMode=1; //闹钟模式：铃声0，震动1，铃声+震动2
        if(shockType == "7"){
            clockMode=0;
        }else{
            clockMode=2;
        }
        var repeatList=repeat_arr.map((item)=>{
            return parseInt(item);
        });
        var keyStr="";
        if(this.state.key == ''){//判断是否为空，新增闹钟，调用addclock的reducer
            keyStr=(this.props.ClockList.length+1).toString();
            clockObj['key']=keyStr;
            this.props.AddClock(clockObj);
        }else{//编辑，调用updateclock的reducer
            keyStr=this.state.key;
            clockObj['key']=this.state.key;
            this.props.UpdateClock(clockObj);
        }
        console.log(typeof keyStr);
        //调用AN方法
        NativeModules.RNUtilModules.setRNClock(timeStr,repeatList,clockMode,parseInt(shockType),parseInt(ringType),keyStr); 
        this.props.navigation.navigate("Home");
    }
    render(){
        let time1=this.state.timeData[0];
        let time2=this.state.timeData[1];
        return (
            <View style={styles.addClockBox}>
                <View style={styles.selectTime}>
                    <TouchableOpacity style={[styles.set_list_right,{justifyContent:"center",height:100}]} onPress={ () => this.showPickerTime() }>
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
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate("Home")}>
                                <Text style={[styles.btnForm,{backgroundColor:"#ff0000"}]}>返回</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity 
                        onPress={this.saveClockData}>
                            <Text style={[styles.btnForm,{backgroundColor:"#ff8500"}]}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
export default connect((state)=>{
    return {
        RepeatType:state['cRepeatReducer'],
        ShockType:state['cShockReducer'],
        RingType:state['cRingReducer'],
        ClockList:state['clockReducer']
    }
},(dispatch)=>{
    return {
        AddClock:(data)=>dispatch(add_clock(data)),
        UpdateClock:(data)=>dispatch(update_clock(data)),
        RingAction:(data)=>dispatch(ring_action(data)),
        ShockAction:(data)=>dispatch(shock_action(data)),
        RepeatAction:(data)=>dispatch(repeat_action(data))
    }
})(AddClockView);
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
    btnForm:{
        color:"#fff",
        padding:4,
        paddingTop:8,
        paddingBottom:8,
        borderRadius:2,
        textAlign:"center"
    },
    right_icon:{
        width:20,
        height:20
    }
})