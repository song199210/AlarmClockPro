import React from "react";
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity,NativeModules} from "react-native";

export default class RingListView extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            dataList:[
                {key:"7",text: '无',selected:true},
                {key:"0",text: '铃声1',selected:false},
                {key:"1",text: '铃声2',selected:false},
                {key:"2",text: '铃声3',selected:false}
            ]
        }
    }
    setShockType=(key)=>{ //保存震动模式
        let arr=[].concat(this.state.dataList);
        arr.forEach((i)=>{
            i['selected']=false;
            if(i['key']==key){
                i['selected']=true;
            }
        });
        NativeModules.RNUtilModules.setRingType(key);
        this.setState({
            dataList:arr
        });
    }
    _renderItem=({item})=>{
        return (
                <TouchableOpacity style={styles.list_item} onPress={()=>this.setShockType(item['key'])}>
                    <Text style={[styles.basicFont,{flex:1}]}>{item.text}</Text>
                    {item['selected'] && (<Image style={styles.img_icon} source={require("../assets/images/yes_icon.png")}/>)}
                </TouchableOpacity>
            );
    }
    render(){
        return (
            <View style={styles.ringBox}>
                <View style={styles.title}><Text style={[styles.basicFont,{color:"#888"}]}>震动选择</Text></View>
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
        padding:10,
        marginLeft:8,
        marginRight:8,
        borderBottomColor: '#555',
        flexDirection:"row"
    },
    img_icon:{
        width:22,
        height:22
    }
});