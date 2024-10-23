//  для формы заполнения профиля
export function handleFormSubmit(profile,form){
  // заполняем профиль данными формы
  const profTitle = profile.querySelector('.profile__title');
  const profDesc = profile.querySelector('.profile__description');
  profTitle.textContent = form.elements.name.value;
  profDesc.textContent = form.elements.description.value
  form.reset();
}

export function autoFillForm(profile, form) {
  //  автозаполняем форму с данными профиля
  const profTitle = profile.querySelector('.profile__title');
  const profDesc = profile.querySelector('.profile__description');
  form.elements.name.value = profTitle.textContent;
  form.elements.description.value = profDesc.textContent;
}

//  для формы добавления карточки
export function addNewCard(form,createCard,placesList,removeCard, likeCard, cardTemplate,openCard,openModal,popupImage){
  const formData = {
    name: form.elements["place-name"].value,
    link: form.elements["link"].value
  }
  placesList.prepend(createCard(formData,removeCard, likeCard, cardTemplate,openCard,openModal,popupImage));
  form.reset();
  }


