const forms = document.forms;
const formProf = forms['edit-profile'];
const formProfInput = formProf.querySelector('.popup__input_type_name');













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
const showInputError = (form,input,textErr)=>{
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // добавляем стили ошибки для поля ввода
  input.classList.add('popup__input_type_error');
  // показываем элемент с ошибкой
  errorElem .classList.add('popup__error_visible');
  // добавляем тип ошибки в поле для ошибки
  errorElem .textContent = textErr;
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (form,input)=>{
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // убираем стили ошибки для поля ввода
  input.classList.remove('popup__input_type_error');
  // скрываем элемент с ошибкой
  errorElem .classList.remove('popup__error_visible');
  // очищаем поле текста ошибки
  errorElem .textContent = '';
}


// Функция, которая проверяет валидность поля
const isValid = (form,input)=>{
  if(!input.validity.valid){
    showInputError(form,input,input.validationMessage)
  }else{
    hideInputError(form,input)
  }
}

// Вызовем функцию isValid на каждый ввод символа

formProf.addEventListener('input', ()=>{
  isValid(formProf,formProfInput);
});


