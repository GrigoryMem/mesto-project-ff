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



