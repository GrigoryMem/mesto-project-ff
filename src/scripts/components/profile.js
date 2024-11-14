import {getData} from'./api';

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profilePATH = 'users/me';

// получаем данные о пользователе с сервера
getData(profilePATH)
  .then((res)=>{
    profileTitle.textContent = res.name;
    profileDesc.textContent = res.about;
    profileImage.style.backgroundImage = `url(${res.avatar})`;
  
})
.catch((err)=>{
  return err
})




