import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard,likeCard} from'./scripts/components/card'; // функции для работы с карточками
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import { autoFillFormProf } from './scripts/components/form';
import {clearValidation} from './scripts/components/validation';
import {enableValidation} from './scripts/components/validation';
import { getData, pathData,postData,reqDeleteCard,reqPostLike,reqDelLike,reqPatchAvatar,reqCheckHEAD} from "./scripts/components/api";
const placesList = document.querySelector('.places__list');// @todo: DOM узел куда доб карточки
const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки (Темплейт карточки)
const btnEditPrfl = document.querySelector('.profile__edit-button');// кнопка редактир проф
const popups = document.querySelectorAll('.popup');
const popupEdit =document.querySelector('.popup_type_edit');
// данные профиля
const profile = document.querySelector('.profile');
// данные формы заполнения профиля
const formEditPrf = document.forms['edit-profile'];
// кнопка доб карточки 
const btnAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_new-card');
// форма добав карточки
const formAddCard = document.forms["new-place"];
//  форма подтв удаления карточки
const formConfirmDelCard = document.forms["confirm-delete"];
//  поля для открытия картинки
const popupViewImgCard = document.querySelector('.popup_type_image'); // попап с картинкой
const popCardImg = popupViewImgCard.querySelector('.popup__image'); 
const popImgCaptionCard = popupViewImgCard.querySelector('.popup__caption'); 

// профиль пользователя - данные полей формы редак профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
// работа с аватаром 

const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const formUpdateAvatar = document.forms['update-avatar'];
const savUpdAvat = formUpdateAvatar.querySelector('.popup__button');
// форма подтв для удаления карточки
const formConfirmDelcard = document.querySelector('.popup_type_confirm-delete')
// пути
const profilePATH = 'users/me';
const pathCards = 'cards';

// параметры для валидации
const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__error_visible'
}
enableValidation(configForm); // включаем валидацию


// настройки карточки
const settingCard = {
  template: cardTemplate, // шаблон создания карточки,
  acts:{
    remove:handleDeleteCard,
    like:likeCard, 
    open:openCard,// открываем картинку
    getElem(elem){
        return {
          link:elem.link,
          name:elem.name
        }
    }
  },
  modal: {
    openModal,
    closeModal,
    window:formConfirmDelcard
  },
  reqDeleteCard,
  reqPostLike,
  reqDelLike,
  cardForDelete
}
let cardForDelete = {}

function handleDeleteCard(cardId,cardElement,setCard) {
  // как это происходит???
  cardForDelete.id = cardId;
  cardForDelete.cardElement = cardElement;
  setCard.modal.openModal(setCard.modal.window)
}

function handleDeleteCardSubmit(event) {
  event.preventDefault();
  if(!cardForDelete.cardElement) return;
 
  settingCard.reqDeleteCard(cardForDelete.id)
    .then(()=>{
      cardForDelete.cardElement.remove();
      settingCard.modal.closeModal(formConfirmDelcard);
    cardForDelete = {};
  })
  .catch((err) => {
    return err
  })
}

formConfirmDelcard.addEventListener('submit',handleDeleteCardSubmit);

//  Вывести карточки на страницу
renderCards(getData,settingCard); // отобразить карточки на странице

// Работа модальных окон
//   МО редактировать профиль
// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',() => {
  openModal(popupEdit);
  // запускаем  очистку валидации 
  clearValidation(formEditPrf,configForm);
// автозаполнение полей формы сохр данными

  autoFillFormProf(profile, formEditPrf);
  

})

//  сохранение данных формы профиля
formEditPrf.addEventListener('submit',(event)=>{
  event.preventDefault();
  showLoadMessage(formEditPrf)
    const valuesForm = {
      name:formEditPrf.elements.name.value,
      about:formEditPrf.elements.description.value
    }
    // изучи объект about 
    // заполняем профиль данными формы
  pathData(valuesForm)
    .then((formData)=>{
      saveInfo(formEditPrf);
      profileTitle.textContent = formData.name;
      profileDesc.textContent = formData.about;
    })
  closeModal(popupEdit);
});
// 2 форма добавить новую карточку
// открытия окна формы добав карточки
btnAddCard.addEventListener('click',()=>{
  openModal(popupCard);
 
    // очистка полей формы каждыый раз при открытии формысоздания карточки
    formAddCard.reset();
    // очищаем валидацию каждый раз при открытии
    clearValidation( formAddCard,configForm);
    
});
// работа с формой карточки


formAddCard.addEventListener('submit',(event)=>{
  event.preventDefault();
  showLoadMessage(formAddCard)
  const valuesCard = {
    "name":formAddCard.elements['place-name'].value,
    "link":formAddCard.elements['link'].value
  }

  postData(valuesCard)
    .then((valuesCard)=>{
      saveInfo(formAddCard);
      addNewCard(valuesCard,settingCard);
      // для объекта удаления карточки
      // cardForDelete.cardId = valuesCard._id
    })
  formAddCard.reset();
  closeModal(popupCard);
})

// Вешаем на все модалки событие закрытия карточки
popups.forEach(popup=>{
  popup.addEventListener('click',(event) => {
    const target = event.target;
    if(target === popup || target.classList.contains('popup__close')){
      closeModal(popup);// вкл соб наж по кл escape
    }
  })
})

// Функции
// Открытие попапа с картинкой
function openCard(card,image) {
  // вставляем картинку с карточки в попап
  popCardImg.src = image.src; 
  popCardImg.alt =  image.alt;
  popImgCaptionCard.textContent = card.querySelector('.card__title').textContent;
  openModal(popupViewImgCard);
}
//  для отображения карточек и профиля
function renderCards(getData,settingCard) {
  const dataProfile = getData(profilePATH);// получаем данные для профиля
 
  const dataCards = getData(pathCards); // получаем данные для карточек
  Promise.all([
    dataProfile,
    dataCards
  ]).then((data)=>{
    
    const profile = data[0]; // наш профиль
    const cards = data[1]; // данные с карточками
    // заполняем профиль данными
    profileTitle.textContent = profile.name;
    profileDesc.textContent = profile.about;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    //  проходимся по массиву с данными для карточек... 
    cards.forEach((item)=>{
      const card = createCard(settingCard,item)
      const cardDeleteBtn = card.querySelector('.card__delete-button');
    
      if(item){
        // вставляем заполненные карточки на страницу
        if(item.owner._id !== "f5bbbfc6daa06470f1f78ec3") {
          // если я не являюсь владельцем карточки, удаляем кнопку корзины
          //  т.к. я не могу удалять чужие карточки
          cardDeleteBtn.classList.add('card__delete-button_type_hidden');
         
        }
        if(item.owner._id === "f5bbbfc6daa06470f1f78ec3") {
          // если я не являюсь владельцем карточки, удаляем кнопку корзины
          //  т.к. я не могу удалять чужие карточки
          
         
        }
       
  
        // вставляем заполненные карточки на страницу
        placesList.append(card)
      }
    })
  }).catch((err)=>{
    return err
  })
}
//  для формы добавления карточки
function addNewCard(formData,setCard){
 
  placesList.prepend(createCard(setCard,formData));
 
}


const deleteBtns =  document.querySelectorAll('.card__delete-button');

deleteBtns.forEach((btn)=>{
 console.log(btn)
})








// const handleDeleteCardSubmit =(event)=>{
//   event.preventDefault();
//   if(!cardForDelete.cardElement) return;
//   deleteCard(cardId)
//     .then(()=>{
//       cardForDelete.cardElement.remove();
//     closeModal(formConfirmDelCard);
//     cardForDelete = {};
//   })
//   .catch((err) => {})
// }


// formConfirmDelCard.addEventListener('submit',(event)=>{
//   event.preventDefault();
//   handleDeleteCardSubmit(event); 
//    console.log('hi')
// })

// открываем попап изменения аватара
profileImage.addEventListener('click',()=>{
  openModal(popupUpdateAvatar);
  clearValidation(formUpdateAvatar,configForm);
  formUpdateAvatar.reset();
})

formUpdateAvatar.addEventListener('submit',handleUpdateAvatarSubmit)

function handleUpdateAvatarSubmit(event) {
  event.preventDefault();
  showLoadMessage(formUpdateAvatar)
  const valuesAvatar= {

    "avatar":formUpdateAvatar.elements['link'].value
  }
  // console.log(valuesAvatar.link)
  reqPatchAvatar(valuesAvatar)
    .then((res)=>{
      saveInfo(formUpdateAvatar);
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err)=>{
      console.log(err)
    })
    // reqCheckHEAD()
      
  closeModal(popupUpdateAvatar);
}



function saveInfo(form,style=".popup__button") {
  const button = form.querySelector(style);
  button.disabled = false;
  button.textContent = 'Сохранить';
}

function showLoadMessage(form,style=".popup__button") {
  const button = form.querySelector(style);
  button.disabled = true;
  button.textContent = 'Сохранение...';
}





 