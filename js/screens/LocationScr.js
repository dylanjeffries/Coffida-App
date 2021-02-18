import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import API from '../API';
import Header from '../components/Header';
import LocationItem from '../components/LocationItem';
import {Colors} from '../resources/Colors';

class LocationScr extends Component {
  constructor(props) {
    super(props);
    this.state = {location: {}};
    this.getLocation();
  }

  getLocation = () => {
    let params = {loc_id: this.props.route.params.id};
    API.getLocation(params).then((response) => {
      response.favourite = this.props.route.params.favourite;
      this.setState({location: response});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <LocationItem item={this.state.location} disabled={true} />
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
    //alignItems: 'center',
    padding: 20,
    width: '100%',
  },
});

export default LocationScr;
