import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';
import Colors from '../settings/colors';
import OptionButton from './option-button';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading} from '../../redux/actions';
import Service from '../libs/api/service';
import { useTranslation } from 'react-i18next';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function OfferItem(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const backImage = 'https://i.stack.imgur.com/y9DpT.jpg';
  const [isFav, setFav] = useState(false);
  const user = useSelector(state => state.user);

  const options = () => {
    if (props.options) {
      return (
        <View style={styles.optionsView}>
          {props.refresh && (
            <OptionButton
              onPress={props.refresh}
              txt={t("Process")}
              source={require('../../assets/refresh.png')}
            />
          )}
          {props.edit && (
            <OptionButton
              onPress={props.edit}
              source={require('../../assets/pen.png')}
              style={{marginLeft: wp(10)}}
            />
          )}
          {props.delete && (
            <OptionButton
              source={require('../../assets/delete.png')}
              style={{marginLeft: wp(10)}}
              onPress={props.delete}
            />
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.optionsView}>
          <OptionButton
            onPress={onFavButtonPress}
            iconStyle={{tintColor: isFav ? Colors.RED : '#fff'}}
            source={require('../../assets/fav.png')}
            style={{
              backgroundColor: Colors.BACKGROUND,
            }}
          />
        </View>
      );
    }
  };

  onFavButtonPress = async () => {
    dispatch(setLoading(true));

    let form = {
      id: user.id,
      //offerId: props.offer.id,
      offerId: '6120530e9bb46',
      action: isFav ? 'unmark' : 'mark',
    };

    let s = new Service();
    let response = await s.makeFavorite(form);
    dispatch(setLoading(false));
    ////console.log('test82 makeFavorite: ', JSON.stringify(response));
    if (response.status) {
      setFav(isFav ? false : true);
    } else {
      Alert.alert(response.message);
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

  let image = props.offer.image != '' ? props.offer.image : backImage;
  let brandName =
    props?.offer?.brand.trim() != '' ? props.offer.brand : 'BRAND NAME';
  let productName =
    props.offer.productName.trim() != ''
      ? props.offer.productName
      : 'PRODUCT NAME';
  // let deal =
  //   props?.offer?.offerDeal.trim() != '' ? props?.offer?.offerDeal : 'OFFER/DEAL';

  let deal = 'OFFER/DEAL';
  if(props.offer && props.offer.offerDeal) 
  {
    deal = props.offer.offerDeal;
  }

  let itemStyle = getStyle();
  let valueBoxheight = itemStyle.height * 0.09;
  let top = itemStyle.height * (0.618 - 0.092 / 2);
  let bottom = itemStyle.height * (0.236 - 0.092 / 2);

  return (
    <TouchableOpacity
      disabled={props.disable}
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('OfferDetails', {offerId: props.offer.id});
      }}
      style={[itemStyle, props.style]}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      {options()}
      <View style={[styles.infoView, {top, bottom}]}>
        <View style={styles.row}>
          <View style={[styles.brandView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{brandName}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View style={[styles.productView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{productName}</Text>
          </View>
          <View style={[styles.productView, {height: valueBoxheight}]}>
            <Text style={styles.txt}>{deal}</Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomRow: {
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
    fontSize: fs(14),
    fontFamily: 'Roboto-Medium',
  },
  infoView: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
});
