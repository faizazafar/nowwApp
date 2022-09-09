import {
  OFFER,
  LOADING,
  USER,
  MY_OFFERS,
  AUDIENCE,
  CURRENT_LOCATION,
  DELETE_OFFER,
  SET_LANGUAGE,
} from './types';

export const setOffer = offer => {
  return {
    type: OFFER,
    offer: offer,
  };
};

export const setLoading = loading => {
  return {
    type: LOADING,
    loading: loading,
  };
};

export const setUser = user => {
  return {
    type: USER,
    user: user,
  };
};

export const setMyOffers = myOffers => {
  return {
    type: MY_OFFERS,
    myOffers: myOffers,
  };
};

export const setAudience = audience => {
  return {
    type: AUDIENCE,
    audience: audience,
  };
};

export const setCurrentLocation = curr_location => {
  return {
    type: CURRENT_LOCATION,
    curr_location: curr_location,
  };
};

export const setDeleteOffer = offer => {
  return {
    type: DELETE_OFFER,
    payload: offer,
  };
}
export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    payload: language,
  };
}