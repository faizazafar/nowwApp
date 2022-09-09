import React, {useEffect} from 'react';

import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../common/components/header';
import MediaButton from '../common/components/media-button';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import SelectiveButton from '../common/components/selective-button';
import StepsBar from '../post/components/steps-bar';
import Service from '../libs/api/service';
import {useDispatch} from 'react-redux';
import {setLoading, setAudience} from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const DEVICE_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = (DEVICE_WIDTH * 80) / 100;
const GENDER_BTN_WIDTH = ((DEVICE_WIDTH * 80) / 100 - wp(20)) / 3;

export default function AgeGender(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let {processOffer} = props.route.params;
  const [gender, setGender] = React.useState(1);
  const [multiSliderValue, setMultiSliderValue] = React.useState([25, 50]);
  const multiSliderValuesChange = values => setMultiSliderValue(values);
  const {t} = useTranslation();

  useEffect(() => {
    getAudience();
  }, []);

  const getAudience = async () => {
    let payload = {
      targetLat: processOffer.targetLat,
      targetLng: processOffer.targetLat,
      targetRadius: processOffer.targetRadius,
      targetRadiusUnit: processOffer.targetRadiusUnit,
    };

    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getAudience(payload);
    //console.log('test82 getAudience: ', JSON.stringify(response));
    dispatch(setLoading(false));
    if (response.status) {
      dispatch(setAudience(response.data));
    } else {
      Alert.alert(response.message);
    }
  };

  const onNext = () => {
    let genderCode = '';
    if (gender == 1) genderCode = 'm';
    else if (gender == 2) genderCode = 'f';

    processOffer.targetAgeMin = multiSliderValue[0];
    processOffer.targetAgeMax = multiSliderValue[1];
    processOffer.targetGender = genderCode;

    navigation.navigate('Interest', {processOffer});
  };

  let ageStr = `${multiSliderValue[0]} ${t('years to')} ${multiSliderValue[1]} ${t("years")}`;
  if (multiSliderValue[1] == 70) {
    ageStr = `${multiSliderValue[0]} years to 70+ years`;
  }

  return (
    <View style={styles.container}>
      <Header back logo border transparent audience />
      <StepsBar currentStep={2} style={styles.bar} />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("Target Gender")}</Text>
        <Text style={styles.title}>{t("Please select the target gender")}</Text>

        <View style={styles.buttonRow}>
          <SelectiveButton
            style={{width: GENDER_BTN_WIDTH}}
            title={t("Male")}
            selected={gender == 1}
            onPress={() => {
              setGender(1);
            }}
          />
          <SelectiveButton
            title={t("Female")}
            style={{width: GENDER_BTN_WIDTH, marginLeft: wp(10)}}
            selected={gender == 2}
            onPress={() => {
              setGender(2);
            }}
          />
          <SelectiveButton
            title={t("ALL")}
            style={{width: GENDER_BTN_WIDTH, marginLeft: wp(10)}}
            selected={gender == 3}
            onPress={() => {
              setGender(3);
            }}
          />
        </View>

        <Text style={styles.heading}>{t("Target Age")}</Text>
        <Text style={styles.title}>{t("Please select the target age")}</Text>

        <View style={{marginTop: hp(20), alignSelf: 'center'}}>
          <MultiSlider
            values={[multiSliderValue[0], multiSliderValue[1]]}
            sliderLength={SLIDER_WIDTH}
            onValuesChange={multiSliderValuesChange}
            selectedStyle={{
              backgroundColor: 'rgb(228, 45, 72)',
            }}
            unselectedStyle={{
              backgroundColor: 'silver',
            }}
            trackStyle={{
              height: 4,
            }}
            min={14}
            max={70}
          />

          <Text style={styles.diameter}>( {ageStr} )</Text>
        </View>

        <MediaButton
          txt={t("NEXT")}
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: hp(20),
    justifyContent: 'center',
  },
  diameter: {
    marginTop: hp(0),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  icon: {
    marginLeft: wp(10),
    width: hp(8),
    height: hp(8),
    resizeMode: 'contain',
    tintColor: 'rgb(228, 45, 72)',
  },
  btnTxt: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Medium',
    fontSize: fs(14),
    textAlign: 'center',
  },
  addBtnTxt: {
    color: 'rgb(228, 45, 72)',
    fontFamily: 'Roboto-Medium',
    fontSize: fs(13),
    textAlign: 'center',
  },
  addBtn: {
    marginTop: hp(7),
    width: ((DEVICE_WIDTH * 90) / 100 - wp(20)) / 3,
    height: hp(26),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    marginTop: hp(7),
    width: ((DEVICE_WIDTH * 90) / 100 - wp(20)) / 3,
    height: hp(26),
    backgroundColor: '#4a89f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2),
  },
  buttonsView: {
    marginTop: hp(10),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  mapView: {
    marginTop: hp(20),
    width: '100%',
    height: hp(240),
  },
  offerView: {
    marginTop: hp(20),
    height: hp(160),
  },
  image: {
    marginTop: hp(20),
    width: '100%',
    height: hp(250),
    resizeMode: 'cover',
  },
  bar: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
    height: hp(10),
  },
  input: {
    marginTop: hp(7),
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
});
