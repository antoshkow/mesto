export default class UserInfo {
  constructor(userData) {
    this._userData = userData;
  }

  getUserInfo() {
    //возвращает объект с данными пользователя
    return {
      name: this._userData.name.textContent,
      bio: this._userData.bio.textContent
    }
  }

  setUserInfo(newData) {
    //принимает новые данные пользователя и добавляет их на страницу
    this._userData.name.textContent = newData.name;
    this._userData.bio.textContent = newData.bio;
  }
}
