import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';
import Colors from '../settings/colors';
import OptiobButton from './option-button';
import {useNavigation} from '@react-navigation/native';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function OfferItem(props) {
  const navigation = useNavigation();
  const backImage = 'https://i.stack.imgur.com/y9DpT.jpg';

  const options = () => {
    if (props.options) {
      return (
        <View style={styles.optionsView}>
          {props.refresh && (
            <OptiobButton
              onPress={props.refresh}
              source={require('../../assets/refresh.png')}
            />
          )}
          {props.edit && (
            <OptiobButton
              source={require('../../assets/pen.png')}
              style={{marginLeft: wp(10)}}
            />
          )}
          {props.delete && (
            <OptiobButton
              source={require('../../assets/delete.png')}
              style={{marginLeft: wp(10)}}
            />
          )}
        </View>
      );
    }
  };

  const getStyle = () => {
    if (props.post) {
      let width = (DEVICE_WIDTH * 90) / 100;
      return {
        width: width,
        height: (1 / 1.618) * width,
      };
    } else {
      return {
        width: DEVICE_WIDTH,
        height: (1 / 1.618) * DEVICE_WIDTH,
      };
    }
  };

  let image = props.offer.images.length > 0 ? props.offer.images[0] : backImage;
  let brandName =
    props.offer.brandName.trim() != '' ? props.offer.brandName : 'BRAND NAME';
  let productName =
    props.offer.productName.trim() != ''
      ? props.offer.productName
      : 'PRODUCT NAME';
  let deal = props.offer.deal.trim() != '' ? props.offer.deal : 'OFFER/DEAL';

  let itemStyle = getStyle();
  let valueBoxheight = itemStyle.height * 0.09;
  let rowMarginTop = itemStyle.height * (0.146 - 0.092 / 2);
  let bottom = itemStyle.height * (0.236 - 0.092 / 2);

  return (
    <TouchableOpacity
      disabled={props.disable}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('OfferDetails');
      }}
      style={[itemStyle, props.style]}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      {options()}
      <View style={[styles.infoView, {bottom}]}>
        <View style={styles.row}>
          <View style={[styles.brandView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{brandName}</Text>
          </View>
          <View style={[styles.productView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{deal}</Text>
          </View>
        </View>
        <View style={[styles.bottomRow, {marginTop: rowMarginTop}]}>
          <View style={[styles.productView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{productName}</Text>
          </View>
          {/* <View style={[styles.productView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{deal}</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconContainer: {
    width: hp(30),
    height: hp(30),
    backgroundColor: Colors.THEME,
    borderRadius: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: hp(20),
    height: hp(20),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsView: {
    position: 'absolute',
    top: hp(10),
    right: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandView: {
    justifyContent: 'center',
    backgroundColor: 'rgb(229, 150, 58)',
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  productView: {
    justifyContent: 'center',
    backgroundColor: 'rgb(235, 69, 88)',
    paddingLeft: wp(5),
    paddingRight: wp(5),
  },
  txt: {
    color: '#fff',
    fontSize: fs(12),
    fontFamily: 'Roboto-Medium',
  },
  infoView: {
    position: 'absolute',
    //bottom: hp(10),
    left: 0,
    right: 0,
  },
});
