import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AppSetting from '../../settings/app-setting';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
responsiveFontFamily as fm,
} from '../../libs/responsive';
import Validator from '../api/validator';
import ZRInput from '../zr-input';

export default class ZRPhoneInput extends ZRInput {
  constructor(props) {
    super(props);
    this.state = {
      isAlert: false,
      alertMsg: '',
      countrycode: props.countrycode,
    };
  }

  componentWillReceiveProps(props) {
    if (props.countrycode !== this.state.countrycode) {
      this.setState({countrycode: props.countrycode});
    }
  }

  render() {
    let {isAlert, alertMsg, countrycode} = this.state;
    let {onCountryCodePress} = this.props;

    let borderColor = isAlert ? '#e60000' : AppSetting.BORDER_COLOR;

    return (
      <View
        style={{
          width: this.props.style.width,
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.code, {height: this.props.style.height}]}
          onPress={onCountryCodePress}>
          <Text style={styles.codeStr}>{countrycode}</Text>
        </TouchableOpacity>

        <View style={{width: '80%'}}>
          <TextInput
            ref={ref => {
              this.textInput = ref;
            }}
            {...this.props}
            style={[this.props.style, {width: '100%', borderColor}]}
          />
          {isAlert && <Text style={styles.alertStr}>* {alertMsg}</Text>}
        </View>
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
  codeStr: {
    color: AppSetting.LIGHT_TEXT,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(12),
    textAlign: 'center',
  },
  code: {
    width: '19%',
    marginRight: '1%',
    backgroundColor: 'white',
    marginTop: hp(5),
    borderColor: AppSetting.BORDER_COLOR,
    borderWidth: 1,
    borderRadius: hp(4),
    fontSize: fs(14),
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
});
