'use strict';

const BASE_URL =
// 'http://newoffersweb.com/backend/index.php?key=lkash2987kjb2h99j'
// 'http://newoffersweb.com/backend/index.php?key=lkash2987kjb2h99j&';
  'https://clients.devaj.technology/sandbox/now-app/index.php?key=lkash2987kjb2h99j&';
  // 'http://3.22.231.86/sandbox/now-app/index.php?key=lkash2987kjb2h99j&';

const encodePayload = data => {
  try {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  } catch (e) {
    return {};
  }
};

export default class FetchHandler {
  constructor() {}

  async callPost(apiName, payload) {
    let url = BASE_URL + 'r=' + apiName + '&key' + 'lkash2987kjb2h99j';
    let r = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: encodePayload(payload),
    })
      .then(async response => {
        let json = await response.json();
        return json;
      })
      .catch(error => {
        return {
          error: error.toString(),
        };
      });

    return r;
  }

  async callPostMultipart(apiName, payload) {
    //console.log("In callPostMultipart");
    let url = BASE_URL + 'r=' + apiName + '&key=' + 'lkash2987kjb2h99j';
    // let url = BASE_URL + 'r=' + apiName; //+ '&key=' + 'lkash2987kjb2h99j';
    //console.log("URL: " + url);

    let r = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        // 'Content-type': 'application/x-www-form-urlencoded',
        'Content-Type': 'multipart/form-data',
      },
      body: payload,
    })
      .then(async response => {
        //console.log("Response from API:");
        //console.log(response);
        let json = await response.json();
        return json;
      })
      .catch(error => {
        return {
          error: error.toString(),
        };
      });
    
      //console.log("r",r);
    return r;
  }

  makeParameters(form) {
    let params = '?';
    let keys = Object.keys(form);
    keys.forEach((key, index) => {
      if (index == keys.length - 1) {
        params += key + '=' + form[key];
      } else {
        params += key + '=' + form[key] + '&';
      }
    });

    return params;
  }

  async callGetWithParams(form) {
    let params = this.makeParameters(form);
    let url = BASE_URL + params;

    let rtn = await fetch(url)
      .then(async response => {
        let json = await response.json();
        return json;
      })
      .catch(error => {
        return {
          error: error.toString(),
        };
      });

    return rtn;
  }

  async callGetFromUrl(url) {
    let r = await fetch(url)
      .then(async response => {
        let json = await response.json();
        return json;
      })
      .catch(error => {
        return {
          status: false,
          message: error.toString(),
        };
      });

    return r;
  }
}
