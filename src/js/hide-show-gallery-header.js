window.addEventListener('scroll', onScrollGallery);

function onScrollGallery(event) {
  let header = document.querySelector('.header');
  let gallery = document.querySelector('.gallery');
  if (window.pageYOffset > 0) {
    header.classList.add('hidden');
    gallery.classList.add('top');
  } else {
    setTimeout(function () {
      header.classList.remove('hidden');
      gallery.classList.remove('top');
    }, 100); // Espera 300 milisegundos (0.3 segundos) antes de eliminar la clase "hidden"
  }
}
