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

export function postCard(data) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me',{
    method: 'POST',
    headers: {
      autohorization: token,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  .then(handleResponse)
}

function handleResponse(res) {
  if(res.ok){
    return res.json();
  }
}


