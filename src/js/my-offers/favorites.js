import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Header from '../common/components/header';
import Colors from '../settings/colors';
import OfferItem from '../offer/offer-item';
import Service from '../libs/api/service';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/actions';

export default function Favorites({navigation}) {
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);
  const curr_location = useSelector(state => state.curr_location);
  const user = useSelector(state => state.user);

 const loadData = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getFavOffers(user.id);
    dispatch(setLoading(false));
    //console.log('test82 getFavOffers: ', JSON.stringify(response));

    if (response.status) {
      setOffers(response.data.offers);
    } else {
      Alert.alert(response.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  renderOffers = () => {
    return offers.map((item, index) => {
      return <OfferItem offer={item} style={{marginTop: hp(3)}} />;
    });
  };

  if (offers.length > 0) {
    return (
      <View style={styles.container}>
        <Header menu title={'Favorites'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp(100)}}>
          <View style={styles.body}>{renderOffers()}</View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header menu title={'Favorites'} />
        <Text style={styles.noData}>No offers found in favorites</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  noData: {
    textAlign: 'center',
    marginTop: hp(200),
    color: Colors.RED,
    fontSize: fs(17),
    fontFamily: 'Roboto-Regular',
  },
  postBtn: {
    position: 'absolute',
    bottom: hp(40),
    right: wp(30),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    elevation: 10,
  },
  icon: {
    width: hp(60),
    height: hp(60),
    resizeMode: 'contain',
  },
});
