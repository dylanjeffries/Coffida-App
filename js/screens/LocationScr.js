import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
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
      loading: true,
      location: {},
      reviewData: [],
    };
  }

  // Set Focus Listener for screen refresh
  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.onFocus());
  }

  // When screen comes into focus
  onFocus = () => {
    this.getLocation();
  };

  // Use API to collect location info and reviews and process reviews for list
  getLocation = async () => {
    let params = {loc_id: this.props.route.params.location_id};
    let locResponse = await API.getLocation(params);
    // Set favourite state
    locResponse.favourite = this.props.route.params.favourite;
    // Create empty liked reviews array
    let likedReviews = [];
    // Use API to get user info
    let likedResponse = await API.getUser();
    // Populate liked reviews array with ids of liked reviews
    for (var i = 0; i < likedResponse.json.liked_reviews.length; i++) {
      likedReviews.push(likedResponse.json.liked_reviews[i].review.review_id);
    }
    // Empty array for temporary storage of reviews
    let reviewData = [];
    // Loop over every review for the location
    for (var i = 0; i < locResponse.location_reviews.length; i++) {
      // Test if each review is included in the liked reviews array and set accordingly
      locResponse.location_reviews[i].liked = likedReviews.includes(
        locResponse.location_reviews[i].review_id,
      );
      // Process each review into review and location pairing for ReviewItem
      reviewData.push({
        review: locResponse.location_reviews[i],
        location: locResponse,
      });
    }
    // Set location and reviewData in state
    this.setState({
      loading: false,
      location: locResponse,
      reviewData: reviewData,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          textStyle={styles.spinner}
          visible={this.state.loading}
          textContent="Loading..."
        />
        <Header style={styles.header} />
        <View style={styles.body}>
          <LocationItem item={this.state.location} disabled={true} />
          <View style={styles.reviewsBar}>
            <Text style={styles.reviewsBarText}>Reviews</Text>
            <Ionicons.Button
              name="add-outline"
              size={30}
              onPress={() =>
                this.props.navigation.navigate('Add Review', {
                  location_id: this.state.location.location_id,
                })
              }
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
  spinner: {
    textAlignVertical: 'center',
    color: 'white',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 14,
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
