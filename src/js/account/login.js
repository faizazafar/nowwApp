import React, {useState, useEffect} from 'react';
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

export default function Login() {
  let inputRefs = [];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, onEmailInput] = React.useState('');
  const [password, onPasswordInput] = React.useState('');

  useEffect(() => {
    let gmailLogin = new GmailLogin();
    gmailLogin.configure();
  });

  onEmailLogin = async () => {
    let validator = new Validator();
    let isValid = validator.validateInputs(inputRefs);

    if (isValid) {
      dispatch(setLoading(true));
      let payload = {email, password};
      let s = new Service();
      let response = await s.login(payload);
      dispatch(setLoading(false));
      ////console.log('test82 onEmailLogin: ', JSON.stringify(response));
      if (response.status) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        dispatch(setUser(response.data));
        navigation.navigate('SideMenu');
      } else {
        Alert.alert(response.message);
      }
    }
  };

  onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  gotoSignup = () => {
    navigation.navigate('SignUp');
  };

  socialLogin = async data => {
    var payload = new FormData();
    Object.keys(data).forEach(key => {
      payload.append(key, data[key]);
    });

    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.loginSocial(payload);
    dispatch(setLoading(false));
    //console.log('test82 onEmailLogin: ', JSON.stringify(response));
    if (response.status) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      dispatch(setUser(response.data));
      navigation.navigate('SideMenu');
    } else {
      Alert.alert(response.message);
    }
  };

  onFacebookLogin = () => {
    let facebookLogin = new FacebookLogin();
    facebookLogin.signIn(payload => {
      socialLogin(payload);
    });
  };

  onGoogleLogin = () => {
    let gmailLogin = new GmailLogin();
    gmailLogin.signIn(payload => {
      socialLogin(payload);
    });
  };

  return (
    <View style={styles.container}>
      <Header logo back />
      <View style={styles.body}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>Sign in to continue</Text>

        <View style={styles.inputs}>
          <ZRTextInput
            ref={ref => {
              inputRefs[0] = ref;
            }}
            style={styles.textInput}
            onChangeText={onEmailInput}
            placeholder={'Email or Mobile Number'}
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
          <ZRPasswordInput
            ref={ref => {
              inputRefs[1] = ref;
            }}
            style={styles.textInput}
            onChangeText={onPasswordInput}
            placeholder={'Password'}
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
            txt={'SIGN IN'}
            style={{backgroundColor: 'rgb(228, 45, 72)'}}
            simple
            onPress={() => {
              onEmailLogin();
            }}
          />

          <MediaButton
            txt={'Connect With Facebook'}
            style={{backgroundColor: '#3b5998'}}
            onPress={onFacebookLogin}
            icon={require('../../assets/facebook.png')}
          />

          <MediaButton
            txt={'Connect With Gmail'}
            style={{backgroundColor: 'rgb(219, 76, 63)'}}
            onPress={onGoogleLogin}
            icon={require('../../assets/g-plus.png')}
          />
        </View>

        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={styles.forgotStr}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={gotoSignup}>
        <Text style={styles.signupStr}>Don't have an account? SIGN UP</Text>
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
    marginTop: hp(30),
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
    paddingTop: hp(10),
    paddingBottom: hp(10),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
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
