const token= "fe60ae7a-5d46-46b6-9dc4-993d5b7ea2a2";
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-26',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': token
  }
}

const PATH = 'https://mesto.nomoreparties.co/v1/';
const id = 'wff-cohort-26/'
const url = PATH+id;




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

export function reqDeleteCard(cardId) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
 
  }).then(handleResponse)
}


export function reqPostLike(cardId,data) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 
  }).then(handleResponse)
}

export function reqDelLike(cardId,data) {
  return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-26/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
    
     
 
  }).then((res)=>{
   
    if(res.ok){
      return res.json();
    }
  })
}



export function reqPatchAvatar(data) {
  
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me/avatar', {
  method: 'PATCH',
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


