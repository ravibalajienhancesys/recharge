import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from 'react-native';
import TextInput from './../../component/FloatingTitleTextInputField';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../component/Loader';
import {navigate} from './../../../App';

const dimensions = Dimensions.get('window');

const INPUT_HEIGHT = 40;
const INPUT_WIDTH = '97.8%';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};

    this.state = {
      appType: global.appType,
      isCountryCodeVisible: false,
      username: '',
      password: '',
      hidePassword: true,
      changeIPModal: false,
      changeCountryModal: false,
      logo: require('./../../images/FreshOnTable.png'),
      appName: 'FreshonTable',
    };
  }

  showWebViewState = () => {
    this.props.navigation.navigate('ViewWebPage', {
      title: 'Privacy Policy',
      type: 'privacy_policy',
    });
  };

  showWebViewTerms = () => {
    this.props.navigation.navigate('ViewWebPage', {
      title: 'Terms',
      type: 'terms_condition',
    });
  };

  _handlingForgotpassword = () => {
    navigation.navigate('ForgotPassword');
  };

  _SignIn = () => {
    if (this.state.username.length == 0 || this.state.password.length == 0) {
      alert('Error');
      return;
    }
  };

  onClickSignup = () => {
    this.props.navigation.navigate('RegistrationPage', {
      selectedCountry: global.country,
      applicationType: global.applicationType,
    });
  };

  _updateMasterState = (attrName, value) => {
    if (attrName === 'username') {
      let text = value.trim();
      var changeipModal = false;
      var changeCountryModal = false;
      if (text == 'ALTERFOTIP') {
        changeipModal = true;
      }
      if (text == 'ALTERFOTCOUNTRY') {
        changeCountryModal = true;
      }
      isCountryCodeVisible = false;
      if (!isNaN(text) && text.length > 8) {
        isCountryCodeVisible = true;
        if (text.charAt(0) == 0) {
          text = text.substr(1);
        }
      }
      this.setState({
        isCountryCodeVisible: isCountryCodeVisible,
        username: text,
        changeIPModal: changeipModal,
        changeCountryModal: changeCountryModal,
      });
    } else {
      this.setState({[attrName]: value});
    }
  };

  _handleUserName = (Usertext) => {
    let text = Usertext.trim();
    var changeipModal = false;
    var changeCountryModal = false;
    if (text == 'FORCEIP123') {
      changeipModal = true;
    }
    if (text == 'COUNTRY@123') {
      changeCountryModal = true;
    }
    isCountryCodeVisible = false;
    if (!isNaN(text) && text.length > 8) {
      isCountryCodeVisible = true;
      if (text.charAt(0) == 0) {
        text = text.substr(1);
      }
    }
    this.setState({
      isCountryCodeVisible: isCountryCodeVisible,
      username: text,
      changeIPModal: changeipModal,
      changeCountryModal: changeCountryModal,
    });
  };

  focusNextField(id) {
    this.inputs[id].focus();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{
          backgroundColor: 'white',
          width: '100%',
        }}
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            resizeMode="cover"
            borderRadius={15}
            style={{
              marginTop:
                dimensions.height < 600
                  ? dimensions.height / 35
                  : dimensions.height / 20,
              borderColor: '#fff',
              alignItems: 'flex-end',
              width: dimensions.width / 7,
              height: dimensions.width / 7,
            }}
            source={this.state.logo}
          />
        </View>

        <View style={styles.loginContainer}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: dimensions.height / 80,
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: responsiveFontSize(4.5),
                }}>
                Login to your
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: dimensions.height / 80,
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: responsiveFontSize(4),
                  fontWeight: 'bold',
                }}>
                Account
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop:
                global.flavor === 'consumer'
                  ? dimensions.height / 80
                  : dimensions.height / 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: INPUT_HEIGHT,
                width: INPUT_WIDTH,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}>
              {this.state.isCountryCodeVisible && (
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.3),
                    color: '#fff',
                    width: 50,
                    marginLeft: 6,
                    textAlign: 'center',
                  }}>
                  {'+' + global.country['mobile-code']}
                </Text>
              )}
              <TextInput
                attrName="username"
                title={'Username'}
                updateMasterState={this._updateMasterState}
                style={{
                  height: 45,
                  color: '#fff',
                  fontSize: responsiveFontSize(2.3),
                }}
                value={this.state.username}
                onChangeText={(text) => this._handleUserName(text)}
                type="text"
                selectionColor="white"
                onRef={(ref) => {
                  this.inputs.username = ref;
                }}
                onSubmitEditing={() => {
                  this.focusNextField('password');
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: INPUT_HEIGHT,
                width: INPUT_WIDTH,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                attrName="password"
                title={'Password'}
                updateMasterState={this._updateMasterState}
                selectionColor="white"
                secureTextEntry={this.state.hidePassword}
                style={{
                  height: 45,
                  color: '#fff',
                  fontSize: responsiveFontSize(2.3),
                }}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                onRef={(ref) => {
                  this.inputs.password = ref;
                }}
                onSubmitEditing={() => this._SignIn()}
              />
            </View>
          </View>
          {global.flavor == 'delivery' ? null : (
            <View style={styles.forgotView}>
              <TouchableOpacity
                style={[styles.forgot]}
                onPress={() => navigate('ForgotPassword')}>
                <Text style={[styles.forgotText]}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{flexDirection: 'row', marginTop: dimensions.height / 25}}>
            <TouchableHighlight
              onPress={() => this._SignIn()}
              style={styles.SignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableHighlight>
            {/*{global.flavor == "delivery" ? null : (<TouchableHighlight*/}
            {/*    onPress={this.onClickSignup}*/}
            {/*    style={styles.SignUp}*/}
            {/*>*/}
            {/*    <Text style={styles.buttonText1}>{strings("signUp_lbl")}</Text>*/}
            {/*</TouchableHighlight>)}*/}
          </View>
          {global.flavor == 'delivery' ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: dimensions.height / 80,
              }}>
              <Text style={{color: 'black', fontSize: responsiveFontSize(2)}}>
                New User?{' '}
              </Text>
              <Text
                style={{
                  color: '#1a73e8',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2),
                }}
                onPress={() => this.onClickSignup()}>
                Sign Up
              </Text>
            </View>
          )}

          <View
            style={{
              marginTop: dimensions.height / 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={[styles.termsNcondition]}>
              By creating an account or logging in, you agree to Recharge
              <Text> </Text>
              <Text
                style={[styles.termsNconditionLink]}
                onPress={() => {
                  this.showWebViewTerms();
                }}>
                Terms of Use
              </Text>
              <Text> </Text>
              <Text>and</Text>
              <Text> </Text>
              <Text
                style={[styles.termsNconditionLink]}
                onPress={() => {
                  this.showWebViewState();
                }}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          <View />
        </View>
        <Loader ref="load" />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  forgotText: {
    color: 'grey',
    textAlign: 'center',
    fontSize: responsiveFontSize(1.5),
  },
  welcome: {
    marginTop: dimensions.height / 80,
    color: 'black',
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
  },

  skipLogin: {
    backgroundColor: '#8EC044',
    paddingVertical: 15,
    marginTop: 20,
    width: dimensions.width / 2,
    alignSelf: 'center',
  },
  forgot: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
  forgotView: {
    flex: 1,
    marginTop: dimensions.height / 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonText1: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  SignIn: {
    borderRadius: dimensions.width,
    alignItems: 'center',
    width: '100%',
    height: dimensions.height / 13,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
  },
  SignUp: {
    marginLeft: 20,
    borderRadius: dimensions.width / 40,
    alignItems: 'center',
    width: dimensions.width / 2.5,
    height: dimensions.height / 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  input: {
    height: dimensions.height / 20,
    backgroundColor: 'transparent',
    marginBottom: 10,
    width: '80%',
    padding: 5,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  password: {
    height: dimensions.height / 20,
    backgroundColor: 'transparent',
    marginBottom: 10,
    width: '60%',
    padding: 5,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },

  loginContainer: {
    marginTop: dimensions.height / 30,
    flex: 1,
    flexGrow: 0,
    justifyContent: 'center',
    margin: '8%',
  },
  title: {
    color: '#FFF',
    marginTop: 200,
    width: 180,
    textAlign: 'center',
    opacity: 0.9,
  },
  backgroundImage: {
    flex: 1,
    // width: undefined,
    // height: undefined,
    // flexDirection: 'column',
    // backgroundColor:'transparent',
    // justifyContent: 'flex-start',
  },

  hairline: {
    backgroundColor: 'grey',
    width: '43%',
    height: 2,
    top: 8,
  },
  loginButtonBelowText1: {
    color: 'grey',
    paddingRight: 13,
    paddingLeft: 13,
    fontWeight: '600',
    alignItems: 'center',
    fontSize: responsiveFontSize(1.5),
  },
  spinnerTextStyle: {
    color: '#ffffff',
    fontSize: 15,
  },
  termsNcondition: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: responsiveFontSize(1.5),
    color: 'black',
    marginTop: dimensions.height / 70,
    textAlign: 'center',
  },
  termsNconditionLink: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: '#1a73e8',
  },
});
