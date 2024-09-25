// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; // создал шаблон карточки
// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(data){
  // клонировать шаблон кароточки - создал экземпляр карточки
  const cardTemplateClone = cardTemplate.cloneNode(true); 
  const cardExample =  cardTemplateClone.querySelector('.card');
  //установить значения вложенных элементов
  cardExample .querySelector('.card__image').src = data.link;
  cardExample .querySelector('.card__title').textContent = data.name;
  // удаление карточки
  removeCard(cardExample);
  // поставить лайк
  likeCard(cardExample);
  
  return cardExample;
}


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
