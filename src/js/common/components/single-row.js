import React from 'react';

import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';
import Colors from '../../settings/colors';
import i18n from 'i18next';
import { useSelector } from 'react-redux';

export default function SingleRow(props) {
  const lang = useSelector((state)=> state.language)
  console.log(lang)
  let {heading, value, hideBorder, onPress} = props;

  let borderBottomWidth = hideBorder ? 0 : 0.5;

  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.highlightedRow, {borderBottomWidth}]}>
      <View style={{flex: 1}}>
        <Text style={styles.highlightedRowKey}>{heading}</Text>
      </View>
      <View style={{flex: 2}}>
        <Text style={styles.highlightedRowValue}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  highlightedRowKey: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(16),
  },
  highlightedRowValue: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(15),
  },
  highlightedRow: {
    flexDirection: i18n.language == 'en' ? "row" :"row-reverse",
    paddingTop: hp(12),
    paddingBottom: hp(12),
    borderBottomWidth: 0.5,
    borderColor: Colors.WHITE,
  },
});
