//import * as ImagePicker from 'react-native-image-picker';
import {Platform, Alert, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class ImageUploader {
  callback;
  constructor() {}

  async uploadImageFromCamera(callback) {
    this.callback = callback;

    let width = (DEVICE_WIDTH * 90) / 100;
    let response = await ImagePicker.openCamera({
      width: width,
      height: (1 / 1.618) * width,
      cropping: true,
    });

    this.handleResponse(response);
  }

  async uploadImageFromLibrary(isPhotoOnly, callback) {
    this.callback = callback;
    let width = DEVICE_WIDTH;

    let options = {
      mediaType: 'any',
    };

    if (isPhotoOnly) {
      options = {
        width: width,
        height: (1 / 1.618) * width,
        cropping: true,
      };
    }

    let response = await ImagePicker.openPicker(options);
    this.handleResponse(response);
  }

  handleResponse(response) {
    if (response.didCancel) {
      //console.log('User cancelled image picker');
    } else if (response.errorCode) {
      // //console.log(
      //   'ImagePicker Error: ',
      //   response.errorCode,
      //   response.errorMessage,
      // );
      Alert.alert(response.errorMessage);
    } else {
      //console.log('test32 image response: ', JSON.stringify(response));

      let source = {uri: Platform.OS == 'ios' ? response.sourceURL : response.path};
      let item = {};
      item.source = source;
      item.path = response.path;
      item.width = response.width;
      item.height = response.height;
      item.name = response.filename;

      if(Platform.OS == 'ios'){
        item.fileExt = response.sourceURL.split('.').pop();
      }
      else{
        item.fileExt = response.path.split('.').pop();
      }

      if (response.filename == undefined) {
        item.name = new Date().getTime() + '_id_' + Platform.OS + '.jpg';
      } else {
        item.fileExt = response.filename.split('.').pop();
      }

      this.photo = item;

      this.callback(item);
    }
  }
}
