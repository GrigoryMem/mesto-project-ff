const PATH = 'https://mesto.nomoreparties.co/v1/';
const id = 'wff-cohort-26/'
const url = PATH+id;
'https://mesto.nomoreparties.co/v1/wff-cohort-26/users/me'



export function getData(path){
    
    const newUrl = url+path;
    
    const token= "fe60ae7a-5d46-46b6-9dc4-993d5b7ea2a2"
    
    console.log(newUrl)
    return fetch(newUrl,{
      method: 'GET',
      headers: {
        authorization: token,
       
      }
    })
        .then(handleResponse)
        
      
}

function handleResponse(res) {
  if(res.ok){
    return res.json();
  }
}