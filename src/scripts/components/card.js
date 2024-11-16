export function createCard(setCard,elem) {
  // elem  JSON объект с сервера
  // if(elem.owner._id === ){

  // }
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  setCard.template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const cardDeleteBtn = cardExample.querySelector('.card__delete-button');
  const image = cardExample.querySelector('.card__image');
  const cardLikeCount = cardExample.querySelector('.card__like-count');
  // получение  данных карточки
  cardExmpImg.src = setCard.acts.getElem(elem).link;
  cardExample.querySelector('.card__title').textContent = setCard.acts.getElem(elem).name;
  cardExmpImg.alt = setCard.acts.getElem(elem).name;
  // вставляем количество лайков
 
  if(elem.likes.length > 0) {
    cardLikeCount.textContent = elem.likes.length;
  } else {
    cardLikeCount.textContent = 0;
  }
  // событие - удаление карточки
  let cardForDelete = {};
  cardDeleteBtn.addEventListener('click',()=> {
    setCard.handleDeleteCard(setCard.modal.window,elem._id,cardExample,cardForDelete)
  })
  setCard.modal.window.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(!cardForDelete.cardElement) return;
    console.log(elem._id)
    setCard.deleteCard(elem._id)
      .then(()=>{
        cardForDelete.cardElement.remove();
        setCard.modal.closeModal(setCard.modal.window);
      cardForDelete = {};
    })
    .catch((err) => {
      console.log(err)
    })
  })
  // событие - поставить лайк
  cardLikeBtn.addEventListener('click',()=> {
    setCard.acts.like(cardLikeBtn) // лайк карточки
  })
  // cобытие открыть картинку
  image.addEventListener('click',()=>{
    setCard.acts.open(cardExample,image) // просмотр картинки
  })
  return cardExample;
}

// @todo: Функция удаления карточки

export function removeCard(idCard,card) {
  card.remove();

  return idCard
}

// @todo: Функция лайка карточки

export function likeCard(card) {
  card.classList.toggle('card__like-button_is-active');
}

  




