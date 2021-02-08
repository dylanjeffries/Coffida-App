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
          style={styles.textInput}
          placeholder={this.props.placeholder}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          textAlign={'center'}
          secureTextEntry={this.props.secureTextEntry}
        />
        <Text
          style={
            this.props.showError ? [styles.text, styles.error] : styles.text
          }>
          {this.props.showError ? this.props.errorText : null}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    borderRadius: 30,
  },
  text: {
    padding: 5,
    marginTop: 5,
    alignSelf: 'center',
    fontSize: 12,
  },
  error: {
    backgroundColor: 'white',
    color: 'red',
  },
});

export default TextInputWithError;
