import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard,removeCard,likeCard } from'./scripts/components/card'; // функции для работы с карточками
import { initialCards } from './scripts/components/cards'; //данные карточек
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import './scripts/components/modal';
import { handleFormSubmit, autoFillForm, addNewCard } from './scripts/components/form';

const placesList = document.querySelector('.places__list');// @todo: DOM узел куда доб карточки
const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки (Темплейт карточки)
const btnEditPrfl = document.querySelector('.profile__edit-button');// кнопка редактир проф
const popups = document.querySelectorAll('.popup');
const popupEdit =document.querySelector('.popup_type_edit');
// данные профиля
const profile = document.querySelector('.profile');
// данные формы заполнения профиля
const formEditPrf = document.forms['edit-profile'];
// кнопка доб карточки 
const btnAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
// форма добав карточки
const formAddCard = document.forms["new-place"];

const popupViewImgCard = document.querySelector('.popup_type_image'); // попап с картинкой
const popCardImg = popupViewImgCard.querySelector('.popup__image'); 
const popImgCaptionCard = popupViewImgCard.querySelector('.popup__caption'); 

renderCards(initialCards,placesList,cardTemplate,openCard,openModal); // отобразить карточки на странице

// Вешаем на все модалки событие закрытия карточки
popups.forEach(popup=>{
  popup.addEventListener('click',(event) => {
    const target = event.target;
    if(target === popup || target.classList.contains('popup__close')){
      closeModal(popup);// вкл соб наж по кл escape
    }
  })
})
// Работа модальных окон
// 1.  МО редактировать профиль
// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',() => {
  openModal(popupEdit);
// автозаполнение полей формы
  autoFillForm(profile, formEditPrf);
})
// НАУДАЛЕНИЕ
// событие закрытия окна 
// popupEdit.addEventListener('click',(event) => {
//   const target = event.target;
//   if(target === popupEdit || target.classList.contains('popup__close')){
//     closeModal(popupEdit);
//   }
// })

//  сохранение данных формы профиля
formEditPrf.addEventListener('submit',(event)=>{
  event.preventDefault();
  handleFormSubmit(profile,formEditPrf);
  closeModal(popupEdit);
});

// 2 форма добавить новую карточку

// НАУДАЛЕНИЕ
// открытия окна формы добав карточки
btnAddCard.addEventListener('click',()=>{
  openModal(popupCard);
});
// НАУДАЛЕНИЕ
// закрытия окна формы добав карточки
// popupCard.addEventListener('click',(event)=>{
//   closeModal(event,popupCard);
//   document.removeEventListener('keydown', closeModal);
// })

// работа с формой карточки
formAddCard.addEventListener('submit',(event)=>{
  event.preventDefault();
  addNewCard(formAddCard,createCard,placesList,removeCard, likeCard, cardTemplate,openCard,openModal);
  closeModal(popupCard);
})




// Открытие попапа с картинкой
function openCard(card,image,openModal) {
  // вставляем картинку с карточки в попап
  popCardImg.src = image.src; 
  popCardImg.alt =  image.alt;
  popImgCaptionCard.textContent = card.querySelector('.card__title').textContent;
  openModal(popupViewImgCard);
}
// @todo: Вывести карточки на страницу
// изменить параметры входящие функции на объект
function renderCards(initialCards,placesList,template,openCard,openModal) {
  initialCards.forEach((item) => placesList.append(createCard(item,removeCard,likeCard,template,openCard,openModal)));
}
  













