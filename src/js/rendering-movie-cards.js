import { getTrending } from './api';
import { searchMovieName } from './api';
import { createGalleryPage } from './create-gallery-page';
import { createPagination } from './pagination';
import refs from './ref';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Notify } from 'notiflix';

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
  
  const input = document.querySelector('.search__input');
  const btnSearch = document.querySelector('.bx-search');
  
  btnSearch.addEventListener('click', onSearchBtn);

  function onSearchBtn(e) {
    e.preventDefault();
    let movie = input.value.trim();
    console.log(movie);
    searchMovieName(movie, 1) // Pasa el parámetro `movie` y establece `page` como 1
      .then(data => {
        if (!data.total_results) {
          setTimeout(() => {
            Notify.failure("Search result not succesful");
          }, 300);
          return;
        }
        else{
          Notify.info('Hurrah! Search successful 🎉')
        }
        console.log(data.results);
        galleryMovie.innerHTML = "";
        galleryMovie.insertAdjacentHTML(
          'beforeend',
          createGalleryPage(data.results)
        );
        const pagination = createPagination(data.total_results, data.total_pages);
  
        pagination.on('beforeMove', ({ page }) => {
          refs.gallery.innerHTML = '';
          searchMovieName(movie, page).then(data => {
            refs.gallery.innerHTML = createGalleryPage(data.results);
          });
        });
      })
      .catch(error => console.log(error));
  }
