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
import dateFormat from '../../libs/dateformat';

export default class ZRDateInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
    };
  }

  render() {
    let {isAlert, alertMsg} = this.state;
    let {textStyle, value, unSelectString, enable, mask} = this.props;

    let txt =
      value == null
        ? unSelectString
        : mask == undefined
        ? dateFormat(value, 'dd mmmm, yyyy')
        : dateFormat(value, mask);
    let borderColor = isAlert ? '#e60000' : AppSetting.COLORS.LIGHT;
    let backgroundColor =
      enable == false ? AppSetting.COLORS.BORDER : AppSetting.COLORS.WHITE;

    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <TouchableOpacity
          disabled={!enable}
          {...this.props}
          style={[this.props.style, {borderColor, backgroundColor}]}>
          <View style={styles.calendarBox}>
            <Image
              style={styles.calendarIcon}
              source={require('../../../assets/calendar.png')}
            />
          </View>
          <Text style={textStyle}>{txt}</Text>
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
  },
  calendarBox: {
    backgroundColor: AppSetting.COLORS.BORDER,
    height: '100%',
    width: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    width: hp(16),
    height: hp(16),
    resizeMode: 'contain',
    tintColor: AppSetting.COLORS.BLUE,
  },
});
