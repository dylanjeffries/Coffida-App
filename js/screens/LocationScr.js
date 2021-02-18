import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';
import {Colors} from '../resources/Colors';

class LocationScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location_id: this.props.route.params.location_id,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <Text>{this.state.location_id}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue_5,
  },
  header: {
    flex: 2,
  },
  body: {
    flex: 28,
    alignItems: 'center',
  },
});

export default LocationScr;
