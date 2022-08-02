import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import MapView, {Marker, AnimatedRegion, Circle} from 'react-native-maps';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';

const LATITUDE_DELTA = 0.010419911357040235;
const LONGITUDE_DELTA = 0.008046627782789528;

export default class LocationMarker extends React.Component {
  latitudeDelta = LATITUDE_DELTA;
  longitudeDelta = LONGITUDE_DELTA;

  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: props?.latlng?.lat,
        longitude: props?.latlng?.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),

      newCoordinate: {
      
        latitude: props?.latlng?.lat,
        longitude: props?.latlng?.lng,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  getData() {
    return this.state.newCoordinate;
  }

  onRegionChange(region, isSaveRegion, moveCoordinate) {
    const {coordinate} = this.state;
    const newCoordinate = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    if (isSaveRegion) {
      this.latitudeDelta = region.latitudeDelta;
      this.longitudeDelta = region.longitudeDelta;
    }

    if (moveCoordinate) {
      coordinate.timing(newCoordinate).start();

      setTimeout(() => {
        this.setState({newCoordinate});
      }, 500);
    }
  }

  updateMarkerLocation(latlng) {
    let coordinate = {
      latitude: latlng.lat,
      longitude: latlng.lng,
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta,
    };

    this.onRegionChange(coordinate, false, true);
    this.mapView.animateToRegion(coordinate, 600);
  }

  render() {
    let {coordinate, newCoordinate} = this.state;
    let {latlng, readOnly, pointerSrc, radius} = this.props;

    let circleParams = {
      center:  newCoordinate,
      radius:  Number(radius),
    };

    return (
      <View style={styles.container}>
        {
            console.log("hj",latlng.lat)

        }
        <MapView
          ref={mapView => {
            this.mapView = mapView;
          }}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: latlng?.lat,
            longitude: latlng?.lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChange={region => {
            this.onRegionChange(region, true, !readOnly);
          }}>
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={coordinate}>
            <Image source={pointerSrc} style={styles.marker} />
          </Marker.Animated>
          {radius && (
            <Circle
              center={circleParams.center}
              radius={circleParams.radius}
              fillColor="rgba(74, 137, 243, 0.2)"
              strokeColor="rgba(74, 137, 243, 0.2)"
              zIndex={2}
              strokeWidth={2}
            />
          )}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: hp(2),
  },
  marker: {
    width: hp(35),
    height: hp(35),
    resizeMode: 'contain',
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});