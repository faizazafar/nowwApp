import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';

export default function OptionButton(props) {
  let iconStyle = props.iconStyle ? props.iconStyle : {};

  if (props.txt) {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.container, props.style]}>
        <Image style={[styles.icon, iconStyle]} source={props.source} />
        <Text style={styles.txt}>{props.txt}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.circleContainer, props.style]}>
        <Image style={[styles.icon, iconStyle]} source={props.source} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  circleContainer: {
    width: hp(27),
    height: hp(27),
    backgroundColor: Colors.THEME,
    borderRadius: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: hp(5),
    paddingBottom: hp(5),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    backgroundColor: Colors.THEME,
    borderRadius: hp(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: hp(16),
    height: hp(16),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  txt: {
    marginLeft: wp(10),
    color: '#fff',
    fontSize: fs(14),
    fontFamily: 'Roboto-Medium',
  },
});
