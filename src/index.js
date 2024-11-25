import './pages/index.css'; // добавьте импорт главного файла стилей 
import { createCard,likeCard} from'./scripts/components/card'; // функции для работы с карточками
import { openModal, closeModal } from './scripts/components/modal'; // откытие и закрытие МО
import { autoFillFormProf } from './scripts/components/form';
import {enableValidation,switchBtn,clearValidation} from './scripts/components/validation';
// запросы к серверу
import { reqGetData, pathData,postData,reqDeleteCard,reqPostLike,reqDelLike,reqPatchAvatar} from "./scripts/components/api";
//  dom узлы
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
const profilePATH = '/users/me';
const pathCards = '/cards';

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
  authorLikCardID:null,
  acts:{
    remove:handleDeleteCard,
    like:likeCard, 
    open:openCard,// открываем картинку
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
  cardForDelete.id = cardId;
  cardForDelete.cardElement = cardElement;
  setCard.modal.openModal(setCard.modal.window)
}

   
function handleDeleteCardSubmit(event) {
  event.preventDefault();
  showLoadProcess(formConfirmDelcard,".popup__button",'Удаление карточки',true);
  if(!cardForDelete.cardElement) return;
  //  удаляем карточку с сервера
  
  settingCard.reqDeleteCard(cardForDelete.id)
    .then(()=>{
      cardForDelete.cardElement.remove();
      cardForDelete = {};
      setTimeout(()=>{
        showLoadProcess(formConfirmDelcard,".popup__button",'Карточка удалена',true);
        settingCard.modal.closeModal(formConfirmDelcard);
      },250)
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally((res)=>{
      // восстанавливаем статус кнопки сабмита (не видно пользователю)
      reсoverStateBtn(formConfirmDelcard,".popup__button",'Да');
    })
}
// подтверждаем удаление карточки и удаляем ее
formConfirmDelcard.addEventListener('submit',handleDeleteCardSubmit);

//  Вывести карточки на страницу
render(reqGetData,settingCard); // отобразить карточки на странице

// Работа модальных окон
//   МО редактировать профиль
// событие открытия окна при нажатии на кнопку
btnEditPrfl.addEventListener('click',() => {
  openModal(popupEdit);
  // запускаем  очистку валидации 
  clearValidation(formEditPrf,configForm,false);
// автозаполнение полей формы сохр данными
  autoFillFormProf(profile, formEditPrf);
})

//  сохранение данных формы профиля
formEditPrf.addEventListener('submit',(event)=>{
  event.preventDefault();
  showLoadProcess(formEditPrf,".popup__button",'Сохранение',true);
    const valuesForm = {
      name:formEditPrf.elements.name.value,
      about:formEditPrf.elements.description.value
    }
    // изучи объект about 
    // заполняем профиль данными формы
  pathData(valuesForm)
    .then((formData)=>{
      profileTitle.textContent = formData.name;
      profileDesc.textContent = formData.about;
      setTimeout(()=>{
        showLoadProcess(formEditPrf,".popup__button",'Информация сохранена',true); 
        closeModal(popupEdit);
      },250)
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=>{
      // Восстанавливаем текст кнопки
      reсoverStateBtn(formEditPrf,".popup__button",'Сохранить');
    });
});
// 2 форма добавить новую карточку
// открытия окна формы добав карточки
btnAddCard.addEventListener('click',()=>{
  openModal(popupCard);
 
    // очистка полей формы каждыый раз при открытии формысоздания карточки
    formAddCard.reset();
    // очищаем валидацию каждый раз при открытии
    clearValidation( formAddCard,configForm,true);
    
});
// работа с формой карточки


formAddCard.addEventListener('submit',(event)=>{
  event.preventDefault();
  showLoadProcess(formAddCard,".popup__button",'Сохранение',true);
  const valuesCard = {
    "name":formAddCard.elements['place-name'].value,
    "link":formAddCard.elements['link'].value
  }
  postData(valuesCard)
    .then((valuesCard)=>{
      addNewCard(valuesCard,settingCard);
      formAddCard.reset();
      setTimeout(()=>{
        showLoadProcess(formAddCard,".popup__button",'Карточка сохранена',true);
        closeModal(popupCard);
      },250)
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
    .finally(()=>{
      // восстанавливаем статус кнопки сабмита (не видно пользователю)
      reсoverStateBtn(formAddCard,".popup__button",'Сохранить');
    })
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
function render(reqGetData,settingCard) {
  const dataProfile = reqGetData(profilePATH);// получаем данные для профиля
 
  const dataCards = reqGetData(pathCards); // получаем данные для карточек
  Promise.all([
    dataProfile,
    dataCards
  ])
    .then((data)=>{
      const [profile,cards] = data; //  profile  наш профиль,cards данные с карточками
      profileTitle.textContent = profile.name;
      profileDesc.textContent = profile.about;
      settingCard.authorLikCardID = profile._id; // получаем id пользователя
      profileImage.style.backgroundImage = `url(${profile.avatar})`;
      //  проходимся по массиву с данными для карточек... 
      cards.forEach((item)=>{
        const card = createCard(settingCard,item)
        const cardDeleteBtn = card.querySelector('.card__delete-button');
        // вставляем заполненные карточки на страницу
        placesList.append(card)
     
      })
    })
    .catch((err)=>{
      console.log(`Ошибка загрузки контента: ${err}`)
    })
    .finally(()=>{
      console.log('Загрузка контента завершена, проверьте результат')
    })
}
//  для формы добавления карточки
function addNewCard(formData,setCard){
 
  placesList.prepend(createCard(setCard,formData));
}

// открываем попап изменения аватара
profileImage.addEventListener('click',()=>{
  openModal(popupUpdateAvatar);
  clearValidation(formUpdateAvatar,configForm,true);
  formUpdateAvatar.reset();
})

formUpdateAvatar.addEventListener('submit',handleUpdateAvatarSubmit)

function handleUpdateAvatarSubmit(event) {
  event.preventDefault();
  
  showLoadProcess(formUpdateAvatar,".popup__button",'Сохранение',true);
  const valuesAvatar= {

    "avatar":formUpdateAvatar.elements['link'].value
  }
 
  reqPatchAvatar(valuesAvatar)
    .then((res)=>{
      // показываем результат
      profileImage.style.backgroundImage = `url(${res.avatar})`;
       setTimeout(()=>{
        showLoadProcess(formUpdateAvatar,".popup__button",'Аватар изменен',true);
        closeModal(popupUpdateAvatar);
       },250)
      
    
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`);
    })
    .finally(()=>{
       // восстанавливаем статус кнопки сабмита (не видно пользователю)
       reсoverStateBtn(formUpdateAvatar,".popup__button",'Сохранить');
    })
}


//  работа loaderа анимации 
function showLoadProcess(form,style,text,status) {
  const button = form.querySelector(style);
  const textBtn = form.querySelector('.popup__button-text');
  const dotsBtn = form.querySelector('.popup__button-loading');
  textBtn.textContent = text;
   if(textBtn.textContent === 'Сохранение' || textBtn.textContent === 'Удаление карточки') {
    dotsBtn.style.display = 'block';
    dotsBtn.textContent = '...'
  }else{
    dotsBtn.style.display = 'none';
    dotsBtn.textContent = ''
  }
  // восстанавливаем текст кнопки
  switchBtn(button,"",status);
}

 // восстанавлием статус кнопки для следующего открытия окна в исходное состояние
function reсoverStateBtn(form,style,message) {
  setTimeout(()=>{
   showLoadProcess(form,style,message,false);
  },1000)
}





