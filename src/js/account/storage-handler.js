import AsyncStorage from '@react-native-community/async-storage';

export default class SessionHandler {
  static user = null;

  constructor() {}

  static async setUser(user, onDone) {
    SessionHandler.user = user;
    await AsyncStorage.setItem('user', JSON.stringify(user), onDone);
  }

  static async getUser() {
    if (SessionHandler.user == null) {
      let user = await AsyncStorage.getItem('user');
      SessionHandler.user = JSON.parse(user);
    }

    return SessionHandler.user;
  }

  static async removeUser() {
    SessionHandler.user = null;
    await AsyncStorage.removeItem('user');
    return true;
  }
}
