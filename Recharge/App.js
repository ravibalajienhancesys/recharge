/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {isSignedIn} from './src/component/Authentication';
import LoginScreen from './src/screen/login/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
  }

  componentDidMount() {
    isSignedIn()
      .then((res) => this.setState({signedIn: res, checkedSignIn: true}))
      .catch((err) => alert('An error occurred'));
  }

  render() {
    const {checkedSignIn, signedIn} = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    // if (!checkedSignIn) {
    //   return null;
    // }

    return signedIn ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={LoginScreen} />
          <Tab.Screen name="Profile" component={LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
