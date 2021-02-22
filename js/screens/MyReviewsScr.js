import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import API from '../API';
import Header from '../components/Header';
import ReviewItem from '../components/ReviewItem';
import PhotoInput from '../components/PhotoInput';
import ValidatedTextInput from '../components/ValidatedTextInput';
import ValidationText from '../components/ValidationText';
import Selector from '../components/Selector';
import {Colors} from '../resources/Colors';
import CheckBox from '@react-native-community/checkbox';
import Button from '../components/Button';

class MyReviewsScr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      reviewData: [],
      imageUrl: '',
      selector: 1,
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
    this.setState({reviewData: response.json.reviews});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.body}>
          <PhotoInput style={styles.photo} />
          <ValidatedTextInput
            style={styles.textinput}
            placeholder="Validated Text Input"
            paragraphMode={false}
          />
          <ValidationText
            style={styles.vtext}
            text="Validation Text"
            hide={false}
          />
          <Selector
            style={styles.selector}
            items={[
              {label: 'One', value: 1},
              {label: 'Two', value: 2},
            ]}
            text="Text"
            icon={{name: 'ribbon', size: 20, color: 'white'}}
            value={1}
          />
          <View style={styles.checkbox}>
            <CheckBox
              style={styles.checkbox}
              value={true}
              tintColors={{true: 'white', false: 'white'}}
            />
          </View>
          <Button text="Button" buttonStyle={styles.loginButton} />
          <View style={styles.filler}>
            <Text>Filler</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.blue_5,
  },
  header: {
    flex: 1,
  },
  body: {
    width: '80%',
    flex: 14,
  },
  photo: {
    flex: 3,
    borderWidth: 2,
    borderColor: 'red',
  },
  textinput: {
    flex: 3,
    borderWidth: 2,
    borderColor: 'orange',
  },
  vtext: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'lime',
  },
  selector: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'pink',
  },
  checkbox: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'cyan',
  },
  filler: {
    flex: 5,
    borderWidth: 2,
    borderColor: 'yellow',
  },
  // body: {
  //   flex: 14,
  //   alignItems: 'center',
  // },
  // list: {
  //   width: '100%',
  //   padding: 20,
  //   marginBottom: 20,
  // },
  // image: {
  //   width: 100,
  //   height: 100,
  // },
  // <FlatList
  //           style={styles.list}
  //           data={this.state.reviewData}
  //           renderItem={({item}) => (
  //             <ReviewItem
  //               item={item}
  //               refresh={() => this.getReviewData()}
  //               editable={true}
  //             />
  //           )}
  //           keyExtractor={(item, index) => item.review.review_id.toString()}
  //         />
});

export default MyReviewsScr;
