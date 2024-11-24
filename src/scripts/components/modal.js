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
const closeEscModal = (event) =>{
  if(event.key === 'Escape'){
    const openPopup = document.querySelector('.popup_is-opened');
    closeModal(openPopup);
 }
}
