import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Alert,
  Text,
} from "react-native";
import i18n from "i18next";

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../libs/responsive";

import Header from "../common/components/header";
import Colors from "../settings/colors";
import OfferHeader from "../offer/offer-header";
import OfferItem from "../offer/offer-item";
import { useNavigation } from "@react-navigation/native";
import Service from "../libs/api/service";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser, setCurrentLocation } from "../../redux/actions";
import { getUniqueId } from "react-native-device-info";
import Gps from "../libs/gps";
import dateformat from "../libs/dateformat";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [offers, setOffers] = useState([]);
  const [location, setLocation] = useState({});
  const user = useSelector((state) => state.user);

  // console.log(user);
  const loadData = async (lat, lng) => {
    let loc = { lat: lat, lng: lng };
    dispatch(setLoading(true));
    let s = new Service();
    console.log("curr_location:::::::", loc);
    let response = await s.getHomeOffers(loc);
    console.log("OFFERS ACCORDING TO LOCATION", response);
    dispatch(setLoading(false));
    ////console.log('test82 getHomeOffers: ', JSON.stringify(response));

    if (response?.status == true) {
      let offers = [];
      Object.keys(response.data.offers).forEach((key) => {
        response.data.offers[key].date = key;
        offers.push(response.data.offers[key]);
      });

      setOffers(offers);
    } else {
      Alert.alert(response.message);
    }
  };

  useEffect(() => {
    // const curr_location = useSelector((state) => state.curr_location);

    async function fetchData() {
      await getLocation();

      // await userlocation();
    }
    fetchData();
  }, []);

  const getLocation = async () => {
    try {
      let gps = new Gps();
      gps.getCoordinates(async (isError, value) => {
        console.log("GETLOCATION", value, isError);
        if (!isError === true) {
          dispatch(setCurrentLocation(value));

          await updateLocationToServer(value.lat, value.lng);
        } else {
          Alert.alert("Error in getting GPS location, " + value);
        }
      });
    } catch (e) {}
  };

  // const onPress = ()=>{

  // }
  // const userlocation = async () => {
  //   const curr_location = useSelector((state) => state.curr_location);
  //   if (curr_location?.lat) {
  //     setLocation(curr_location);
  //     console.log("asdasdasdajkljklljl");
  //     await checkUser();
  //   } else {
  //     console.log("user location");
  //   }
  // };
  const updateLocationToServer = async (latitude, longitude) => {
    dispatch(setLoading(true));
    let deviceId = getUniqueId().replace(/-/g, "");

    let payload = {
      userId: user.id,
      lat: latitude,
      lng: longitude,
      timestamp: dateformat(new Date(), "yyyy-mm-dd HH:MM:ss"),
      deviceId: deviceId,
    };

    let s = new Service();
    let response = await s.updateUserLocation(payload);
    // console.log(
    //   'test82 updateUserLocation:',
    //   JSON.stringify(response),
    //   JSON.stringify(payload),
    // );

    dispatch(setLoading(false));
    console.log(response);
    if (response.status == true) {
      console.log("in updateLocationToServer");
      await loadData(latitude, longitude);
      await checkUser();
    } else {
      // Alert.alert("updateLocationToServer", response.message);
    }
  };

  const checkUser = async () => {
    if (user) {
      dispatch(setLoading(true));
      let deviceId = getUniqueId().replace(/-/g, "");

      let time = dateformat(new Date(), "yyyy-mm-dd HH:MM:ss");
      time = time.replace(/-/g, "");
      let email = deviceId + time + "@nowuser.com";
      email = email.replace(" ", "");
      let Newemail = email.replace(/:/g, "");
      // let email = deviceId + time;

      let payload = {
        firstname: deviceId,
        lastname: deviceId,
        email: Newemail,
        password: "12345678",
      };
      console.log("e", Newemail);
      let s = new Service();
      let response = await s.signup(payload);
      //console.log('test82 signup:', JSON.stringify(response));
      dispatch(setLoading(false));

      if (response.status) {
        // Alert.alert(response.message);

        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        dispatch(setUser(response.data));
        // await loadData();
      } else {
        Alert.alert(response.message);
      }
    } else {
      console.log("else in check user");
    }
  };

  const onAddOffer = () => {
    ////console.log('test82 user: ', JSON.stringify(user));
    if (user.email.includes("@now")) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("StepOne");
    }
  };

  const renderOffers = () => {
    return offers.map((item) => {
      // console.log("RENDER OFFER", item);
      return (
        <View>
          {item.interest && (
            <View>
              <OfferHeader interest date={item.date} />
              <OfferItem offer={item.interest} />
            </View>
          )}
          {item.without_interest && (
            <View>
              <OfferHeader date={item.date} />
              <OfferItem offer={item.without_interest} />
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Header menu search logo />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(100) }}
      >
        <View style={styles.body}>{renderOffers()}</View>
      </ScrollView>

      <TouchableOpacity onPress={onAddOffer} style={styles.postBtn}>
        <Image style={styles.icon} source={require("../../assets/post.png")} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=> i18n.changeLanguage('ar')} style={styles.postBtn}>
       <Text>hello</Text>
     </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  postBtn: {
    position: "absolute",
    bottom: hp(40),
    right: wp(30),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    elevation: 10,
  },
  icon: {
    width: hp(60),
    height: hp(60),
    resizeMode: "contain",
  },
});
