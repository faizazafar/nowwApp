import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';
import Colors from '../settings/colors';
import OfferItem from '../offer/offer-item';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

export default function Published() {
  const myOffers = useSelector(state => state.myOffers);
  const navigation = useNavigation();

  let data = myOffers.filter(item => {
    return item.status == 3 && item.isExpired == false;
  });

  if (data.length > 0) {
    let list = data.map((item, index) => {
      return (
        <OfferItem
          offer={item}
          options
          // refresh={() => {
          //   navigation.navigate('TargetZone', {offer: item});
          // }}
          style={{marginTop: index == 0 ? 0 : hp(2)}}
        />
      );
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(100)}}>
        <View style={styles.body}>{list}</View>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.emptyBody}>
          <Text style={styles.noData}>No published offer found.</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  emptyBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    marginTop: hp(5),
    color: Colors.RED,
    fontSize: fs(17),
    fontFamily: 'Roboto-Regular',
  },
});
