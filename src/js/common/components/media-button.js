import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';
import Colors from '../../settings/colors';

export default class MediaButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      style,
      icon,
      txt,
      onPress,
      simple,
      disabled,
      overlayImage,
    } = this.props;

    let strColor = style.borderColor != undefined ? Colors.BORDER : '#fff';
    let borderColor =
      style.borderColor != undefined ? Colors.WHITE : Colors.BORDER;

    let backgroundColor = disabled ? 'gray' : style.backgroundColor;

    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        disabled={disabled}
        style={[styles.socialMediaButton, style, {backgroundColor}]}>
        {!simple && (
          <View style={[styles.mediaIconContainer, {borderColor}]}>
            <Image
              source={icon}
              style={[styles.mediaIcon, {tintColor: strColor}]}
            />
          </View>
        )}
        <View style={styles.mediaBtnContainer}>
          <Text style={[styles.mediaBtnStr, {color: strColor}]}>{txt}</Text>
        </View>

        {overlayImage && (
          <View style={styles.overlayImageContainer}>
            <Image source={overlayImage} style={styles.overlayImage} />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  socialMediaButton: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    height: hp(38),
    marginTop: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(2),
  },
  overlayImageContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  overlayImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  mediaIconContainer: {
    width: wp(60),
    height: '100%',
    borderRightWidth: 1,
    borderColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaBtnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mediaBtnStr: {
    color: Colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: fs(17),
    textAlign: 'center',
  },
  mediaIcon: {
    width: hp(17),
    height: hp(17),
    resizeMode: 'contain',
  },
});
