


// TODO: 
// import books from .csv file
// change code to display book details maybe --> "Title, by Author"


let listElement = document.getElementById("booklist")
let bookTitles = ["Apple 1", "Ban 2", "Title 3", "Title 4", "Title 5", "Title 6", "Title 7", "Title 8", "Title 9", "Title 10", "Title 11", "Title 12", "Title 13", "Title 14", "Title 15"]
for (i=0; i<bookTitles.length; i++) {
    var li = document.createElement('li')
    li.innerText = bookTitles[i];
    listElement.appendChild(li)
}

const inputField = document.querySelector("[id='input-title']")
const dropdown = document.querySelector('.booklist')
const dropdownArray = [... document.querySelectorAll('li')]

dropdown.classList.add('open')

let valueArray = [];
dropdownArray.forEach(item => {
    valueArray.push(item.textContent);
});

const closeDropdown = () => {
    dropdown.classList.remove('open');
}


inputField.addEventListener('input', () => {
    dropdown.classList.add('open');
    let inputValue = inputField.value.toLowerCase();
    let valueSubstring;
    if (inputValue.length > 0) {
        for (let j = 0; j < valueArray.length; j++) {
            if (!valueArray[j].toLowerCase().includes(inputValue.substring(0, inputValue.length))) {
                dropdownArray[j].classList.add('closed');
            } else {
                dropdownArray[j].classList.remove('closed');
            }
        }
    } else {
        for (let i = 0; i < dropdownArray.length; i++) {
            dropdownArray[i].classList.remove('closed');
        }
    }
});

dropdownArray.forEach(item => {
    item.addEventListener('click', (evt) => {
        inputField.value = item.textContent;
        dropdownArray.forEach(dropdown => {
            dropdown.classList.add('closed');
        });
    });
})

inputField.addEventListener('focus', () => {
    inputField.placeholder = 'Enter the title of the book.';
    dropdown.classList.add('open');
    dropdownArray.forEach(dropdown => {
        dropdown.classList.remove('closed');
    });
});

inputField.addEventListener('blur', () => {
    inputField.placeholder = 'Enter the title of the book.';
    dropdown.classList.remove('open');
});

document.addEventListener('click', (evt) => {
    const isDropdown = dropdown.contains(evt.target);
    const isInput = inputField.contains(evt.target);
    if (!isDropdown && !isInput) {
        dropdown.classList.remove('open');
    }
    
});
