export function createCard(data, removeCard, likeCard, template, openCard,openModal,closeModal,popupImage) {
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const image = cardExample.querySelector('.card__image');
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
  // cобытие открыть картинку
  image.addEventListener('click',()=>{
    openCard(cardExample,popupImage,image,openModal)
    // по кл escape
    document.addEventListener('keydown', closeModal);
    
  })
  // cобытие закрыть картинку
  popupImage.addEventListener('click',(event)=>{
    // стандартное закрытие изображения
    closeModal(event,popupImage);
   
    // по кл escape
    document.removeEventListener('keydown', closeModal);
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
export function openCard(card,popup,image,openModal) {
  const imgPopup = popup.querySelector('.popup__image');
  const captionPopup = popup.querySelector('.popup__caption');
  imgPopup.src = image.src;
  captionPopup.textContent = card.querySelector('.card__title').textContent;
  imgPopup.alt =  card.querySelector('.card__title').textContent;
  openModal(popup);
}

// @todo: Вывести карточки на страницу
// изменить параметры входящие функции на объект
export function renderCards(initialCards,placesList,template,openCard,openModal,closeModal,popupImage) {
  initialCards.forEach((item) => placesList.append(createCard(item,removeCard,likeCard,template,openCard,openModal,closeModal,popupImage)));
}
  

