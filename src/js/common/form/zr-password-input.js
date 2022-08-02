import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
  responsiveFontFamily as fm,
} from '../../libs/responsive';

import ZRInput from './zr-input';
import Colors from '../../settings/colors';

export default class ZRPasswordInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
      secureTextEntry: true,
    };
  }

  onEyePress() {
    this.setState({secureTextEntry: !this.state.secureTextEntry});
  }

  render() {
    let {isAlert, alertMsg, secureTextEntry} = this.state;

    let icon = secureTextEntry
      ? require('../../../assets/close-eye.png')
      : require('../../../assets/show-eye.png');

    return (
      <View style={{width: this.props.style.width, alignSelf: 'center'}}>
        <View>
          <TextInput
            ref={ref => {
              this.textInput = ref;
            }}
            onChange={() => {
              this.onValueChange();
            }}
            secureTextEntry={secureTextEntry}
            {...this.props}
            style={[this.props.style, {width: '100%'}]}
          />
          <TouchableOpacity
            onPress={() => {
              this.onEyePress();
            }}
            style={[styles.iconContainer]}>
            <Image style={styles.icon} source={icon} />
          </TouchableOpacity>
        </View>
        {isAlert && <Text style={styles.alertStr}>* {alertMsg}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertStr: {
    marginTop: hp(4),
    color: Colors.PINK,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(12),
    alignSelf: 'flex-start',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: '85%',
    width: hp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
    tintColor: '#999',
  },
});
