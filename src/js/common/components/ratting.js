import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
} from '../../libs/responsive';
import Colors from '../../settings/colors';

export default class Ratting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratting: props.ratting,
    };
  }

  onRattingPress(ratting) {
    this.setState({ratting});
  }

  render() {
    let {ratting} = this.state;
    let {size, readOnly} = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={readOnly}
          onPress={() => {
            this.onRattingPress(1);
          }}>
          <Image
            style={[
              styles.icon,
              {
                marginLeft: 0,
                width: size,
                height: size,
                tintColor: ratting >= 1 ? 'yellow' : Colors.BORDER,
              },
            ]}
            source={require('../../../assets/star2.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={readOnly}
          onPress={() => {
            this.onRattingPress(2);
          }}>
          <Image
            style={[
              styles.icon,
              {
                width: size,
                height: size,
                tintColor: ratting >= 2 ? 'yellow' : Colors.BORDER,
              },
            ]}
            source={require('../../../assets/star2.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={readOnly}
          onPress={() => {
            this.onRattingPress(3);
          }}>
          <Image
            style={[
              styles.icon,
              {
                width: size,
                height: size,
                tintColor: ratting >= 3 ? 'yellow' : Colors.BORDER,
              },
            ]}
            source={require('../../../assets/star2.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={readOnly}
          onPress={() => {
            this.onRattingPress(4);
          }}>
          <Image
            style={[
              styles.icon,
              {
                width: size,
                height: size,
                tintColor: ratting >= 4 ? 'yellow' : Colors.BORDER,
              },
            ]}
            source={require('../../../assets/star2.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={readOnly}
          onPress={() => {
            this.onRattingPress(5);
          }}>
          <Image
            style={[
              styles.icon,
              {
                width: size,
                height: size,
                tintColor: ratting >= 5 ? 'yellow' : Colors.BORDER,
              },
            ]}
            source={require('../../../assets/star2.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: wp(5),
    resizeMode: 'contain',
  },
});
