import {AsyncStorage} from 'react-native';

export const LOGIN_DETAILS = 'isLoggedIn';

export const onSignIn = () => AsyncStorage.setItem(LOGIN_DETAILS, 'true');

export const onSignOut = () => AsyncStorage.removeItem(LOGIN_DETAILS);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(LOGIN_DETAILS)
      .then((res) => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => reject(err));
  });
};
