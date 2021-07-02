export default class UserInfo {
  constructor(userData) {
    this._userData = userData;
  }

  getUserInfo() {
    //возвращает объект с данными пользователя
    return {
      name: this._userData.name.textContent,
      about: this._userData.about.textContent
    }
  }

  setUserInfo(newData) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._userData.name.textContent = newData.name;
    this._userData.about.textContent = newData.about;
  }

  updateAvatar(newData) {
    this._userData.avatar.src = newData.avatar;
  }
}
