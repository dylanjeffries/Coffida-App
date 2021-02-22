import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
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

class BrowseScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      searchQuery: '',
      overallMin: 0,
      priceMin: 0,
      qualityMin: 0,
      clenlinessMin: 0,
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

  // Use API to find locations that comply with set filters
  findLocations = async () => {
    let body = {
      q: this.state.searchQuery,
      overall_rating: this.state.overallMin,
      price_rating: this.state.priceMin,
      quality_rating: this.state.qualityMin,
      clenliness_rating: this.state.clenlinessMin,
    };
    // Find Locations API Call
    let findResponse = await API.getFind(body);
    // Create empty favourites array
    let favourites = [];
    // Use API to get user info
    let favResponse = await API.getUser();
    // Populate favourites array with ids of favourite locations
    for (var i = 0; i < favResponse.json.favourite_locations.length; i++) {
      favourites.push(favResponse.json.favourite_locations[i].location_id);
    }
    // Test if each location is included in the favourites array and set accordingly
    for (var i = 0; i < findResponse.length; i++) {
      findResponse[i].favourite = favourites.includes(
        findResponse[i].location_id,
      );
    }
    // Set location data to API result
    this.setState({locationData: findResponse});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.filter}>
          <View style={styles.ratings}>
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
          <View style={styles.search}>
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
    backgroundColor: Colors.blue_6,
    alignItems: 'center',
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  searchBar: {
    width: '60%',
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  refresh: {
    width: '30%',
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
