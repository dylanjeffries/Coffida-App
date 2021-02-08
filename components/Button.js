import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../resources/colors.js';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={
          this.props.disabled
            ? [styles.button, styles.disabled, this.props.buttonStyle]
            : [styles.button, this.props.buttonStyle]
        }
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue_7,
    padding: 10,
    borderRadius: 30,
    marginBottom: 30,
    width: '30%',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: 'white',
  },
});

export default Button;
