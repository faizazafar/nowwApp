import * as React from 'react';

import {StyleSheet, Text, View, TextInput} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import Colors from '../../settings/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../../common/components/header';
import StepsBar from '../components/steps-bar';
import MediaButton from '../../common/components/media-button';
import OfferItem from '../../offer/offer-item';
import {useSelector, useDispatch} from 'react-redux';
import {setOffer} from '../../../redux/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function StepThree(props) {
  const { t} = useTranslation();
  const navigation = useNavigation();
  const offer = useSelector(state => state.offer);
  const dispatch = useDispatch();

  function onChange(productName) {
    let updatedOffer = JSON.parse(JSON.stringify(offer));
    updatedOffer.productName = productName;
    dispatch(setOffer(updatedOffer));
  }

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("@ProductName")}</Text>
        <Text style={styles.title}>{t("@Pleaseentertheproductname")}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={offer.productName}
          placeholder={t("@Productname(optional)")}
          placeholderTextColor={'#ccc'}
        />
        <StepsBar currentStep={3} style={styles.bar} />

        <MediaButton
          txt={t("@NEXT")}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(20)}}
          simple
          onPress={() => {
            navigation.navigate('StepFour');
          }}
        />

        <View style={styles.offerView}>
          <OfferItem offer={offer} post disable />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.THEME,
  },
  offerView: {
    marginTop: hp(20),
  },
  bar: {
    marginTop: hp(20),
    height: hp(20),
  },
  input: {
    marginTop: hp(10),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    fontSize: i18n.language == 'en' ? fs(16) : fs(20),

  },
  body: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  stepTxt: {
    color: Colors.WHITE,
    fontSize: fs(14),
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    marginTop: hp(12),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  title: {
    marginTop: hp(5),
    color: Colors.WHITE,
    fontSize: i18n.language == 'en' ? fs(16) : fs(20),
    fontFamily: 'Roboto-Regular',
  },
});
