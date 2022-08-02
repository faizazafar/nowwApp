import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Splash from './src/js/account/splash';
import Login from './src/js/account/login';
import Slides from './src/js/account/slides';
import Home from './src/js/home';
import SideMenu from './src/js/side-menu';
import StepOne from './src/js/post/steps/step-one';
import StepTwo from './src/js/post/steps/step-two';
import StepThree from './src/js/post/steps/step-three';
import StepFour from './src/js/post/steps/step-four';
import StepFive from './src/js/post/steps/step-five';
import StepSix from './src/js/post/steps/step-six';
import StepSeven from './src/js/post/steps/step-seven';
import StepEight from './src/js/post/steps/step-eight';
import OfferDetails from './src/js/offer/offer-details';
import TargetZone from './src/js/offer-processing/target-zone';
import AgeGender from './src/js/offer-processing/age-gender';
import Interest from './src/js/offer-processing/interest';
import OtherInfo from './src/js/offer-processing/other-info';
import Summary from './src/js/offer-processing/summary';
import Notification from './src/js/offer-processing/notification';
import PaymentSumary from './src/js/offer-processing/payment-summary';
import ScheduleOffer from './src/js/offer-processing/schedule-offer';
import SignUp from './src/js/account/sign-up';
import ForgotPassword from './src/js/account/forgot-password';
import Otp from './src/js/account/otp';
import Loader from './src/js/common/components/loader';
import Payment from './src/js/offer-processing/payment';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }} initialRouteName={Home}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Slides" component={Slides} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={Otp} />

        <Stack.Screen name="SideMenu" component={SideMenu} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />

        <Stack.Screen name="TargetZone" component={TargetZone} />
        <Stack.Screen name="AgeGender" component={AgeGender} />
        <Stack.Screen name="Interest" component={Interest} />
        <Stack.Screen name="OtherInfo" component={OtherInfo} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="ScheduleOffer" component={ScheduleOffer} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="PaymentSumary" component={PaymentSumary} />
        <Stack.Screen name="Payment" component={Payment} />

        <Stack.Screen name="StepOne" component={StepOne} />
        <Stack.Screen name="StepTwo" component={StepTwo} />
        <Stack.Screen name="StepThree" component={StepThree} />
        <Stack.Screen name="StepFour" component={StepFour} />
        <Stack.Screen name="StepFive" component={StepFive} />
        <Stack.Screen name="StepSix" component={StepSix} />
        <Stack.Screen name="StepSeven" component={StepSeven} />
        <Stack.Screen name="StepEight" component={StepEight} />
      </Stack.Navigator>

      {/* <Loader /> */}
    </NavigationContainer>
  );
};

export default MyStack;
