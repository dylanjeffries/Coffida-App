import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class ValidationText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={this.props.hide === true ? styles.hide : styles.show}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hide: {
    padding: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'white',
    opacity: 0,
  },
  show: {
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'white',
  },
});

export default ValidationText;
