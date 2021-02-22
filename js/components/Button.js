import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={
          this.props.disabled
            ? [styles.button, styles.disabled, this.props.style]
            : [styles.button, this.props.style]
        }
        onPress={this.props.onPress}
        disabled={this.props.disabled}>
        {this.props.text !== undefined ? (
          <Text style={styles.text}>{this.props.text}</Text>
        ) : null}
        {this.props.icon !== undefined ? (
          <Ionicons
            name={this.props.icon.name}
            size={this.props.icon.size}
            color={this.props.icon.color}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 30,
    backgroundColor: Colors.blue_7,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    color: 'white',
  },
});

export default Button;
