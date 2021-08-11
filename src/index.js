document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    loadDogBreeds();
});

//Chalenge 1
function loadImages() {
    const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
    fetch(imgUrl)
    .then(response => response.json())
    .then(json => {
        json.message.forEach(image => addImage(image));
    });
}

function addImage(url) {
    let container = document.querySelector('#dog-image-container');
    let imgElement = document.createElement('img');
    imgElement.src = url;
    container.appendChild(imgElement);
}

//Challenge 2, 3 & 4

function loadDogBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(response => response.json())
    .then(json => {
        breeds = Object.keys(json.message);
        updateBreedList(breeds);
        addEventListenerForFilterDropdown();
    });
}

function updateBreedList(names) {
    let list = document.querySelector('#dog-breeds');
    removeChildren(list);
    names.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function addBreed(name) {
    let list = document.querySelector('#dog-breeds'); //why doesn't list variable get inherited from the scope of updateBreedList
    let li = document.createElement('li');
    li.innerText = name;
    list.appendChild(li);
    list.addEventListener('click', changeColor);
}

function changeColor(e) {
    e.target.style.color = 'red';
}

function addEventListenerForFilterDropdown() {
    let dropdown = document.querySelector('#breed-dropdown');
    dropdown.addEventListener('change', e => {
        selectBreedsStartingWith(e.target.value);
    });
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}
