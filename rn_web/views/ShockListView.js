import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {shock_action} from "../redux/action/index";
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity,NativeModules} from "react-native";

class ShockListView extends React.PureComponent {
    constructor(props){
        super(props);
        this.state={
            dataList:[
                {key:"7",text: '无',selected:true},
                {key:"1",text: '断奏',selected:false},
                {key:"2",text: '急促',selected:false},
                {key:"3",text: '交响乐',selected:false},
                {key:"4",text: '轻重音',selected:false},
                {key:"5",text: '提醒',selected:false},
                {key:"6",text: '心跳',selected:false}
            ]
        }
    }
    componentDidMount() {
        
    }
    setShockType=(item)=>{ //保存震动模式
        const key=item['key'];
        let arr=[].concat(this.state.dataList);
        arr.forEach((i)=>{
            i['selected']=false;
            if(i['key']==key){
                i['selected']=true;
            }
        });
        NativeModules.RNUtilModules.setShockType(key);
        this.setState({
            dataList:arr
        });
        this.props.ShockAction({text:item['text'],key:item['key']});
    }
    _renderItem=({item})=>{
        return (
                <TouchableOpacity style={styles.list_item} onPress={()=>this.setShockType(item)}>
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
export default connect((state)=>{
	return {
        ShockType:state['cShockReducer']
    }
},(dispatch)=>{
    // return bindActionCreators({
    //     ShockAction:shock_action
    // });
    return {
        ShockAction:(args)=>dispatch(shock_action(args))
    }
})(ShockListView);
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