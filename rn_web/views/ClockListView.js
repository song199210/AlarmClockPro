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
	View
} from 'react-native';

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class ClockListView extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
            isSwitchOn:false,
			listType: 'FlatList'
		};
		this.rowSwipeAnimatedValues = {};
		Array(20).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	}

	render() {
		console.log(this.state.listViewData);
		return (
			<View style={styles.container}>

				{
					this.state.listType === 'FlatList' &&

					<SwipeListView
						useFlatList
						data={this.props.clockList}
						renderItem={ (data, rowMap) => (
							<TouchableHighlight
								onPress={ _ => console.log('You touched me') }
								style={styles.rowFront}
								underlayColor={'#AAA'}
							>
								<View style={[styles.listBox,styles.listRow]}>
                                    <View>
                                        <View style={styles.listOne}>
                                            <Text style={[styles.fontColor,{fontSize:23}]}>上午10:00</Text>
                                        </View>
                                        <View style={styles.listTwo}>
                                            <Text style={[styles.fontColor,{fontSize:12}]}>铃声+震动</Text>
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
							</TouchableHighlight>
						)}
						renderHiddenItem={ (data, rowMap) => (
							<View style={styles.rowBack}>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => {} }>
									<Text style={styles.backTextWhite}>编辑</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => {} }>
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
						onSwipeValueChange={this.onSwipeValueChange}
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