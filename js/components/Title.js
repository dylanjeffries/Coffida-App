import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../resources/Colors';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.blue_7,
  },
});

export default Title;
