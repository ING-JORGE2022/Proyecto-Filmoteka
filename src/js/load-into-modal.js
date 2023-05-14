import refs from './ref';
import { onAddToWatched, onAddToQueue } from './add-to-watched-queue';
import {
  watched,
  queue,
  setQueueLocalStorage,
  setWatchedLocalStorage,
} from './set-get-local-storage';
import noposter from '../images/noposter.jpg';
import { getInfoMovie } from './api';
import colors from './colors';

export function loadIntoModal(id) {
  const film = getInfoMovie(id).then(data => {
    refresh(data, id);
  });
}

function refresh(data, id) {
  if (!createFilmCardMarkup(data)) {
    return;
  }

  const addWatchedRef = document.querySelector('[data-btn=addToWatched]');
  const addQueueRef = document.querySelector('[data-btn=addToQueue]');

  if (watched.includes(id)) {
    addWatchedRef.textContent = 'Is in watched';
    addWatchedRef.style.backgroundColor = colors.colorAccentSec;
    addWatchedRef.style.color = colors.colorHeader;
    addWatchedRef.style.border = 'none';
  }
  if (queue.includes(id)) {
    addQueueRef.textContent = 'Is in queue';
    addQueueRef.style.backgroundColor = colors.colorAccentSec;
    addQueueRef.style.color = colors.colorHeader;
    addQueueRef.style.border = 'none';
  }

  addWatchedRef.addEventListener('click', () => {
    if (watched.includes(id)) {
      watched.splice(watched.indexOf(id), 1);
      setWatchedLocalStorage(watched);
        addWatchedRef.style.backgroundColor = colors.colorHeader;
        //HACER FUNCION UPDATE LIBRARY
    } else {
      onAddToWatched(id);
      //   setWatchedLocalStorage(watched);
    }
    refs.modalContent.innerHTML = '';
    refresh(data, id);
  });

  addQueueRef.addEventListener('click', () => {
    if (queue.includes(id)) {
      queue.splice(queue.indexOf(id), 1);
      setQueueLocalStorage(queue);
      addQueueRef.style.backgroundColor = colors.colorHeader;
    } else {
      onAddToQueue(id);
      //   setQueueLocalStorage(queue);
    }
    refs.modalContent.innerHTML = '';
    refresh(data, id);
  });
}

function createFilmCardMarkup(data) {
  let status = true;
  if (!data) {
    refs.modalContent.innerHTML =
      '<div class="modal__empty">Sorry, info is unavailable</div>';
    status = false;
    return;
  }

  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
    : noposter;

  const markup = `<img
      class="modal__img"
      src="${poster}"
      alt=""
      width="240"
      height="357"
    />
    <div>
      <h2 class="modal__title">${data.title}</h2>
      <div class="modal__list-box">
        <ul class="modal__list list">
          <li class="modal__list-item">
            <p class="modal__list-rigth">Vote/Votes </p>
          </li>
          <li class="modal__list-item">
            <p class="modal__list-rigth">Popularity</p>
          </li>
          <li class="modal__list-item">
            <p class="modal__list-rigth">Original Title</p>
          </li>
          <li class="modal__list-item">
            <p class="modal__list-rigth">Genre</p>
          </li>
        </ul>
        <ul class="modal__list list">
          <li class="modal__list-item modal__left">
            <p class="modal__list-left">
    <span class="modal__list-vote">${data.vote_average.toFixed(1)}</span>
                <span class="modal__list-slesh">/</span>
                <span class="modal__list-votes">${data.vote_count}</span>
    </p>
          </li>
          <li class="modal__list-item modal__left">

            <p class="modal__list-left">${
              data.popularity.toFixed(1) ?? '-'
            } </p>

          </li>
          <li class="modal__list-item modal__left">
            <p class="modal__list-left">${data.title}</p>
          </li>
          <li class="modal__list-item modal__left">
            <p class="modal__list-left">${getGenres(data.genres)}</p>
          </li>
        </ul>
      </div>
      <h3 class="modal__subtitle">ABOUT</h3>
      <p class="modal__descrpt">
       ${data.overview ?? '---'}
      </p>
       
      <ul class="modal__btn-list list">
        <li>
          <button type="button" class="modal__btn" data-btn="addToWatched">
            add to Watched
          </button>
        </li>
        <li>
          <button type="button" class="modal__btn" data-btn="addToQueue">
            add to queue
          </button>
        </li>
      </ul>
    </div>`;

  refs.modalContent.innerHTML = markup;
  const voteRef = document.querySelector('.modal__list-vote');

  if (data.vote_average < 6) {
    voteRef.style.backgroundColor = colors.colorHeader;
    voteRef.style.color = colors.colorBody;
  }

  return status;
}

function getGenres(arrOfGenres) {
  return arrOfGenres.map(genr => genr.name).join(', ');
}
