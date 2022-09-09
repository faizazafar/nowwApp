import * as React from 'react';

import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';

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
import {setOffer, setLoading} from '../../../redux/actions';
import Service from '../../libs/api/service';
import {initialOffer} from '../../settings/utils';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function StepEight(props) {
  const navigation = useNavigation();
  const offer = useSelector(state => state.offer);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {t} = useTranslation();
console.log("useselector",offer)
  function onChange(phoneNumber) {
    let updatedOffer = JSON.parse(JSON.stringify(offer));
    updatedOffer.phoneNumber = phoneNumber;
    dispatch(setOffer(updatedOffer));
  }

  const uploadMoreImages = async (id, index) => {
    if (index >= offer.images.length) {
      return;
    }

    let s = new Service();

    var payload = new FormData();
    payload.append('offerId', id);

    let image = offer.images[index];
    //console.log("image",image)
    let fileExt = image
      .split('.')
      .pop()
      .toUpperCase();

    if (fileExt == 'MOV' || fileExt == 'MP4') {
      payload.append('image', {
        uri: image,
        name: 'myVideo' + '-' + Date.now() + '.mp4',
        type: 'video/mp4',
      });
    } else {
      payload.append('image', {
        uri: image,
        name: 'myImage' + '-' + Date.now() + '.jpg',
        type: 'image/jpeg',
      });
    }

    let response = await s.uploadImage(payload);
    ////console.log('test82 response: ', JSON.stringify(response));

    if (response.status) {
      await uploadMoreImages(id, index + 1);
    }
  };

  const saveOfferToDraft = async () => {
    var payload = new FormData();
    // //console.log(offer);

    if (offer.id) {
      //edit mrode
      payload.append('offerId', offer.id);
    } else {
      //new
      payload.append('offerId', 0);
    }

    payload.append('userId', user.id);
    // //console.log("user",user)


    payload.append('image', {
      uri: offer.images[0],
      name: 'myImage' + '-' + Date.now() + '.jpg',
      type: 'image/jpg',
    });

    payload.append('brand', offer.brand);
    payload.append('productName', offer.productName);
    payload.append('offerDeal', offer.offerDeal);
    payload.append('url', offer.url);
    payload.append('description', offer.details);
    payload.append('phone', offer.phoneNumber);
    // payload.append('offerLocations', offer.locations);

    console.log("offer",offer);

    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.saveToDraft(payload);

    dispatch(setLoading(false));
    ////console.log("status",response.status)

    if (response.status) {
      //console.log('test82 response: ', JSON.stringify(response));
      dispatch(setLoading(true));
      await uploadMoreImages(response.data.offers[0].id, 1);
      dispatch(setLoading(false));

      return response.data.offers[0];
    } else {
      console.log(response.status)
      Alert.alert("hi", response.message);
      return null;
    }
  };

  const onSaveToDraft = async () => {
    let newOffer = await saveOfferToDraft();
    if (newOffer != null) navigation.navigate('MyOffers');

    dispatch(setOffer(initialOffer));
  };

  const onProcessNow = async () => {
    let newOffer = await saveOfferToDraft();
    if (newOffer != null) navigation.navigate('TargetZone', {offer: newOffer});
    console.log(newOffer)
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("Phone Number")}</Text>
        <Text style={styles.title}>{t("Please enter the phonenumber")}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={offer.phoneNumber}
          placeholder={t("Phone number (optional)")}
          placeholderTextColor={'#ccc'}
          keyboardType="numeric"
        />
        <StepsBar currentStep={8} style={styles.bar} />

        <MediaButton
          txt={t("PROCESS NOW")}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(20)}}
          simple
          onPress={onProcessNow}
        />

        <MediaButton
          txt={t("SAVE TO DRAFT")}
          style={{
            backgroundColor: Colors.BLUE,
            marginTop: hp(10),
          }}
          simple
          onPress={onSaveToDraft}
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
