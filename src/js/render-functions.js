import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const getGalleryItem = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
  return `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    <div class="image-details">
       <div class="details-header">Likes</div>
        <div class="details-header">Views</div>
        <div class="details-header">Comments</div>
        <div class="details-header">Downloads</div>
        <div class="details-value">${likes}</div>
        <div class="details-value">${views}</div>
        <div class="details-value">${comments}</div>
        <div class="details-value">${downloads}</div>
      </div>
  </a>
</li>`;
};

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 300,
  overlay: true,
  overlayOpacity: 0.5,
});

lightbox.on('show.simplelightbox', function() {
});

lightbox.on('closed.simplelightbox', function() {
});

const renderGallery = (gallery, images) => {
  gallery.insertAdjacentHTML('beforeend', images.map(image => getGalleryItem(image)).join(''));
  lightbox.refresh();
};

export { renderGallery };