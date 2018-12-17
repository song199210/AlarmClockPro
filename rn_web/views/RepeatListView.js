import React from "react";
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity} from "react-native";

export default class RingListView extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            dataList:[
                {selected:false,key:"8",text: '重复'},
                {selected:false,key:"0",text: '周一'},
                {selected:false,key:"1",text: '周二'},
                {selected:false,key:"2",text: '周三'},
                {selected:false,key:"3",text: '周四'},
                {selected:false,key:"4",text: '周五'},
                {selected:false,key:"5",text: '周六'},
                {selected:false,key:"6",text: '周日'},
                {selected:false,key:"7",text: '清除全部'}
            ]
        }
    }
    selectRepeat=(key)=>{
        var arr=[].concat(this.state.dataList);
        var i=0,len=arr.length;
        if(key == "7"){ //清楚所有
            for(;i<len;i++){
                if(key == arr[i]['key']){
                    continue;
                }
                arr[i]['selected']=false;
            }
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