import { notificationStack, notificationNotFound } from './js/notification';
import debounce from 'lodash.debounce';
import getRefs from './js/refs';
import AsyncImageApiService from './js/async-apiService';
import LoadMoreBtn from './js/loadMoreBtn';
import lightboxImage from './js/modal';
import tplImage from './templates/card-image.hbs';
import './sass/main.scss';

const refs = getRefs();
const aImageApiService = new AsyncImageApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '#load-more', hidden: true });

refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  onSearch(event);
});

// refs.searchForm.addEventListener('input', debounce(onSearch, 350));
refs.galleryContainer.addEventListener('click', onModal);
loadMoreBtn.button.addEventListener('click', onLoadMore);

async function onSearch(event) {
  aImageApiService.query = event.target.elements.query.value;

  loadMoreBtn.show();
  loadMoreBtn.disable();

  aImageApiService.resetPage();

  if (aImageApiService.query === '') {
    clearGalleryContainer();
    notificationStack.close();
    loadMoreBtn.enable();
    loadMoreBtn.hide();
    return;
  }

  try {
    const images = await aImageApiService.fetchCountries();
    clearGalleryContainer();
    loadMoreBtn.show();
    appendImageMarkupAndEnableBtn(images);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const images = await aImageApiService.fetchCountries();
    appendImageMarkupAndEnableBtn(images);
    onScroll();
  } catch (error) {
    console.log(error);
  }
}

function appendImageMarkupAndEnableBtn(data) {
  loadMoreBtn.enable();
  appendImageMarkup(data);
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
