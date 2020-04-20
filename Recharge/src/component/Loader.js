import React, {Component} from 'react';
import {View, Image, Modal, StyleSheet} from 'react-native';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: false,
    animationType: 'fade',
  };
  start = () => {
    this.setState({
      loading: true,
    });
  };

  stop = () => {
    this.setState({
      loading: false,
    });
  };
  render() {
    return (
      <Modal
        animationType={this.state.animationType}
        transparent={true}
        visible={this.state.loading}>
        <View style={StyleSheet.wrapper}>
          <View style={styles.loadContainer}>
            <Image
              style={styles.loaderImage}
              source={require('./../images/loading.gif')}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  loadContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
});
