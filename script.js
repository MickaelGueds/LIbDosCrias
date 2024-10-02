document.addEventListener('DOMContentLoaded', () => {
    // Selecionar elementos do DOM
    const addButton = document.getElementById('add-button');
    const pdfFileInput = document.getElementById('pdf-file-input');
    const bookNameModal = document.getElementById('book-name-modal');
    const bookNameInput = document.getElementById('book-name-input');
    const bookCoverInput = document.getElementById('book-cover-input');
    const confirmAddBookButton = document.getElementById('confirm-add-book');
    const bookCarousel = document.querySelector('.book.js-flickity');

    // Variável para armazenar o PDF selecionado
    let selectedPdfFile = null;

    // Inicialização do Flickity
    const flickityInstance = new Flickity(bookCarousel, {
        wrapAround: true
    });

    // Evento de clique para abrir o seletor de arquivos PDF
    addButton.addEventListener('click', () => {
        pdfFileInput.click();
    });

    // Evento de mudança para capturar o PDF selecionado
    pdfFileInput.addEventListener('change', (event) => {
        selectedPdfFile = event.target.files[0];
        if (selectedPdfFile) {
            bookNameModal.style.display = 'block';
        }
    });

    // Evento de clique para confirmar a adição do livro
    confirmAddBookButton.addEventListener('click', () => {
        const bookName = bookNameInput.value.trim();
        const bookCover = bookCoverInput.value.trim();

        if (bookName && bookCover && selectedPdfFile) {
            // Criar um novo elemento de livro
            const newBookCell = document.createElement('div');
            newBookCell.classList.add('book-cell');

            // Adicionar a estrutura do novo livro ao carrossel
            newBookCell.innerHTML = `
                <div class="book-info">
                    <div class="book-img">
                        <img src="${bookCover}" alt="${bookName}" class="book-photo">
                    </div>
                    <div class="book-content">
                        <div class="book-title">${bookName}</div>
                        <div class="book-author">PDF Adicionado</div>
                        <button class="continue-reading-btn">Continuar Leitura</button>
                    </div>
                </div>
                <div class="book-stats">
                    <p>Página atual: 0</p>
                    <p>Progresso: 0%</p>
                </div>
            `;

            // Adicionar o novo livro ao carrossel
            flickityInstance.append(newBookCell);

            // Atualizar o Flickity após a adição do novo elemento
            flickityInstance.reloadCells();

            // Limpar o modal e os inputs
            bookNameModal.style.display = 'none';
            bookNameInput.value = '';
            bookCoverInput.value = '';
            selectedPdfFile = null;
        } else {
            alert("Por favor, preencha o nome do livro, o link da capa e selecione um PDF.");
        }
    });
});
