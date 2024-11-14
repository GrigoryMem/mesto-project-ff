import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard,removeCard,likeCard } from'./scripts/components/card'; // функции для работы с карточками
import { initialCards } from './scripts/components/cards'; //данные карточек
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import { handlFormSubmProf, autoFillFormProf } from './scripts/components/form';
import {clearValidation} from './scripts/components/validation';
import {enableValidation} from './scripts/components/validation';
import { getData } from "./scripts/components/api";
import  './scripts/components/profile';
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
//  поля для открытия картинки
const popupViewImgCard = document.querySelector('.popup_type_image'); // попап с картинкой
const popCardImg = popupViewImgCard.querySelector('.popup__image'); 
const popImgCaptionCard = popupViewImgCard.querySelector('.popup__caption'); 
const forms = Array.from(document.forms);

// параметры для валидации
const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
}
enableValidation(configForm); // включаем валидацию


// настройки карточки
const settingCard = {
  template: cardTemplate, // шаблон создания карточки,
  acts:{
    remove:removeCard,
    like:likeCard, 
    open:openCard,// открываем картинку
    getElem(elem){
        return {
          link:elem.link,
          name:elem.name
        }
    }
  }
}

const pathCards = 'cards';


//  Вывести карточки на страницу
renderCards(getData,settingCard); // отобразить карточки на странице

// Работа модальных окон
//   МО редактировать профиль
// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',() => {
  openModal(popupEdit);
  // запускаем  очистку валидации 
  clearValidation(formEditPrf,configForm);
// автозаполнение полей формы сохр данными
  autoFillFormProf(profile, formEditPrf);
  

})
//  сохранение данных формы профиля
formEditPrf.addEventListener('submit',(event)=>{
  event.preventDefault();
  handlFormSubmProf(profile,formEditPrf);
  closeModal(popupEdit);
});
// 2 форма добавить новую карточку
// открытия окна формы добав карточки
btnAddCard.addEventListener('click',()=>{
  openModal(popupCard);
 
    // очистка полей формы каждыый раз при открытии формысоздания карточки
    formAddCard.reset();
    // очищаем валидацию каждый раз при открытии
    clearValidation( formAddCard,configForm);
    
});
// работа с формой карточки
formAddCard.addEventListener('submit',(event)=>{
  event.preventDefault();
  addNewCard(formAddCard,settingCard);
  closeModal(popupCard);
})

// Вешаем на все модалки событие закрытия карточки
popups.forEach(popup=>{
  popup.addEventListener('click',(event) => {
    const target = event.target;
    if(target === popup || target.classList.contains('popup__close')){
      closeModal(popup);// вкл соб наж по кл escape
    }
  })
})

// Функции
// Открытие попапа с картинкой
function openCard(card,image) {
  // вставляем картинку с карточки в попап
  popCardImg.src = image.src; 
  popCardImg.alt =  image.alt;
  popImgCaptionCard.textContent = card.querySelector('.card__title').textContent;
  openModal(popupViewImgCard);
}
//  для отображения карточек
function renderCards(getCards,settingCard) {
  //  проходимся по массиву с данными для карточек... 
  getCards(pathCards)
  .then((cards)=>{
    cards.forEach((item)=>{
      if(item){
        // вставляем заполненные карточки на страницу
        placesList.append(createCard(settingCard,item))
      }
    })

  })
  .catch((err)=>{
    return err
  })
}
//  для формы добавления карточки
function addNewCard(form,setCard){
  const formData = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value
  }
  placesList.prepend(createCard(setCard,formData));
  form.reset();
}

  













