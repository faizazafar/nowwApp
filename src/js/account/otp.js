import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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

export default function Otp() {
  let inputRefs = [];
  const navigation = useNavigation();
  const [otp, onOtpInput] = React.useState('');

  onContinue = () => {};

  onResend = () => {};

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <View style={styles.body}>
        <Text style={styles.heading}>Code Verification</Text>
        <Text style={styles.subHeading}>
          Please type the verfication code send to the mobile number +1 212 212
          2222
        </Text>

        <View style={styles.otpInputBlock}>
          <View style={styles.backOtpBlock}>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(0)}</Text>
            </View>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(1)}</Text>
            </View>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(2)}</Text>
            </View>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(3)}</Text>
            </View>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(4)}</Text>
            </View>
            <View style={styles.optInputUnit}>
              <Text style={styles.code}>{otp.charAt(5)}</Text>
            </View>
          </View>

          <ZRTextInput
            ref={ref => {
              inputRefs[0] = ref;
            }}
            autoFocus={true}
            opacity={0}
            maxLength={6}
            keyboardType="number-pad"
            style={styles.textInput}
            onChangeText={onOtpInput}
            caretHidden={true}
            value={otp}
            validation={[
              {
                type: Validator.VALIDATION_TYPES.EMPTY,
                msg: '',
              },
            ]}
          />
        </View>

        <Text style={styles.recStr}>Didn't receive the OTP?</Text>

        <TouchableOpacity onPress={() => {}} style={styles.forgotBlock}>
          <Text style={styles.forgetStr}>Resend Code</Text>
        </TouchableOpacity>

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
    width: '90%',
    alignSelf: 'center',
  },
  code: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(26),
    textAlign: 'center',
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
    width: '90%',
    marginTop: hp(5),
    color: Colors.WHITE,
    fontSize: fs(16),
    fontFamily: 'Roboto-Regular',
  },
  textInput: {
    width: '100%',
    color: Colors.WHITE,
    height: '100%',
  },
  otpInputBlock: {
    width: '90%',
    alignSelf: 'center',
    marginTop: hp(40),
    height: hp(50),
  },
  backOtpBlock: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optInputUnit: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.RED,
    borderRadius: 4,
  },
  forgetStr: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(17),
    textAlign: 'center',
    marginTop: hp(10),
  },
  recStr: {
    marginTop: hp(30),
    color: '#8E99AF',
    fontFamily: 'Roboto-Regular',
    fontSize: fs(17),
    textAlign: 'center',
  },
});
