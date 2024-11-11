import axios from 'axios';

const perPage = 15;

const requestParams = new URLSearchParams({
  key:  '46874529-ef321ad5a592feec695df9124',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: perPage,
});

async function processData(data) {
  if (data.hits.length === 0) {
    throw new Error('Sorry, there are no images matching your search query. Please try again!');
  }

  return Promise.resolve(data.hits.map(hit => ({
    webformatURL: hit.webformatURL,
    largeImageURL: hit.largeImageURL,
    tags: hit.tags,
    likes: hit.likes,
    views: hit.views,
    comments: hit.comments,
    downloads: hit.downloads,
  })));
}

const fetchFirstPage = async (query) => {
  return await fetchPage(query, 1);
};

const fetchNextPage = async (query) => {
  const nextPage = Number.parseInt(requestParams.get("page")) + 1;

  return await fetchPage(query, nextPage);
};

async function fetchPage(query, page) {
  requestParams.set('q', query);
  requestParams.set('page', page);

  const response = await axios.get(`https://pixabay.com/api/?${requestParams}`);
  const images = await processData(response.data);

  return {
    images: images,
    noMoreImages: response.data.totalHits <= page * perPage,
  };
}

export { fetchFirstPage, fetchNextPage };