import React from "react";
import {connect} from "react-redux";
import {repeat_action} from "../redux/action/index";
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity} from "react-native";
import {RepeatListData} from "../assets/data";

class RepeatListView extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            dataList:RepeatListData
        }
    }
    componentDidMount() {
        //初始化进来执行默认选中
        const obj=this.props.RepeatType;
        let arr=[].concat(this.state.dataList);
        let arr1=obj['text'].split(",");
        let arr2=obj['key'].split(",");
        var i=0,len1=arr2.length;
        var j=0,len2=arr.length;
        for(;i<len1;i++){
            for(;j<len2;j++){
                if(arr2[i] == arr[j]['key']){
                    arr[j]['selected']=true;
                    break;
                }
            }
        }
        this.setState({
            dataList:arr
        })
    }
    selectRepeat=(key)=>{
        /*控制state中的数据变化*/
        var arr=[].concat(this.state.dataList);
        var i=0,len=arr.length;
        if(key == "7"){ //清楚所有
            for(;i<len;i++){
                if(key == arr[i]['key']){
                    continue;
                }
                arr[i]['selected']=false;
            }
            arr[1]['selected']=true;
        }else{
            for(;i<len;i++){
                if(key == arr[i]['key']){
                    arr[i]['selected']=!arr[i]['selected'];
                    break;
                }
            }
        }
        this.setState({
            dataList:arr
        });
        /*整理state数据并将它赋值给redux中的state*/
        var j=0,len2=arr.length;
        var newArr1=[],newArr2=[];
        for(;j<len2;j++){
            if(!arr[j]['selected']){
                continue;
            }
            if(arr[j]['key'] == "8"){
                newArr1=[];
                newArr2=[];
                this.props.RepeatAction({text:arr[j]['text'],key:arr[j]['key']});
                break;
            }else{
                newArr1.push(arr[j]['text'])
                newArr2.push(arr[j]['key'])
            }
        }
        if(newArr1.length != 0 && newArr2.length != 0){
            console.log({text:newArr1.join(","),key:newArr2.join(",")})
            this.props.RepeatAction({text:newArr1.join(","),key:newArr2.join(",")});
        }
    }
    _renderItem=({item})=>{
        return (
                <TouchableOpacity style={styles.list_item} onPress={()=>this.selectRepeat(item['key'])}>
                    <Text style={[styles.basicFont,{flex:1}]}>{item.text}</Text>
                    {item['selected'] && (<Image style={styles.img_icon} source={require("../assets/images/yes_icon.png")}/>)}
                </TouchableOpacity>
            );
    }
    render(){
        return (
            <View style={styles.ringBox}>
                <View style={styles.title}><Text style={[styles.basicFont,{color:"#888"}]}>重复选择</Text></View>
                <View style={styles.container}>
                    <FlatList
                    data={this.state.dataList}
                    renderItem={this._renderItem}
                    />
                </View>
            </View>
        )
    }
}
export default connect((state)=>{
    return {
        RepeatType:state['cRepeatReducer']
    }
},(dispatch)=>{
    return {
        RepeatAction:(args)=>dispatch(repeat_action(args))    
    }
})(RepeatListView)
const styles=StyleSheet.create({
    basicFont:{
        color:"#ccc"
    },
    title:{
        padding:8,
        height:60,
        alignItems:"flex-start",
        justifyContent:"flex-end"
    },
    ringBox:{
        flex:1,
        backgroundColor: '#171717', 
        width:Dimensions.get('window').width
    },
    container:{
        borderTopWidth:1,
        borderTopColor:"#8e8e93"
    },
    list_item:{
        borderBottomWidth:1,
        padding:8,
        marginLeft:8,
        marginRight:8,
        borderBottomColor: '#555',
        flexDirection:"row"
    },
    img_icon:{
        width:25,
        height:25
    }
});