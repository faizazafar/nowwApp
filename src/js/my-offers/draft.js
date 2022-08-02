import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from "../libs/responsive";
import Colors from "../settings/colors";
import OfferItem from "../offer/offer-item";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setDeleteOffer, setOffer } from "../../redux/actions";
import Service from "../libs/api/service";
import { useTranslation } from "react-i18next";
export default function Draft() {
  const {t} = useTranslation();
  let [list, setList] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myOffers = useSelector((state) => state.myOffers);

  const onEdit = (item) => {
    //console.log("test82 onEdit item: ", JSON.stringify(item));

    let offerImages = [];
    offerImages.push(item.image);

    item.offerMedia.forEach((mediaItem) => {
      offerImages.push(mediaItem.media);
    });

    let offer = {
      id: item.id,
      images: offerImages,
      image: item.image,
      brand: item.brand,
      productName: item.productName,
      offerDeal: item.offerDeal,
      locations: item.offerLocations,
      url: item.url,
      details: item.description,
      phoneNumber: item.phone,
    };

    //console.log("test82 onEdit item: ", JSON.stringify(offer));

    dispatch(setOffer(offer));
    navigation.navigate("StepOne");
  };

  const onDelete = (item) => {
    dispatch(setDeleteOffer(item));
  };

  let data = myOffers.filter((item) => {
    return item.status == 1 && item.isExpired == false;
  });

  // //console.log("list", data);

  if (data.length > 0) {
    list = data.map((item, index) => {
      // //console.log("item", item)
      return (
        <OfferItem
          offer={item}
          options
          refresh={() => {
            navigation.navigate("TargetZone", { offer: item });
          }}
          edit={() => {
            onEdit(item);
          }}
          delete={() => {
            onDelete(item);
          }}
          style={{ marginTop: index == 0 ? 0 : hp(2) }}
        />
      );
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(100) }}
      >
        <View style={styles.body}>{list}</View>
        {/* {//console.log(list.length)} */}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.emptyBody}>
          <Text style={styles.noData}>{t("No offers found in draft")}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  emptyBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noData: {
    marginTop: hp(5),
    color: Colors.RED,
    fontSize: fs(17),
    fontFamily: "Roboto-Regular",
  },
});
