import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Alert} from 'react-native';

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
import {initialOffer} from '../settings/utils';
import {useDispatch} from 'react-redux';
import {setLoading, setOffer} from '../../redux/actions';
import Service from '../libs/api/service';
import { useTranslation } from 'react-i18next';

export default function Payment(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [checkIndex, onCheck] = React.useState(-1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  let {processOffer} = props.route.params;

  // console.log(processOffer)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getPaymentModes();
    ////console.log('test82 getPaymentModes: ', JSON.stringify(response));
    dispatch(setLoading(false));
    if (response.status) {
      setPaymentMethods(response.data.paymentModes);
    } else {
      Alert.alert(response.message);
    }
  };

  const onNext = async () => {
    console.log("xsjxsu")
    processOffer.paymentModeId = checkIndex;

    var payload = new FormData();

    Object.keys(processOffer).forEach(key => {
      if (key == 'offerInterests' || key == 'notificationContent') {
        payload.append(key, {
          string: JSON.stringify(processOffer[key]),
          type: 'application/json',
        });
      } else {
        payload.append(key, processOffer[key]);
      }
    });

    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.scheduleOffer(payload);
    console.log(
      'test82 processOffer: ',
      JSON.stringify(processOffer),
      JSON.stringify(response),
    );
    dispatch(setLoading(false));
    if (response.status) {
      dispatch(setOffer(initialOffer));
      navigation.navigate('Home');
    } else {
      Alert.alert(response.message);
    }
  };

  const renderPaymentMethods = () => {
    return paymentMethods.map((item, index) => {
      return (
        <ZRSwitch
          active={checkIndex == item.id}
          style={styles.checkBox}
          txt={item.name}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={() => {
            onCheck(item.id);
          }}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent audience />
      <StepsBar currentStep={4} style={styles.bar} />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("@PaymentMethod")}</Text>

        {renderPaymentMethods()}

        <MediaButton
          disabled={checkIndex == -1}
          txt={t("DONE")}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(180)}}
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
    fontSize: fs(16),
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
    marginTop: hp(25),
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
