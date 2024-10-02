// Se precisar de apenas o primeiro elemento com essa classe:

const addButton = document.getElementById('add-book');
const pdfFileInput = document.getElementById('pdf-file-input');
const bookNameModal = document.getElementById('book-name-modal');
const bookNameInput = document.getElementById('book-name-input');
const confirmAddBookButton = document.getElementById('confirm-add-book');
const bookCarousel = document.getElementById('book-carousel');

document.querySelector('.add-button').addEventListener('click', function() {
    pdfFileInput.click()
    // ação
});

// Personalização do carrossel
var flkty = new Flickity('.js-flickity', {
    wrapAround: true,  // Permite que o carrossel seja circular
    pageDots: false,   // Remove os pontos de navegação, se quiser
    autoPlay: 3000,    // Troca automaticamente a cada 3 segundos
    pauseAutoPlayOnHover: true,  // Pausa ao passar o mouse
  });
  