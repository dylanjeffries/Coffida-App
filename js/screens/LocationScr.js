import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import API from '../API';
import Header from '../components/Header';
import LocationItem from '../components/LocationItem';
import ReviewItem from '../components/ReviewItem';
import {Colors} from '../resources/Colors';

class LocationScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      reviewData: [],
    };
    this.getLocation();
  }

  getLocation = () => {
    let params = {loc_id: this.props.route.params.id};
    API.getLocation(params).then((response) => {
      // Set favourite state
      response.favourite = this.props.route.params.favourite;
      // Empty array for temporary storage of reviews
      let reviewData = [];
      // Loop over every review for the location
      for (var i = 0; i < response.location_reviews.length; i++) {
        // Process each review into review and location pairing for ReviewItem
        reviewData.push({
          review: response.location_reviews[i],
          location: response,
        });
      }
      // Set location and reviewData in state
      this.setState({
        location: response,
        reviewData: reviewData,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <LocationItem item={this.state.location} disabled={true} />
          <View style={styles.reviewsBar}>
            <Text style={styles.reviewsBarText}>Reviews</Text>
            <Ionicons.Button
              name="add-outline"
              size={30}
              iconStyle={styles.addIcon}
              backgroundColor="transparent">
              <Text style={styles.reviewsBarText}>Add</Text>
            </Ionicons.Button>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.reviewData}
            renderItem={({item}) => (
              <ReviewItem
                item={item}
                editable={false}
                refresh={() => this.getLocation()}
              />
            )}
            keyExtractor={(item, index) => item.review.review_id.toString()}
          />
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
    padding: 20,
    width: '100%',
  },
  reviewsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: Colors.blue_7,
  },
  reviewsBarText: {
    fontSize: 16,
    color: 'white',
  },
  addIcon: {
    marginRight: 0,
    color: 'lime',
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default LocationScr;
