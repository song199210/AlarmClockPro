/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions} from 'react-native';
import RingListView from "./rn_web/views/RingListView";
import MyNavigation from "./rn_web/route";
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <MyNavigation/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    flex: 1,
    width:Dimensions.get("window").width,
    backgroundColor: '#171717',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
