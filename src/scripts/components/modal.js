// функция закрытия окна
export const closeModal = (event,popup) =>{
  // закрытие кнокой или оверлей:
  const targElem = event.target;
  if(popup===targElem || 
    targElem.classList.contains('popup__close') 
    ||  targElem.classList.contains('popup__button')
    )
    {
    targElem.closest('.popup').classList.remove('popup_is-opened');
  }

  // для закрытия окна по кл Escape:
  const key = event.key;
 
  if(key=== 'Escape'){
   
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
    // удаляем обработчик на  кл Escape
    document.removeEventListener('keydown', closeModal);
  }
}

// фукнкция открытия окна
export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');  
  
}