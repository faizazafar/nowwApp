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
  const user = useSelector((state) => state.user);
  const curr_location = useSelector((state) => state.curr_location);
  console.log("curr_location:::::::", curr_location);


  const loadData = async () => {
    console.log("curr_location:::::::", curr_location);
    dispatch(setLoading(true));
    let s = new Service();
    let response = await s.getHomeOffers(curr_location);
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

  useEffect( async () => {
    {
        await checkUser();
        await loadData();
      // async () => {
      //   await getLocation();
      //   await checkUser();
      //   await loadData();
      // };
    }
  }, []);

  // const getLocation = async () => {
  //   console.log("dfadfafadfasad");
  //   try {
  //     let gps = new Gps();
  //     gps.getCoordinates(async (isError, value) => {
  //       console.log("val", value)
  //       if (!isError == true) {
  //         dispatch(setCurrentLocation(value));
  //         await updateLocationToServer(value.lat, value.lng);
  //       } else {
  //         Alert.alert("Error in getting GPS location, " + value);
  //       }
  //     });
  //   } catch (e) {}
  // };

  // const updateLocationToServer = async (latitude, longitude) => {
  //   dispatch(setLoading(true));
  //   let deviceId = getUniqueId().replace(/-/g, "");

  //   let payload = {
  //     userId: user.id,
  //     lat: latitude,
  //     lng: longitude,
  //     timestamp: dateformat(new Date(), "yyyy-mm-dd HH:MM:ss"),
  //     deviceId: deviceId,
  //   };

  //   let s = new Service();
  //   let response = await s.updateUserLocation(payload);
  //   // console.log(
  //   //   'test82 updateUserLocation:',
  //   //   JSON.stringify(response),
  //   //   JSON.stringify(payload),
  //   // );

  //   dispatch(setLoading(false));

  //   if (!response.status) {
  //     Alert.alert("updateLocationToServer", response.message);
  //   }
  // };

  const checkUser = async () => {
    if (!user) {
      dispatch(setLoading(true));
      let deviceId = getUniqueId().replace(/-/g, "");

      let time = dateformat(new Date(), "yyyy-mm-dd HH:MM:ss");
      // console.log("time",time)
      // let email = deviceId + 'dwsa11@nowuser.com';
      let email = deviceId + time + "@nowuser.com";
      console.log("e", email);
      // let email = deviceId + time;

      let payload = {
        firstname: deviceId,
        lastname: deviceId,
        email,
        password: "12345678",
      };
      let s = new Service();
      let response = await s.signup(payload);
      //console.log('test82 signup:', JSON.stringify(response));
      dispatch(setLoading(false));

      if (response.status) {
        Alert.alert(response.message);

        await AsyncStorage.setItem("user", JSON.stringify(response.data));
        dispatch(setUser(response.data));
      } else {
        Alert.alert(response.message);
      }
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
