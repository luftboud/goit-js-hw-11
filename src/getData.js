const axios = require('axios').default;
const API_KEY = '36975406-14cef0b651718033f414d4154';
const BASE_URL = 'https://pixabay.com/api/';
let q;
let page = 1;
const response = axios.get(
  `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
);

function textInput(event) {
  page = 1;
  q = event.target.value;
  console.log(q);
}

export { axios, API_KEY, BASE_URL, response, textInput, q, page };
