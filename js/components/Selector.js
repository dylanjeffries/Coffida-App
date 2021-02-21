import {Picker} from '@react-native-picker/picker';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Selector extends Component {
  constructor(props) {
    super(props);
  }

  test = () => {
    return;
  };

  getLabel = () => {
    let match = this.props.items.find((item) => {
      return item.value === this.props.value;
    });
    return match !== undefined ? match.label : '---';
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.props.text !== undefined ? (
          <Text style={styles.text}>{this.props.text}</Text>
        ) : null}
        <Ionicons
          style={styles.icon}
          name={this.props.icon.name}
          size={this.props.icon.size}
          color={this.props.icon.color}
        />
        <Text style={[styles.value, this.props.valueStyle]}>
          {this.getLabel()}
        </Text>
        <Picker
          selectedValue={this.props.value}
          style={styles.picker}
          onValueChange={this.props.onValueChange}>
          {this.props.items.map((item) => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.label}
                color="black"
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    marginRight: 5,
    color: 'white',
  },
  value: {
    width: 50,
    height: '100%',
    paddingHorizontal: 8,
    borderRadius: 10,
    textAlignVertical: 'center',
    backgroundColor: 'white',
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    opacity: 0,
  },
});

export default Selector;
