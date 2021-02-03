import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={styles.flexOne}>
        <Text>My Reviews</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
    backgroundColor: '#33a1de',
  },
});

export default MyReviews;
