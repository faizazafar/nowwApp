import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

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
import Header from '../common/components/header';

export default function ForgotPassword() {
  let inputRefs = [];
  const navigation = useNavigation();
  const [email, onEmailInput] = React.useState('');

  onEmailLogin = async () => {
    let validator = new Validator();
    let isValid = validator.validateInputs(inputRefs);

    if (isValid) {
    }
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent />
      <View style={styles.body}>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subHeading}>
          Enter email or mobile number to continue
        </Text>

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
        </View>

        <View style={styles.buttons}>
          <MediaButton
            txt={'CONTINUE'}
            style={{backgroundColor: 'rgb(228, 45, 72)'}}
            simple
            onPress={() => {
              onEmailLogin();
            }}
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
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  subHeading: {
    marginTop: hp(5),
    color: Colors.WHITE,
    fontSize: fs(16),
    fontFamily: 'Roboto-Regular',
  },
  forgotStr: {
    marginTop: hp(20),
    color: Colors.WHITE,
    fontSize: fs(16),
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  signupStr: {
    marginBottom: hp(20),
    color: Colors.WHITE,
    fontSize: fs(17),
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  textInput: {
    marginTop: hp(20),
    width: '100%',
    color: '#ccc',
    height: Platform.OS === 'ios' ? hp(42) : hp(44),
    fontSize: fs(18),
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    fontFamily: 'Roboto-Bold',
  },
});
