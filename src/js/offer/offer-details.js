import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import Header from '../common/components/header';
import ImageSlider from './image-slider';
import SingleRow from '../common/components/single-row';
import MediaButton from '../common/components/media-button';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions';
import Service from '../libs/api/service';
import { useTranslation } from 'react-i18next';

export default function OfferDetails(props) {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const [offer, setOffer] = useState(null);
  const [images, setImages] = useState([]);
  

  let {offerId} = props.route.params;

  const loadData = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getOfferDetails(offerId);
    dispatch(setLoading(false));
    //console.log('test82 getOfferDetails: ', JSON.stringify(response), offerId);
    if (response.status) {
      setOffer(response.data.offer);

      let images = [];
      images.push(response.data.offer.image);
      response.data.offer.offerMedia.forEach(item => {
        images.push(item.media);
      });

      setImages(images);
    } else {
      Alert.alert(response.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Header back logo />

      {offer && (
        <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
          <ImageSlider images={images} />
          <View style={styles.body}>
            <SingleRow heading={t("@BRANDNAME")} value={offer.brand} />
            <SingleRow heading={t("@ProductName")} value={offer.productName} />
            <SingleRow heading={t("@Offer/Deal")} value={offer.offerDeal} />
            <SingleRow heading={t("PhoneNumber")} value={offer.phone} />
            <SingleRow heading={'URL'} value={offer.url} />
            <SingleRow
              hideBorder
              heading={t('Details')}
              value={offer.description}
            />

            <MediaButton
              txt={t('Take Me Here')}
              style={{backgroundColor: '#4a89f3', marginTop: hp(20)}}
              onPress={() => {
                navigation.navigate('SideMenu');
              }}
              icon={require('../../assets/google-maps.png')}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.THEME,
  },
  body: {
    flex: 1,
    marginTop: hp(10),
    width: '90%',
    alignSelf: 'center',
  },
});
