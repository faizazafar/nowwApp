import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import Swiper from 'react-native-swiper';
import Colors from '../../settings/colors';
import {useNavigation} from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function Slides() {
  const navigation = useNavigation();

  const slides = [
    {
      image: {
        src: require('../../../assets/offer-new.png'),
        height: (704 / 1079) * DEVICE_WIDTH,
      },
      heading: 'Now new offers web',
      desc:
        'Now get deals like never before close to you, customized to your taste and interests',
    },
    {
      image: {
        src: require('../../../assets/target.png'),
        height: hp(200),
      },
      heading: 'Precision Market',
      desc:
        'Target marketing optimized real time like nevr before. Direct marketing to whom you want , how you want, where you want, and when you want. See result immediately',
    },
    {
      image: {
        src: require('../../../assets/offer-con.png'),
        height: (913 / 1078) * DEVICE_WIDTH,
      },
      heading: 'Convenience',
      desc:
        'Get to know the deals and offers preciously to your liking as and when thet happen',
    },
  ];

  function slideitem(slide, index) {
    return (
      <View key={index} style={styles.slideItem}>
        <View style={styles.imageConatiner}>
          <Image
            style={[styles.image, {height: slide.image.height}]}
            source={slide.image.src}
          />
        </View>
        <View style={styles.descBlock}>
          <Text style={[styles.heading]}>{slide.heading.toUpperCase()}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
        </View>
      </View>
    );
  }

  function renderSlides() {
    return slides.map((slide, index) => {
      return slideitem(slide, index);
    });
  }

  function onSkipPress() {
    navigation.navigate('SideMenu');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSkipPress} style={styles.skipBtn}>
        <Text style={styles.skip}>SKIP</Text>
      </TouchableOpacity>
      <Swiper
        loop={false}
        showsButtons={false}
        scrollEnabled={true}
        showsPagination={true}
        dotColor={'gray'}
        activeDotColor={'#fff'}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.dotStyle}>
        {renderSlides()}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.THEME,
  },
  slideItem: {
    flex: 1,
  },
  descBlock: {
    flex: 1,
    alignItems: 'center',
  },
  imageConatiner: {
    flex: 1,
    justifyContent: 'center',
  },
  skip: {
    color: '#fff',
    fontSize: fs(18),
    textAlign: 'center',
  },
  skipBtn: {
    marginRight: wp(10),
    marginTop: Platform.OS == 'ios' ? hp(40) : hp(25),
    width: wp(100),
    height: hp(40),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: hp(100),
    height: hp(100),
    resizeMode: 'contain',
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: 0,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  heading: {
    marginTop: hp(20),
    width: '50%',
    color: '#fff',
    fontSize: fs(28),
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  desc: {
    marginTop: hp(20),
    width: '75%',
    color: '#fff',
    fontSize: fs(19),
    textAlign: 'center',
  },
  buttonsRow: {
    marginTop: hp(20),
    marginBottom: hp(20),
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonLight: {
    width: '48%',
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.BORDER,
    borderRadius: 8,
    height: Platform.OS === 'ios' ? hp(42) : hp(44),
    shadowColor: 'gray',
  },
  buttonDark: {
    width: '48%',
    backgroundColor: Colors.THEME_BLUE,
    marginLeft: '4%',
    borderWidth: 0,
    borderRadius: 6,
    height: Platform.OS === 'ios' ? hp(42) : hp(44),
    shadowColor: 'gray',
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.WHITE,
    fontSize: fs(17),
    fontWeight: '600',
  },
});
