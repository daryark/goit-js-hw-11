import { Notify } from 'notiflix';
// import simpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderPhotos } from './js/markup';
import { PixabayAPI } from './js/pixaby-api';
const pixabayAPI = new PixabayAPI();

const form = document.querySelector('form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
form.elements.searchQuery.addEventListener('input', onInputClear);

function onSubmit(e) {
  e.preventDefault();

  galleryContainer.innerHTML = '';

  pixabayAPI.q = e.currentTarget.elements.searchQuery.value;
  pixabayAPI.page = 1;

  pixabayAPI
    .fetchPhotosByQ()
    .then(res => {
      if (!res.data.hits.length) {
        throw new Error();
      }
      return res;
    })
    .then(showLoadMoreBtn)
    .then(renderPhotos)
    .catch(errorMessage)
    .finally(_ => form.reset());
}

function onLoadMoreBtnClick() {
  pixabayAPI.page += 1;

  pixabayAPI
    .fetchPhotosByQ()
    .then(hideLoadMoreBtn)
    .then(renderPhotos)
    .catch(errorMessage);
}

function showLoadMoreBtn(res) {
  if (res.data.totalHits >= PixabayAPI.per_page) {
    loadMoreBtn.classList.remove('hidden');
  }
  return res;
}

function hideLoadMoreBtn(res) {
  if (res.data.totalHits <= pixabayAPI.page * PixabayAPI.per_page) {
    loadMoreBtn.classList.add('hidden');
    infoMessage();
  }
  return res;
}

function onInputClear() {
  if (!form.elements.searchQuery.value) {
    galleryContainer.innerHTML = '';
  }
}

function errorMessage() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function infoMessage() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}
