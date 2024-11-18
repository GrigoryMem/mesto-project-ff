export function createCard(setCard,elem) {
  // elem  JSON объект с сервера
  
  // console.log(elem)
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
  // работа с лайком карточки
  // сравнивать есть ли ID пользователя в массиве лайков у карточки. 
  // Если есть - красим лайк, иначе нет
  const cardDataLikes = elem.likes
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
   
  

 cardLikeCount.textContent = elem.likes.length;
  
  // событие - удаление карточки
  let cardForDelete = {};
  cardDeleteBtn.addEventListener('click',()=> {
    setCard.handleDeleteCard(setCard.modal.window,elem._id,cardExample,cardForDelete)
  })
  setCard.modal.window.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(!cardForDelete.cardElement) return;
   
    setCard.deleteCard(elem._id)
      .then(()=>{
        cardForDelete.cardElement.remove();
        setCard.modal.closeModal(setCard.modal.window);
      cardForDelete = {};
    })
    .catch((err) => {
      return err
    })
  })

  // событие - поставить лайк
  const cardConfig ={
      cardId:elem._id,
      cardLikeCount
  }
 
        
   
  

 
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

// @todo: Функция удаления карточки

export function removeCard(idCard,card) {
  card.remove();

  return idCard
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

  




