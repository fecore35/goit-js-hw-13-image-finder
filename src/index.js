import { notificationStack, notificationNotFound } from './js/notification';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';
import ImageApiService from './js/apiService.js';
import LoadMoreBtn from './js/loadMoreBtn';
import lightboxImage from './js/modal';
import tplImage from './templates/cart-image.hbs';
import './sass/main.scss';

const refs = getRefs();
const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '#load-more', hidden: true });

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
});

refs.searchForm.addEventListener('input', debounce(onSearch, 350));
refs.galleryContainer.addEventListener('click', onModal);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  imageApiService.query = event.target.value;

  loadMoreBtn.disable();
  loadMoreBtn.show();

  imageApiService.resetPage();

  if (imageApiService.query === '') {
    clearGalleryContainer();
    notificationStack.close();
    loadMoreBtn.enable();
    loadMoreBtn.hide();
    return;
  }

  imageApiService
    .fetchCountries()
    .then(images => {
      clearGalleryContainer();
      loadMoreBtn.show();

      loadMoreBtn.enable();
      appendImageMarkup(images);
    })
    .catch(error => console.log(error));
}

function onLoadMore() {
  loadMoreBtn.disable();

  imageApiService
    .fetchCountries()
    .then(images => {
      loadMoreBtn.enable();
      appendImageMarkup(images);

      onScroll();
    })
    .catch(error => console.log(error));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
  loadMoreBtn.hide();
}

function appendImageMarkup(images) {
  notificationStack.close();
  if (!images.length) {
    loadMoreBtn.hide();
    notificationNotFound();
  }
  refs.galleryContainer.insertAdjacentHTML('beforeend', tplImage(images));
}

function onScroll() {
  refs.searchSection.scrollIntoView({
    block: 'end',
    behavior: 'smooth',
  });
}

function onModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'A') {
    return;
  }
  lightboxImage(event.target.href).show();
}
