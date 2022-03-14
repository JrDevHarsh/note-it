let searchInput = document.getElementById('searchBar');
let createNote = document.getElementById('createNoteBtn');
let modal = document.getElementById('myModal');

// search created notes in the given list
searchInput.addEventListener('keyup', () => {
    let item = searchInput.value.toLowerCase().trim();
    searchItem(item);
});

searchInput.addEventListener('blur', () => {
    searchInput.value = '';
    searchItem(searchInput.value);
});

// saerch items through title
function searchItem(value){
    let lists = document.querySelectorAll('li.files__item');
    if(lists.length <= 0) return;
    lists.forEach(list => {
        (list.querySelector('.file__title').innerText.toLowerCase().includes(value))
            ? list.classList.remove('hide')
            : list.classList.add('hide')
    });
}

// delete specific note
const deleteNote = () => this.event.target.parentElement.parentElement.remove();

// show modal function
createNote.addEventListener('click', () => {
    modal.classList.add('show');
});

// remove modal function
function closeModal(){
    let inputTitle = modal.querySelector('#inputTitleNote');
    let inputText = modal.querySelector('#inputTextNote');
    inputText.value = '';
    inputTitle.value = '';
    this.event.target.parentElement.parentElement.classList.remove('show');
}

// save note function
function saveNote(){
    let inputTitle = modal.querySelector('#inputTitleNote');
    let inputText = modal.querySelector('#inputTextNote');
    if(inputTitle.value.trim() == '' || inputText.value.trim() == '') return;
    let filesList = document.querySelector('.files__list');
    filesList.appendChild(createNoteList(inputTitle.value.trim()));
    inputText.value = '';
    inputTitle.value = '';
    modal.classList.remove('show');
}

function createNoteList(title){
    // creating a new note to the list
    let li = document.createElement('li');
    li.className = 'files__item';
    li.innerHTML = `<span class="material-icons">
                        &#xef42;
                        <span class="file__title">${title}</span>
                    </span>
                    <span class="last__updated"><strong>Last Updated:</strong>10 March,2022</span>
                    <span class="file__tools">
                        <span class="material-icons edit__file">&#xe3c9;</span>
                        <span class="material-icons delete__file" onclick="deleteNote()">&#xe872;</span>
                    </span>`;
    return li;
}
