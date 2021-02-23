import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import ValidationText from './ValidationText';

class ValidatedTextInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={
            this.props.paragraphMode === true ? styles.paragraph : styles.single
          }
          placeholder={this.props.placeholder}
          onChangeText={this.props.onTextChange}
          value={this.props.value}
          secureTextEntry={this.props.secureTextEntry}
          multiline={this.props.paragraphMode === true ? true : false}
        />
        <ValidationText
          style={styles.validationText}
          text={this.props.validationText}
          hide={this.props.hide}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  single: {
    padding: 5,
    borderRadius: 30,
    marginBottom: 5,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  paragraph: {
    flexGrow: 1,
    padding: 15,
    borderRadius: 20,
    marginBottom: 5,
    textAlignVertical: 'top',
    backgroundColor: 'white',
  },
  validationText: {
    alignSelf: 'center',
  },
});

export default ValidatedTextInput;
