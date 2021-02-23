import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import API from '../API';
import Header from '../components/Header';
import ReviewItem from '../components/ReviewItem';
import {Colors} from '../resources/Colors';

class MyReviewsScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: [],
    };
  }

  // Set Focus Listener for screen refresh
  componentDidMount() {
    this.props.navigation.addListener('focus', () => this.onFocus());
  }

  // When screen comes into focus
  onFocus = () => {
    this.getReviewData();
  };

  // Use API to get user reviews
  getReviewData = async () => {
    let response = await API.getUser();
    // Create empty liked reviews array
    let likedReviews = [];
    // Populate liked reviews array with ids of liked reviews
    for (var i = 0; i < response.json.liked_reviews.length; i++) {
      likedReviews.push(response.json.liked_reviews[i].review.review_id);
    }
    // Loop over every review for the user
    for (var i = 0; i < response.json.reviews.length; i++) {
      // Test if each review is included in the liked reviews array and set accordingly
      response.json.reviews[i].review.liked = likedReviews.includes(
        response.json.reviews[i].review.review_id,
      );
    }
    // Set reviewData in state
    this.setState({
      reviewData: response.json.reviews,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <FlatList
            style={styles.list}
            data={this.state.reviewData}
            renderItem={({item}) => (
              <ReviewItem
                item={item}
                refresh={() => this.getReviewData()}
                editable={true}
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
    flex: 1,
  },
  body: {
    flex: 14,
  },
  list: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
});

export default MyReviewsScr;
