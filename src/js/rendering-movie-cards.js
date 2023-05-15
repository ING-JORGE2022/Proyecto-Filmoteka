import { getTrending } from './api';
import { createGalleryPage } from './create-gallery-page';
import { createPagination } from './pagination';
import refs from './ref';

const galleryMovie = document.querySelector('.gallery-js');
// showHideLoader(refs.loader);
getTrending().then(data => {
  // showHideLoader(refs.loader);
  galleryMovie.insertAdjacentHTML(
    'beforeend',
    createGalleryPage(data.results)
  );

  const pagination = createPagination(data.total_results, data.total_pages);
  pagination.on('beforeMove', ({page})=>{
    refs.gallery.innerHTML = '';
    getTrending(page)
    .then(data => {
      refs.gallery.innerHTML = createGalleryPage(data.results);
    })
  })
});