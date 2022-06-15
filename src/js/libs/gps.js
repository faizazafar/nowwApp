import {PermissionsAndroid, Platform, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 3600000, //1 hour = 3600000 ms
  distanceFilter: 1609, //1 mile  = 1609 meters
};

export default class Gps {
  async requestAndroidPermission() {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'GPS Permission',
        message: 'GPSAPP would like to access your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  }

  async checkPermission() {
    if (Platform.OS == 'android') {
      const granted = await this.requestAndroidPermission();
      //console.log('test32 gps permission', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('test32 gps permission granted');
        return true;
      } else {
        //console.log('test32 gps permission denied');
        return false;
      }
    } else {
      let level = await Geolocation.requestAuthorization('whenInUse');
      return level == 'granted';
    }
  }

  async getCoordinates(onDone) {
    let isGranted = await this.checkPermission();

    let coordinates = {
      lat: 24.860977,
      lng: 67.067902,
    };
    onDone(false, coordinates);
    return; //tempD

    if (isGranted) {
      Geolocation.getCurrentPosition(
        position => {
          let coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          onDone(false, coordinates);
        },
        error => {
          onDone(true, error.message);
        },
        options,
      );
    } else {
      onDone(
        true,
        'Gps permission denied. If you have not given the permission, you can give the GPS permission to pill2me App from device settings.',
      );
    }
  }
}
