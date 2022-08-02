import React, { Component } from 'react';

import {
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default class DateSelectorAndroid extends Component<{}>{
    
    onDone;
    constructor() {
        super();
        this.state = {
            chosenDate: new Date(),
            mode: 'date',
            show: false,
        };
    }

    openModal(chosenDate, onDone){
        this.onDone = onDone;
        if(chosenDate != null)
          this.setState({chosenDate});

        this.setState({show: true});
    }

    setDate = (event, date) => {
      if (date !== undefined) {
        // Use the hour and minute from the date object
        this.setState({show: false});
        this.onDone(date);
      }
    }

    render(){
    let {chosenDate, show, mode} = this.state;
    
      return(
        <View>
        {show && <DateTimePicker value={chosenDate}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
        </View>
      );
   }
  } 
  