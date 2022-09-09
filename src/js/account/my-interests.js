import React, {useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  AsyncStorage,
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
import ZRCheckBox from '../common/form/zr-checkbox';
import Service from '../libs/api/service';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, setUser} from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { ScrollView } from 'react-native-gesture-handler';
const DEVICE_WIDTH = Dimensions.get('window').width;
const BOX_SIZE = (DEVICE_WIDTH * 90) / 100 / 4 - 6;

export default function MyInterests(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [allCheck, onCheck] = React.useState(false);
  const [selectedItems, onSelect] = React.useState([]);
  const [data, onDataChange] = React.useState([]);
  const user = useSelector(state => state.user);

  console.log(i18n.language)

  useEffect(() => {
    loadData();

    if (user?.interests) {
      let allIds = [];
      user?.interests.forEach(item => {
        allIds.push(item.id);
      });
      onSelect(allIds);
    }
  }, []);

  const onSave = async () => {
    dispatch(setLoading(true));

    let payload = new FormData();
    payload.append('id', user.id);
    payload.append('userInterests', {
      string: JSON.stringify(selectedItems),
      type: 'application/json',
    });

    let s = new Service();
    let response = await s.updateUser(payload);
    ////console.log('test82 response: ', JSON.stringify(response));
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    dispatch(setUser(response.data));
    dispatch(setLoading(false));
    Alert.alert(response.message);
  };

  const loadData = async () => {
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getInterests();
    dispatch(setLoading(false));
    if (response.status) {
      onDataChange(response.data);
    } else {
      Alert.alert(response.message);
    }
  };

  function onPress(id) {
    let updatedItems = JSON.parse(JSON.stringify(selectedItems));
    if (updatedItems.includes(id)) {
      updatedItems.splice(updatedItems.indexOf(id), 1);
    } else {
      updatedItems.push(id);
    }
    onSelect(updatedItems);
  }

  function onSelectAll() {
    onCheck(!allCheck);
    if (allCheck) {
      onSelect([]);
    } else {
      let allIds = [];
      data.forEach(item => {
        allIds.push(item.id);
      });

      onSelect(allIds);
    }
  }

  const pictures = () => {
    let renderedImages = data.map((item, index) => {
      let isActive = selectedItems.includes(item.id);
      let tintColor = isActive ? Colors.RED : Colors.WHITE;

      return (
        // <></>
        <TouchableOpacity
          activeOpacity={0.4}
          key={index}
          onPress={() => {
            onPress(item.id);
          }}
          style={styles.box}>
          <Image
            source={{uri: item.image}}
            style={[styles.image, {tintColor}]}
          />
          {
            i18n.language == 'en' ?
            <Text style={styles.name}>{item.name} </Text>
            :
            <Text style={styles.name}>{item.arabicName} </Text>

          }
        </TouchableOpacity>
      );
    });

    return <View style={styles.imagesContainer}>{renderedImages}</View>;
  };

  return (
    <View style={styles.container}>
      <Header menu logo border transparent />
<ScrollView contentContainerStyle={{paddingBottom:20}}>
      <View style={styles.body}>
        <Text style={styles.heading}>{t("My Interests")}</Text>
        <Text style={styles.title}>
          {t("Please select the interest groups to target")}
        </Text>

        {pictures()}
        <ZRCheckBox
          active={allCheck}
          style={styles.checkBox}
          txt={t("SELECT ALL")}
          textStyle={styles.detailsTxt}
          iconSrc={require('../../assets/blank-check-box.png')}
          iconStyle={styles.tickIcon}
          onPress={onSelectAll}
        />

        <MediaButton
          txt={t('Save')}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(50)}}
          simple
          onPress={onSave}
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
  serachIcon: {
    width: hp(12),
    height: hp(12),
    resizeMode: 'contain',
    tintColor: '#a6a6a6',
  },
  count: {
    marginLeft: wp(10),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Medium',
  },
  name: {
    color: Colors.WHITE,
    fontSize: fs(12),
    fontFamily: 'Roboto-Regular',
    marginBottom: hp(5),
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  checkBox: {
    flexDirection: 'row',
    flexDirection: 'row-reverse',
    alignSelf:  i18n.language == 'en' ? 'flex-start' : 'flex-end' ,
    alignItems: 'center',
    marginTop: hp(10),
    marginRight: wp(5),
  },
  detailsTxt: {
    marginLeft: wp(15),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Medium',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: hp(0),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff999c',
    borderWidth: 1,
    margin: 2,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: hp(20),
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
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
  },
});
