import React, {Component} from 'react';

import {Text, View, StyleSheet} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
responsiveFontFamily as fm,
} from './responsive';
import Validator from './api/validator';
import ZRInput from './zr-input';
import {TextInputMask} from 'react-native-masked-text';
import Colors from '../settings/color';

export default class ZRMaskInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
    };
  }

  render() {
    let {isAlert, alertMsg} = this.state;
    let {options} = this.props;

    let borderColor = isAlert ? '#e60000' : this.props.style.borderColor;

    return (
      <View style={{width: this.props.style.width, alignSelf: 'center'}}>
        <TextInputMask
          ref={ref => {
            this.textInput = ref;
          }}
          {...this.props}
          placeholderTextColor={Colors.PLACE_HOLDER}
          type={'custom'}
          style={[this.props.style, {width: '100%', borderColor}]}
          options={options}
        />
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
});
