/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native'

import Util from "./src/Utils";
import MoveableCircle from "./src/MoveableCircle";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={require("./src/img/agrass.png")} />
        <View style={styles.circleContainer}>
          <MoveableCircle />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Util.size.width,
    height: Util.size.height
  },
  bg: {
    width: Util.size.width,
    resizeMode: "stretch",
    position: "absolute"
  },
  circleContainer: {
    width: Util.size.width,
    height: Util.size.height
  }
})