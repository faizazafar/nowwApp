import React from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../../libs/responsive";
import Colors from "../../settings/colors";
import i18n from "i18next";

export default function PaymentRow(props) {
  let { heading, value, hideBorder, onPress } = props;

  let borderBottomWidth = hideBorder ? 0 : 0.5;
  let leftFlex = props.leftFlex ? props.leftFlex : 1;
  let keyStyle = props.light ? styles.keyLight : styles.highlightedRowKey;

  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.highlightedRow, { borderBottomWidth }]}
    >
      {i18n.language == "en" ? (
        <>
          <View style={{ flex: leftFlex }}>
            <Text style={keyStyle}>{heading}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightedRowValue}>{value}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text style={styles.highlightedRowValue}>{value}</Text>
          </View>

          <View style={{ flex: leftFlex }}>
            <Text style={keyStyle}>{heading}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  highlightedRowKey: {
    color: Colors.WHITE,
    fontFamily: "Roboto-Bold",
    fontSize: fs(16),
  },
  keyLight: {
    color: Colors.WHITE,
    fontFamily: "Roboto-Regular",
    fontSize: fs(15),
  },
  highlightedRowValue: {
    textAlign: "right",
    color: Colors.WHITE,
    fontFamily: "Roboto-Regular",
    fontSize: fs(15),
  },
  highlightedRow: {
    flexDirection: "row",
    paddingTop: hp(12),
    paddingBottom: hp(12),
    borderBottomWidth: 0.5,
    borderColor: Colors.WHITE,
  },
});
