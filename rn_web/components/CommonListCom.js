import React from "react";
import {View,Text,StyleSheet,Dimensions} from "react-native";

export default class CommonListCom extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const title=this.props.title;
        var _renderRightItem=this.props.renderRightItem;
        console.log()
        return (
            <View style={styles.set_list}>
                <View style={styles.set_list_left}>
                    <Text style={styles.basicFont}>{title}</Text>
                </View>
                <View style={{height:60}}>
                    {_renderRightItem}
                </View>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    basicFont:{
        color:"#fff"
    },
    set_list:{
        borderBottomColor: '#8e8e93',
        color:"#8e8e93",
        borderBottomWidth: 0.5,
        padding:8,
        height:40,
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"center"
    },
    set_list_left:{
        flex:1
    }
})