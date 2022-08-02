import React, {Component} from 'react';
import {StyleSheet, Animated, Easing, Dimensions, Image} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import {connect} from 'react-redux';
import Colors from '../../settings/colors';

import Icon from 'react-native-vector-icons/FontAwesome';
AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Loader extends Component {
  isSpin = false;
  constructor() {
    super();
    this.state = {
      offset: new Animated.Value(1),
      spinOffset: new Animated.Value(0),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.loading != this.props.loading) {
      if (this.props.loading == true) {
        this.startLoading();
      } else {
        this.closeLoading();
      }
    }
  }

  startLoading() {
    this.isSpin = true;
    this.spin();
  }

  closeLoading(onClosed) {
    this.isSpin = false;
  }

  spin() {
    this.state.spinOffset.setValue(0);
    Animated.timing(this.state.spinOffset, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(e => {
      if (e.finished) {
        if (this.isSpin == true) this.spin();
      }
    });
  }

  render() {
    let {width, height} = this.state;

    if (!this.props.loading) return null;

    const containerWidth = this.state.offset.interpolate({
      inputRange: [0, 0.0000000000000001, 1],
      outputRange: [hp(40), width, width],
    });

    const opacity = this.state.offset.interpolate({
      inputRange: [0, 0.0000000000000001, 1],
      outputRange: [0, 1, 1],
    });

    const txtOpacity = this.state.offset.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, 0.1, 1],
    });

    const containerHeight = this.state.offset.interpolate({
      inputRange: [0, 0.0000000000000001, 1],
      outputRange: [hp(40), height, height],
    });

    const iconTop = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: [hp(40), height / 2 - hp(50) - hp(25)],
    });

    const iconRight = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: [wp(20), width / 2 - hp(50)],
    });

    const txtTop = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: [hp(40), height / 2 + hp(40)],
    });

    const txtRight = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: [wp(20), width / 2 - wp(100)],
    });

    const iconSize = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: [hp(40), hp(100)],
    });

    const iconColor = this.state.offset.interpolate({
      inputRange: [0, 1],
      outputRange: ['#fff', Colors.RED],
    });

    const backgroundOpacity = this.state.offset.interpolate({
      inputRange: [0, 0.3, 1],
      outputRange: [0, 0.3, 0.5],
    });

    const spin = this.state.spinOffset.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: containerWidth,
          height: containerHeight,
        }}>
        <Animated.View
          style={[styles.foreGroundContainer, {opacity: backgroundOpacity}]}
        />

        <Animated.View
          style={{
            position: 'absolute',
            right: iconRight,
            top: iconTop,
            transform: [{rotate: spin}],
          }}>
          <AnimatedIcon
            name={'refresh'}
            style={{
              textAlign: 'center',
              fontSize: iconSize,
              color: iconColor,
              opacity,
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bottomBlock,
            {right: txtRight, top: txtTop, opacity: txtOpacity},
          ]}></Animated.View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(Loader);

const styles = StyleSheet.create({
  foreGroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: Colors.WHITE,
  },
  bottomBlock: {
    position: 'absolute',
    alignItems: 'center',
  },
  intro: {
    color: Colors.RED,
    fontFamily: 'Roboto-Medium',
    fontSize: fs(20),
  },
  logo: {
    width: wp(200),
    height: hp(30),
    resizeMode: 'contain',
  },
});
