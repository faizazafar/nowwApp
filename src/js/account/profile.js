import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, AsyncStorage} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../libs/responsive';

import Colors from '../settings/colors';
import {useNavigation} from '@react-navigation/native';
import MediaButton from '../common/components/media-button';
import ZRTextInput from '../common/form/zr-text-input';
import Validator from '../libs/api/validator';
import Service from '../libs/api/service';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, setUser} from '../../redux/actions';
import Header from '../common/components/header';
import { useTranslation } from 'react-i18next';
export default function Profile() {
  const {t} = useTranslation();
  let inputRefs = [];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [firstname, onfFirstNameInput] = React.useState('');
  const [lastname, onLastNameInput] = React.useState('');
  const [email, onEmailInput] = React.useState('');
  const [mobile, onMobileInput] = React.useState('');

  useEffect(() => {
    if (user) {
      onfFirstNameInput(user.firstname);
      onLastNameInput(user.lastname);
      onEmailInput(user.email);
      onMobileInput(user.mobile);
    }
  });

  onSave = async () => {
    let validator = new Validator();
    let isValid = validator.validateInputs(inputRefs);

    if (isValid) {
      dispatch(setLoading(true));
      let payload = new FormData();
      payload.append('id', user.id);
      payload.append('firstname', firstname);
      payload.append('lastname', lastname);
      payload.append('email', email);
      payload.append('mobile', mobile);

      let s = new Service();
      let response = await s.updateUser(payload);
      dispatch(setLoading(false));
      ////console.log('test82 updateUser: ', JSON.stringify(response));

      if (response.status) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        dispatch(setUser(response.data));
        navigation.goBack();
      } else {
        Alert.alert(response.message);
      }
    }
  };

  gotoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header menu border logo />
      <View style={styles.body}>
        <Text style={styles.heading}>{t("Profile")}</Text>

        <View style={styles.inputs}>
          <ZRTextInput
            ref={ref => {
              inputRefs[0] = ref;
            }}
            style={styles.textInput}
            onChangeText={onfFirstNameInput}
            placeholder={t("First Name")}
            placeholderTextColor={'#ccc'}
            value={firstname}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputFirstName,
              },
            ]}
          />

          <ZRTextInput
            ref={ref => {
              inputRefs[1] = ref;
            }}
            style={styles.textInput}
            onChangeText={onLastNameInput}
            placeholder={t("Last Name")}
            placeholderTextColor={'#ccc'}
            value={lastname}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputLastName,
              },
            ]}
          />
          <ZRTextInput
            ref={ref => {
              inputRefs[2] = ref;
            }}
            style={styles.textInput}
            onChangeText={onEmailInput}
            placeholder={t("@Email")}
            placeholderTextColor={'#ccc'}
            value={email}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputEmail,
              },
              {
                type: Validator.VALIDATION_TYPES.EMAIL,
                msg: Validator.MESSAGES.validEmail,
              },
            ]}
          />
          <ZRTextInput
            ref={ref => {
              inputRefs[3] = ref;
            }}
            style={styles.textInput}
            onChangeText={onMobileInput}
            placeholder={t("@MobileNumber")}
            placeholderTextColor={'#ccc'}
            value={mobile}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputNumber,
              },
            ]}
          />
        </View>

        <MediaButton
          txt={t("@Save")}
          style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(50)}}
          simple
          onPress={onSave}
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
  body: {
    flex: 1,
    width: '86%',
    alignSelf: 'center',
  },
  inputs: {
    marginTop: hp(10),
  },
  buttons: {
    marginTop: hp(28),
  },
  heading: {
    marginTop: hp(20),
    color: Colors.WHITE,
    fontSize: fs(34),
    fontFamily: 'Roboto-Medium',
  },
  subHeading: {
    marginTop: hp(5),
    color: Colors.WHITE,
    fontSize: fs(18),
    fontFamily: 'Roboto-Regular',
  },
  forgotStr: {
    marginTop: hp(20),
    color: Colors.WHITE,
    fontSize: fs(14),
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  signupStr: {
    paddingTop: hp(10),
    paddingBottom: hp(20),
    color: Colors.WHITE,
    fontSize: fs(17),
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  textInput: {
    marginTop: hp(10),
    width: '100%',
    color: '#ccc',
    height: Platform.OS === 'ios' ? hp(42) : hp(44),
    fontSize: fs(18),
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    fontFamily: 'Roboto-Medium',
  },
});
