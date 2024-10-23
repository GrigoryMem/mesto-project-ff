export function createCard(data, removeCard, likeCard, template, openCard,openModal) {
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const image = cardExample.querySelector('.card__image');
  cardExmpImg.src = data.link;
  cardExample.querySelector('.card__title').textContent = data.name;
  cardExmpImg.alt = data.name;
  // событие - удаление карточки
  cardExample.querySelector('.card__delete-button').addEventListener('click',()=> {
    removeCard(cardExample);
  })

  // событие - поставить лайк
  cardLikeBtn.addEventListener('click',()=> {
    likeCard(cardLikeBtn);
  })
  // cобытие открыть картинку
  image.addEventListener('click',()=>{
    openCard(cardExample,image,openModal)
  })
  
  return cardExample;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
  card.remove();
}

// @todo: Функция лайка карточки

export function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}



