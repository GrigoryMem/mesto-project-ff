import {getProfileInfo} from'./api';

const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');


getProfileInfo()
  .then((res)=>{
    profileTitle.textContent = res.name;
    profileDesc.textContent = res.about;
    profileImage.style.backgroundImage = `url(${res.avatar})`;
  console.log(res)
})
.catch((err)=>{
  console.log(err)
})




