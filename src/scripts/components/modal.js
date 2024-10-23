// функция закрытия окна
export const closeModal = (popup) =>{
  popup.classList.remove('popup_is-opened');
  //удаляем обработчик closeEscPopup у document
  document.removeEventListener('keydown',closeEscModal);
}

// фукнкция открытия окна
export const openModal = (popup) =>{
  popup.classList.add('popup_is-opened');
  //вешаем обработчик closeEscPopup на document 
  document.addEventListener('keydown', closeEscModal);
}

// для закрытия окна по кл Escape:
export const closeEscModal = (event) =>{

 if(event.key === 'Escape'){
  const openPopup = document.querySelector('.popup_is-opened');
  closeModal(openPopup);
 }
}


// // функция закрытия окна
// export const closeModal = (event,popup) =>{
//   // закрытие кнокой или оверлей:
//   const targElem = event.target;
//   const openPopup = document.querySelector('.popup_is-opened');
//   if(popup===targElem || 
//     targElem.classList.contains('popup__close') ||  
//     targElem.classList.contains('popup__button')){
//     targElem.closest('.popup').classList.remove('popup_is-opened');
//   }

//   // для закрытия окна по кл Escape:
//   const key = event.key;
//   if(key=== 'Escape' && openPopup){
//     openPopup.classList.remove('popup_is-opened');
//   }
// }

// // фукнкция открытия окна
// export const openModal = (popup) =>{
//   popup.classList.add('popup_is-opened');  
// }