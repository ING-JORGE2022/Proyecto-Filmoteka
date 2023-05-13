import { getTrending } from './api';
import { createGalleryPage } from './create-gallery-page';
import refs from './ref';

const galleryMovie = document.querySelector('.gallery-js');
// showHideLoader(refs.loader);
getTrending().then(data => {
  // showHideLoader(refs.loader);
  galleryMovie.insertAdjacentHTML(
    'beforeend',
    createGalleryPage(data.results)
  );

});