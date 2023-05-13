import { getTrending } from './api';
import { searchMovieName } from './api';
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
const input = document.querySelector('.search__input');
const btnSearch = document.querySelector('.bx-search');

btnSearch.addEventListener('click', onSearchBtn);

function onSearchBtn(e){
  e.preventDefault();
  let movie = input.value.trim();
console.log(movie);
  searchMovieName(movie)
  .then(data => {
       if (!data.total_results) {
       setTimeout(() => {
         console.log("Search result found")
                   }, 5000);
       console.log('Search result not successful.');
       return;
     }
     console.log(data.results);
     galleryMovie.innerHTML="";
     galleryMovie.insertAdjacentHTML(
      'beforeend',
      createGalleryPage(data.results)
    );

   })
   .catch(error => console.log(error));
}