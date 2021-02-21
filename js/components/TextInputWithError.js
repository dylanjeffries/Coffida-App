import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

class TextInputWithError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.containerStyle}>
        <TextInput
          style={[styles.input, this.props.inputStyle]}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          multiline={true}
          textAlign={
            this.props.textAlign !== undefined ? this.props.textAlign : 'center'
          }
          secureTextEntry={this.props.secureTextEntry}
        />
        <Text
          style={
            this.props.showError
              ? styles.error
              : [styles.error, styles.transparent]
          }>
          {this.props.errorText}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  error: {
    padding: 5,
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 12,
    backgroundColor: 'white',
    color: 'red',
  },
  transparent: {
    opacity: 0,
  },
});

export default TextInputWithError;
