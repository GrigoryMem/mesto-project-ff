const PATH = 'https://mesto.nomoreparties.co/v1/';
const id = 'wff-cohort-26/'
const url = PATH+id;
'https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me'
const token= "fe60ae7a-5d46-46b6-9dc4-993d5b7ea2a2";


export function getData(path){
    
    const newUrl = url+path;
    
    return fetch(newUrl,{
      method: 'GET',
      headers: {
        authorization: token,
       
      }
    })
        .then(handleResponse)
        
      
}
const pathUser = 'users/me'

export function pathData (data) {
  // const newUrl = url+path;
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me', {
  method: 'PATCH',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(handleResponse)
 
}

let card = {
  "name": "Байкал",
  "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}


export function postData(data) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/cards', {
  method: 'POST',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(handleResponse)
}

export function deleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
 
  }).then(handleResponse)
}


export function postLike(cardId,data) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 
  }).then(handleResponse)
}







function handleResponse(res) {
  if(res.ok){
    return res.json();
  }
}


