import { PermissionsAndroid, Platform, Alert } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { connect } from "react-redux";
import { setCurrentLocation } from "../../redux/actions";

const options = {
  enableHighAccuracy: true,
  timeout: 2000,
  // maximumAge: 3600000, //1 hour = 3600000 ms
  distanceFilter: 1609, //1 mile  = 1609 meters
};

export default class Gps {
  async requestAndroidPermission() {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "GPS Permission",
        message: "GPSAPP would like to access your location.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  }

  async checkPermission() {
    if (Platform.OS == "android") {
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
      let level = await Geolocation.requestAuthorization("whenInUse");
      return level == "granted";
    }
  }
  updateLocationToServer = async (latitude, longitude) => {
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

    if (!response.status) {
      Alert.alert(response.message);
    }
  };

  async getCoordinates(onDone) {
    let isGranted = await this.checkPermission();

    let coordinates = {
      lat: 24.860977,
      lng: 67.067902,
    };
    onDone(false, coordinates);
    // return; //tempD

    if (isGranted) {
      Geolocation.getCurrentPosition(
        (position) => {
          let coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // console.log("COORDINATES", coordinates);
          onDone(false, coordinates);
          // dispatch(setCurrentLocation(coordinates));
          // this.updateLocationToServer(coordinates.lat, coordinates.lng);
          // this.props.curr_location({
          //   ...this.props.curr_location,
          //   lat: position.coords.latitude,
          //   lng: position.coords.longitude,
          // });
        },
        (error) => {
          onDone(true, error.message);
        },
        options
      );
    } else {
      onDone(
        true,
        "Gps permission denied. If you have not given the permission, you can give the GPS permission to pill2me App from device settings."
      );
    }
  }
}

// import {PermissionsAndroid, Platform, Alert} from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import { useEffect , useState } from 'react';

// const options = {
//   enableHighAccuracy: false,
//   timeout: 5000,
//   maximumAge: 3600000, //1 hour = 3600000 ms
//   distanceFilter: 1609, //1 mile  = 1609 meters
// };

// export default function Gps(){
//   const [location, setLocation] = useState(undefined);

//   //  requestAndroidPermission= async () =>{
//   //   return await PermissionsAndroid.request(
//   //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//   //     {
//   //       title: 'GPS Permission',
//   //       message: 'GPSAPP would like to access your location.',
//   //       buttonNeutral: 'Ask Me Later',
//   //       buttonNegative: 'Cancel',
//   //       buttonPositive: 'OK',
//   //     },
//   //   );
//   // }

//   // checkPermission= async ()=> {
//   //   if (Platform.OS == 'android') {
//   //     const granted = await this.requestAndroidPermission();
//   //     console.log('test32 gps permission', granted);

//   //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//   //       console.log('test32 gps permission granted');
//   //       return true;
//   //     } else {
//   //       console.log('test32 gps permission denied');
//   //       return false;
//   //     }
//   //   } else {
//   //     let level = await Geolocation.requestAuthorization('whenInUse');
//   //     return level == 'granted';
//   //   }
//   // }

//   // const getCoordinates= async (onDone) => {
//   //   let isGranted = await this.checkPermission();

//   //   // let coordinates = {
//   //   //   lat: 24.860977,
//   //   //   lng: 67.067902,
//   //   // };
//   //   onDone(false, coordinates);
//   //   // return; //tempD

//   //   if (isGranted) {
//   //     Geolocation.getCurrentPosition(
//   //       position => {
//   //         let coordinates = {
//   //           lat: position.coords.latitude,
//   //           lng: position.coords.longitude,
//   //         };
//   //         console.log("co" , coordinates)
//   //         onDone(false, coordinates);
//   //       },
//   //       error => {
//   //         onDone(true, error.message);
//   //       },
//   //       options,
//   //     );
//   //     return coordinates
//   //   } else {
//   //     onDone(
//   //       true,
//   //       'Gps permission denied. If you have not given the permission, you can give the GPS permission to pill2me App from device settings.',
//   //     );
//   //   }
//   // }
//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const crd = position.coords;
//         console.log("loc", crd)
//         setLocation({
//           ...location ,
//           latitude: crd.latitude,
//           longitude: crd.longitude,
//           latitudeDelta: 0.0421,
//           longitudeDelta: 0.0421,
//         });
//       },
//       error => {
//         console.log("error",error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 20000},
//     );
//   }, [location.latitude]);

//   return (
//     <>
//     {console.log("loc", location)}
//     </>
//   )
// }
