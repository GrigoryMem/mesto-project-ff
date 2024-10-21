import { openModal } from "./modal";

export function createCard(data, removeCard, likeCard, template, openCard) {
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const image = cardExample.querySelector('.card__image');
  // открытие картинки
  const popupZoom = document.querySelector('.popup_type_image');
  
  //установить значения вложенных элементов
  cardExmpImg.src = data.link;
  cardExample.querySelector('.card__title').textContent = data.name;
  cardExmpImg.alt = data.name;

  // событие - удаление карточки
  cardExample.querySelector('.card__delete-button').addEventListener('click',()=> {
    removeCard(cardExample);
  })

  // событие - поставить лайк
  cardLikeBtn.addEventListener('click',()=> {
    likeCard(cardLikeBtn);
  })
  // cобытие открыто картинку
  image.addEventListener('click',()=>{
    // получаем поля зума
    openCard(cardExample,popupZoom,image)
  })
  
   



  return cardExample;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки

export function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}

// Открытие попапа с картинкой
export function openCard(card,popup,image) {
  const imgPopup = popup.querySelector('.popup__image');
  const captionPopup = popup.querySelector('.popup__caption');
  imgPopup.src = image.src;
  captionPopup.textContent = card.querySelector('.card__title').textContent;
  openModal(popup);
}


// @todo: Вывести карточки на страницу

export function renderCards(initialCards,placesList,template,openCard) {
  initialCards.forEach((item) => placesList.append(createCard(item,removeCard,likeCard,template,openCard)));
}
  

