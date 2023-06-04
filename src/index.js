import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const API_KEY = '36975406-14cef0b651718033f414d4154';
const BASE_URL = 'https://pixabay.com/api/';
const loadButton = document.querySelector('.load-more');
let totalHits;

const getData = async function () {
  loadButton.classList.remove('visible');
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  if (!response.ok) {
    Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
    throw new Error(response.statusText);
  }
  const data = await response.json();
  if (data.total == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const galleryArray = [];
  for (const imgItem in data.hits) {
    const imgResult = data.hits[imgItem];
    const webformatURL = imgResult.webformatURL;
    const altText = imgResult.tags;
    const likes = imgResult.likes;
    const views = imgResult.views;
    const comments = imgResult.comments;
    const downloads = imgResult.downloads;
    const markupItem = `
        <div class="photo-card">
          <img src="${webformatURL}" alt="${altText}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span class="info-amount">${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span class="info-amount">${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span class="info-amount">${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span class="info-amount">${downloads}</span>
            </p>
          </div>
        </div>`;
    galleryArray.push(markupItem);
  }
  const markup = galleryArray.join('');
  const markupField = document.querySelector('.gallery-field');
  markupField.insertAdjacentHTML('beforeend', markup);
  //and add a "load more" button
  loadButton.classList.add('visible');
  totalHits = data.totalHits;
  return data;
};
let q;
let page = 1;
searchForm.addEventListener('input', textInput);
searchForm.addEventListener('submit', submitedInput);
loadButton.addEventListener('click', loadMore);

function submitedInput(event) {
  event.preventDefault();
  console.log(q);
  //checking if there is already a gallery
  const oddData = document.querySelector('.gallery-field');
  if (oddData) {
    //if it is, we remove it
    oddData.remove();
  }
  //then we create a new gallery
  const galleryField = document.createElement('div');
  galleryField.classList.add('gallery-field');
  gallery.prepend(galleryField);
  //then we fill it with information
  getData().catch(error => {
    Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
    console.log(error);
  });
}

function loadMore() {
  page += 1;
  console.log(page);
  console.log(totalHits);
  let limit = 40;
  let totalPages = totalHits / limit;
  console.log(totalPages);
  if (page > totalPages) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadButton.classList.remove('visible');
    return
  }
  getData().catch(error => {
    Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
    console.log(error);
  });
}

function textInput(event) {
  page = 1;
  q = event.target.value;
  console.log(q);
}
