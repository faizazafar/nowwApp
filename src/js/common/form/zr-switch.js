import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';
import Colors from '../../settings/colors';
import i18n from 'i18next';

export default function ZRSwitch(props) {
  let {style, textStyle, txt, active, onPress} = props;
  let innerStyle = active ? styles.innerActiveBox : styles.innerBox;

  return (
  <>
  
  {
    i18n.language == 'en'?
    <>
     <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={style}>
      <Text style={textStyle}>{txt}</Text>
       <View style={styles.box}>
        <View style={innerStyle}></View>
       </View>
     </TouchableOpacity>
    </>
    :
    <>
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={{flexDirection:"row-reverse" 
   }}  >
    <View style={styles.box}>
       <View style={innerStyle}></View>
      </View>
     <Text style={textStyle}>{txt}</Text>
     
    </TouchableOpacity>
   </>

  }
  
  </>
    // <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={style}>
    //   <Text style={textStyle}>{txt}</Text>
    //   <View style={styles.box}>
    //     <View style={innerStyle}></View>
    //   </View>
    // </TouchableOpacity>


  );
}

const styles = StyleSheet.create({
  box: {
    width: hp(17),
    height: hp(17),
    borderWidth: 1,
    borderColor: Colors.WHITE,
    padding: 2,
    marginTop: hp(2),
    marginLeft: i18n.language == 'en' ? hp(0) : hp(12),
    marginBottom: 5
  },
  innerBox: {
    flex: 1,
  },
  innerActiveBox: {
    flex: 1,
    backgroundColor: 'rgb(237, 67, 89)',
  },
});
