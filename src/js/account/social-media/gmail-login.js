import {Alert, Platform} from 'react-native';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default class GmailLogin {
  //"user":{"photo":"https://lh3.googleusercontent.com/a-/AAuE7mBQQkDXyICCrNGRWYwLSJ3iRP_vo7z4e1ErYvMO=s120",
  //"givenName":"Muhammad Daniyal","familyName":"Ansari","name":"Muhammad Daniyal Ansari","email":"daniyals1992@gmail.com","id":"118031749223496476115"}}

  constructor() {}

  async signIn(onSuccess) {
    try {
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      //console.log('test32 gmail object: ', JSON.stringify(userInfo));
      let user = userInfo.user;
      ////console.log('test32 gmail object: ', JSON.stringify(user));
      let form = {
        social_source: 'google',
        social_id: user.id,
        firstname: user.givenName,
        lastname: user.familyName,
        email: user.email,
      };
      //console.log('test32 gmail form: ', JSON.stringify(form));
      //return;
      onSuccess(form);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //Alert.alert(JSON.stringify('Login Cancelled'));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert(JSON.stringify('Signin is in progress already'));
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(JSON.stringify('Play services not available or outdated'));
      } else {
        ////console.log('test32 gmail error: ', JSON.stringify(error));
        Alert.alert('Some error occured.', JSON.stringify(error));
      }
    }
  }

  async isSignedIn() {
    const isSignedIn = await GoogleSignin.isSignedIn();
    //console.log('Gmail isSignedIn: ', isSignedIn);
    return isSignedIn;
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
      //console.log('Gmail signed out successflly');
    } catch (error) {
      //Alert.alert('Error in signing out from Gmail');
    }
  }

  configure() {
    //It is mandatory to call this method before attempting to call signIn()
    Platform.OS == 'ios'
      ? GoogleSignin.configure({
          iosClientId:
            '460997966297-cs1mdmvi1rr3gn722ujnabpmh7jft7sq.apps.googleusercontent.com',
        })
      : GoogleSignin.configure();
  }
}
