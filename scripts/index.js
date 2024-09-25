// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(data){
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone = cardTemplate.cloneNode(true); 
  const cardExample =  cardTemplateClone.querySelector('.card');
  //установить значения вложенных элементов
  cardExample .querySelector('.card__image').src = data.link;
  cardExample .querySelector('.card__title').textContent = data.name;
  cardExample.querySelector('.card__image').alt = data.name;
  // удаление карточки
  removeCard(cardExample);
  // поставить лайк
  likeCard(cardExample);
  
  return cardExample;
}

// @todo: Функция удаления карточки

function removeCard(card){
  const cardDelBtn = card.querySelector('.card__delete-button');
  cardDelBtn.addEventListener('click',()=>{
    cardDelBtn.closest('.card').remove();
  })
}

// @todo: Функция лайка карточки

function likeCard(card){
  const cardLkBtn = card.querySelector('.card__like-button');
  cardLkBtn.addEventListener('click',()=>{
  cardLkBtn.classList.toggle('card__like-button_is-active');
  })
}

// @todo: Вывести карточки на страницу

initialCards.forEach(item => placesList.append(createCard(item)));
