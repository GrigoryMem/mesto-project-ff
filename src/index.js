import './pages/index.css'; // добавьте импорт главного файла стилей 
import './scripts/renderCards' // запуск карточек


// 3. Работа модальных окон
// открытие  и закрытие модального окна

// кнопки
const btnEditPrfl = document.querySelector('.profile__edit-button');
// const btnAddPlace = document.querySelector('.');

// окна

const popupEdit = document.querySelector('.popup_type_edit');
// Задаем  стили по ум. для анимации открытия окна
popupEdit.classList.add('popup_is-animated');

// функция закрытия окна
const closeModal = (event,popup) =>{
    const targElem = event.target
  if(popup===targElem || targElem.classList.contains('popup__close')) {
    event.target.closest('.popup_type_edit').classList.remove('popup_is-opened');
    
  }
}

// фукнкция открытия окна
const openModal = (popup) => {
  popup.classList.add('popup_is-opened');  
}

// собыитие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',()=>{
  openModal(popupEdit);
})
// собыитие закрытия окна при нажатии на крестик
popupEdit.addEventListener('click',(event)=>{
  closeModal(event,popupEdit);
})


