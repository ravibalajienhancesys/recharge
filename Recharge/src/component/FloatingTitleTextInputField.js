import React, {Component} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import {string, func, object} from 'prop-types';
import {Icon} from 'react-native-elements';

const dimensions = Dimensions.get('window');

export default class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    otherTextInputProps: object,
  };

  static defaultProps = {
    keyboardType: 'default',
    otherTextInputAttributes: {},
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      hidePassword: true,
    };
  }

  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({isFieldActive: true});
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({isFieldActive: false});
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  };

  _onChangeText = (updatedValue) => {
    const {attrName, updateMasterState} = this.props;
    updateMasterState(attrName, updatedValue);
  };

  _returnAnimatedTitleStyles = () => {
    const {isFieldActive} = this.state;
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? 11.5 : 15,
      color: isFieldActive ? '#1a73e8' : 'dimgrey',
    };
  };

  onSubmitEditing() {
    this.props.onSubmitEditing();
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    let attributeName = this.props.attrName;
    let iconName = attributeName === 'username' ? 'user' : 'key';
    return (
      <View style={Styles.container}>
        <Animated.Text
          style={[Styles.titleStyles, this._returnAnimatedTitleStyles()]}>
          {this.props.title}
        </Animated.Text>

        <View style={{width: dimensions.height > 900 ? '5%' : '9%'}}>
          <Icon
            style={Styles.iconStyle}
            name={iconName}
            type="font-awesome"
            size={15}
            color={this.props.value != '' ? '#1a73e8' : 'grey'}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            width: dimensions.height > 900 ? '90%' : '80%',
          }}>
          <TextInput
            ref={(input) => (this.textInput = input)}
            onSubmitEditing={this.onSubmitEditing.bind(this)}
            value={this.props.value}
            style={[Styles.textInput, {width: '100%'}]}
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this._onChangeText}
            autoCapitalize="none"
            secureTextEntry={
              attributeName === 'password' && this.state.hidePassword
                ? true
                : false
            }
            {...this.props.otherTextInputProps}
          />
        </View>
        {attributeName === 'password' ? (
          <View style={{width: dimensions.height > 900 ? '5%' : '10%'}}>
            <Icon
              style={Styles.iconStyle}
              name={this.state.hidePassword ? 'eye-slash' : 'eye'}
              type="font-awesome"
              size={15}
              color={this.props.value != '' ? '#1a73e8' : 'grey'}
              onPress={() =>
                this.setState({hidePassword: !this.state.hidePassword})
              }
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    height: 50,
    marginVertical: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'grey',
  },
  textInput: {
    fontSize: 15,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    marginTop: 5,
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'Open_Sans',
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: Platform.OS === 'ios' ? 'Open Sans' : 'Open_Sans',
    left: 35,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
  },
  eyeIconStyle: {
    padding: 10,
    width: '5%',
  },
});
