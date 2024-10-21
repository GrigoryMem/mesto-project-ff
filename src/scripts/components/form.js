//  для формы заполнения профиля
export function handleFormSubmit(event,profile,form){
  event.preventDefault();
  // заполняем профиль данными формы
  const profTitle = profile.querySelector('.profile__title');
  const profDesc = profile.querySelector('.profile__description');
  profTitle.textContent = form.elements.name.value;
  profDesc.textContent = form.elements.description.value
  form.reset();
  
}


