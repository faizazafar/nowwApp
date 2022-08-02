import React, { useRef } from 'react';
import {StyleSheet, View, Text, Alert , Platform} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import Header from '../common/components/header';
import MediaButton from '../common/components/media-button';
import {useNavigation} from '@react-navigation/native';
// import DateSelectorAndroid from '../common/components/date-selector.android';
import DateSelector from '../common/components/date-selector';
import StepsBar from '../post/components/steps-bar';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/actions';
import Service from '../libs/api/service';
import dateFormat from '../libs/dateformat';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function ScheduleOffer(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, onDateChange] = React.useState(new Date());
  let {processOffer} = props.route.params;

  const dateSelectorRef = useRef(null);

  const scheduleOffer = async date => {
    processOffer.status = 2;
    processOffer.dateScheduled = dateFormat(date, 'yyyy-mm-dd HH:MM:ss');

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
    ////console.log('test82 processOffer: ', JSON.stringify(processOffer));

    dispatch(setLoading(false));
    if (response.status) {
      navigation.navigate('Scheduled');
    } else {
      Alert.alert(response.message);
    }
  };

  onNext = () => {
    navigation.navigate('Summary', {processOffer});
  };

  const onToDatePress = () => {
      dateSelectorRef.current.openModal(date, date => {
      onDateChange(date);
      scheduleOffer(date);
    });
  };

  return (
    <View style={styles.container}>
      <Header back logo border audience />
      <StepsBar currentStep={5} style={styles.bar} />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("@Offer launch date & time")}</Text>
        <Text style={styles.title}>
          {t("@You can schedule the offer now or later")}
        </Text>

        <Text style={styles.note}>
          {t("@Offer will publish at the selected date and time in the dropped pin location.")}
        </Text>

        <MediaButton
          overlayImage={require('../../assets/now.png')}
          style={{backgroundColor: Colors.PINK, marginTop: hp(30)}}
          simple
          onPress={onNext}
        />

        <MediaButton
          txt={t("SCHEDULE LATER")}
          style={{backgroundColor: '#4a89f3', marginTop: hp(20)}}
          simple
          onPress={() => {
            onToDatePress();
          }}
        />
      </View>

      <DateSelector
      ref= {dateSelectorRef}
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
  body: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
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
  note: {
    marginTop: hp(20),
    color: Colors.WHITE,
    fontSize: i18n.language == 'en' ? fs(16) : fs(20),
    fontFamily: 'Roboto-Regular',
  },
  highlightedRowKey: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(22),
  },
  highlightedRowValue: {
    textAlign: 'right',
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(22),
  },
  highlightedRow: {
    marginTop: hp(30),
    flexDirection: 'row',
    paddingTop: hp(12),
    paddingBottom: hp(12),
  },
  bar: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: hp(10),
  },
});
