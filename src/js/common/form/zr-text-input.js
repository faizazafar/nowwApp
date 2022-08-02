import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import ZRInput from './zr-input';
import Colors from '../../settings/colors';

export default class ZRTextInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
    };
  }

  render() {
    let {isAlert, alertMsg} = this.state;
    return (
      <View style={{width: this.props.style.width, alignSelf: 'center'}}>
        <TextInput
          ref={ref => {
            this.textInput = ref;
          }}
          onChange={() => {
            this.onValueChange();
          }}
          autoCorrect={false}
          {...this.props}
          style={[this.props.style, {width: '100%'}]}
        />
        {isAlert && alertMsg != '' && (
          <Text style={styles.alertStr}>* {alertMsg}</Text>
        )}
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
});
