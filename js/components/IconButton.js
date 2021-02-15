import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';

class IconButton extends Component {
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
        <Ionicons
          name={this.props.name}
          size={this.props.size}
          color={this.props.color}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blue_7,
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
});

export default IconButton;
