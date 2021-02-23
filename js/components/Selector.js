import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
      <View style={[styles.container, this.props.style]}>
        {this.props.text !== undefined ? (
          <Text style={styles.textAndIcon}>{this.props.text}</Text>
        ) : null}
        <Ionicons
          style={styles.textAndIcon}
          name={this.props.icon.name}
          size={this.props.icon.size}
          color={this.props.icon.color}
        />
        <View style={styles.valueContainer}>
          <Text style={[styles.value, this.props.valueStyle]}>
            {this.getLabel()}
          </Text>
          <Ionicons
            style={styles.downArrow}
            name="caret-down-sharp"
            size={12}
            color="black"
          />
        </View>
        <Picker
          style={styles.picker}
          selectedValue={this.props.value}
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
  textAndIcon: {
    marginRight: 5,
    color: 'white',
  },
  valueContainer: {
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  value: {
    flexGrow: 1,
  },
  picker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0,
  },
});

export default Selector;
