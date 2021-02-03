import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Locations from './screens/Locations';
import MyReviews from './screens/MyReviews';
import MyProfile from './screens/MyProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SignedIn = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Locations" component={Locations} />
      <Tab.Screen name="MyReviews" component={MyReviews} />
      <Tab.Screen name="MyProfile" component={MyProfile} />
    </Tab.Navigator>
  );
};

class CoffidaApp extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignedIn" component={SignedIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default CoffidaApp;
