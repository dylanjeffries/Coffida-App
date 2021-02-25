import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {Colors} from '../resources/Colors';
import Button from './Button';
import IconText from './IconText';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.left} />
        <Image style={styles.logo} source={require('../resources/logo.png')} />
        <Button
          style={styles.help}
          icon={{
            name: 'help-circle-outline',
            size: 35,
            color: 'white',
          }}
          onPress={() => this.setState({showDialog: true})}
        />
        <ConfirmDialog
          visible={this.state.showDialog}
          title="Help"
          positiveButton={{
            titleStyle: {color: 'black'},
            title: 'OK',
            onPress: () => this.setState({showDialog: false}),
          }}>
          <View>
            <Text style={[styles.blackText, styles.title]}>Icons</Text>
            <IconText
              textStyle={styles.blackText}
              icon={{
                name: 'checkmark-circle',
                size: 25,
                color: 'black',
              }}
              text="  Overall Rating"
            />
            <IconText
              textStyle={styles.blackText}
              icon={{
                name: 'cash',
                size: 25,
                color: 'black',
              }}
              text="  Price Rating"
            />
            <IconText
              textStyle={styles.blackText}
              icon={{
                name: 'ribbon',
                size: 25,
                color: 'black',
              }}
              text="  Quality Rating"
            />
            <IconText
              textStyle={styles.blackText}
              icon={{
                name: 'trash',
                size: 25,
                color: 'black',
              }}
              text="  Clenliness Rating"
            />
            <IconText
              textStyle={styles.blackText}
              icon={{
                name: 'locate-outline',
                size: 25,
                color: 'black',
              }}
              text="  Location range"
            />
          </View>
          <Text style={[styles.blackText, styles.title]}>Relevant Topics</Text>
          <Text style={styles.blackText}>
            A review's text body only allows "relevant topics", such topics
            explicitly include opinions on coffee and mentions of tea, cakes,
            and pastries are not allowed.
          </Text>
        </ConfirmDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.blue_7,
  },
  left: {
    flex: 3,
  },
  logo: {
    flex: 4,
    alignSelf: 'center',
    margin: 70,
    resizeMode: 'contain',
  },
  help: {
    flex: 3,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  blackText: {
    color: 'black',
  },
});

export default Header;
