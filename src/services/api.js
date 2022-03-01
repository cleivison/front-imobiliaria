import axios from 'axios';

export const isAuthenticated = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    const token = user.token;
    return token ? `Bearer ${token}` : null;
  }
  return null; 
}

export function saveUser(data){
    localStorage.setItem("user", JSON.stringify(data));
    refreshAuthorization();
}

export const refreshAuthorization = () => {
    api.defaults.headers.Authorization = isAuthenticated();
}

//export const base_url = process.env.BASE_URL;
//export const base_url = 'https://wpcorretoresdeimoveis.com.br/';
export const base_url = 'https://wp-imobiliaria.herokuapp.com/';

export const api = axios.create({
    baseURL: base_url+'',
    headers:{
        Authorization: isAuthenticated(),
        Accept: '*/*',       
    },
    // validateStatus: function (status) {
    //     return status < 500;
    // }
});

// api.interceptors.response.use((response) => {
//     console.log("response ->>",response)
//     return response;
// }, function (error) {
//     const errorResponse = {};
//     //console.log(error.response);
//     if (error.response === undefined || error.response.status === 500) { // NETWORK ERROR
//       errorResponse.error = 'Problema de conexão com o servidor, tente mais tarde!';
//     }else{
//       if(error.response.status === 401){
//         localStorage.clear();
//         window.location.replace('/login');
//       }
//       errorResponse.error = error.response.data.error;
//     }

//     return errorResponse;
// });