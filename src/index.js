import './pages/index.css'; // добавьте импорт главного файла стилей 
import {renderCards} from'./scripts/components/card'; // функции для работы с карточками
import { initialCards } from './scripts/components/data-cards'; //данные карточек
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО

const placesList = document.querySelector('.places__list');// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки (Темплейт карточки)

renderCards(initialCards,placesList,cardTemplate); // отобразить карточки на странице





// 3. Работа модальных окон
// открытие  и закрытие модального окна

// кнопки
const btnEditPrfl = document.querySelector('.profile__edit-button');
// const btnAddPlace = document.querySelector('.');

// окна

const popup = document.querySelector('.popup');
// Задаем  стили по ум. для анимации открытия окна
popup.classList.add('popup_is-animated');



// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',()=>{
  openModal(popup);
  document.addEventListener('keydown', closeModal);
})


// событие закрытия окна при нажатии на крестик
popup.addEventListener('click',(event)=>{
  closeModal(event,popup);
})


