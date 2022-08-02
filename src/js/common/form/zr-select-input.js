import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
responsiveFontFamily as fm,
} from '../../libs/responsive';
import ZRInput from '../zr-input';
import AppSetting from '../../settings/app-setting';

export default class ZRSelectInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
    };
  }

  render() {
    let {isAlert, alertMsg} = this.state;
    let {
      textStyle,
      value,
      unSelectString,
      titlePrefix,
      iconStyle,
      showIcon,
      disabled,
      style,
      onPress,
    } = this.props;

    let txt = value == null ? unSelectString : value[titlePrefix];
    let color = value == null ? '#4F525B' : textStyle.color;
    let borderColor = isAlert ? '#e60000' : style.borderColor;
    let backColor = disabled ? '#f2f2f2' : style.backgroundColor;
    let arrowStyle = iconStyle == undefined ? styles.icon : iconStyle;

    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          {...this.props}
          onPress={() => {
            onPress();
            this.onValueChange();
          }}
          style={[this.props.style, {borderColor, backgroundColor: backColor}]}>
          <Text style={[textStyle, {color}]}>{txt}</Text>
          {showIcon && (
            <Image
              style={arrowStyle}
              source={require('../../../assets/down.png')}
            />
          )}
        </TouchableOpacity>
        {isAlert && <Text style={styles.alertStr}>* {alertMsg}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertStr: {
    marginTop: hp(4),
    color: '#e60000',
    fontFamily: 'Roboto-Regular',
    fontSize: fs(12),
    alignSelf: 'flex-start',
  },
  icon: {
    width: hp(15),
    height: hp(15),
    resizeMode: 'contain',
    tintColor: AppSetting.COLORS.LIGHT_GRAY,
  },
});
