import * as React from 'react';

import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

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
import ZRCheckBox from '../../common/form/zr-checkbox';
import OfferItem from '../../offer/offer-item';
import {useSelector, useDispatch} from 'react-redux';
import {setOffer} from '../../../redux/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function StepFour(props) {
  const { t} = useTranslation();

  const navigation = useNavigation();
  const offer = useSelector(state => state.offer);
  const dispatch = useDispatch();

  const [checkIndex, onCheck] = React.useState(2);

  function onChange(offerDeal) {
    let updatedOffer = JSON.parse(JSON.stringify(offer));
    updatedOffer.offerDeal = offerDeal;
    dispatch(setOffer(updatedOffer));
  }

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
        <View style={styles.body}>
          <Text style={styles.heading}>{t("@Offer/Deal")}</Text>
          <Text style={styles.title}>{t("@Pleaseentertheoffer/deal")}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={offer.offerDeal}
            placeholder={t("@Promotion(optional)")}
            placeholderTextColor={'#ccc'}
            maxLength={checkIndex == 2 ? 20 : 100}
          />

          <ZRCheckBox
            active={checkIndex == 0}
            style={[styles.checkBox, {marginTop: hp(20)}]}
            txt={t("@X%free")}
            textStyle={styles.detailsTxt}
            iconSrc={require('../../../assets/blank-check-box.png')}
            iconStyle={styles.tickIcon}
            onPress={() => {
              onCheck(0);
              onChange('X% free');
            }}
          />

          <ZRCheckBox
            active={checkIndex == 1}
            style={styles.checkBox}
            txt={t("@BuyXgetYfree")}
            textStyle={styles.detailsTxt}
            iconSrc={require('../../../assets/blank-check-box.png')}
            iconStyle={styles.tickIcon}
            onPress={() => {
              onCheck(1);
              onChange('Buy X get Y free');
            }}
          />

          <ZRCheckBox
            active={checkIndex == 2}
            style={styles.checkBox}
            txt={t("@Writeyourownoffer")}
            textStyle={styles.detailsTxt}
            iconSrc={require('../../../assets/blank-check-box.png')}
            iconStyle={styles.tickIcon}
            onPress={() => {
              onCheck(2);
              onChange('');
            }}
          />

          <StepsBar currentStep={4} style={styles.bar} />

          <MediaButton
            txt={t("@NEXT")}
            style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(20)}}
            simple
            onPress={() => {
              navigation.navigate('StepFive');
            }}
          />

          <View style={styles.offerView}>
            <OfferItem offer={offer} post disbale />
          </View>
        </View>
      </ScrollView>
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
  tickIcon: {
    width: hp(17),
    height: hp(17),
    resizeMode: 'contain',
  },
  detailsTxt: {
    marginLeft: wp(15),
    color: Colors.WHITE,
    fontSize: fs(17),
    fontFamily: 'Roboto-Medium',
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
  checkBox: {
    flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: hp(10),
  },
});
