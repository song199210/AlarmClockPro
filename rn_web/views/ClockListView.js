import React, {Component} from 'react';
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
			listType: 'FlatList',
			listViewData: Array(20).fill('').map((_,i) => ({key: `${i}`, text: `item #${i}`})),
			sectionListData: Array(5).fill('').map((_,i) => ({title: `title${i + 1}`, data: [...Array(5).fill('').map((_, j) => ({key: `${i}.${j}`, text: `item #${j}`}))]})),
		};

		this.rowSwipeAnimatedValues = {};
		Array(20).fill('').forEach((_, i) => {
			this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
		});
	}
	closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	}

	deleteRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		const newData = [...this.state.listViewData];
		const prevIndex = this.state.listViewData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		this.setState({listViewData: newData});
	}

	deleteSectionRow(rowMap, rowKey) {
		this.closeRow(rowMap, rowKey);
		var [section, row] = rowKey.split('.');
		const newData = [...this.state.sectionListData];
		const prevIndex = this.state.sectionListData[section].data.findIndex(item => item.key === rowKey);
		newData[section].data.splice(prevIndex, 1);
		this.setState({sectionListData: newData});
	}

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
	}

	render() {
		return (
			<View style={styles.container}>

				{
					this.state.listType === 'FlatList' &&

					<SwipeListView
						useFlatList
						data={this.state.listViewData}
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
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.closeRow(rowMap, data.item.key) }>
									<Text style={styles.backTextWhite}>编辑</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(rowMap, data.item.key) }>
									<Animated.View
										style={[
											styles.trash,
											{

												transform: [
													{
														scale: this.rowSwipeAnimatedValues[data.item.key].interpolate({
															inputRange: [45, 90],
															outputRange: [0, 1],
															extrapolate: 'clamp',
														}),
													}
												],
											}
										]}
									>
										<Text style={styles.backTextWhite}>删除</Text>
									</Animated.View>
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

export default ClockListView;