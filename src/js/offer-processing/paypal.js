import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
  responsiveFontFamily as fm,
} from '../libs/responsive';

import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {setLoadingParams} from '../../redux/actions';
import Colors from '../settings/colors';

//live = 'api-m';
//sandbox = 'api.sandbox';

class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      approvalUrl: null,
      paymentId: null,
      isOpen: false,
      offset: new Animated.Value(Dimensions.get('window').height),
      height: Dimensions.get('window').height,
      showLoader: true,
    };
  }

  _onNavigationStateChange = async webViewState => {
    //console.log('test32 webViewState url ', JSON.stringify(webViewState.url));
    if (webViewState.url.includes('https://example.com/')) {
      this.closeModal();

      let url = webViewState.url;
      const queryString = require('query-string');
      url = url.replace('https://example.com/', '');
      const parsed = queryString.parse(url);
      ////console.log('test32 urlParams: ', JSON.stringify(parsed));

      this.props.onPaymentDone(parsed.id, parsed.payer_id);
    }
  };

  openModal() {
    this.setState({isOpen: true, showLoader: true});
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: 0,
    }).start();
  }

  closeModal() {
    this.setState({isOpen: false});
    Animated.timing(this.state.offset, {
      duration: 300,
      toValue: this.state.height,
    }).start();
  }

  onLoadEnd() {
    if (this.state.showLoader == true) {
      this.setState({showLoader: false});
    }
  }

  body() {
    const {isOpen} = this.state;
    const {amount} = this.props;

    let url =
      'https://clients.devaj.technology/sandbox/now-app/paypal-sandbox.html?val=';

    if (isOpen) {
      return (
        <View style={{flex: 1}}>
          <WebView
            style={{paddingTop: 20}}
            source={{
              uri: url + amount,
            }}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadEnd={() => {
              this.onLoadEnd();
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    let {offset, height, showLoader} = this.state;

    let opacity = offset.interpolate({
      inputRange: [0, hp(40), height],
      outputRange: [0.7, 0.1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: offset}]}]}>
        <Animated.View style={[styles.background, {opacity}]}></Animated.View>

        <View style={styles.webviewContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.cancelBtn}
              onPress={() => {
                this.closeModal();
              }}>
              <Text style={styles.txt}>CANCEL</Text>
            </TouchableOpacity>
          </View>
          {this.body()}
          {showLoader && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                style={{marginTop: hp(200)}}
                size="large"
                color="#1072b8"
              />
            </View>
          )}
        </View>
      </Animated.View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setLoading: loading => {
      dispatch(setLoadingParams(loading));
    },
  };
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(
  Paypal,
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: hp(50),
    bottom: 0,
    alignItems: 'center',
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: hp(80),
    borderTopLeftRadius: hp(20),
    borderTopRightRadius: hp(20),
  },
  header: {
    height: Platform.OS == 'ios' ? hp(38) : hp(36),
    backgroundColor: Colors.THEME,
    borderTopLeftRadius: Platform.OS == 'ios' ? hp(38 / 2) : hp(36 / 2),
    borderTopRightRadius: Platform.OS == 'ios' ? hp(38 / 2) : hp(36 / 2),
  },
  cancelBtn: {
    height: hp(38),
    paddingLeft: wp(20),
    paddingRight: wp(20),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  background: {
    flex: 0.7,
    backgroundColor: '#000',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  txt: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: fs(18),
  },
});
