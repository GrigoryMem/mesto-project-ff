// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(data, removeCard, likeCard) {
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
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
  return cardExample;
}

// @todo: Функция удаления карточки

function removeCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки

function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу

function renderCards() {
  initialCards.forEach((item) => placesList.append(createCard(item,removeCard,likeCard)));
}
  
renderCards(); // отобразить карточки на странице