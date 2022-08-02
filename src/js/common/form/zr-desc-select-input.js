import React, {Component} from 'react';

import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
responsiveFontFamily as fm,
} from '../responsive';
import ZRInput from '../zr-input';
import AppSetting from '../../settings/app-setting';
import Colors from '../../settings/color';

export default class ZRDescSelectInput extends ZRInput {
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
      descPrefix,
      style,
      onPress,
    } = this.props;

    let color = value == null ? Colors.GREY_2 : textStyle.color;
    let borderColor = isAlert ? '#e60000' : style.borderColor;
    let desc = value == null ? unSelectString : value[descPrefix];

    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          {...this.props}
          activeOpacity={0.5}
          onPress={() => {
            onPress();
            this.onValueChange();
          }}
          style={[this.props.style, {borderColor}]}>
          <Image
            source={require('../../../assets/search.png')}
            style={styles.searchIcon}
          />
          <Text numberOfLines={1} style={[textStyle, {color}]}>
            {desc}
          </Text>
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
  searchIcon: {
    height: hp(14),
    width: hp(14),
    resizeMode: 'contain',
  },
});
