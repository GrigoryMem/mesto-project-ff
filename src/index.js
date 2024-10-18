// @todo: Темплейт карточки
import './pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from "./scripts/cards.js";


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






// подключение файлов эксперимент:

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
// const arkhyz = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');
// const chelyabinsk = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');
// const ivanovo = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');
// const kamchatka = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');
// const kholmogorskyRayon = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');
// const baikal = new URl('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');
// const avatar = new URL ('./images/avatar.jpg', import.meta.url);
// // const fontInterBlack = new URL('./vendor/fonts/Inter-Black.woff2', import.meta.url);
// // const fontInterMedium = new URL('./vendor/fonts/Inter-Medium.woff2', import.meta.url);
// // const fontInterRegular = new URL('./vendor/fonts/Inter-Regular.woff2', import.meta.url);

// const files = [
//   {
//     name: "Архыз",
//     link: arkhyz
//   },
//   {
//     name: "Челябинская область",
//     link: chelyabinsk
//   },
//   {
//     name: "Иваново",
//     link: ivanovo
//   },
//   {
//     name: "Камчатка",
//     link: kamchatka
//   },
//   {
//     name: "Холмогорский район",
//     link: kholmogorskyRayon
//   },
//   {
//     name: "Байкал",
//     link: baikal
//   },
//   {
//     name: "Avatar",
//     link: avatar
//   }
  
// ];