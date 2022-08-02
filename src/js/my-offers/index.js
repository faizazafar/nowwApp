import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../common/components/header';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Draft from './draft';
import Scheduled from './scheduled';
import Published from './published';
import Colors from '../settings/colors';
import Service from '../libs/api/service';
import {setLoading, setMyOffers, setDeleteOffer} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Expired from './expired';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function MyOffers({navigation}) {
  const {t} = useTranslation();
  const tabBarOptions = {
    activeTintColor: '#fff',
    inactiveTintColor: '#a6a6a6',
    labelStyle: {fontSize: fs(13), fontFamily: 'Roboto-Medium'},
    style: {backgroundColor: Colors.THEME},
    indicatorStyle: {height: 0},
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const deleteOffer = useSelector(state => state.deleteOffer);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (deleteOffer != null) {
      onDelete();
    }
  }, [deleteOffer]);

  const onDelete = async () => {
    var payload = new FormData();
    payload.append('offerId', deleteOffer.id);

    dispatch(setLoading(false));
    let s = new Service();
    let response = await s.delteOffer(payload);
    dispatch(setLoading(false));

    //console.log('test82 onDelete: ', JSON.stringify(response));
    if (response.status) {
      dispatch(setDeleteOffer(null));
      getData();
    }
  };

  const getData = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getUserOffers(user.id);
    //console.log('test82 myoffers: ', JSON.stringify(response.data.offers));
    dispatch(setLoading(false));
    if (response.status) {
      dispatch(setMyOffers(response.data.offers));
    } else {
      Alert.alert(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header menu search logo />
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name={t("DRAFT")} component={Draft} />
        <Tab.Screen name={t("Scheduled")} component={Scheduled} />
        <Tab.Screen name={t("Published")} component={Published} />
        <Tab.Screen name={t("Expired")} component={Expired} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
