import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';

import Root from './navigation/Root';

class CoffidaApp extends Component {
  componentDidMount() {
    global.user = {
      id: 0,
      token: '',
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    );
  }
}

export default CoffidaApp;
