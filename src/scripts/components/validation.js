const forms = document.forms;
const formProf = forms['edit-profile'];
const formProfInput = formProf.querySelector('.popup__input')








// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const formElems = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
}



const enableValidation = (elemsValid)=>{
// включение валидации всех форм


};

const clearValidation = (profileForm, validationConfig)=>{
  // очищает ошибки валидации формы и делает кнопку неактивной

}


// Функция, которая добавляет класс с ошибкой
const showInputError = (elem)=>{
    elem.classList.add('popup__input_type_error');
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (elem)=>{
  elem.classList.remove('popup__input_type_error');
}


// Функция, которая проверяет валидность поля
const isValid = (input)=>{
  if(!input.validity.valid){
    showInputError(input)
  }else{
    hideInputError(input)
  }
}

// Вызовем функцию isValid на каждый ввод символа

formProf.addEventListener('input', ()=>{
  isValid(formProfInput);
});


