import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image, TextInput} from 'react-native';
import {Colors} from '../resources/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import Selector from '../components/Selector';
import LocationItem from '../components/LocationItem';

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

  componentDidMount() {
    this.findLocations();
  }

  findLocations = () => {
    fetch(
      'http://10.0.2.2:3333/api/1.0.0/find?q=' +
        this.state.searchQuery +
        '&overall_rating=' +
        this.state.overallMin +
        '&price_rating=' +
        this.state.priceMin +
        '&quality_rating=' +
        this.state.qualityMin +
        '&clenliness_rating=' +
        this.state.clenlinessMin,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': global.user.token,
        },
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({locationData: json});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.flexOne}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../resources/logo.png')}
          />
        </View>
        <View style={styles.filter}>
          <View style={styles.ratings}>
            <Selector
              items={ratingItems}
              onValueChange={(overallMin) => this.setState({overallMin})}
              icon={() => {
                return (
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                );
              }}
              value={this.state.overallMin}
            />
            <Selector
              items={ratingItems}
              onValueChange={(priceMin) => this.setState({priceMin})}
              icon={() => {
                return <Ionicons name="cash" size={20} color="white" />;
              }}
              value={this.state.priceMin}
            />
            <Selector
              items={ratingItems}
              onValueChange={(qualityMin) => this.setState({qualityMin})}
              icon={() => {
                return <Ionicons name="ribbon" size={20} color="white" />;
              }}
              value={this.state.qualityMin}
            />
            <Selector
              items={ratingItems}
              onValueChange={(clenlinessMin) => this.setState({clenlinessMin})}
              icon={() => {
                return <Ionicons name="trash" size={20} color="white" />;
              }}
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
            <Button text="Refresh" onPress={() => this.findLocations()} />
          </View>
        </View>
        <View style={styles.locations}>
          <FlatList
            padding={20}
            data={this.state.locationData}
            renderItem={({item}) => <LocationItem item={item} />}
            keyExtractor={(item, index) => item.location_id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  header: {
    flex: 2,
    backgroundColor: Colors.blue_7,
  },
  logo: {
    flex: 1,
    width: '30%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  filter: {
    flex: 4,
    backgroundColor: Colors.blue_6,
    alignItems: 'center',
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  locations: {
    flex: 24,
    backgroundColor: Colors.blue_5,
  },
  searchBar: {
    width: '60%',
    marginRight: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
});

export default BrowseScr;
