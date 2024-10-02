document.addEventListener('DOMContentLoaded', () => {
    // Selecionar elementos do DOM
    const addButton = document.getElementById('add-button');
    const pdfFileInput = document.getElementById('pdf-file-input');
    const bookNameModal = document.getElementById('book-name-modal');
    const bookNameInput = document.getElementById('book-name-input');
    const bookCoverInput = document.getElementById('book-cover-input');
    const confirmAddBookButton = document.getElementById('confirm-add-book');
    const bookCarousel = document.querySelector('.book.js-flickity');

    let selectedPdfFile = null;

    const flickityInstance = new Flickity(bookCarousel, {
        wrapAround: true
    });

    // Carregar livros do JSON ao iniciar a página
    window.electronAPI.loadBooks((books) => {
        books.forEach((book) => {
            const newBookCell = document.createElement('div');
            newBookCell.classList.add('book-cell');

            newBookCell.innerHTML = `
                <div class="book-info">
                    <div class="book-img">
                        <img src="${book.cover}" alt="${book.name}" class="book-photo">
                    </div>
                    <div class="book-content">
                        <div class="book-title">${book.name}</div>
                        <div class="book-author">PDF Adicionado</div>
                        <button class="continue-reading-btn">Continuar Leitura</button>
                    </div>
                </div>
                <div class="book-stats">
                    <p>Página atual: 0</p>
                    <p>Progresso: 0%</p>
                </div>
            `;

            flickityInstance.append(newBookCell);
        });

        flickityInstance.reloadCells();
    });

    addButton.addEventListener('click', () => {
        pdfFileInput.click();
    });

    pdfFileInput.addEventListener('change', (event) => {
        selectedPdfFile = event.target.files[0];
        if (selectedPdfFile) {
            bookNameModal.style.display = 'block';
        }
    });

    confirmAddBookButton.addEventListener('click', () => {
        const bookName = bookNameInput.value.trim();
        const bookCover = bookCoverInput.value.trim();

        if (bookName && bookCover && selectedPdfFile) {
            const newBookCell = document.createElement('div');
            newBookCell.classList.add('book-cell');

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

            flickityInstance.append(newBookCell);
            flickityInstance.reloadCells();

            // Enviar os dados do livro para o processo principal para salvar no JSON
            window.electronAPI.saveBook({
                name: bookName,
                cover: bookCover,
                pdfPath: selectedPdfFile.path
            });

            bookNameModal.style.display = 'none';
            bookNameInput.value = '';
            bookCoverInput.value = '';
            selectedPdfFile = null;
        } else {
            alert("Por favor, preencha o nome do livro, o link da capa e selecione um PDF.");
        }
    });
});
