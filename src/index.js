import './pages/index.css'; // добавьте импорт главного файла стилей 
import { renderCards,createCard,removeCard,likeCard,openCard } from'./scripts/components/card'; // функции для работы с карточками
import { initialCards } from './scripts/components/data-cards'; //данные карточек
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import './scripts/components/modal'
const placesList = document.querySelector('.places__list');// @todo: DOM узел куда доб карточки
const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки (Темплейт карточки)
const btnEditPrfl = document.querySelector('.profile__edit-button');// кнопка редактир проф
const popup = document.querySelector('.popup');
const popupEdit =document.querySelector('.popup_type_edit');
// данные профиля
const profTitle = document.querySelector('.profile__title');
const profDesc = document.querySelector('.profile__description');
// данные формы заполнения профиля
const formEditPrf = document.forms['edit-profile'];
// кнопка доб карточки 
const btnAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
// форма добав карточки
const formAddCard = document.forms["new-place"];
// popup для просмотра карточки
const popupImage = document.querySelector('popup_type_image');

renderCards(initialCards,placesList,cardTemplate,openCard); // отобразить карточки на странице

// Работа модальных окон
// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',() => {
  openModal(popupEdit);
  document.addEventListener('keydown', closeModal);
  // автозаполнение полей формы
  formEditPrf.elements.name.value = profTitle.textContent;
  formEditPrf.elements.description.value = profDesc.textContent;
})

// событие закрытия окна при нажатии на крестик
popupEdit.addEventListener('click',(event) => {
  closeModal(event,popupEdit);
})

//  сохранение данных формы профиля
formEditPrf.addEventListener('submit',handleFormSubmit);
function handleFormSubmit(event){
  event.preventDefault();
  // заполняем профиль данными формы
  profTitle.textContent = formEditPrf.elements.name.value;
  profDesc.textContent = formEditPrf.elements.description.value
  formEditPrf.reset();
  closeModal(event,popupEdit);
}

// действия с формой добавить новую курточку
// открытия окна формы добав карточки
btnAddCard.addEventListener('click',()=>{
  openModal(popupCard);
});

// закрытия окна формы добав карточки
popupCard.addEventListener('click',(event)=>{
  closeModal(event,popupCard);
  document.addEventListener('keydown', closeModal);
})

// работа с формой карточки
formAddCard.addEventListener('submit',(event)=>{
  addNewCard(event);
})

// функция добавления карточки
function addNewCard(event){
  event.preventDefault();
  const formData = {
    name: formAddCard.elements["place-name"].value,
    link: formAddCard.elements["link"].value
  }
  placesList.prepend(createCard(formData,removeCard, likeCard, cardTemplate));
  formAddCard.reset();
  closeModal(event,popupCard);
 }


//  событие просмотр карточки картинки
console.log(popupImage)
// popupImage.addEventListener('click',()=>{
//   console.log(popupImage)
// })








