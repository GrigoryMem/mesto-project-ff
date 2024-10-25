import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard,removeCard,likeCard } from'./scripts/components/card'; // функции для работы с карточками
import { initialCards } from './scripts/components/cards'; //данные карточек
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import './scripts/components/modal';
import { handlFormSubmProf, autoFillFormProf, addNewCard } from './scripts/components/form';

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


const settingCard = {
  src:{
    data: initialCards, // массив карточек
    template: cardTemplate, // шаблон создания карточки
    getElem(elem){ 
        return this.data[elem]; // получаем 'элемент' из массива карточек
    }
  },
  acts:{
    remove:removeCard,
    like:likeCard, 
    open:openCard // открываем картинку
  }
}


//  Вывести карточки на страницу
renderCards(settingCard); // отобразить карточки на странице

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
});


// работа с формой карточки
formAddCard.addEventListener('submit',(event)=>{
  event.preventDefault();
  addNewCard(formAddCard,createCard,placesList,removeCard, likeCard, cardTemplate,openCard,openModal);
  closeModal(popupCard);
})
// Открытие попапа с картинкой
function openCard(card,image) {
  // вставляем картинку с карточки в попап
  popCardImg.src = image.src; 
  popCardImg.alt =  image.alt;
  popImgCaptionCard.textContent = card.querySelector('.card__title').textContent;
  openModal(popupViewImgCard);
}
//  для отображения карточек
function renderCards(settingCard) {
  //  проходимся по массиву с данными для карточек... 
  settingCard.src.data.forEach((item,index)=>{
    if(item){
      // вставляем заполненные карточки на страницу
      placesList.append(createCard(settingCard,index))
    }
  })
}
  













