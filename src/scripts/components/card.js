export function createCard(setCard,dataCard) {
  // dataCard JSON объект с сервера
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone =  setCard.template.cloneNode(true);
  const cardExample = cardTemplateClone.querySelector('.card');
  const cardExmpImg = cardExample.querySelector('.card__image');
  const cardLikeBtn = cardExample.querySelector('.card__like-button');
  const cardDeleteBtn = cardExample.querySelector('.card__delete-button');
  const image = cardExample.querySelector('.card__image');
  const cardLikeCount = cardExample.querySelector('.card__like-count');
  // получение  данных карточки
 
 
  cardExmpImg.src = dataCard.link
  cardExample.querySelector('.card__title').textContent = dataCard.name;
  cardExmpImg.alt = dataCard.name;
  // работа с лайком карточки
  // сравнивать есть ли ID пользователя в массиве лайков у карточки. 
  // Если есть - красим лайк, иначе нет
  const cardConfig = {
    cardId:dataCard._id,
    cardLikeCount
}
  const cardDataLikes = dataCard.likes
  const isLiked = cardDataLikes.some((like)=>{
    if(like._id === "f5bbbfc6daa06470f1f78ec3"){
       return true
      }
  })
  
    if(isLiked){
      cardLikeBtn.classList.add('card__like-button_is-active');
     }else{
      cardLikeBtn.classList.remove('card__like-button_is-active');
     }
  cardLikeCount.textContent = dataCard.likes.length;
  
  // событие - удаление карточки
  cardDeleteBtn.addEventListener('click',()=> {
    // колбэк удаления, который нам нужно будет вызвать 
    // с данными элементом карточки (для удаления) и ее ID:
    setCard.acts.remove(cardConfig.cardId,cardExample,setCard);
  })
// событие - поставить лайк
  cardLikeBtn.addEventListener('click',(event)=> {
    cardConfig.btn = event.target
    likeCard(cardConfig,setCard)
})
  // cобытие открыть картинку
  image.addEventListener('click',()=>{
    setCard.acts.open(cardExample,image) // просмотр картинки
  })
  return cardExample;
}

// @todo: Функция лайка карточки

export function likeCard(cardConfig,setCard) {
  console.log(cardConfig)
      if(!cardConfig.btn.classList.contains('card__like-button_is-active')){
      // запрос поставить лайк
      setCard.reqPostLike(cardConfig.cardId)
      .then((res)=>{
        console.log(res)
        cardConfig.cardLikeCount.textContent = res.likes.length;
        cardConfig.btn.classList.add('card__like-button_is-active');
      })
      .catch((err)=>{
        console.error(err)
      })
    } 
    if(cardConfig.btn.classList.contains('card__like-button_is-active')){
        // запрос снять лайк
        setCard.reqDelLike(cardConfig.cardId)
          .then((res)=>{
            console.log(res)
            cardConfig.cardLikeCount.textContent = res.likes.length;
            cardConfig.btn.classList.remove('card__like-button_is-active');
           })
           .catch((err)=>{
            console.error(err)
          })
          
    }
}

  




