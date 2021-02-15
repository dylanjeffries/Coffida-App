import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import API from '../API';
import Header from '../components/Header';
import {Colors} from '../resources/Colors';

class MyReviewsScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
            data={this.state.reviewData}
            renderItem={({item}) => <Text>{item.review.review_body}</Text>}
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
});

export default MyReviewsScr;
