import * as React from "react";

import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../libs/responsive";

import Colors from "../settings/colors";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/components/header";
import MediaButton from "../common/components/media-button";
import LocationMarker from "../libs/maps/location-marker";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import StepsBar from "../post/components/steps-bar";
import ZRAddressAutoInput from "../common/form/zr-address-auto-input";
import SelectiveButton from "../common/components/selective-button";
import { useSelector } from "react-redux";
import { t } from "i18next";
import i18n from "i18next";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 3600000, //1 hour = 3600000 ms
  distanceFilter: 1609, //1 mile  = 1609 meters
};
const DEVICE_WIDTH = Dimensions.get("window").width;
const SLIDER_WIDTH = (DEVICE_WIDTH * 50) / 100;
const GENDER_BTN_WIDTH = ((DEVICE_WIDTH * 90) / 100 - wp(30)) / 4;

export default function TargetZone(props) {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const navigation = useNavigation();
  const [radius, setRadius] = React.useState([0]);
  const [unit, setUnit] = React.useState("m");
  const [addressStr, onAddressStrChange] = React.useState("");
  const user = useSelector((state) => state.user);
  const curr_location = useSelector((state) => state.curr_location);
  const { offer } = props.route.params;

  console.log("target zone", curr_location);
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const crd = position.coords;
  //       console.log("loc", crd)
  //       setLocation({
  //         ...location ,
  //         latitude: crd.latitude,
  //         longitude: crd.longitude,
  //         latitudeDelta: 0.0421,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     error => {
  //       console.log("error",error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 20000},
  //   );
  // }, [location.latitude]);

  const onAddressSelect = (address) => {
    if (address) {
      onAddressStrChange(address.description);
      this.map.updateMarkerLocation(address.location);
    } else {
      onAddressStrChange("");
    }
  };

  console.log(radius);

  const onNext = () => {
    let processOffer = {
      userId: user.id,
      offerId: offer.id,
      targetLat: this.map.state.newCoordinate.latitude,
      targetLng: this.map.state.newCoordinate.longitude,
      targetRadius: radius[0],
      targetRadiusUnit: unit,
    };
    navigation.navigate("AgeGender", { processOffer });
  };

  const getRadiusInMeters = () => {
    let value = radius[0];

    if (unit != "m") {
      switch (unit) {
        case "km":
          value = value * 1000;
          break;
        case "yard":
          value = value / 1.094;
          break;
        case "mile":
          value = value * 1609;
          break;
        default:
          value = value;
          break;
      }
    }

    return parseFloat(value).toFixed(1);
  };

  const convertUnit = (to, value) => {
    if (to == "km") {
      value = value / 1000;
    } else if (to == "yard") {
      value = value * 1.094;
    } else if (to == "mile") {
      value = value / 1609;
    }

    console.log("test82 cv: ", value);

    setUnit(to);
    setRadius([parseFloat(value).toFixed(1)]);
  };

  const onChangeText = (txt) => {
    if (txt.trim() == "") {
      setRadius([0]);
    } else {
      setRadius([parseFloat(txt)]);
    }
  };

  const mesurements = () => {
    return (
      <View style={styles.checksRow}>
        <SelectiveButton
          style={{ width: GENDER_BTN_WIDTH, height: hp(30) }}
          title={t("@Meters")}
          selected={unit == "m"}
          onPress={() => {
            convertUnit("m", getRadiusInMeters());
          }}
        />
        <SelectiveButton
          title={t("@Kilometer")}
          style={{
            width: GENDER_BTN_WIDTH,
            marginLeft: wp(10),
            height: hp(30),
          }}
          selected={unit == "km"}
          onPress={() => {
            convertUnit("km", getRadiusInMeters());
          }}
        />
        <SelectiveButton
          title={t("@Yards")}
          style={{
            width: GENDER_BTN_WIDTH,
            marginLeft: wp(10),
            height: hp(30),
          }}
          selected={unit == "yard"}
          onPress={() => {
            convertUnit("yard", getRadiusInMeters());
          }}
        />
        <SelectiveButton
          title={t("@Miles")}
          style={{
            width: GENDER_BTN_WIDTH,
            marginLeft: wp(10),
            height: hp(30),
          }}
          selected={unit == "mile"}
          onPress={() => {
            convertUnit("mile", getRadiusInMeters());
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <View style={styles.body}>
        <StepsBar currentStep={1} style={styles.bar} />

        <Text style={styles.heading}>{t("@TargetZone")}</Text>
        <Text style={styles.title}>{t("@Pleaseselectthetargetzone")}</Text>

        <View style={styles.mapView}>
          <LocationMarker
            ref={(ref) => {
              this.map = ref;
            }}
            latlng={{ lat: curr_location?.lat, lng: curr_location?.lng }}
            // onRegionChange={location}
            // updateMarkerLocation={{lat: location?.latitude  , lng: location?.longitude }}
            pointerSrc={require("../../assets/google-maps.png")}
            radius={getRadiusInMeters()}
          />
          {/* <MapView style={{flex:1}} region={location}  initialRegion={location}
>

          <Marker style={{width:20,height:20}}  coordinate={{latitude:location?.latitude?0:43,longitude:location?.longitude?0:67}}>

          </Marker>
          {radius&&(<Circle
              center={location}
              radius={ parseInt( radius)}
              fillColor="rgba(74, 137, 243, 0.2)"
              strokeColor="rgba(74, 137, 243, 0.2)"
              zIndex={2}
              strokeWidth={2}
            />)}
          </MapView> */}

          <View style={styles.autoInputContainer}>
            <ZRAddressAutoInput
              style={styles.textInput}
              onSelect={(address) => {
                console.log(address);
                onAddressSelect(address);
              }}
              onChangeText={(address) => {
                onAddressStrChange(address);
              }}
              placeholder={t("@Searchforaaddress")}
              value={addressStr}
            />
          </View>
        </View>

        <View style={styles.lowerBody}>
          <Text style={styles.radiusHeading}>
            {t("@Pleaseselectthetargetzoneradius")}
          </Text>

          {mesurements()}
          <View style={styles.radiusView}>
            <View style={{ marginTop: hp(10) }}>
              <MultiSlider
                values={radius}
                sliderLength={SLIDER_WIDTH}
                onValuesChange={setRadius}
                min={0}
                max={600}
                selectedStyle={{
                  backgroundColor: "rgb(228, 45, 72)",
                }}
                unselectedStyle={{
                  backgroundColor: "silver",
                }}
                trackStyle={{
                  height: 4,
                }}
              />
            </View>

            <TextInput
              style={styles.input}
              onChangeText={(txt) => {
                onChangeText(txt);
              }}
              keyboardType="decimal-pad"
              value={radius[0].toString()}
              placeholder={t("@Radius")}
              placeholderTextColor={"#ccc"}
            />
          </View>

          <MediaButton
            txt={t("@NEXT")}
            style={styles.button}
            simple
            onPress={onNext}
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
  radiusHeading: {
    marginTop: hp(10),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: "Roboto-Regular",
  },
  detailsTxt: {
    marginLeft: wp(10),
    color: Colors.WHITE,
    fontSize: fs(17),
    marginRight: wp(20),
    fontFamily: "Roboto-Medium",
  },
  radiusView: {
    width: "100%",
    height: hp(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(0),
  },
  checkBox: {
    flexDirection: "row",
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
    alignItems: "center",
    marginTop: hp(17),
  },
  checksRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(10),
  },
  input: {
    width: wp(100),
    marginTop: hp(10),
    height: hp(35),
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 5,
    paddingLeft: wp(10),
    fontSize: fs(16),
    //marginLeft: '10%',
    fontFamily: "Roboto-Medium",
  },
  button: {
    backgroundColor: "rgb(228, 45, 72)",
    marginTop: hp(20),
    marginBottom: hp(30),
  },
  diameter: {
    marginLeft: wp(10),
    color: Colors.WHITE,
    fontSize: fs(13),
    fontFamily: "Roboto-Regular",
    alignSelf: "flex-end",
  },
  icon: {
    marginLeft: wp(10),
    width: hp(8),
    height: hp(8),
    resizeMode: "contain",
    tintColor: "rgb(228, 45, 72)",
  },
  btnTxt: {
    color: Colors.WHITE,
    fontFamily: "Roboto-Medium",
    fontSize: fs(14),
    textAlign: "center",
  },
  addBtnTxt: {
    color: "rgb(228, 45, 72)",
    fontFamily: "Roboto-Medium",
    fontSize: fs(13),
    textAlign: "center",
  },
  addBtn: {
    marginTop: hp(7),
    width: ((DEVICE_WIDTH * 90) / 100 - wp(20)) / 3,
    height: hp(26),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp(2),
    flexDirection: "row",
    alignItems: "center",
  },
  locationButton: {
    marginTop: hp(7),
    width: ((DEVICE_WIDTH * 90) / 100 - wp(20)) / 3,
    height: hp(26),
    backgroundColor: "#4a89f3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp(2),
  },
  buttonsView: {
    marginTop: hp(10),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  autoInputContainer: {
    position: "absolute",
    top: hp(-50),
    width: "90%",
    alignSelf: "center",
  },
  mapView: {
    marginTop: hp(60),
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: wp(15),
    fontFamily: "Roboto-Regular",
    // fontSize: i18n.language == 'en' ? fs(16) : fs(20),
    fontWeight: "500",
    color: "#fff",
    height: hp(40),
  },
  // mapView: {
  //   marginTop: hp(10),
  //   width: '100%',
  //   flex: 1,
  // },
  offerView: {
    marginTop: hp(20),
    height: hp(160),
  },
  image: {
    marginTop: hp(20),
    width: "100%",
    height: hp(250),
    resizeMode: "cover",
  },
  bar: {
    width: "100%",
    alignSelf: "center",
    marginTop: 0,
    height: hp(10),
  },
  body: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  lowerBody: {
    width: "90%",
    alignSelf: "center",
  },
  stepTxt: {
    color: Colors.WHITE,
    fontSize: fs(14),
    fontFamily: "Roboto-Regular",
  },
  heading: {
    marginLeft: "5%",
    marginTop: hp(10),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: "Roboto-Bold",
  },
  title: {
    marginLeft: "5%",
    marginTop: hp(2),
    color: Colors.WHITE,
    fontSize: fs(14),
    fontSize: i18n.language == "en" ? fs(16) : fs(20),
    fontFamily: "Roboto-Regular",
  },
});
