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
      if(like._id === elem.owner._id){
        return true
      }
  })
    if(isLiked){
      cardLikeBtn.classList.add('card__like-button_is-active');
     }else{
      cardLikeBtn.classList.remove('card__like-button_is-active');
     }
   
     if( elem.owner._id === "f5bbbfc6daa06470f1f78ec3"){
      console.log(elem)
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
 
  cardLikeBtn.addEventListener('click',()=> {

   
  
    if(!cardLikeBtn.classList.contains('card__like-button_is-active')){
      // запрос поставить лайк
      setCard.postLike(elem._id)
      .then((res)=>{
        
        res.likes.some((like)=>{
     
          if(!like._id === res.owner._id){
             res.likes.push(res.owner)
            
          }
        })
        console.log(res.likes,res.likes.length, "like",res.owner)
        
        return res;
      })
      .then((res)=>{
       
        cardLikeCount.textContent = res.likes.length;
        cardLikeBtn.classList.add('card__like-button_is-active');
      })

    } 
    if(cardLikeBtn.classList.contains('card__like-button_is-active')){
        // запрос снять лайк

        setCard.reqDelLike(elem._id)
          .then((res)=>{
           
            res.likes.some((like,index)=>{
              if(like._id === res.owner._id){
                res.likes.splice(index,1);
                
              }
            })
            
            console.log(res.likes,res.likes.length,'nolike',res.owner)
            
            return res
           
          })
          .then((res)=>{
            
           cardLikeCount.textContent = res.likes.length;
            cardLikeBtn.classList.remove('card__like-button_is-active');
          })
    }
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

  




