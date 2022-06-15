import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import i18n from 'i18next';


import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import Colors from '../../settings/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { useState } from 'react';

export default function Header(props) {
  const navigation = useNavigation();
  const [state, setstate] = useState('')
  const audienceData = useSelector(state => state.audience);

  function onBackPress() {
    let {onBackPress} = props;

    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  }

  function _renderLeft() {
    let {back, menu} = props;
    if (back) {
      return (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            onBackPress();
          }}>
          <Image
            style={styles.icon}
            source={require('../../../assets/back-vector.png')}
          />
        </TouchableOpacity>
      );
    }
    if (menu) {
      return (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            style={styles.menuIcon}
            source={require('../../../assets/menu.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return <View style={styles.iconContainer} />;
    }
  }

  function _renderRight() {
    let {search, audience} = props;

    if (search) {
      return (
        <View   style={styles.cartContainer}>
        <TouchableOpacity
          onPress={()=> i18n.changeLanguage('en')}
          activeOpacity={0.5}
          style={{ flexDirection:"row"}}
          // style={styles.cartContainer}
          >
          <Image
            style={styles.serachIcon}
            source={require('../../../assets/search.png')}
          />
          <Text style={styles.count}>EN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        onPress={()=> i18n.changeLanguage('ar')}
        activeOpacity={0.5}
        // style={styles.cartContainer}
        >
        <Text style={styles.count}>AR</Text>
      </TouchableOpacity>
      </View>
      );
    } else if (audience) {
      return (
        <View style={styles.audienceContainer}>
          <Image
            style={[styles.serachIcon, {tintColor: '#fff'}]}
            source={require('../../../assets/user.png')}
          />
          <Text style={styles.count}>{audienceData.all}</Text>
        </View>
      );
    } else {
      return <View style={styles.iconContainer} />;
    }
  }

  function _renderMiddle() {
    let {title, logo} = props;
    if (title) {
      return <Text style={styles.title}>{title}</Text>;
    } else if (logo) {
      return (
        <Image
          style={styles.logo}
          source={require('../../../assets/now.png')}
        />
      );
    } else {
      return <View style={styles.iconContainer} />;
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: props.border ? 1 : 0,
          backgroundColor: props.transparent ? 'transparent' : Colors.THEME,
        },
      ]}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        {_renderLeft()}
        {_renderMiddle()}
        {_renderRight()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
  },
  logo: {
    width: wp(100),
    height: hp(30),
    resizeMode: 'contain',
  },
  audienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(20),
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(20),
    paddingTop: hp(5),
    paddingBottom: hp(5),
    paddingLeft: wp(13),
    paddingRight: wp(13),
    borderRadius: hp(20),
    backgroundColor: Colors.THEME_BLUE,
    justifyContent: 'center',
  },
  addressContainer: {},
  dropIcon: {
    marginLeft: wp(10),
    width: hp(10),
    height: hp(10),
    resizeMode: 'contain',
    tintColor: Colors.THEME_BLUE,
  },
  addressTitle: {
    color: Colors.BLACK_2,
    fontSize: fs(15),
    fontWeight: '600',
  },
  addressHeading: {
    alignSelf: 'center',
    color: Colors.THEME_BLUE,
    fontSize: fs(11),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  addressRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: fs(17),
    fontWeight: '600',
  },
  count: {
    marginLeft: wp(10),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Medium',
  },
  statusBar: {
    width: '100%',
    height: Platform.OS === 'ios' ? hp(20) : hp(2),
  },
  navBar: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? hp(55) : hp(46),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: hp(10),
  },
  icon: {
    width: hp(16),
    height: hp(16),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  serachIcon: {
    width: hp(12),
    height: hp(12),
    resizeMode: 'contain',
    tintColor: '#a6a6a6',
  },
  menuIcon: {
    width: Platform.OS == 'ios' ? hp(16) : hp(20),
    height: Platform.OS == 'ios' ? hp(16) : hp(20),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  plusIcon: {
    width: hp(14),
    height: hp(14),
    resizeMode: 'contain',
    tintColor: Colors.THEME_BLUE,
  },
  cartIcon: {
    width: hp(12),
    height: hp(12),
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
  iconContainer: {
    marginLeft: wp(7),
    width: hp(50),
    height: hp(50),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginRight: wp(7),
    width: hp(50),
    height: hp(50),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
});
