import * as React from 'react';

import {StyleSheet, Text, View, TextInput, Image} from 'react-native';

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
import ZRSwitch from '../common/form/zr-switch';
import {dummyOffer} from '../settings/utils';
import { t } from 'i18next';
import i18n from 'i18next';

export default function Notification(props) {
  const navigation = useNavigation();
  const [notification, onNotificationChnage] = React.useState('');
  const [checkIndex, onCheck] = React.useState(-1);
  let {processOffer} = props.route.params;

  onNext = () => {
    let notificationContent = {
      title: 'Now',
      image: true,
      content: getNotificationTxt(),
    };

    processOffer.notificationContent = notificationContent;
    navigation.navigate('ScheduleOffer', {processOffer});
  };

  const getNotificationTxt = () => {
    switch (checkIndex) {
      case 0:
        return dummyOffer.brand;
      case 1:
        return dummyOffer.brand + ' : ' + dummyOffer.productName;

      case 2:
        return dummyOffer.brand + ' : ' + dummyOffer.offerDeal;

      case 3:
        return (
          dummyOffer.brand +
          ' : ' +
          dummyOffer.productName +
          ', ' +
          dummyOffer.offerDeal
        );

      default:
        return notification;
    }
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent audience />
      <StepsBar currentStep={4} style={styles.bar} />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("Customize Notification")}</Text>

        <ZRSwitch
          active={checkIndex == 0}
          style={styles.checkBox}
          txt={t("Brand Name entered only")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(0);
          }}
        />

        <ZRSwitch
          active={checkIndex == 1}
          style={styles.checkBox}
          txt={t("Brand Name and Product name entered only")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(1);
          }}
        />

        <ZRSwitch
          active={checkIndex == 2}
          style={styles.checkBox}
          txt={t("Brand Name and offer entered only")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(2);
          }}
        />

        <ZRSwitch
          active={checkIndex == 3}
          style={styles.checkBox}
          txt={t("Brand Name, Product name and offer entered")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(3);
          }}
        />

        <ZRSwitch
          active={checkIndex == 4}
          style={styles.checkBox}
          txt={t("Customize Notification")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(4);
          }}
        />

        {checkIndex == 4 && (
          <TextInput
            multiline={true}
            style={styles.multiInput}
            onChangeText={onNotificationChnage}
            value={notification}
            placeholder={t("Enter customized notification here...")}
            placeholderTextColor={'#ccc'}
          />
        )}

        <View style={styles.notificationContainer}>
          <Image style={styles.image} source={{uri: dummyOffer.image}} />
          <View style={styles.rightView}>
            <Text style={styles.notifHeding}>{t("NOW")}</Text>
            <Text style={styles.notifTxt}>{getNotificationTxt()}</Text>
          </View>
        </View>

        <MediaButton
          txt={t("@NEXT")}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(20)}}
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
  notificationContainer: {
    marginTop: hp(20),
    width: '100%',
    paddingLeft: wp(10),
    paddingRight: '20%',
    paddingTop: hp(6),
    paddingBottom: hp(6),
    height: hp(64),
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  rightView: {
    marginLeft: wp(20),
  },
  notifHeding: {
    color: Colors.THEME,
    fontSize: fs(20),
    fontFamily: 'Roboto-Medium',
  },
  notifTxt: {
    marginTop: hp(5),
    color: Colors.THEME,
    fontSize: fs(14),
    fontFamily: 'Roboto-Regular',
  },
  image: {
    width: hp(50),
    height: hp(50),
    resizeMode: 'cover',
  },
  checkBox: {
    flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: hp(15),
  },
  detailsTxt: {
    marginLeft: wp(15),
    color: Colors.WHITE,
    fontSize: i18n.language == 'en' ? fs(16) : fs(18),
    fontFamily: 'Roboto-Regular',
  },
  tickIcon: {
    width: hp(17),
    height: hp(17),
    resizeMode: 'contain',
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
  input: {
    marginTop: hp(10),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    fontSize: fs(16),
  },
  multiInput: {
    marginTop: hp(20),
    height: hp(100),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    fontSize: fs(16),
    paddingTop: hp(8),
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
    marginBottom: hp(10),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  title: {
    marginTop: hp(30),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
  },
});
