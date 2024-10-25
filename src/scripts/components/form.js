//  для событие подтверждение формы заполнения профиля
export function handlFormSubmProf(profile,form){
  // заполняем профиль данными формы
  const profTitle = profile.querySelector('.profile__title');
  const profDesc = profile.querySelector('.profile__description');
  profTitle.textContent = form.elements.name.value;
  profDesc.textContent = form.elements.description.value
  form.reset();
}

//  автозаполняем форму с данными профиля
export function autoFillFormProf(profile, form) {
  const profTitle = profile.querySelector('.profile__title');
  const profDesc = profile.querySelector('.profile__description');
  form.elements.name.value = profTitle.textContent;
  form.elements.description.value = profDesc.textContent;
}

//  для формы добавления карточки
export function addNewCard(form,createCard,placesList,removeCard, likeCard, cardTemplate,openCard,openModal){
  const formData = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value
  }
  placesList.prepend(createCard(formData,removeCard, likeCard, cardTemplate,openCard,openModal));
  form.reset();
  }
  const card = createCard(settingCard,0);
  placesList.append(card);
  // const settingCard = {
  //   src:{
  //     data: initialCards, // массив карточек
  //     template: cardTemplate, // шаблон создания карточки
  //     getElem(elem){ 
  //         return this.data[elem]; // получаем 'элемент' из массива карточек
  //     }
  //   },
  //   acts:{
  //     remove:removeCard,
  //     like:likeCard, 
  //     open:openCard // открываем картинку
  //   }
  // }

