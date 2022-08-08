'use strict';

import FetchHandler from './fetch-handler';
const BASE_URL =
// 'http://newoffersweb.com/backend/index.php?key=lkash2987kjb2h99j';
'http://newoffersweb.com/backend/index.php?key=lkash2987kjb2h99j&';
// 'https://clients.devaj.technology/sandbox/now-app/index.php?key=lkash2987kjb2h99j&';
  

export default class Service extends FetchHandler {
  constructor() {
    super();
  }

  async signup(form) {
    return await this.callPost('api/register', form);
  }

  async login(form) {
    return await this.callPost('api/login', form);
  }

  async loginSocial(form) {
    return await this.callPostMultipart('api/socialLogin', form);
  }

  async updateUser(form) {
    return await this.callPostMultipart('api/modifyUser', form);
  }

  async getUserOffers(id) {
    let url =
      BASE_URL +
      'r=' +
      'api/myOffers' +
      '&key=' +
      'lkash2987kjb2h99j' +
      '&id=' +
      id;
    return await this.callGetFromUrl(url);
  }

  async getOfferDetails(id) {
    let url =
      BASE_URL +
      'r=' +
      'api/getOfferDetails' +
      '&key=' +
      'lkash2987kjb2h99j' +
      '&id=' +
      id;
    return await this.callGetFromUrl(url);
  }

  async getHomeOffers(curr_location) {
    let url =
      BASE_URL +
      'r=' +
      'api/getOffers' +
      '&key=' +
      'lkash2987kjb2h99j' +
      '&lat=' +
      curr_location.lat +
      '&lng=' +
      curr_location.lng;
    return await this.callGetFromUrl(url);
  }

  async getFavOffers(userID) {
    let url =
      BASE_URL +
      'r=' +
      'api/getFavorites' +
      '&key=' +
      'lkash2987kjb2h99j' +
      '&id=' +
      userID;
    return await this.callGetFromUrl(url);
  }

  async getPaymentModes(form) {
    let url =
      BASE_URL + 'r=' + 'api/getPaymentModes' + '&key=' + 'lkash2987kjb2h99j';

    return await this.callGetFromUrl(url);
  }

  async updateUserLocation(form) {
    return await this.callPost('api/userLocation', form);
  }

  async getInterests(form) {
    return await this.callPost('api/getInterests', form);
  }

  async getCategories(form) {
    return await this.callPost('api/getCategories', form);
  }

  async getAudience(form) {
    return await this.callPost('api/getUsers', form);
  }

  async validateCoupen(form) {
    return await this.callPost('api/validateCoupon', form);
  }

  async makeFavorite(form) {
    return await this.callPost('api/markUnmarkFavorite', form);
  }

  async saveToDraft(form) {
    //console.log("In saveToDraft");
    return await this.callPostMultipart('api/draftOffer', form);
    ////console.log("response", x)
  }

  async uploadImage(form) {
    return await this.callPostMultipart('api/uploadImage', form);
  }

  async delteOffer(form) {
    return await this.callPostMultipart('api/deleteOffer', form);
  }

  async scheduleOffer(form) {
    return await this.callPostMultipart('api/processOffer', form);
  }
}
