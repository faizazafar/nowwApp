import { I18nManager } from "react-native";
import {
  OFFER,
  LOADING,
  USER,
  MY_OFFERS,
  AUDIENCE,
  CURRENT_LOCATION,
  DELETE_OFFER,
  SET_LANGUAGE,
  CHANGE_LANG,
} from "./types";
import i18n from "../../i18/i18n.config";
// import i18n from "i18next";

export const setOffer = (offer) => {
  return {
    type: OFFER,
    offer: offer,
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING,
    loading: loading,
  };
};

export const setUser = (user) => {
  return {
    type: USER,
    user: user,
  };
};

export const setMyOffers = (myOffers) => {
  return {
    type: MY_OFFERS,
    myOffers: myOffers,
  };
};

export const setAudience = (audience) => {
  return {
    type: AUDIENCE,
    audience: audience,
  };
};

export const setCurrentLocation = (curr_location) => {
  return {
    type: CURRENT_LOCATION,
    curr_location: curr_location,
  };
};

export const setDeleteOffer = (offer) => {
  return {
    type: DELETE_OFFER,
    payload: offer,
  };
};
export const setLanguage = (language, callback) => {
  return (dispatch) => {
    // Dispatch the action
    dispatch({
      type: SET_LANGUAGE,
      payload: language,
    });

    // Execute the callback function
    if (callback && typeof callback === "function") {
      callback();
    }
  };
};
