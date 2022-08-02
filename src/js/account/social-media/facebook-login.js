import {Alert} from 'react-native';

const FBSDK = require('react-native-fbsdk-next');

const {LoginManager, AccessToken, GraphRequest, GraphRequestManager} = FBSDK;

export default class FacebookLogin {
  //{"first_name":"Dany",
  //"picture":{"data":{"width":50,"height":50,"url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2642704009140717&height=50&width=50&ext=1579187669&hash=AeRV
  //4QjxQ5RLRS2F","is_silhouette":false}},"id":"2642704009140717","name":"Dany","last_name":"Dany","email":"daniyal_1992@hotmail.com"}

  constructor() {}

  async signIn(onSuccess) {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          //alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string:
                      'email,name,first_name,middle_name,last_name, picture',
                  },
                },
              },
              (err, result) => {
                ////console.log('test82 result: ', JSON.stringify(result));
                let user = result;
                let payload = {
                  social_source: 'facebook',
                  social_id: user.id,
                  firstname: user.first_name,
                  lastname: user.last_name,
                  email: user.email,
                };

                onSuccess(payload);
              },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      () => {
        Alert.alert('Login fail with error: ' + error);
      },
    );
  }
}
