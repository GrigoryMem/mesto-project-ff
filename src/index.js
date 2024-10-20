import './pages/index.css'; // добавьте импорт главного файла стилей 
import { renderCards } from'./scripts/components/card'; // функции для работы с карточками
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

// данные формы
const form = document.forms['edit-profile'];



renderCards(initialCards,placesList,cardTemplate); // отобразить карточки на странице

// Работа модальных окон
popup.classList.add('popup_is-animated');// Задаем  стили по ум. для анимации открытия окна

// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',()=>{
  openModal(popupEdit);
  document.addEventListener('keydown', closeModal);
  // автозаполнение полей формы
  form.elements.name.value = profTitle.textContent;
  form.elements.description.value = profDesc.textContent;
})

// событие закрытия окна при нажатии на крестик
popup.addEventListener('click',(event)=>{
  closeModal(event,popupEdit);
  form.reset();
})


