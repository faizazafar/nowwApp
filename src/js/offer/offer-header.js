import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';
import Colors from '../settings/colors';
import dateFormat from '../libs/dateformat';
import { useTranslation } from 'react-i18next';
export default function OfferHeader(props) {
  const { t} = useTranslation();
  const {interest, date} = props;

  console.log(dateFormat(new Date(date), 'mmmm d, yyyy'))

  const heading = interest ? t('Interest') : t('Other');

  let dateHeading = t('OLDER');
  let todayDate = new Date();
  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  if (date == dateFormat(todayDate, 'yyyy-mm-dd')) {
    dateHeading = t('TODAY');
  } else if (date == dateFormat(yesterdayDate, 'yyyy-mm-dd')) {
    dateHeading = t('YESTERDAY');
  }

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.right}>
        <Text style={styles.heading}>{dateHeading}</Text>
        <Text style={styles.date}>
          {dateFormat(new Date(date), 'mmmm d, yyyy')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(3),
    paddingBottom: hp(3),
    paddingLeft: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: Colors.THEME,
    fontSize: fs(15),
    fontFamily: 'Roboto-Medium',
  },
  date: {
    marginLeft: wp(10),
    color: Colors.THEME,
    fontSize: fs(13),
    fontFamily: 'Roboto-Medium',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(10),
  },
});
