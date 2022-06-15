import React, {useRef} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

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
import LocationMarker from '../../libs/maps/location-marker';
import ZRAddressAutoInput from '../../common/form/zr-address-auto-input';
import {useSelector, useDispatch} from 'react-redux';
import {setOffer} from '../../../redux/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function StepFive(props) {
  const { t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [locations, onLocationAdd] = React.useState([{}, {}]);
  const [activeLocation, onActive] = React.useState(0);
  const [addressStr, onAddressStrChange] = React.useState('');
  const curr_location = useSelector(state => state.curr_location);
  const offer = useSelector(state => state.offer);

  const mapView = useRef();

  const onAdd = () => {
    let mapData = mapView.current.getData();
    ////console.log('test82 ', JSON.stringify(mapData));

    locations[activeLocation] = mapData;
    locations.push({});
    onLocationAdd([...locations]);
    onActive(locations.length - 2);
  };

  const onLocationPress = position => {
    if (!locations[activeLocation].latitude) {
      let mapData = mapView.current.getData();
      locations[activeLocation] = mapData;
      onLocationAdd([...locations]);
    }

    onActive(position);
    let mapData = locations[position];
    ////console.log('test82 onLocationPress: ', JSON.stringify(mapData));

    if (mapData && mapData.latitude) {
      mapView.current.updateMarkerLocation({
        lat: mapData.latitude,
        lng: mapData.longitude,
      });
    }
  };

  const locationButtons = () => {
    let btns = locations.map((item, index) => {
      marginLeft = index % 3 == 0 ? 0 : wp(10);

      if (index == locations.length - 1) {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={onAdd}
            style={[styles.addBtn, {marginLeft}]}>
            <Text style={styles.addBtnTxt}>{t("AddMore")}</Text>
            <Image
              source={require('../../../assets/plus.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        );
      } else {
        backgroundColor = activeLocation == index ? '#4a89f3' : '#ccc';
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              onLocationPress(index);
            }}
            activeOpacity={0.5}
            style={[styles.locationButton, {marginLeft, backgroundColor}]}>
            <Text style={styles.btnTxt}>{t("@Location")} #{index + 1}</Text>
          </TouchableOpacity>
        );
      }
    });

    return <View style={styles.buttonsView}>{btns}</View>;
  };

  const onAddressSelect = address => {
    ////console.log('test82 address: ', JSON.stringify(address));
    if (address) {
      onAddressStrChange(address.description);
      mapView.current.updateMarkerLocation(address.location);
    } else {
      onAddressStrChange('');
    }
  };

  const onNextPress = () => {
    let updatedOffer = JSON.parse(JSON.stringify(offer));

    updatedOffer.locations = [...locations];

    let locationsToSend = [];
    locations.forEach((item, index) => {
      if (index <= locations.length - 2) {
        //-2 last is empty obj
        let locationItem = {
          lat: item.latitude,
          lng: item.longitude,
        };

        locationsToSend.push(locationItem);
      }
    });

    updatedOffer.locations = locationsToSend;
    dispatch(setOffer(updatedOffer));
    navigation.navigate('StepSix');
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <View style={styles.body}>
        <Text style={styles.heading}>{t("Location")}</Text>
        <Text style={styles.title}>{t("Pleaseassigntheshowroom/office")}</Text>

        <View style={styles.mapView}>
          <LocationMarker
            ref={mapView}
            latlng={{lat: curr_location.lat, lng: curr_location.lng}}
            pointerSrc={require('../../../assets/google-maps.png')}
          />
          <View style={styles.autoInputContainer}>
            <ZRAddressAutoInput
              style={styles.textInput}
              onSelect={address => {
                onAddressSelect(address);
              }}
              onChangeText={address => {
                onAddressStrChange(address);
              }}
              placeholder={t("@Searchforaaddress")}
              value={addressStr}
            />
          </View>
        </View>

        <View style={styles.lowerBody}>
          {locationButtons()}

          <StepsBar currentStep={5} style={styles.bar} />

          <MediaButton
            txt={t("@NEXT")}
            style={{
              backgroundColor: 'rgb(228, 45, 72)',
              marginTop: hp(20),
              marginBottom: hp(20),
            }}
            simple
            onPress={onNextPress}
          />
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
  autoInputContainer: {
    position: 'absolute',
    top: hp(-50),
    width: '90%',
    alignSelf: 'center',
  },
  mapView: {
    marginTop: hp(60),
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: wp(15),
    fontFamily: 'Roboto-Regular',
    fontSize: i18n.language == 'en' ? fs(16) : fs(20),
    fontWeight: '500',
    color: '#fff',
    height: hp(40),
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
    marginTop: hp(20),
    height: hp(20),
  },
  input: {
    marginTop: hp(7),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
  },
  body: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  lowerBody: {
    width: '90%',
    alignSelf: 'center',
  },
  stepTxt: {
    color: Colors.WHITE,
    fontSize: fs(14),
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    marginLeft: '5%',
    marginTop: hp(12),
    color: Colors.WHITE,
    marginRight: hp(5),
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  title: {
    marginLeft: '5%',
    marginTop: hp(5),
    marginRight: hp(5),
    color: Colors.WHITE,
    fontSize: i18n.language == 'en' ? fs(16) : fs(20),
    fontFamily: 'Roboto-Regular',
  },
});
