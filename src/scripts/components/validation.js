// актиквироватьили отключить кнопку
export const switchBtn = (button,style,block)=>{
  if(block) {
    // блокируем кнопку
    button.disabled = block;
    if(style) { // если нужно добавить стиль кнопки
      button.classList.add(style);
    }
    
  } else {
    // разблокируем кнопку
    button.disabled = block;
    if(style) {
      button.classList.remove(style);
    }
  }
}
// очистка валидации
export const clearValidation = (form,config)=>{
  const disabled = config.inactiveButtonClass.slice(1);
  // очищает ошибки валидации формы и делает кнопку неактивной
  const allInputs = Array.from(form.querySelectorAll(config.inputSelector))
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  allInputs.forEach((input)=>{
    hideInputError(form,input,config);
   
  })
  switchBtn(buttonSubmit,disabled,true)
}
// Функция, которая добавляет класс с ошибкой
const showInputError = (form,input,textErr,config)=>{
  // класс показа ошибки для поля ввода
  const classInpError = config.inputErrorClass.slice(1);
  // класс для показа  содержания ошибки
  const classELemError =config.errorClass.slice(1);
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // добавляем стили ошибки для поля ввода
  input.classList.add(classInpError);
  // показываем элемент с ошибкой
  errorElem.classList.add(classELemError);
  // добавляем тип ошибки в поле для ошибки
  errorElem.textContent = textErr;
}
// Функция, которая удаляет класс с ошибкой
const hideInputError = (form,input,config)=>{
  // класс скрытия ошибки для поля ввода
  const classInpError = config.inputErrorClass.slice(1);
  // класс для скрытия  содержания ошибки
  const classELemError =config.errorClass.slice(1);
  // Находим элемент с ошибкой через форму по id input
  const errorElem = form.querySelector(`.${input.id}-error`);
  // убираем стили ошибки для поля ввода
  input.classList.remove(classInpError);
  // скрываем элемент с ошибкой
  errorElem.classList.remove(classELemError);
  // очищаем поле текста ошибки
  errorElem.textContent = '';
  //  очищаем метод кастомного сообщения об ошибке
  input.setCustomValidity('');
}


// Функция, которая проверяет валидность поля
const isValid = (form,input,config)=>{
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
    showInputError(form,input,input.validationMessage,config)
  }else{
    hideInputError(form,input,config)
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
const toggleButtonState = (inputList,buttonSubmit,config)=>{
  const disabled =config.inactiveButtonClass.slice(1);
  if(hasInvalid(inputList)){ // если хотябы одно поле не валидно
     // сделай кнопку неактивной
     switchBtn(buttonSubmit,disabled,true)
  }else{
    // иначе сделай кнопку активной
    switchBtn(buttonSubmit,disabled,false)
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
      isValid(form,input,config);
       // запускаем процесс контроля кнопки если хотябы одно из полей не валидно
  toggleButtonState(allInputs,buttonSubmit,config)
      
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


  











