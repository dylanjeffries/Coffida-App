import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      locationData: [],
    };
  }

  componentDidMount() {
    fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': 'b9e4cf52ec7c8ec2fa3f91399727c9e6',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({locationData: json});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.flexOne}>
        <View style={styles.header}>
          <Text>Header</Text>
        </View>
        <View style={styles.search}>
          <Text>Search</Text>
        </View>
        <View style={styles.locations}>
          <FlatList
            style={styles.list}
            data={this.state.locationData}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Image
                  style={styles.photo}
                  source={{
                    uri:
                      'https://i.gyazo.com/771bfc70d7172a89147a76323d482570.png',
                  }}
                />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.location_name}</Text>
                  <Text style={styles.town}>{item.location_town}</Text>
                  <View style={styles.rating_reviews}>
                    <Text style={styles.flexOne}>
                      Overall Rating: {item.avg_overall_rating}
                    </Text>
                    <Text style={styles.flexOne}>
                      Reviews: {item.location_reviews.length}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
  list: {
    padding: 20,
  },
  item: {
    backgroundColor: '#99d0ef',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 20,
    borderRadius: 6,
  },
  photo: {
    backgroundColor: '#1d7cb0',
    resizeMode: 'contain',
    height: 70,
    width: 70,
  },
  details: {
    flex: 1,
    paddingLeft: 6,
  },
  name: {
    fontSize: 18,
  },
  town: {
    paddingBottom: 3,
  },
  rating_reviews: {
    flexDirection: 'row',
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  header: {
    flex: 2,
    backgroundColor: 'blue',
  },
  search: {
    flex: 2,
    backgroundColor: 'green',
  },
  locations: {
    flex: 24,
    backgroundColor: '#33a1de',
  },
  navigation: {
    flex: 2,
    backgroundColor: 'red',
  },
});

export default Locations;
