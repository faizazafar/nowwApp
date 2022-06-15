import {Alert} from 'react-native';
import dateformat from '../dateformat';
import Service from './service';

export default class Validator {
  constructor() {}

  static VALIDATION_TYPES = {
    EMPTY: 0,
    SELECT: 1,
    EMAIL: 2,
    PASSWORD: 3,
    PORTFOLIO_LINK: 4,
    CREDIT_CARD: 5,
    CVV: 6,
    CONFIRM_PASSWORD: 7,
    DATE: 8,
    YEAR: 9,
    FLOAT: 10,
  };

  static MESSAGES = {
    inputFirstName: 'Please first input name',
    inputLastName: 'Please last input name',
    inputNumber: 'Please input number',
    inputMsg: 'Please input message',

    confirmLogoutFromUser: 'Are you sure to logout?',
    inputEmail: 'Please input email',
    validEmail: 'Please input valid email',
    inputPassword: 'Please input password',
    passwordNotMatched: 'Password not matched',
    validPassword:
      'Password must be at least 6 characters long, with 1 upppercase character(A-Z), 1 numeric character(0-9) and 1 special character',

    selectBankAccount: 'Please Select Bank Account',
    inputReceipt: 'Please input Receipt',
    cancelOrder: 'Are you sure to cancel this order?',
  };

  validateInputs(formFields) {
    try {
      formFields.forEach(field => {
        if (field.validate() == false) {
          throw {};
        }
      });
    } catch (e) {
      return false;
    }
    return true;
  }

  validateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.trim().match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  validatePassword(password) {
    var passwordformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@@$#!%*?&])[A-Za-z\d@@$#!%*?&]{6,}$/;
    if (password.match(passwordformat)) {
      return true;
    } else {
      return false;
    }
  }

  validateFloatNumber(value) {
    //var format = /^[0-9]\d*(\.\d+)?$/;
    var format = /^(0|[1-9]\d*)?(\.\d+)?$/;

    if (value.trim().match(format)) {
      return true;
    } else {
      return false;
    }
  }

  validateConfirmPassword(passwordArray) {
    return passwordArray[0] == passwordArray[1];
  }

  validateDate(dateString) {
    let dateParts = dateString.split('/');

    try {
      let year = parseInt(dateParts[2]);
      let month = parseInt(dateParts[0]);
      let date = parseInt(dateParts[1]);

      //console.log('test32 date parts: ');
      //console.log('test32 date parts: ', year.toString().length);

      if (year.toString().length != 4) return false;
      if (month > 12) return false;
      if (date > 31) return false;

      let dateStr = dateformat(new Date(year, month, date), 'yyyy-mm-dd');
      //console.log('test32 date: ', dateStr);
      return true;
    } catch (e) {
      return false;
    }
  }

  validateYear(dateString) {
    let dateParts = dateString.split('/');
    let year = parseInt(dateParts[2]);

    let currDate = new Date();
    let currYear = currDate.getFullYear();

    return year <= currYear;
  }

  validatePortfolioLink(link) {
    var linkformat = /^(http(s)?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (link.match(linkformat)) {
      return true;
    } else {
      return false;
    }
  }

  validateCardNumber(number) {
    let value = number.replace(/ /g, '');

    if (value.length >= 13) {
      return true;
    } else {
      return false;
    }
  }

  validateCVVNumber(number) {
    if (number.length >= 3) {
      return true;
    } else {
      return false;
    }
  }

  async validateDeliveryAddress(address) {
    let s = new Service();
    let response = await s.getOperatingStatesAndCities();

    if (response.status) {
      let foundState = response._list.filter(item => {
        return item.name.toUpperCase() == address.state.toUpperCase();
      });

      if (foundState.length > 0) {
        let foundCity = foundState[0].cities.filter(item => {
          return item.name.toUpperCase() == address.city.toUpperCase();
        });

        if (foundCity.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      Alert.alert(response.message);
    }
  }

  validationByType(value, validation) {
    switch (validation.type) {
      case Validator.VALIDATION_TYPES.EMPTY:
        if (value.trim() == '') {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.EMAIL:
        if (this.validateEmail(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.DATE:
        if (this.validateDate(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.YEAR:
        if (this.validateYear(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.FLOAT:
        if (this.validateFloatNumber(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.PASSWORD:
        if (this.validatePassword(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.CONFIRM_PASSWORD:
        if (this.validateConfirmPassword(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.PORTFOLIO_LINK:
        if (this.validatePortfolioLink(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.SELECT:
        if (value == null) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.CREDIT_CARD:
        if (this.validateCardNumber(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      case Validator.VALIDATION_TYPES.CVV:
        if (this.validateCVVNumber(value) == false) {
          return {status: false, msg: validation.msg};
        } else {
          return {status: true};
        }
      default:
        return {status: true};
    }
  }
}
