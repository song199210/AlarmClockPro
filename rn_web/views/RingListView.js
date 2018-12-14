import React from "react";
import {View,Text,FlatList,Image,StyleSheet,Dimensions,TouchableOpacity} from "react-native";

export default class RingListView extends React.PureComponent {
    constructor(props){
        super(props);
    }
    _renderItem=({item})=>{
    return (
            <TouchableOpacity style={styles.list_item}>
                <Text style={[styles.basicFont,{flex:1}]}>{item.key}</Text>
                <Image style={styles.img_icon} source={require("../assets/images/yes_icon.png")}/>
            </TouchableOpacity>
        );
    }
    render(){
        return (
            <View style={styles.ringBox}>
                <View style={styles.title}><Text style={[styles.basicFont,{color:"#888"}]}>铃声选择</Text></View>
                <View style={styles.container}>
                    <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
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