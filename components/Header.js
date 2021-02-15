import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Colors} from '../resources/Colors';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image style={styles.logo} source={require('../resources/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue_7,
  },
  logo: {
    flex: 1,
    width: '30%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Header;
