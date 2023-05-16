import { createLibraryMarkup } from './create-library-markup';
import refs from './ref';
import { watched, queue } from './set-get-local-storage';
import { getArrayofMovies } from './api';

const watchedRef = document.querySelector('[data-id="watched-btn"]');
const queueRef = document.querySelector('[data-id="queue-btn"]');

 watchedRef.addEventListener('click', showWatched);
queueRef.addEventListener('click', showQueue);

function showWatched() {
  if (!watchedRef.classList.contains('header-movie-button--active')) {
    console.log("aqui stoy")
    watchedRef.classList.add('header-movie-button--active');
    watchedRef.disabled = true;
    //cambiar los atributos para que cambie el color de los botones
    //watchedRef.setAttribute('style','background-color: transparent; color: #fff; border: 2px solid #fff');
    //  queue.classList.remove('search__button');
    // queueRef.classList.remove('header-movie-button--active');
    queueRef.disabled = false;
  }
  

  console.log(`array watched :[${watched}] `)

  if (!watched.length) {
    refs.library.innerHTML = `
      <p class="">
        "Oops! Your "watched" library is empty!"
      </p>`;
    return;
  }
  getArrayofMovies(watched)
    .then(data => {
      refs.library.innerHTML = createLibraryMarkup(data);
    })
    .catch(er => console.log(er));
}

function showQueue() {
  if (!queueRef.classList.contains('header-movie-button--active')) {
    queueRef.classList.add('search__button__act');
    queueRef.disabled = true;
    watchedRef.classList.remove('header-movie-button--active');
    watchedRef.disabled = false;
  }
  console.log(queue)

  if (!queue.length) {
    refs.library.innerHTML = `
    <p class="">
        "Oops! Your "Queue" library is empty!"
    </p>`;
    return;
  }
  getArrayofMovies(queue).then(data => {

    refs.library.innerHTML = createLibraryMarkup(data);
  });
}

showWatched();