const token= "fe60ae7a-5d46-46b6-9dc4-993d5b7ea2a2";
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-26',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': token
  }
}

export function reqGetData(path){
   
    const newUrl = config.baseUrl+path;
    
    return fetch(newUrl,{
      method: 'GET',
      headers: {
        authorization: token,
       
      }
    })
      .then(handleResponse)
  }


export function pathData (data) {
  
  return fetch(config.baseUrl +'/users/me', {
  method: 'PATCH',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(handleResponse)
 
}

export function postData(data) {
  return fetch(config.baseUrl +'/cards', {
  method: 'POST',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(handleResponse)
}

export function reqDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
 
  }).then(handleResponse)
}


export function reqPostLike(cardId,data) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
 
  }).then(handleResponse)
}

export function reqDelLike(cardId,data) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
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
  
  return fetch(`${config.baseUrl}/users/me/avatar`, {
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


