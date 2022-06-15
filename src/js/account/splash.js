import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  StatusBar,
  LogBox,
  AsyncStorage,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import {useNavigation} from '@react-navigation/native';
import Gradient from '../common/components/gradient';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/actions';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreAllLogs();
    if (Platform.OS == 'android') {
      StatusBar.setBackgroundColor(Colors.THEME);
    }

    setTimeout(async () => {
      let userData = await AsyncStorage.getItem('user');
      let user = JSON.parse(userData);
      if (user) {
        dispatch(setUser(user));
      }

      navigation.navigate('Slides');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Gradient />
      <Image style={styles.logo} source={require('../../assets/now.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.THEME,
  },
  logo: {
    width: '100%',
    height: hp(80),
    resizeMode: 'contain',
  },
});
