import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  I18nManager,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ModalDropdown from "react-native-modal-dropdown";
import { EventRegister } from "react-native-event-listeners";
import { setLanguage } from "../../../redux/actions";
import Colors from "../../settings/colors";
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../../libs/responsive";
import { CommonActions, useNavigation } from "@react-navigation/native";

import RNRestart from "react-native-restart"; // Import package from node modules
import i18n from "../../../i18/i18n.config";

export function forceRTL(isRTL = false) {
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
}

export default function Header(props) {
  const { t } = useTranslation();
  const language = useSelector((state) => state.language); // Access language from Redux state
  const dispatch = useDispatch();
  console.log(language, "language");
  console.log(i18n.language, "i18n.language");

  const navigation = useNavigation();
  const dropDownref = useRef(null);

  const handleLanguageChange = (index, option) => {
    const newLanguage = index === 0 ? "en" : "ar";
    EventRegister.emit("changeLanguageGlobal", newLanguage);
  };

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "changeLanguageGlobal",
      (language) => {
        i18n
          .changeLanguage(language)
          .then(() => {
            console.log("Language changed", language);

            // Update RTL settings
            forceRTL(language === "ar");

            // Update Redux state
            dispatch(
              setLanguage(language, () => {
                RNRestart.Restart();
              })
            );
          })
          .catch(() => {
            console.log("Error changing language");
          });
      }
    );

    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [dispatch]);

  function _renderLeft() {
    let { back, menu } = props;
    if (back) {
      return (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            source={require("../../../assets/back-vector.png")}
          />
        </TouchableOpacity>
      );
    }
    if (menu) {
      return (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            style={styles.menuIcon}
            source={require("../../../assets/menu.png")}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.iconContainer} />;
  }

  function _renderRight() {
    let { search, audience, noRefresh } = props;

    if (search) {
      return (
        <View style={styles.cartContainer}>
          <ModalDropdown
            onPress={() => console.log("Dropdown opened")}
            ref={dropDownref}
            dropdownTextStyle={styles.dropdownTextStyle}
            defaultValue={t("Select Language")}
            textStyle={styles.boxText}
            onSelect={handleLanguageChange}
            options={[t("EN"), t("AR")]}
          />
        </View>
      );
    } else if (audience) {
      return (
        <View style={styles.audienceContainer}>
          {/* <Image
            style={[styles.serachIcon, { tintColor: "#fff" }]}
            source={require("../../../assets/user.png")}
          />
          <Text style={styles.count}>{props.audienceData.all}</Text> */}
        </View>
      );
    } else if (noRefresh) {
      return <View style={{ flex: 1 }} />;
    } else {
      return (
        <View style={styles.iconContainer2}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              );
              navigation.navigate("Home");
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/refresh.png")}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

  function _renderMiddle() {
    let { title, logo } = props;
    if (title) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    } else if (logo) {
      return (
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/now.png")}
          />
        </View>
      );
    }
    return <View style={styles.iconContainer} />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: props.border ? 1 : 0,
          backgroundColor: props.transparent ? "transparent" : Colors.THEME,
        },
      ]}
    >
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        {_renderLeft()}
        {_renderMiddle()}
        {_renderRight()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
  },
  logo: {
    width: wp(100),
    height: hp(30),
    resizeMode: "contain",
  },
  audienceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(50),
  },
  cartContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(20),
    paddingTop: hp(5),
    paddingBottom: hp(5),
    paddingLeft: wp(13),
    paddingRight: wp(13),
    borderRadius: hp(20),
    backgroundColor: Colors.THEME_BLUE,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: fs(17),
    fontWeight: "600",
  },
  count: {
    marginLeft: wp(10),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: "Roboto-Medium",
  },
  statusBar: {
    width: "100%",
    height: Platform.OS === "ios" ? hp(20) : hp(2),
  },
  navBar: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? hp(55) : hp(46),
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: hp(10),
  },
  icon: {
    width: hp(16),
    height: hp(16),
    resizeMode: "contain",
    tintColor: "#fff",
  },
  serachIcon: {
    width: hp(12),
    height: hp(12),
    resizeMode: "contain",
    tintColor: "#a6a6a6",
  },
  menuIcon: {
    width: Platform.OS === "ios" ? hp(16) : hp(20),
    height: Platform.OS === "ios" ? hp(16) : hp(20),
    resizeMode: "contain",
    tintColor: "#fff",
  },
  iconContainer: {
    marginLeft: wp(7),
    width: hp(50),
    height: hp(50),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconContainer2: {
    marginLeft: wp(30),
    width: hp(90),
    height: hp(90),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boxText: {
    color: "#fff",
    fontSize: fs(16),
  },
  dropdownTextStyle: {
    color: Colors.THEME,
    fontSize: fs(16),
    fontFamily: "Roboto-Regular",
    paddingLeft: wp(40),
    paddingRight: wp(40),
  },
});
