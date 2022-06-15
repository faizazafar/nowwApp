import * as React from 'react';

import {StyleSheet, View} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import Colors from '../../settings/colors';

export default function StepsBar(props) {
  const _renderSteps = () => {
    let array = [{}, {}, {}, {}, {}, {}, {}, {}];

    return array.map((item, index) => {
      let style =
        index + 1 <= props.currentStep
          ? styles.innerActiveBox
          : styles.innerBox;
      return (
        <View key={index} style={styles.box}>
          <View style={style}></View>
        </View>
      );
    });
  };

  return <View style={[styles.container, props.style]}>{_renderSteps()}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(20),
  },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    padding: 2,
  },
  innerBox: {
    flex: 1,
  },
  innerActiveBox: {
    flex: 1,
    backgroundColor: 'rgb(237, 67, 89)',
  },
});
