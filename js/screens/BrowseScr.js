import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';
import {Colors} from '../resources/Colors';
import API from '../API';
import Selector from '../components/Selector';
import LocationItem from '../components/LocationItem';
import Header from '../components/Header';
import Button from '../components/Button';

const ratingItems = [
  {label: 'Any', value: 0},
  {label: '1+', value: 1},
  {label: '2+', value: 2},
  {label: '3+', value: 3},
  {label: '4+', value: 4},
  {label: '5', value: 5},
];

const rangeItems = [
  {label: 'Any', value: -1},
  {label: '200m', value: 200},
  {label: '500m', value: 500},
  {label: '1km', value: 1000},
  {label: '2km', value: 2000},
  {label: '5km', value: 5000},
];

class BrowseScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      overallMin: 0,
      priceMin: 0,
      qualityMin: 0,
      clenlinessMin: 0,
      rangeMax: -1,
      searchQuery: '',
    };
  }

  // Set Focus Listener for screen refresh
  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.onFocus());
  }

  // When screen comes into focus
  onFocus = () => {
    this.findLocations();
  };

  // Ask for permission to use device geolocation
  requestLocationPermission = async () => {
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Fetch and store device geolocation
  getDeviceLocation = async () => {
    let permissionGranted = await this.requestLocationPermission();
    if (permissionGranted) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            reject(null);
          },
          (error) => {
            Alert.alert(error.message);
            reject(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      });
    }
    console.log('two');
  };

  // Use API to find locations that comply with set filters
  findLocations = async () => {
    let body = {
      q: this.state.searchQuery,
      overall_rating: this.state.overallMin,
      price_rating: this.state.priceMin,
      quality_rating: this.state.qualityMin,
      clenliness_rating: this.state.clenlinessMin,
    };
    // Use API to get info on all locations
    let findResponse = await API.getFind(body);
    // Use API to get user info, here we want to get the user's favourite locations
    let favResponse = await API.getUser();
    // Fetch device geolocation
    let geolocation = await this.getDeviceLocation();
    // Map favourite locations array to new array containing only favourite location ids
    let favourites = favResponse.json.favourite_locations.map(
      (x) => x.location_id,
    );
    // Set favourite and distance for every location
    for (var i = 0; i < findResponse.length; i++) {
      findResponse[i].favourite = favourites.includes(
        findResponse[i].location_id,
      );
      findResponse[i].distance = getDistance(geolocation, {
        latitude: findResponse[i].latitude,
        longitude: findResponse[i].longitude,
      });
    }
    // Set state locationData to locations found, apply distance filter if required
    if (this.state.rangeMax !== -1) {
      this.setState({
        locationData: findResponse.filter(
          (x) => x.distance <= this.state.rangeMax,
        ),
      });
    } else {
      this.setState({locationData: findResponse});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.filter}>
          <View style={styles.filterRow}>
            <Selector
              items={ratingItems}
              icon={{name: 'checkmark-circle', size: 20, color: 'white'}}
              onValueChange={(overallMin) => this.setState({overallMin})}
              value={this.state.overallMin}
            />
            <Selector
              items={ratingItems}
              icon={{name: 'cash', size: 20, color: 'white'}}
              onValueChange={(priceMin) => this.setState({priceMin})}
              value={this.state.priceMin}
            />
            <Selector
              items={ratingItems}
              icon={{name: 'ribbon', size: 20, color: 'white'}}
              onValueChange={(qualityMin) => this.setState({qualityMin})}
              value={this.state.qualityMin}
            />
            <Selector
              items={ratingItems}
              icon={{name: 'trash', size: 20, color: 'white'}}
              onValueChange={(clenlinessMin) => this.setState({clenlinessMin})}
              value={this.state.clenlinessMin}
            />
          </View>
          <View style={styles.filterRow}>
            <Selector
              style={styles.range}
              valueStyle={styles.rangeValue}
              items={rangeItems}
              icon={{name: 'locate-outline', size: 20, color: 'white'}}
              onValueChange={(rangeMax) => this.setState({rangeMax})}
              value={this.state.rangeMax}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              onChangeText={(searchQuery) => this.setState({searchQuery})}
              value={this.state.searchQuery}
              textAlign="center"
            />
            <Button
              style={styles.refresh}
              icon={{name: 'refresh-outline', size: 30, color: 'white'}}
              onPress={() => this.findLocations()}
            />
          </View>
        </View>
        <View style={styles.locations}>
          <FlatList
            style={styles.list}
            data={this.state.locationData}
            renderItem={({item}) => (
              <LocationItem item={item} navigation={this.props.navigation} />
            )}
            keyExtractor={(item, index) => item.location_id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  filter: {
    flex: 2,
    paddingBottom: 8,
    backgroundColor: Colors.blue_6,
  },
  filterRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  range: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rangeValue: {
    width: 65,
  },
  searchBar: {
    flex: 2,
    marginHorizontal: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  refresh: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  locations: {
    flex: 12,
    backgroundColor: Colors.blue_5,
  },
  list: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
});

export default BrowseScr;
