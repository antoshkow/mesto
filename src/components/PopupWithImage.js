import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, lightboxImg, lightboxFigcap) {
    super(popupSelector);
    this._lightboxImg = lightboxImg;
    this._lightboxFigcap = lightboxFigcap;
  }

  open(card) {
    //вставляем в попап картинку, атрибут src и подпись
    super.open();
    this._lightboxImg.src = card.link;
    this._lightboxImg.alt = card.name;
    this._lightboxFigcap.textContent = card.name;
  }
}
