import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  AsyncStorage,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import {useNavigation, CommonActions} from '@react-navigation/core';

import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/actions';
import { useTranslation } from 'react-i18next';



export default function CustomMenu() {
  const {t} = useTranslation();
  const loggedInMenu = [
    {
      navOptionName: t("Verification"),
      screenToNavigate: 'Verification',
    },
    {
      navOptionName: t("Home"),
      screenToNavigate: 'Home',
    },
    {
      navOptionName: t("My Offers"),
      screenToNavigate: 'MyOffers',
    },
    {
      navOptionName: t("My Interests"),
      screenToNavigate: 'MyInterests',
    },
    {
      navOptionName: t("Profile"),
      screenToNavigate: 'Profile',
    },
    {
      navOptionName: t("Favorites"),
      screenToNavigate: 'Favorites',
    },
  
    {
      navOptionName: t("Logout"),
    },
  ];
  
  const visitorMenu = [
    {
      navOptionName: t("@Home"),
      screenToNavigate: 'Home',
    },
    {
      navOptionName: t("@MyInterests"),
      screenToNavigate: 'MyInterests',
    },
    {
      navOptionName: t("@Login"),
      screenToNavigate: 'Login',
    },
    {
      navOptionName: t("@Register"),
      screenToNavigate: 'SignUp',
    },
  ];
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onMenuItemPress = async item => {
    if (item.navOptionName == t('Logout')) {
      dispatch(setUser(undefined));
      await AsyncStorage.removeItem('user');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    } else {
      navigation.navigate(item.screenToNavigate);
    }
  };

 const menuItem = (item, index) => {
    if (item.navOptionName == t("Verification")) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onMenuItemPress(item);
          }}
          style={[styles.menuItem, {justifyContent: 'space-between'}]}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.navOptionName}</Text>
          </View>
          <Image
            style={styles.verifyIcon}
            source={require('../../assets/check.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onMenuItemPress(item);
          }}
          style={styles.menuItem}>
          <Text style={styles.itemText}>{item.navOptionName}</Text>
        </TouchableOpacity>
      );
    }
  };

 const renderMenu = () => {
    if (user && !user.email.includes('@now')) {
      return loggedInMenu.map((item, index) => {
        return menuItem(item, index);
      });
    } else {
      return visitorMenu.map((item, index) => {
        return menuItem(item, index);
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/now.png')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.menuContainer}>
        <View style={{paddingTop: hp(0)}}>{renderMenu()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: hp(30),
    paddingTop: hp(50),
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(20),
    paddingRight: wp(20),
    paddingTop: hp(4),
    paddingBottom: hp(4),
    backgroundColor: Colors.THEME,
    borderRadius: hp(20),
  },
  profileImage: {
    width: '60%',
    height: hp(70),
    resizeMode: 'contain',
  },
  menuContainer: {
    flex: 1,
  },
  tagText: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Medium',
    fontSize: fs(14),
  },
  itemText: {
    color: Colors.THEME,
    fontFamily: 'Roboto-Medium',
    fontSize: fs(17),
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: wp(30),
    paddingRight: 0,
    paddingTop: Platform.OS == 'ios' ? hp(15) : hp(11),
    paddingBottom: Platform.OS == 'ios' ? hp(15) : hp(11),
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
  },
  icon: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
    marginRight: wp(20),
    tintColor: Colors.RED,
  },
  verifyIcon: {
    width: hp(15),
    height: hp(15),
    resizeMode: 'contain',
    marginRight: wp(30),
    tintColor: '#009900',
  },
});
