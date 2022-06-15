import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  DatePickerIOS,
} from 'react-native';

import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
  regularFont,
} from '../../libs/responsive';
import Colors from '../../settings/colors';

export default class DateSelector extends Component<{}> {
  isOpen;
  prevDate;
  onDone;
  constructor() {
    super();
    this.state = {
      chosenDate: new Date(),
      dateOffset: new Animated.Value(Dimensions.get('window').height),
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    };
  }

  openModal(chosenDate, onDone) {
    this.onDone = onDone;
    this.isOpen = true;
    this.prevDate = this.state.chosenDate;
    if (chosenDate != null) this.setState({chosenDate});
    Animated.timing(this.state.dateOffset, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }

  closeModal() {
    this.isOpen = false;
    Animated.timing(this.state.dateOffset, {
      duration: 300,
      toValue: this.state.height,
      useNativeDriver: false,
    }).start();
  }

  onDonePress() {
    this.closeModal();
    this.onDone(this.state.chosenDate);
  }

  render() {
    let {dateOffset, chosenDate, height} = this.state;

    let opacity = dateOffset.interpolate({
      inputRange: [0, hp(40), height],
      outputRange: [0.4, 0, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: dateOffset}]}]}>
        <Animated.View style={[styles.background, {opacity}]}>
          <TouchableOpacity
            onPress={() => {
              this.closeModal();
            }}
            style={{flex: 1}}
          />
        </Animated.View>

        <View style={styles.dateConatiner}>
          <View style={styles.header}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.cancelBtn}
              onPress={() => {
                this.closeModal();
              }}>
              <Text style={styles.txt}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headingTxt}>Date & Time</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.doneBtn}
              onPress={() => {
                this.onDonePress();
              }}>
              <Text style={styles.txt}>Done</Text>
            </TouchableOpacity>
          </View>
          <DatePickerIOS
            date={chosenDate}
            onDateChange={date => {
              this.setState({chosenDate: date});
            }}
            // mode="date"
          />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    flex: 0.6,
    backgroundColor: '#444',
  },
  dateConatiner: {
    flex: 0.4,
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    height: hp(36),
    backgroundColor: Colors.RED,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneBtn: {
    marginRight: '5%',
    height: hp(45),
    justifyContent: 'center',
  },
  cancelBtn: {
    marginLeft: '5%',
    height: hp(45),
    justifyContent: 'center',
  },
  txt: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: fs(17),
  },
  headingTxt: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: fs(18),
  },
});
