import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

import Colors from '../../settings/colors';
import {useNavigation} from '@react-navigation/native';
import Header from '../../common/components/header';
import StepsBar from '../components/steps-bar';
import MediaButton from '../../common/components/media-button';
import OfferItem from '../../offer/offer-item';
import ActionSheet from 'react-native-actionsheet';
import ImageUploader from '../../libs/image-uploader';
import {useSelector, useDispatch} from 'react-redux';
import {setOffer} from '../../../redux/actions';
import Video from 'react-native-video';
import { useTranslation } from 'react-i18next';
import Service from '../../libs/api/service';

const WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = (WIDTH * 90) / 100 / 3 - 6;

export default function StepOne(props) {
  const { t} = useTranslation();
  const navigation = useNavigation();
  const offer = useSelector(state => state.offer);
  const dispatch = useDispatch();

  const boxes = ['', '', '', '', '', ''];
  const plusIcon = 'https://img.icons8.com/pastel-glyph/2x/plus.png';

  var pressIndex = 0;

  async function onImageUpload(image) {
    let updatedOffer = JSON.parse(JSON.stringify(offer));
    updatedOffer.images.push(image.source.uri);
    updatedOffer.image = updatedOffer.images[0];
    dispatch(setOffer(updatedOffer));
  }

  function onAction(index) {
    let imageUploader = new ImageUploader();

    if (index == 0) {
      imageUploader.uploadImageFromLibrary(pressIndex == 0, image => {
        onImageUpload(image);
        //console.log('test82 image : ', JSON.stringify(image));
      });
    } else if (index == 1) {
      imageUploader.uploadImageFromCamera(image => {
        onImageUpload(image);
      });
    }
  }

  const onPress = index => {
    pressIndex = index;
    // this.actionSheet.show();
    actionSheet.show();

  };

  const pictures = () => {
    let renderedImages = boxes.map((item, index) => {
      let imageUrl = offer.images[index] ? offer.images[index] : plusIcon;
      let imageStyle = offer.images[index] ? styles.image : styles.icon;

      let fileExt = offer.images[index]
        ? offer.images[index]
            .split('.')
            .pop()
            .toUpperCase()
        : '';

      if (fileExt == 'MOV' || fileExt == 'MP4') {
        return (
          <TouchableOpacity
            disabled={offer.images[index]}
            onPress={() => {
              onPress(index);
            }}
            key={Math.random()}
            style={styles.imageItem}>
            <Video
              source={{uri: imageUrl}}
              ref={ref => {
                this.player = ref;
              }}
              style={styles.backgroundVideo}
            />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            // disabled={offer.images[index]}
            onPress={() => {
              onPress(index);
            }}
            key={Math.random()}
            style={styles.imageItem}>
            {index == 0 && (
              <Text style={styles.requiredTxt}>{t('@Required(Image)')}</Text>
            )}
            <Image source={{uri: imageUrl}} style={imageStyle} />
          </TouchableOpacity>
        );
      }
    });

    return (
      <View key={Math.random()} style={styles.imagesContainer}>
        {renderedImages}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header back logo border transparent />

      <ScrollView contentContainerStyle={{paddingBottom: hp(100)}}>
        <View style={styles.body}>
          <Text style={styles.heading}>{t('@ImagesVideos')}</Text>
          <Text style={styles.title}>{t('@UploadImages')}</Text>

          {pictures()}

          <StepsBar currentStep={1} style={styles.bar} />
          <MediaButton
            txt={t('@NEXT')}
            disabled={offer.images.length == 0}
            style={{backgroundColor: 'rgb(228, 45, 72)', marginTop: hp(20)}}
            simple
            onPress={() => {
              navigation.navigate('StepTwo');
            }}
          />

          <View style={styles.offerView}>
            <OfferItem offer={offer} post disable />
          </View>
        </View>
      </ScrollView>

      <ActionSheet
        // ref={ref => (this.actionSheet = ref)}
        ref={ref => (actionSheet = ref)}
        title={t("@Whichonedoyoulike?")}
        options={[t('@Library'), t('@Camera'), t('@Cancel')]}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={onAction}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.THEME,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  body: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  offerView: {
    marginTop: hp(20),
  },
  requiredTxt: {
    position: 'absolute',
    bottom: hp(4),
    // left: wp(4),
    alignSelf: 'center',
    color: Colors.BORDER,
    fontSize: fs(12),
    fontFamily: 'Roboto-Regular',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: hp(20),
  },
  imageItem: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: hp(0),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff999c',
    borderWidth: 1,
    margin: 2,
    borderStyle: 'dashed',
  },
  icon: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    tintColor: '#ff999c',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bar: {
    marginTop: hp(20),
    height: hp(20),
  },
  input: {
    marginTop: hp(10),
    height: hp(40),
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: wp(10),
    fontSize: fs(16),
  },
  stepTxt: {
    color: Colors.WHITE,
    fontSize: fs(14),
    fontFamily: 'Roboto-Regular',
  },
  heading: {
    marginTop: hp(12),
    color: Colors.WHITE,
    fontSize: fs(26),
    fontFamily: 'Roboto-Bold',
  },
  title: {
    marginTop: hp(5),
    color: Colors.WHITE,
    fontSize: fs(15),
    fontFamily: 'Roboto-Regular',
  },
});
