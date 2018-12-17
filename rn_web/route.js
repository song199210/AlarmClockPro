import React from "react";
import {Image,Text,TouchableOpacity,StyleSheet} from "react-native";
import {createBottomTabNavigator,createStackNavigator, createAppContainer} from "react-navigation";
import ClockListView from "./views/ClockListView";
import AddClockView from "./views/AddClockView";
import RepeatListView from "./views/RepeatListView";
import RingListView from "./views/RingListView";
import ShockListView from "./views/ShockListView";

const styles = StyleSheet.create({
    img_icon_xxs:{
        width:25,
        height:25
    }
});
// 注册tabs
const Tabs = createBottomTabNavigator({
    Home: {
        screen: ClockListView,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            tabBarLabel:'闹钟',
            tabBarIcon:({focused,tintColor})=>{
                let imgUrlStr="./assets/images/yes_clock_icon.png";
                if(!focused){
                    return (
                        <Image
                            source={require('./assets/images/no_clock_icon.png')}
                            style={styles.img_icon_xxs}
                        />
                    );
                }else{
                    return (
                        <Image
                            source={require('./assets/images/yes_clock_icon.png')}
                            style={styles.img_icon_xxs}
                        />
                    );
                }
            }
        }
    },
    Bill: {
        screen: ClockListView,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
            title: '秒表',
            tabBarIcon:({focused,tintColor})=>{
                let imgUrlStr="./assets/images/yes_clock_icon.png";
                if(!focused){
                    return (
                        <Image
                            source={require('./assets/images/no_time_icon.png')}
                            style={styles.img_icon_xxs}
                        />
                    );
                }else{
                    return (
                        <Image
                            source={require('./assets/images/yes_time_icon.png')}
                            style={styles.img_icon_xxs}
                        />
                    );
                }
            }
        }
    }
  }, {
      animationEnabled: false, // 切换页面时是否有动画效果
      tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
      swipeEnabled: false, // 是否可以左右滑动切换tab
      backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      tabBarOptions: {
          activeTintColor: '#ff8500', // 文字和图片选中颜色
          inactiveTintColor: '#999', // 文字和图片未选中颜色
          showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          }, 
          style: {
              backgroundColor: '#111111' // TabBar 背景色
          },
          labelStyle: {
              fontSize: 10, // 文字大小
          },
      },
});
const Stacks = createStackNavigator({
    ClockList: {
      screen: Tabs,
      navigationOptions:(props)=>{
            return {
                headerTitle:(<Text style={{ flex: 1,color:"#ff8500",marginLeft:60,fontSize:18,textAlign: 'center' }}>闹钟列表</Text>),
                headerStyle:{
                    backgroundColor:"#111"
                    // borderBottomWidth:1,
                    // borderBottomColor:"#666"
                },
                headerTitleStyle:{
                    color:"#ff8500",
                    textAlign:"center",
                    justifyContent: 'center',
                    textAlignVertical:"center",
                    alignItems: 'center'
                },
                headerRight:(<TouchableOpacity onPress={()=>props.navigation.navigate("AddClock")}>
                                <Image source={require("./assets/images/add_icon.png")} style={styles.img_icon_xxs} />
                            </TouchableOpacity>),
                headerRightContainerStyle:{
                    paddingRight:10
                }
            }
        }
    },
    AddClock: {
        screen: AddClockView,
        navigationOptions:(props)=>{
              return {
                  headerTitle:(<Text style={{ flex: 1,color:"#ff8500",marginRight:45,fontSize:18,textAlign: 'center' }}>新增闹钟</Text>),
                  headerStyle:{
                      backgroundColor:"#111"
                      // borderBottomWidth:1,
                      // borderBottomColor:"#666"
                  },
                  headerTintColor:"#ff8500",
                  headerTitleStyle:{
                      color:"#ff8500",
                      textAlign:"center",
                      justifyContent: 'center',
                      textAlignVertical:"center",
                      alignItems: 'center'
                  }
              }
          }
    },
    SelectRing: { //选择铃声模式
        screen: RingListView,
        navigationOptions:(props)=>{
            return {
                headerTitle:(<Text style={{ flex: 1,color:"#ff8500",marginRight:45,fontSize:18,textAlign: 'center' }}>铃声选择</Text>),
                headerStyle:{
                    backgroundColor:"#111"
                    // borderBottomWidth:1,
                    // borderBottomColor:"#666"
                },
                headerTintColor:"#ff8500",
                headerTitleStyle:{
                    color:"#ff8500",
                    textAlign:"center",
                    justifyContent: 'center',
                    textAlignVertical:"center",
                    alignItems: 'center'
                }
            }
        }
    },
    SelectShock: { //选择铃声模式
        screen: ShockListView,
        navigationOptions:(props)=>{
            return {
                headerTitle:(<Text style={{ flex: 1,color:"#ff8500",marginRight:45,fontSize:18,textAlign: 'center' }}>震动选择</Text>),
                headerStyle:{
                    backgroundColor:"#111"
                    // borderBottomWidth:1,
                    // borderBottomColor:"#666"
                },
                headerTintColor:"#ff8500",
                headerTitleStyle:{
                    color:"#ff8500",
                    textAlign:"center",
                    justifyContent: 'center',
                    textAlignVertical:"center",
                    alignItems: 'center'
                }
            }
        }
    },
    SelectRepeat: { //选择铃声模式
        screen: RepeatListView,
        navigationOptions:(props)=>{
            return {
                headerTitle:(<Text style={{ flex: 1,color:"#ff8500",marginRight:45,fontSize:18,textAlign: 'center' }}>震动选择</Text>),
                headerStyle:{
                    backgroundColor:"#111"
                    // borderBottomWidth:1,
                    // borderBottomColor:"#666"
                },
                headerTintColor:"#ff8500",
                headerTitleStyle:{
                    color:"#ff8500",
                    textAlign:"center",
                    justifyContent: 'center',
                    textAlignVertical:"center",
                    alignItems: 'center'
                }
            }
        }
    }
  }, {
    initialRouteName: 'ClockList',
    mode: 'modal'
});
export default createAppContainer(Stacks);