const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-26',
  headers: {
    authorization: "fe60ae7a-5d46-46b6-9dc4-993d5b7ea2a2",
    'Content-Type': 'application/json'
  }
}
// 


export function reqGetData(path){
    const newUrl = config.baseUrl+path;
    return fetch(newUrl,{
      method: 'GET',
      headers: config.headers
    })
    .then(handleResponse)
  }


export function pathData (data) {
  
  return fetch(config.baseUrl +'/users/me', {
    method: 'PATCH',
    headers:config.headers,
    body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

export function postData(data) {
  return fetch(config.baseUrl +'/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
    })
    .then(handleResponse)
  }

export function reqDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleResponse)
  }


export function reqPostLike(cardId,data) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(handleResponse)
  }

export function reqDelLike(cardId,data) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify(data)
    })
      .then(handleResponse)
  }



export function reqPatchAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
    })
      .then(handleResponse)
  }

  export function reqcheckImage(data) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'HEAD',
      headers: config.headers,
      body: JSON.stringify(data)
      })
        .then(handleResponse)
    }

function handleResponse(res) {
  if(res.ok){
    return res.json();
  }else{
     // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка сервера: ${res.status}`);
  }
}


