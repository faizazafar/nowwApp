import React, { Component } from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../../libs/responsive";

import ZRInput from "./zr-input";
import Colors from "../../settings/colors";
import Service from "../../libs/api/service";

export default class ZRAddressAutoInput extends ZRInput {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: "",
      data: [],
    };
  }

  async onChangeText(searchTxt) {
    if (searchTxt.trim() == "") {
      this.setState({ data: [] });
      this.props.onChangeText("");
      return;
    } else {
      this.props.onChangeText(searchTxt);

      let url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" +
        encodeURIComponent(searchTxt) +
        "&language=en" +
        "&key=AIzaSyBMwjjCkm9ak-fcJj_bTH5UIPmU4A5Q0EE";

      let service = new Service();
      let googleResponse = await service.callGetFromUrl(url);
      ////console.log('test82 response: ', JSON.stringify(response));

      if (googleResponse.status == "OK") {
        this.setState({ data: googleResponse.predictions });
      }
    }
  }

  async getDetails(item) {
    let url =
      "https://maps.googleapis.com/maps/api/place/details/json?&placeid=" +
      item.place_id +
      "&language=en" +
      "&key=AIzaSyBMwjjCkm9ak-fcJj_bTH5UIPmU4A5Q0EE";

    let service = new Service();
    let googleResponse = await service.callGetFromUrl(url);

    if (googleResponse.status == "OK") {
      let obj = {
        location: googleResponse.result.geometry.location,
        description: item.description,
      };

      this.props.onSelect(obj);
    }
  }

  async onItemPress(item) {
    console.log(item);
    this.setState({ data: [] });
    this.getDetails(item);
  }

  onCrossPress() {
    this.props.onSelect(null); //reset screen
    this.props.onChangeText("");
    this.setState({ data: [] });
  }

  _item({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item);
          this.onItemPress(item);
        }}
        style={styles.item}
      >
        <Text style={styles.itemStr}>{item.description}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    let { isAlert, alertMsg, data } = this.state;
    let borderColor = isAlert ? "#e60000" : this.props.style.borderColor;

    return (
      <View
        style={{
          width: "100%",
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "#fff",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../assets/search.png")}
            style={styles.searchIcon}
          />
          <TextInput
            ref={(ref) => {
              this.textInput = ref;
            }}
            onChange={() => {
              this.onValueChange();
              this.props.onSelect(null); //reset screen
            }}
            onFocus={() => {
              this.onChangeText(this.props.value);
            }}
            placeholderTextColor={"#ccc"}
            autoCorrect={false}
            {...this.props}
            onChangeText={(txt) => {
              this.onChangeText(txt);
            }}
            onSubmitEditing={() => {
              this.setState({ data: [] });
            }}
            returnKeyType="done"
            style={[
              this.props.style,
              { width: "100%", borderColor, paddingRight: wp(40) },
            ]}
          />
          {this.props.value.trim() != "" && (
            <TouchableOpacity
              onPress={() => {
                this.onCrossPress();
              }}
              style={styles.crossIconContainer}
            >
              <Image
                source={require("../../../assets/close.png")}
                style={styles.crossIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        {isAlert && <Text style={styles.alertStr}>{alertMsg}</Text>}
        <View style={{}}>
          <FlatList
            contentContainerStyle={{ paddingBottom: hp(0) }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={this._item.bind(this)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alertStr: {
    color: "#e60000",
    fontFamily: "Roboto-Regular",
    fontSize: fs(12),
    marginLeft: wp(10),
    marginBottom: hp(6),
  },
  itemStr: {
    alignSelf: "flex-start",
    fontFamily: "Roboto-Regular",
    fontSize: fs(15),
    color: Colors.WHITE,
  },
  item: {
    paddingTop: hp(10),
    paddingBottom: hp(10),
    paddingLeft: wp(15),
    paddingRight: wp(15),
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.THEME,
    overflow: "hidden",
    elevation: 0.2,
    zIndex: 1,
  },
  crossIconContainer: {
    height: hp(40),
    width: hp(40),
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(10),
  },
  crossIcon: {
    height: hp(14),
    width: hp(14),
    marginTop: hp(2),
    resizeMode: "contain",
  },
  searchIcon: {
    height: hp(14),
    width: hp(14),
    marginTop: hp(2),
    resizeMode: "contain",
    marginLeft: wp(20),
  },
});
