import {
  OFFER,
  LOADING,
  USER,
  MY_OFFERS,
  AUDIENCE,
  DELETE_OFFER,
  CURRENT_LOCATION,
} from "../actions/types";

const initialState = {
  offer: {
    images: [],
    image: "",
    brand: "",
    productName: "",
    offerDeal: "",
    locations: [],
    url: "",
    details: "",
    phoneNumber: "",
  },
  loading: false,
  user: null,
  deleteOffer: null,
  myOffers: [],
  audience: { all: 0, withInterest: 0, withoutInterest: 0 },
  // curr_location: {lat:
  //   24.9305975 , lng: 67.1005613},
  curr_location: {lat:
    0 , lng: 0},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case OFFER:
      return {
        ...state,
        offer: action.offer,
      };
    case LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case USER:
      return {
        ...state,
        user: action.user,
      };
    case MY_OFFERS:
      return {
        ...state,
        myOffers: action.myOffers,
      };
    case AUDIENCE:
      return {
        ...state,
        audience: action.audience,
      };
    case DELETE_OFFER:
      return {
        ...state,
        deleteOffer: action.payload,
      };
    case CURRENT_LOCATION:
      return {
        ...state,
        curr_location: action.curr_location,
      };
    //   type: CURRENT_LOCATION,
    // curr_location: curr_location,
    default:
      return state;
  }
};

export default rootReducer;
