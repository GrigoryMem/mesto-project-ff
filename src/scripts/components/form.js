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


