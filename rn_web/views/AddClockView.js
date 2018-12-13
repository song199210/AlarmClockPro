import React from "react";
import {View,StyleSheet,FlatList,Text,Dimensions,TouchableOpacity,Image} from "react-native";

export default class AddClockView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            setlist:[
                {title: "重复",value:""},
                {title: "铃声",value:""},
                {title: "震动",value:""},
                {title: "天气预报",value:""},
              ]
        }
    }
    _renderItem=({item})=>{
        return (
            <View style={styles.set_list}>
                <View style={styles.set_list_left}>
                    <Text style={styles.basicFont}>{item.title}</Text>
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity style={styles.set_list_right} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
                        <Text style={styles.basicFont}>编辑</Text>
                        <Image style={styles.right_icon} source={require("../assets/images/right_icon.png")}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.addClockBox}>
                <View style={styles.selectTime}>
                    <Text style={styles.basicFont}>时间</Text>
                </View>
                <View style={styles.setClock}>
                    <FlatList
                        data={this.state.setlist}
                        renderItem={this._renderItem}/>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    basicFont:{
        color:"#fff"
    },
    addClockBox:{
        flex:1,
        backgroundColor: '#171717',
        width:Dimensions.get('window').width
    },
    set_list:{
        borderBottomColor: '#8e8e93',
        color:"#8e8e93",
        borderBottomWidth: 0.5,
        padding:8,
        flex:1,
        flexDirection:"row"
    },
    set_list_left:{
        flex:1,
        alignItems:"flex-start",
        justifyContent:"center"
    },
    set_list_right:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    selectTime:{
        borderBottomColor: '#8e8e93',
        borderBottomWidth: 0.5,
        padding:8,
        height:80,
        justifyContent:"center",
        alignItems:"center"
    },
    setClock:{
        borderWidth:1
    },
    right_icon:{
        width:20,
        height:20
    }
})