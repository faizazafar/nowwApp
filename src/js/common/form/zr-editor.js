import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import AppSetting from '../../settings/app-setting';
import {
  responsiveWidth as wp,
  responsiveHeight as hp,
  responsiveFontSize as fs,
responsiveFontFamily as fm,
} from '../../libs/responsive';
import DescriptionViewer from '../../jobs/desc-viewer';

export default class ZREditor extends Component {
  static CONTENT_TYPE = {UL: 0, P: 1};

  suggestionsItemsHistory = [];
  initial_suggestions = [];
  lastJobTitleFromSuggestions = '';

  constructor() {
    super();
    this.state = {
      width: Dimensions.get('window').width,
      suggestionBoxOffset: new Animated.Value(0),
      items: '<div></div>',
    };
  }

  setValue(html) {
    this.setState({items: html});
    //as setValue will always call when other resume come to edit
    this.suggestionsItemsHistory = [];
  }

  setDefaultValue() {
    this.setState({items: ''});
    //as setDefaultValue will always call when new resume create
    this.suggestionsItemsHistory = [];
  }

  componentDidUpdate() {
    if (this.props.suggestionsEnabled) {
      if (this.initial_suggestions != this.props.initial_suggestions) {
        this.initial_suggestions = this.props.initial_suggestions;
        this.showSuggestonBox();
      }
    }
  }

  getResult() {
    return {
      description: this.state.items,
      suggestedtext: this.lastJobTitleFromSuggestions,
    };
  }

  showSuggestonBox() {
    Animated.timing(this.state.suggestionBoxOffset, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
    }).start();
  }

  closeSuggestonBox() {
    Animated.timing(this.state.suggestionBoxOffset, {
      toValue: 0,
      duration: 400,
    }).start();
  }

  onEditDone(items) {
    this.setState({items});
  }

  onItemsSelect(suggestionItems, lastJobTitleFromSuggestions) {
    this.lastJobTitleFromSuggestions = lastJobTitleFromSuggestions;

    if (this.props.content_type == ZREditor.CONTENT_TYPE.UL) {
      //first convert present items into html
      let html = this.state.items;

      let ulTagMatches = html.match(/(\<ul.*?\>)/g);

      if (ulTagMatches == undefined) {
        //ul tag not found
        let divTagMatches = html.match(/(\<div.*?\>)/g);

        lastDivMatch = divTagMatches[divTagMatches.length - 1];
        lastDivIndex = html.lastIndexOf(lastDivMatch) + lastDivMatch.length;

        html =
          html.slice(0, lastDivIndex) + '<ul></ul>' + html.slice(lastDivIndex);
        // //console.log('test33 not found ', html);
      }

      //find closing ul tag to isert li tags
      ulTagMatches = html.match(/(\<\/ul.*?\>)/g);

      lastUlMatch = ulTagMatches[ulTagMatches.length - 1];
      lastUlIndex = html.lastIndexOf(lastUlMatch);

      let liTags = '';
      suggestionItems.forEach(item => {
        liTags += '<li><span>' + item.Description + '</span></li>';
      });

      html = html.slice(0, lastUlIndex) + liTags + html.slice(lastUlIndex);

      this.setState({items: html});
    } else {
      //console.log('test32 obj');

      //add  p tag in new suggested items
      let html = '<div>' + this.state.items;
      suggestionItems.forEach((item, index) => {
        html += '<p><span>' + item.description + '</span></p>';
      });
      html += '</div>';

      this.setState({items: html});
    }
  }

  onSuggestionsButtonPressed() {
    let {navigate} = this.props.navigation;

    navigate(this.props.suggestions_page, {
      onItemsSelect: this.onItemsSelect.bind(this),
      initial_suggestions: this.initial_suggestions,
      jobtitle: this.props.jobtitle,
      suggestionsItemsHistory: this.suggestionsItemsHistory,
    });
  }

  render() {
    let {items, width, suggestionBoxOffset} = this.state;
    let {navigate} = this.props.navigation;
    let {suggestionsEnabled, placeholder} = this.props;

    let marginTop = suggestionsEnabled ? hp(60) : 0;

    const suggestionBoxRight = suggestionBoxOffset.interpolate({
      inputRange: [0, 1],
      outputRange: [-width / 1.8, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <View style={{width: '95%', alignSelf: 'center', flex: 1, marginTop}}>
          <Text style={styles.inputTitle}>{placeholder}</Text>

          <View style={styles.textBox}>
            <DescriptionViewer
              description={items}
              //key={Math.random()}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}
            onPress={() => {
              navigate('RichTextEditor', {
                onSave: this.onEditDone.bind(this),
                value: items,
              });
            }}></TouchableOpacity>
        </View>

        <Animated.View
          style={{
            position: 'absolute',
            top: hp(10),
            right: suggestionBoxRight,
            width: '55%',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.suggestionBox}
            onPress={this.onSuggestionsButtonPressed.bind(this)}>
            <Text style={styles.suggestonText}>Suggestions Matched</Text>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppSetting.BACKGROUND_COLOR,
  },
  textBox: {
    backgroundColor: 'white',
    marginTop: hp(5),
    flex: 1,
    borderColor: AppSetting.BORDER_COLOR,
    borderWidth: 1,
    padding: hp(10),
    borderRadius: hp(4),
  },
  textInput: {
    color: AppSetting.DARK_TEXT,
    fontSize: fs(14),
    textAlignVertical: 'top',
  },
  suggestionBox: {
    width: '100%',
    backgroundColor: '#314e67',
    height: hp(45),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: hp(45 / 2),
    borderBottomLeftRadius: hp(45 / 2),
  },
  suggestonText: {
    paddingLeft: wp(15),
    color: 'white',
    fontSize: fs(14),
    fontFamily: 'Roboto-Regular',
  },
  viewText: {
    paddingRight: wp(15),
    color: AppSetting.DARK_THEME_COLOR,
    fontSize: fs(13),
    fontFamily: 'Roboto-Regular',
  },
  inputTitle: {
    marginTop: hp(5),
    color: AppSetting.LIGHT_TEXT,
    fontFamily: 'Roboto-Regular',
    fontSize: fs(13),
  },
});
