import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';
import Button from 'apsl-react-native-button';
import Colors from '../../settings/colors';

export default class SelectiveButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, selected, onPress, style} = this.props;

    let borderColor = selected ? Colors.RED : Colors.WHITE;
    let btnTextColor = selected ? Colors.WHITE : Colors.RED;

    return (
      <Button
        activeOpacity={0.5}
        style={[
          styles.statusButtonStyle,
          style,
          {
            backgroundColor: borderColor,
          },
        ]}
        textStyle={[styles.statusTextStyle, {color: btnTextColor}]}
        onPress={onPress}>
        {title}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  statusButtonStyle: {
    borderWidth: 0,
    borderRadius: 4,
    height: hp(40),
  },
  statusTextStyle: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontSize: fs(14),
  },
});
