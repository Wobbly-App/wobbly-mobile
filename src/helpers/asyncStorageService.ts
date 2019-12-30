import AsyncStorage from "@react-native-community/async-storage";

interface ITokenObj {
    access_token: string,
    refresh_token: string
}

const asyncStorageService = (function() {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  async function _setToken(tokenObj: ITokenObj) {
    await AsyncStorage.setItem("access_token", tokenObj.access_token);
    await AsyncStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  async function _getAccessToken() {
    return await AsyncStorage.getItem("access_token");
  }
  async function _getRefreshToken() {
    return await AsyncStorage.getItem("refresh_token");
  }
  async function _clearToken() {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken
  };
})();

export default asyncStorageService;
