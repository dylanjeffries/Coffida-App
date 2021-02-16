import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import API from '../API';
import Header from '../components/Header';
import ReviewItem from '../components/ReviewItem';
import {Colors} from '../resources/Colors';

class MyReviewsScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      reviewData: [],
      imageUrl: '',
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
  getReviewData = () => {
    API.getUser().then((response) => {
      this.setState({reviewData: response.reviews});
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
    flex: 2,
  },
  body: {
    flex: 28,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default MyReviewsScr;
