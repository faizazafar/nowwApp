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
} from '../responsive';

export default class ZRMandatoryText extends Component {
  constructor() {
    super();
  }

  render() {
    let {style} = this.props;

    return (
      <Text style={[styles.steric, {marginTop: style.marginTop}]}>
        *<Text {...this.props}> {this.props.children}</Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  steric: {
    color: '#b30000',
    fontFamily: 'Roboto-Light',
    fontSize: fs(16),
  },
});
