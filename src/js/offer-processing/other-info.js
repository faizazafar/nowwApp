import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../common/components/header';
import MediaButton from '../common/components/media-button';
import StepsBar from '../post/components/steps-bar';
import ModalDropdown from 'react-native-modal-dropdown';
import { t } from 'i18next';
import i18n from 'i18next';

export default function OtherInfo(props) {
  const navigation = useNavigation();
  const [offerDuration, setOfferDuration] = useState(1);
  let {processOffer} = props.route.params;

  useEffect(() => {
    this.dropDown.select(0);
  }, [setOfferDuration]);

  omModalPress = () => {
    this.dropDown.show();
    //console.log(offerDuration)

  };

  onNext = () => {
    processOffer.offerDuration = offerDuration;
    navigation.navigate('Notification', {processOffer});
  };

  renderRowText = () => {
    return <Text style={styles.title}>{t("@Please")}</Text>;
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent audience />
      <StepsBar currentStep={4} style={styles.bar} />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("@Offer Duration in Today's offers")}</Text>

        <Text style={styles.title}>
        {t("@Please select offer duration (days the offer will be shown in today’s offers, before moving down to yesterday’s offers)")}

        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            omModalPress();
          }}>
          <ModalDropdown
            ref={ref => {
              this.dropDown = ref;
            }}
            style={styles.box}
            dropdownTextStyle={styles.dropdownTextStyle}
            defaultValue={t("'Select days..")}
            textStyle={styles.boxText}
            onSelect={(index, option) => {
              setOfferDuration(option);
            }}
            
            options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
        </TouchableOpacity>

        <Text style={styles.optional}>{t("@Optional")}</Text>

        <MediaButton
          txt={t('@NEXT')}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(40)}}
          simple
          onPress={onNext}
        />
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
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: hp(10),
  },
  boxText: {
    color: '#fff',
    fontSize: fs(16),
  },
  dropdownTextStyle: {
    color: Colors.THEME,
    fontSize: fs(16),
    fontFamily: 'Roboto-Regular',
    paddingLeft: wp(40),
    paddingRight: wp(40),
  },
  box: {
    marginTop: hp(20),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    justifyContent: 'center',
  },
  input: {
    marginTop: hp(20),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    fontSize: fs(16),
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
    marginTop: hp(15),
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
  optional: {
    marginTop: hp(5),
    color: '#ccc',
    fontSize: i18n.language == 'en' ? fs(13) : fs(16),
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
  },
});
