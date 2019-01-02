import React, {Component} from 'react';
import {connect} from "react-redux";
import {
	Animated,
	AppRegistry,
	Dimensions,
	Image,
	ListView,
    StyleSheet,
    Switch,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	NativeModules
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import {del_clock} from "../redux/action/index";
class ClockListView extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
            isSwitchOn:false,
			listType: 'FlatList'
		};
		// this.rowSwipeAnimatedValues = {};
		// Array(20).fill('').forEach((_, i) => {
		// 	this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		// });
	}
	delClockData=(data)=>{//删除闹钟
		console.log(data['key'])
		NativeModules.RNUtilModules.cancleRNClock(data['key']);
		this.props.delClockDataProp(data);
	}
	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	render() {
		console.log(this.props.clockList);
		return (
			<View style={styles.container}>
				{
					this.state.listType === 'FlatList' &&
					<SwipeListView
						useFlatList
						data={this.props.clockList}
						renderItem={ (data, rowMap) => {
							const item=data.item;
							return (
								<View style={styles.rowFront}>
									<View style={[styles.listBox,styles.listRow]}>
										<View>
											<View style={styles.listOne}>
												<Text style={[styles.fontColor,{fontSize:23}]}>{item.timeData[0]}:{item.timeData[1]}</Text>
											</View>
											<View style={styles.listTwo}>
												<Text style={[styles.fontColor,{fontSize:12}]}>{item.ringType != 0?'铃声+':''}震动</Text>
											</View>
										</View>
										<View style={[styles.listRow,{justifyContent:"flex-end",alignItems:"center"}]}>
											<Switch
												onValueChange={(value) => this.setState({isSwitchOn: value})}
												style={{marginBottom:10,marginTop:10}}
												value={this.state.isSwitchOn}
												onTintColor="#4bd863"
												thumbTintColor="#FFFFFF"
												tintColor="#8e8e93" />
										</View>
									</View>
								</View>)
							}}
						renderHiddenItem={ (data, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => {this.props.navigation.navigate("AddClock",data.item)} }>
									<Text style={styles.backTextWhite}>编辑</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => {this.delClockData(data.item)} }>
									<Text style={styles.backTextWhite}>删除</Text>
								</TouchableOpacity>
							</View>
						)}
						rightOpenValue={-150}
						previewRowKey={'0'}
						previewOpenValue={-40}
						previewOpenDelay={3000}
						onRowDidOpen={this.onRowDidOpen}
                        disableRightSwipe={true}
					/>
				}

			</View>
		);
	}
}
export default connect((state)=>{
	return {
		clockList:state['clockReducer']
	}	
},(dispatch)=>{
	return {
		delClockDataProp:(data)=>dispatch(del_clock(data))
	}
})(ClockListView);
const styles = StyleSheet.create({
    fontColor:{
        color:"#8e8e93",
        fontFamily:"微软雅黑"
    },
	container: {
        backgroundColor: '#171717',
        width:Dimensions.get('window').width,
		flex: 1
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	backTextWhite: {
		color: '#FFF'
	},
	rowFront: {
        borderBottomWidth: 1,
        backgroundColor: '#171717',
        borderBottomColor: '#8e8e93',
        color:"#8e8e93",
        padding:10
    },
    listBox:{
        flex:1
    },
    listRow:{
        flex:1,
        flexDirection:"row"
    },
    listOne:{
        flex:1
    },
    listTwo:{
        flex:1,
        marginBottom:2,
        marginLeft:2
    },
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	}
});