import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';

import BrowseNav from './BrowseNav';
import MyReviewsScr from '../screens/MyReviewsScr';
import MyAccountNav from './MyAccountNav';

const Tab = createBottomTabNavigator();

class SignedInBranch extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Browse') {
              iconName = focused ? 'cafe' : 'cafe-outline';
            } else if (route.name === 'My Reviews') {
              iconName = focused ? 'reader' : 'reader-outline';
            } else if (route.name === 'My Account') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeBackgroundColor: Colors.blue_7,
          inactiveBackgroundColor: Colors.blue_7,
          activeTintColor: Colors.active,
          inactiveTintColor: 'white',
          style: {
            height: '8%',
            borderTopWidth: 5,
            borderBottomWidth: 5,
            borderTopColor: Colors.blue_7,
            borderBottomColor: Colors.blue_7,
          },
          labelStyle: {
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name="Browse"
          component={BrowseNav}
          listeners={({navigation}) => ({
            tabPress: () => {
              navigation.navigate('Browse');
            },
          })}
        />
        <Tab.Screen name="My Reviews" component={MyReviewsScr} />
        <Tab.Screen name="My Account" component={MyAccountNav} />
      </Tab.Navigator>
    );
  }
}

export default SignedInBranch;
