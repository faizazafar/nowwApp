import React from 'react';
import {StyleSheet, View} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

export default function Account() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingLeft: wp(20),
  },
});
