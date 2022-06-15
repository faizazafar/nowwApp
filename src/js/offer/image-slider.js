import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

import Colors from '../settings/colors';
import Swiper from 'react-native-swiper';
import Video from 'react-native-video';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default function ImageSlider(props) {
  ////console.log('test82 images: ', JSON.stringify(props.images));
  function renderSlides() {
    return props.images.map((image, index) => {
      let fileExt = image
        .split('.')
        .pop()
        .toUpperCase();

      if (fileExt == 'MOV' || fileExt == 'MP4') {
        return (
          <View key={Math.random()} style={styles.videoContainer}>
            <Video
              ref={ref => {
                this.player = ref;
              }}
              source={{
                uri: image,
              }}
              style={styles.backgroundVideo}
            />
          </View>
        );
      } else {
        return (
          <View key={index}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
          </View>
        );
      }
    });
  }

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        showsButtons={false}
        scrollEnabled={true}
        showsPagination={true}
        dotColor={'gray'}
        activeDotColor={'#fff'}>
        {renderSlides()}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: (1 / 1.618) * DEVICE_WIDTH,
    backgroundColor: Colors.BORDER,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
