import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../home';
import MyOffers from '../my-offers';
import CustomMenu from './custom-menu';
import MyInterests from '../account/my-interests';
import Profile from '../account/profile';
import Favorites from '../my-offers/favorites';

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => {
        return <CustomMenu />;
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MyOffers" component={MyOffers} />
      <Drawer.Screen name="MyInterests" component={MyInterests} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Favorites" component={Favorites} />
    </Drawer.Navigator>
  );
}
