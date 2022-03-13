let searchInput = document.getElementById('searchBar');
let lists = document.querySelectorAll('li.files__item');

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
    lists.forEach(list => {
        (list.querySelector('.file__title').innerText.toLowerCase().includes(value))
            ? list.classList.remove('hide')
            : list.classList.add('hide')
    });
}

// delete specific note
const deleteNote = () => this.event.target.parentElement.parentElement.remove();