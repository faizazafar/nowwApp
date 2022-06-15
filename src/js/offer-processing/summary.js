import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import Header from '../common/components/header';
import SingleRow from '../common/components/single-row';
import MediaButton from '../common/components/media-button';
import LocationMarker from '../libs/maps/location-marker';
import {useNavigation} from '@react-navigation/native';
import StepsBar from '../post/components/steps-bar';
import {useSelector} from 'react-redux';
import { t } from 'i18next';

export default function OfferDetails(props) {
  const navigation = useNavigation();
  let {processOffer} = props.route.params;
  const audienceData = useSelector(state => state.audience);

  getGenderValue = () => {
    if (processOffer.targetGender == 'm') {
      return t("@Male");
    } else if (processOffer.targetGender == 'f') {
      return t("@Female");
    } else {
      return t("@All");
    }
  };

  return (
    <View style={styles.container}>
      <Header back logo border audience />
      <StepsBar currentStep={6} style={styles.bar} />

      <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
        <View style={styles.body}>
          <Text style={styles.heading}>{t("Audience Summary")}</Text>

          <View style={styles.mapView}>
            <LocationMarker
              readOnly
              radius={processOffer.targetRadius}
              latlng={{
                lat: processOffer.targetLat,
                lng: processOffer.targetLng,
              }}
              pointerSrc={require('../../assets/google-maps.png')}
            />
          </View>

          <SingleRow
            heading={t("@Interest")}
            value={`${audienceData.withInterest} ${t("Peoples")}`}
          />
          <SingleRow
            heading={t("NonInterest")}
            value={`${audienceData.withoutInterest} ${t("Peoples")}`}
          />

          <SingleRow
            heading={t("Target Range")}
            value={
              processOffer.targetRadius + ' ' + processOffer.targetRadiusUnit
            }
          />
          <SingleRow heading={t("@TargetGender")} value={getGenderValue()} />
          <SingleRow
            heading={t("Target Age")}
            value={`${processOffer.targetAgeMin} ${t("@yearsto")} ${processOffer.targetAgeMax} ${t('@years')}`}
          />
          <SingleRow
            heading={t("Offer Duration")}
            value={`${processOffer.offerDuration} ${t("days")}`}
          />
          <SingleRow
            heading={t("Notification")}
            value={processOffer.notificationContent.content}
          />

          <MediaButton
            txt={t("REVIEW PAYMENT")}
            style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(40)}}
            simple
            onPress={() => {
              navigation.navigate('PaymentSumary', {processOffer});
            }}
          />
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
  mapView: {
    marginTop: hp(20),
    width: '100%',
    height: hp(100),
    marginBottom: hp(20),
  },
  body: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    marginTop: hp(30),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  bar: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: hp(10),
  },
});
