let searchInput = document.getElementById('searchBar');
let createNote = document.getElementById('createNoteBtn');
let modal = document.getElementById('myModal');
let filesList = document.querySelector('.files__list');

// search created notes in the given list
searchInput.addEventListener('keyup', () => {
    let item = searchInput.value.toLowerCase().trim();
    searchItem(item);
});

searchInput.addEventListener('blur', () => searchInput.value = '', searchItem(searchInput.value));

// search items through title
function searchItem(value){
    let lists = document.querySelectorAll('li.files__item');
    if(lists.length <= 0) return;
    lists.forEach(list => {
        (list.querySelector('.file__title').innerText.toLowerCase().includes(value))
            ? list.classList.remove('hide')
            : list.classList.add('hide');
    });
}

// delete specific note
const deleteNote = () => this.event.target.parentElement.parentElement.remove();

// edit modal function
function editNote(){
    let element = this.event.target.parentElement.parentElement;
    element.classList.add('selected');
    modal.classList.add('show');
    modal.querySelector('.modal__title').innerText = 'Edit The Note';
    modal.querySelector('button').setAttribute('onclick', 'editedNote()');
    modal.querySelector('#inputTitleNote').value = element.querySelector('.file__title').innerText;
    modal.querySelector('#inputTextNote').value = element.querySelector('.file__text').innerText;
}

function editedNote(){
    let element = this.event.target.parentElement;
    let lists = document.querySelectorAll('li.files__item');
    let inputTitle = element.querySelector('#inputTitleNote');
    let inputText = element.querySelector('#inputTextNote');
    if(inputTitle.value.trim() == '' || inputText.value.trim() == '') return;
    lists.forEach(list => {
        if(list.classList.contains('selected')){
            list.querySelector('.file__title').innerText = inputTitle.value.trim();
            list.querySelector('.file__text').innerText = inputText.value;
            modal.classList.remove('show');
            list.classList.remove('selected');
            return;
        };
    });
}

// show modal function
createNote.addEventListener('click', () => {
    modal.classList.add('show');
    modal.querySelector('.modal__title').innerText = 'Create New Note';
    modal.querySelector('button').setAttribute('onclick', 'saveNote()');
});

// close modal function
function closeModal(){
    let lists = document.querySelectorAll('li.files__item');
    modal.querySelector('#inputTitleNote').value = '';
    modal.querySelector('#inputTextNote').value = '';
    modal.classList.remove('show');
    lists.forEach(list => list.classList.remove('selected'));
}

// save note function
function saveNote(){
    let inputTitle = modal.querySelector('#inputTitleNote');
    let inputText = modal.querySelector('#inputTextNote');
    if(inputTitle.value.trim() == '' || inputText.value.trim() == '') return;
    filesList.appendChild(createNoteList(inputTitle.value.trim(), inputText.value));
    inputText.value = '';
    inputTitle.value = '';
    modal.classList.remove('show');
}

// create a new note to the list
function createNoteList(title, text){
    let li = document.createElement('li');
    li.className = 'files__item';
    li.innerHTML = `<span class="material-icons">
                        &#xef42;
                        <span class="file__title">${title}</span>
                    </span>
                    <span class="last__updated"><strong>Last Updated:</strong>10 March,2022</span>
                    <span class="file__tools">
                        <span class="material-icons edit__file" onclick="editNote()">&#xe3c9;</span>
                        <span class="material-icons delete__file" onclick="deleteNote()">&#xe872;</span>
                    </span>
                    <p class="file__text" style="display: none;">${text}</p>`;
    return li;
}
