// актиквироватьили отключить кнопку
const switchBtn = (button,style,block)=>{

  if(block) {
    button.disabled = block;
    button.classList.add(style);
  }else{
    button.disabled = block;
    button.classList.remove(style);
  }
}


// очистка валидации
export const clearValidation = (form,config)=>{
  
  // очищает ошибки валидации формы и делает кнопку неактивной
  const allInputs = Array.from(form.querySelectorAll(config.inputSelector))
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  allInputs.forEach((input)=>{
    hideInputError(form,input);
   
  })
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add('popup__button_disabled');
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
  // проверяем поле на соот-е рег выражению
  
  if(input.validity.patternMismatch) {

    //показываем свое кастомное сообщение об ошибке
    input.setCustomValidity(input.dataset.messageError);
  }else {
    // в случае пустой строки убираем кастомное сообщение об ошибке
    input.setCustomValidity('');
  }
  //  простая проверка на валидность
  if(!input.validity.valid) {
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
     switchBtn(buttonSubmit,'popup__button_disabled',true)
    //  buttonSubmit.disabled = true;
    //  buttonSubmit.classList.add('popup__button_disabled');
  }else{
    // иначе сделай кнопку активной
    switchBtn(buttonSubmit,'popup__button_disabled',false)
    // buttonSubmit.disabled = false;
    // buttonSubmit.classList.remove('popup__button_disabled');
  }
}

// устанавливаем обработчики на все поля формы
const setEventListeners = (form,config)=>{
    // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const allInputs = Array.from(form.querySelectorAll(config.inputSelector))
  // найдем в тек форме кнопку отправки
  const buttonSubmit = form.querySelector(config.submitButtonSelector)
 
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
export const enableValidation = (config)=>{
  // включение валидации всех форм
  const formList = Array.from(document.querySelectorAll(config.formSelector));
   // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
  formList.forEach((form)=>{
    setEventListeners(form,config);
  })
};


  











