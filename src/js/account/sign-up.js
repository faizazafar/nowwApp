import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
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
import MediaButton from '../common/components/media-button';
import ZRTextInput from '../common/form/zr-text-input';
import ZRPasswordInput from '../common/form/zr-password-input';
import Validator from '../libs/api/validator';
import Service from '../libs/api/service';
import {useDispatch} from 'react-redux';
import {setLoading, setUser} from '../../redux/actions';
import FacebookLogin from './social-media/facebook-login';
import GmailLogin from './social-media/gmail-login';
import Header from '../common/components/header';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  let inputRefs = [];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [firstname, onfFirstNameInput] = React.useState('');
  const [lastname, onLastNameInput] = React.useState('');
  const [email, onEmailInput] = React.useState('');
  const [mobile, onMobileInput] = React.useState('');
  const [password, onPasswordInput] = React.useState('');

  const onRegister = async () => {
    let validator = new Validator();
    let isValid = validator.validateInputs(inputRefs);

    if (isValid) {
      dispatch(setLoading(true));
      let payload = {firstname, lastname, email, mobile, password};
      let s = new Service();
      let response = await s.signup(payload);
      dispatch(setLoading(false));
      //console.log('test82 onRegister: ', JSON.stringify(response));

      if (response.status) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        dispatch(setUser(response.data));
        navigation.navigate('SideMenu');
      } else {
        Alert.alert(response.message);
      }
    }
  };

  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header logo back />
      <View style={styles.body}>
        <Text style={styles.heading}>{t('Welcome')}</Text>
        <Text style={styles.subHeading}>{t('Create an account')}</Text>

        <View style={styles.inputs}>
          <ZRTextInput
            ref={ref => {
              inputRefs[0] = ref;
            }}
            style={styles.textInput}
            onChangeText={onfFirstNameInput}
            placeholder={t('First Name')}
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
            placeholder={t('Email')}
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
            placeholder={t('Mobile Number')}
            placeholderTextColor={'#ccc'}
            value={mobile}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputNumber,
              },
            ]}
          />
          <ZRPasswordInput
            ref={ref => {
              inputRefs[4] = ref;
            }}
            style={styles.textInput}
            onChangeText={onPasswordInput}
            placeholder={t('Password')}
            placeholderTextColor={'#ccc'}
            value={password}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: Validator.MESSAGES.inputPassword,
              },
            ]}
          />
        </View>

        <View style={styles.buttons}>
          <MediaButton
            txt={t('SIGN UP')}
            style={{backgroundColor: 'rgb(228, 45, 72)'}}
            simple
            onPress={() => {
              onRegister();
            }}
          />

          <MediaButton
            txt={t('Connect With Facebook')}
            style={{backgroundColor: '#3b5998'}}
            onPress={FacebookLogin}
            icon={require('../../assets/facebook.png')}
          />

          <MediaButton
            txt={t('Connect With Gmail')}
            style={{backgroundColor: 'rgb(219, 76, 63)'}}
            onPress={GmailLogin}
            icon={require('../../assets/g-plus.png')}
          />
        </View>
      </View>

      <TouchableOpacity onPress={gotoLogin}>
        <Text style={styles.signupStr}>{t("Already have an account? SIGN IN")}</Text>
      </TouchableOpacity>
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
    marginTop: hp(10),
    color: Colors.WHITE,
    fontSize: fs(38),
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
