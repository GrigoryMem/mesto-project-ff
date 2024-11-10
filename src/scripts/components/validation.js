const forms = document.forms;
const formProf = forms['edit-profile'];
const formProfInput = formProf.querySelector('.popup__input')


formProfInput.addEventListener('input', (event)=>{
  console.log(event.target.validity);
})






// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const popupClasses = {
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



