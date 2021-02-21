import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Colors} from '../resources/Colors';
import IconButton from './IconButton';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left} />
        <Image style={styles.logo} source={require('../resources/logo.png')} />
        <IconButton
          buttonStyle={styles.help}
          name={'help-circle-outline'}
          size={35}
          color={'white'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.blue_7,
  },
  left: {
    flex: 3,
  },
  logo: {
    flex: 4,
    alignSelf: 'center',
    margin: 70,
    resizeMode: 'contain',
  },
  help: {
    flex: 3,
    backgroundColor: 'transparent',
  },
});

export default Header;
