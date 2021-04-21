import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardImage, cardTitle) {
    //вставляем в попап картинку, атрибут src и подпись
    super.open();
    const lightboxImg = this._popup.querySelector('.popup__photo');
    const lightboxFigcap = this._popup.querySelector('.popup__figcaption');

    lightboxImg.src = cardImage.src;
    lightboxImg.alt = cardImage.alt;
    lightboxFigcap.textContent = cardTitle.textContent;
  }
}
