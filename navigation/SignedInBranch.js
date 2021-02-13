import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';

import Browse from '../screens/Browse';
import MyReviews from '../screens/MyReviews';
import MyProfile from '../screens/MyProfile';

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
            } else if (route.name === 'My Profile') {
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
        <Tab.Screen name="Browse" component={Browse} />
        <Tab.Screen name="My Reviews" component={MyReviews} />
        <Tab.Screen name="My Profile" component={MyProfile} />
      </Tab.Navigator>
    );
  }
}

export default SignedInBranch;
