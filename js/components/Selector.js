import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

class Selector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <RNPickerSelect
          placeholder={{}}
          items={this.props.items}
          onValueChange={this.props.onValueChange}
          useNativeAndroidPickerStyle={false}
          style={styles}
          Icon={this.props.icon}
          value={this.props.value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    borderTopWidth: 14,
    borderColor: 'white',
    borderRadius: 10,
    marginLeft: 25,
    backgroundColor: 'white',
    color: 'black',
  },
  iconContainer: {
    top: 6,
    left: 0,
  },
});

export default Selector;
