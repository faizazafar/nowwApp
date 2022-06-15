import React, {Component} from 'react';
import Validator from '../../libs/api/validator';

export default class ZRInput extends Component {
  constructor() {
    super();
    this.state = {
      isAlert: false,
      alertMsg: '',
    };
  }

  onValueChange() {
    if (this.state.isAlert) {
      this.setState({isAlert: false});
    }
  }

  validate() {
    // //console.log('test32 zr input validate call');
    // this.setState({isAlert: true, alertMsg: 'testing'});
    // return false;

    try {
      this.props.validation.forEach(validation => {
        let value = this.props.value;
        if (
          validation.type == Validator.VALIDATION_TYPES.SELECT &&
          this.props.byPassSelectValidation != undefined &&
          this.props.byPassSelectValidation == true
        ) {
          this.setState({isAlert: false});
        } else {
          if (validation.type == Validator.VALIDATION_TYPES.CONFIRM_PASSWORD) {
            value = [value, this.props.valueFromMatch];
          }

          let result = new Validator().validationByType(value, validation);
          if (result.status == false) {
            this.setState({isAlert: true, alertMsg: result.msg});
            throw {};
          } else {
            this.setState({isAlert: false});
          }
        }
      });
    } catch (e) {
      //try{this.focus()}catch(ex){}
      return false;
    }

    return true;
  }
}
