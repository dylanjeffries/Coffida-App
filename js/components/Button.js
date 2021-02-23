import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../resources/Colors';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          style={
            this.props.disabled
              ? [styles.button, styles.disabled, this.props.buttonStyle]
              : [styles.button, this.props.buttonStyle]
          }
          onPress={this.props.onPress}
          disabled={this.props.disabled}>
          {this.props.text !== undefined ? (
            <Text style={styles.text}>{this.props.text}</Text>
          ) : null}
          {this.props.icon !== undefined ? (
            <Ionicons
              style={[styles.icon, this.props.iconStyle]}
              name={this.props.icon.name}
              size={this.props.icon.size}
              color={this.props.icon.color}
            />
          ) : null}
          {this.props.textAfter !== undefined ? (
            <Text style={styles.text}>{this.props.textAfter}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  icon: {
    marginHorizontal: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.blue_7,
  },
  disabled: {
    opacity: 0.4,
  },
});

export default Button;
