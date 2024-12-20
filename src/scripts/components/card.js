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
  const userID = setCard.authorLikCardID;
  // если я не являюсь владельцем карточки, удаляем кнопку корзины
    //  т.к. я не могу удалять чужие карточки
    if(dataCard.owner._id !== userID) {
            cardDeleteBtn.remove();
    }

  // работа с лайком карточки
  // сравнивать есть ли ID пользователя в массиве лайков у карточки. 
  // Если есть - красим лайк, иначе нет
  const cardConfig = {
    cardId:dataCard._id,
    cardLikeCount,
    classActive:'card__like-button_is-active'
}
  const cardDataLikes = dataCard.likes

  const isLiked = cardDataLikes.some((like)=>{
    // сравнием ID пользователя с теми кто лайкнул эту карточку
    if(like._id === userID){
       return true
      }
  })

    if(isLiked){
      cardLikeBtn.classList.add(cardConfig.classActive);
     }else{
      cardLikeBtn.classList.remove(cardConfig.classActive);
     }
  cardLikeCount.textContent = dataCard.likes.length;
  
  //CОБЫТИЯ
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
    // если нет лайка(если класс лайка у иконки есть)
      if(!cardConfig.btn.classList.contains(cardConfig.classActive)){
      // запрос поставить лайк
      setCard.reqPostLike(cardConfig.cardId)
      .then((res)=>{
        toggleLike(true,res,cardConfig);
        console.log(`Лайк поставлен`);
      })
      .catch((err)=>{
        console.log(`Ошибка при постановке лайка карточки ${err} `)
      })
      .finally(()=>{
        console.log("проверьте результат выполнения");
      })
    } 
    // если лайк стоит(если класса лайка  у иконки нет)
    if(cardConfig.btn.classList.contains(cardConfig.classActive)){
        // запрос снять лайк
        setCard.reqDelLike(cardConfig.cardId)
          .then((res)=>{
            toggleLike(false,res,cardConfig)
            console.log(`Лайк снят`);
           })
           .catch((err)=>{
            console.log(`Ошибка при снятии лайка карточки ${err} `)
          })
          .finally(()=>{
            console.log("проверьте результат выполнения");
          })
          
    }
}

// только для запроса снять/поставить лайк
function toggleLike(switcher,res,cardConfig) {
  if(switcher) {
    // красим лайк
    cardConfig.btn.classList.add(cardConfig.classActive);
  }else {
    // стираем лайк
    cardConfig.btn.classList.remove(cardConfig.classActive);
  }
  // в любом случае обновляем количество лайков
  cardConfig.cardLikeCount.textContent = res.likes.length;
}
  




