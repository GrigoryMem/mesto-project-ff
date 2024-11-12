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




export const clearValidation = (form)=>{
  
  // очищает ошибки валидации формы и делает кнопку неактивной
  const allInputs = Array.from(form.querySelectorAll('.popup__input'))
  const buttonSubmit = form.querySelector('.popup__button');
  allInputs.forEach((input)=>{
    hideInputError(form,input);
   
  })
  buttonSubmit.disabled = false;
  buttonSubmit.classList.remove('.popup__button_disabled');
}


// Функция, которая добавляет класс с ошибкой
const showInputError = (form,input,textErr)=>{
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // добавляем стили ошибки для поля ввода
  input.classList.add('popup__input_type_error');
  // показываем элемент с ошибкой
  errorElem.classList.add('popup__error_visible');
  // добавляем тип ошибки в поле для ошибки
  errorElem.textContent = textErr;
  
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (form,input)=>{
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // убираем стили ошибки для поля ввода
  input.classList.remove('popup__input_type_error');
  // скрываем элемент с ошибкой
  errorElem.classList.remove('popup__error_visible');
  // очищаем поле текста ошибки
  errorElem.textContent = '';
}


// Функция, которая проверяет валидность поля
const isValid = (form,input)=>{
  if(!input.validity.valid){
    showInputError(form,input,input.validationMessage)
  }else{
    hideInputError(form,input)
  }
}

//  проверка всех полей на валидность
const hasInvalid = (inputList)=>{
  return inputList.some((input)=>{
    // если поле не валидно, вернет true
    return !input.validity.valid
  })
}

// заблокировать кнопку отправить если есть невалидные поля
const toggleButtonState = (inputList,buttonSubmit)=>{
  if(hasInvalid(inputList)){ // если хотябы одно поле не валидно
     // сделай кнопку неактивной
    buttonSubmit.disabled = true; // блокируем кнопку
    buttonSubmit.classList.add('popup__button_disabled');// добавлеям стили блокировки для кнопки
  }else{
    // иначе сделай кнопку активной
    buttonSubmit.disabled = false; // блокируем кнопку
    buttonSubmit.classList.remove('popup__button_disabled');// добавлеям стили блокировки для кнопки
  }
}

// устанавливаем обработчики на все поля формы
const setEventListeners = (form)=>{
    // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const allInputs = Array.from(form.querySelectorAll('.popup__input'))
  // найдем в тек форме кнопку отправки
  const buttonSubmit = form.querySelector('.popup__button')
  // // запускаем процесс контроля кнопки если хотябы одно из полей не валидно
  toggleButtonState(allInputs,buttonSubmit)
  //  Обойдём все элементы полученной коллекции
  allInputs.forEach((input)=>{
    input.addEventListener('input',()=>{
       // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый каждый элемент формы на валидность
      isValid(form,input);
       // запускаем процесс контроля кнопки если хотябы одно из полей не валидно
  toggleButtonState(allInputs,buttonSubmit)
      
    })
   })
}
// устанавливаем обработчики на все поля всех форм
const enableValidation = ()=>{
  // включение валидации всех форм
  const formList = Array.from(document.querySelectorAll('.popup__form'));
   // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
  formList.forEach((form)=>{
    setEventListeners(form);
  })
};


  

enableValidation();









