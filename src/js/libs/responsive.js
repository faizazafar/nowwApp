import {Dimensions, PixelRatio, Platform} from 'react-native';

const responsiveWidth = width => {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').width * width) / 411.428,
  );
};

const responsiveHeight = height => {
  return PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').height * height) / 683.428,
  );
};

const responsiveFontSize = fontSize => {
  let fs = PixelRatio.roundToNearestPixel(
    (Dimensions.get('window').width * fontSize) / 411.428,
  );

  return Platform.OS == 'ios' ? fs : fs - 1.5;
};

export {responsiveWidth, responsiveHeight, responsiveFontSize};
