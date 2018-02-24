import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Platform,
    Text,
    Image,
    TouchableHighlight,
    PanResponder
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

import Util from "./Utils";

class MoveableCircle extends Component {
    constructor() {
        super();
        this.state = {
            color: "rgba(255, 255, 255, 0.7)"
        };
    }

    _previousLeft = Util.size.width / 2 - 40;
    _previousTop = Util.size.height / 2 - 50;
    _maxTop = Util.size.height - 110;
    _maxLeft = Util.size.width - 98;
    _circleStyles = {};

    _updatePosition() {
        this._circle.setNativeProps(this._circleStyles);
    }

    _endMove(event, gestureState) {
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
        this.setState({
            color: "rgba(255, 255, 255, 0.7)"
        });
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, g) => true,
            onMoveShouldSetPanResponderCapture: (e, g) => true,
            onMoveShouldSetPanResponder: (e, g) => true,
            onMoveShouldSetPanResponderCapture: (e, g) => true,
            onPanResponderGrant: (e, g) => {
                this.setState({
                    color: "white"
                });
            },
            onPanResponderMove: (e, gestureState) => {
                // Update position
                this._circleStyles.style.left =
                    this._previousLeft + gestureState.dx;
                this._circleStyles.style.top =
                    this._previousTop + gestureState.dy;
                // Limit left
                if (this._circleStyles.style.left < 0) {
                    this._circleStyles.style.left = 0;
                }
                // Limit top
                if (this._circleStyles.style.top < 5) {
                    this._circleStyles.style.top = 5;
                }
                // Limit right
                if (this._circleStyles.style.left > this._maxLeft) {
                    this._circleStyles.style.left = this._maxLeft;
                }
                // Limit bottom
                if (this._circleStyles.style.top > this._maxTop) {
                    this._circleStyles.style.top = this._maxTop;
                }

                this._updatePosition();
            },
            onPanResponderTerminationRequest: (e, g) => true,
            onPanResponderRelease: (e, g) => this._endMove(e, g),
            onPanResponderTerminate: (e, g) => this._endMove(e, g)
        });

        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop
            }
        };
    }

    componentDidMount() {
        this._updatePosition();
    }

    render() {
        return (
            <View
                ref={component => (this._circle = component)}
                {...this._panResponder.panHandlers}
                style={styles.moveableCircle}
            >
                <Icon name="ios-baseball" size={120} color={this.state.color} />
            </View>
        );
    }
}

export default MoveableCircle;

const styles = StyleSheet.create({
    moveableCircle: {
        backgroundColor: "transparent",
        position: "absolute",
        left: 0,
        right: 0
    }
});
