import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import Header from '../common/components/header';
import MediaButton from '../common/components/media-button';
import PaymentRow from '../common/components/payment-row';
import {useNavigation} from '@react-navigation/native';
import StepsBar from '../post/components/steps-bar';
import {useSelector, useDispatch} from 'react-redux';
import Service from '../libs/api/service';
import {setLoading} from '../../redux/actions';
import dateFormat from '../libs/dateformat';
import ZRSwitch from '../common/form/zr-switch';
import Paypal from './paypal';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function PaymentSumary(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [checkIndex, onCheck] = React.useState(-1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [coupen, onCoupenChange] = useState('');
  const audienceData = useSelector(state => state.audience);
  const {t} = useTranslation();

  let {processOffer} = props.route.params;

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
      console.log(response.message)
      Alert.alert(response.message);
    }
  };

  const validateCoupenCode = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.validateCoupen({code: coupen});
    ////console.log('test82 validateCoupen: ', JSON.stringify(response));
    dispatch(setLoading(false));
    return response;
  };

  const onPaymentDone = async () => {
    if (coupen.trim() != '') {
      let coupenResponse = await validateCoupenCode();
      if (coupenResponse.status) {
        processOffer.couponCode = coupen;
        processOffer.couponType = coupenResponse.data.type;
        processOffer.couponDiscount = coupenResponse.data.discount;
      } else {
        console.log(coupenResponse.message)
        // Alert.alert(coupenResponse.message);
        return;
      }
    } else {
      processOffer.couponCode = '';
      processOffer.couponType = '';
      processOffer.couponDiscount = '';
    }

    processOffer.status = 3;
    processOffer.dateScheduled = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    processOffer.date_live = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
    processOffer.peopleWithInterest =
      audienceData.withInterest == 0 ? 1 : audienceData.withInterest;
    processOffer.peopleWithoutInterest =
      audienceData.withoutInterest == 0 ? 1 : audienceData.withoutInterest;
    processOffer.audienceCharges = 10;
    processOffer.serviceCharges = 10;
    processOffer.subTotal = 20;

    processOffer.discountAmount = processOffer.couponDiscount;
    processOffer.taxPercent = 0;
    processOffer.taxAmount = 0;
    processOffer.total = 20;
    processOffer.paymentModeId = checkIndex;

    publishOffer();
  };

  const onNext = () => {
    onPaymentDone();
    this.paypal.openModal();
  };

  const publishOffer = async () => {
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
    // //console.log(
    //   'test82 processOffer: ',
    //   //JSON.stringify(processOffer),
    //   JSON.stringify(response),
    // );
    dispatch(setLoading(false));
    if (response.status) {
      navigation.navigate('Published');
    } else {
      console.log(response.message)
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
      <Header back logo border audience />
      <StepsBar currentStep={7} style={styles.bar} />

      <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
        <View style={styles.body}>
          <Text style={[styles.heading, {marginBottom: 0}]}>
            {t("PaymentMethods")}
          </Text>
          {renderPaymentMethods()}
          <Text style={styles.heading}>{t("PaymentSummary")}</Text>

          <PaymentRow light heading={t("Totalaudience")} value={'100'} />
          <PaymentRow
            light
            heading={t("Interest matching audience")}
            value={'50'}
          />
          <PaymentRow
            light
            leftFlex={2}
            heading={t("Non interest (other) matching audience")}
            value={'50'}
          />
          <PaymentRow
            light
            leftFlex={2}
            heading={t("Interest matching price per user for Country A")}
            value={'$ 0.05'}
          />
          <PaymentRow
            light
            leftFlex={2}
            heading={t("Non Interest matching price per user for Country A")}
            value={'$ 0.03'}
          />
          <PaymentRow
            light
            leftFlex={2}
            heading={
              t("Charges per user for each additional day (starting from second day) in the country A")
            }
            value={'$ 0.01'}
          />

          <Text style={[styles.heading, {marginBottom: 0, fontSize: fs(16)}]}>
           {t("CouponCode")}
            <Text style={styles.title}>{t("@(optional)")}</Text>
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={onCoupenChange}
            value={coupen}
            //placeholder="Enter coupon code here"
            placeholderTextColor={'#ccc'}
          />

          <View style={styles.highlightedRow}>
            <View style={{flex: 1}}>
              <Text style={styles.highlightedRowKey}>{t("TOTALAMOUNT")}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.highlightedRowValue}>1.00 $</Text>
            </View>
          </View>

          <MediaButton
            txt={t("CONTINUE")}
            style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(0)}}
            simple
            onPress={onNext}
          />
        </View>
      </ScrollView>

      <Paypal
        ref={ref => {
          this.paypal = ref;
        }}

        key={Math.random()}
        navigation={navigation}
        amount={10}
        onPaymentDone={onPaymentDone.bind(this)}
      />
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
  input: {
    marginTop: hp(10),
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
  heading: {
    marginTop: hp(20),
    marginBottom: hp(10),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  title: {
    color: Colors.BORDER,
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
  },
  highlightedRowKey: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(22),
  },
  highlightedRowValue: {
    textAlign: 'left',
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(22),
  },
  highlightedRow: {
    marginTop: hp(30),
    flexDirection: i18n.language == 'en'? "row" : "row-reverse",
    paddingTop: hp(12),
    paddingBottom: hp(12),
    
  },
  bar: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: hp(10),
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
});
