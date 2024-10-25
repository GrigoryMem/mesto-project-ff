export function createCard(setCard,elem) {
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  setCard.src.template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const image = cardExample.querySelector('.card__image');
  // получение  данных карточки из массива объектов с  src и link
  cardExmpImg.src = setCard.src.getElem(elem).link;
  cardExample.querySelector('.card__title').textContent = setCard.src.getElem(elem).name;
  cardExmpImg.alt = setCard.src.getElem(elem).name;
  // событие - удаление карточки
  cardExample.querySelector('.card__delete-button').addEventListener('click',()=> {
    removeCard(cardExample);
  })

  // событие - поставить лайк
  cardLikeBtn.addEventListener('click',()=> {
    setCard.acts.like(cardLikeBtn) // лайк карточки
  })
  // cобытие открыть картинку
  image.addEventListener('click',()=>{
    setCard.acts.open(cardExample,image,openModal) // просмотр картинки
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
