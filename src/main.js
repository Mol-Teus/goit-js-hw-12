import { errorMessage, successMessage } from './js/common.js';
import { fetchFirstPage, fetchNextPage } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const searchFieldSelector = document.querySelector('.search-field');
const topLoader = document.querySelector('#top-loader');
const gallery = document.querySelector('.gallery');
const loadFormSelector = document.querySelector('#load-form');
const bottomLoader = document.querySelector('#bottom-loader');
const noResultsSelector = document.querySelector('#no-results');

let lastQuery = '';

document.querySelector('#search-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchFieldSelector.value.trim();
  if (query.length === 0 || query === lastQuery) {
    return;
  }

  gallery.innerHTML = '';
  lastQuery = query;
  topLoader.classList.remove('hidden');
  let noMoreImages = false;

  try {
    const data = await fetchFirstPage(query);
    noMoreImages = data.noMoreImages;
    renderGallery(gallery, data.images);
    loadFormSelector.classList.remove('hidden');
    smoothScroll();
  } catch (error) {
    errorMessage(error.message);
    loadFormSelector.classList.add('hidden');
  } finally {
    topLoader.classList.add('hidden');
  }

  if (noMoreImages) {
    noResultsSelector.classList.remove('hidden');
    bottomLoader.classList.add('hidden');
    loadFormSelector.classList.add('hidden');
  } else {
    topLoader.classList.add('hidden');
  }
});

loadFormSelector.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchFieldSelector.value.trim();
  if (query.length === 0) {
    return;
  }

  lastQuery = query;

  bottomLoader.classList.remove('hidden');
  loadFormSelector.classList.add('hidden');
  let noMoreImages = false;

  try {
    const data = await fetchNextPage(query);
    noMoreImages = data.noMoreImages;
    renderGallery(gallery, data.images);
    smoothScroll();
  } catch (error) {
    errorMessage(error.message);
    gallery.innerHTML = '';
  }

  if (noMoreImages) {
    noResultsSelector.classList.remove('hidden');
    bottomLoader.classList.add('hidden');
    loadFormSelector.classList.add('hidden');
  } else {
    bottomLoader.classList.add('hidden');
    loadFormSelector.classList.remove('hidden');
  }
});

const smoothScroll = () => {
  const galleryItem = document.querySelector('.gallery-item');

  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });

  }
};