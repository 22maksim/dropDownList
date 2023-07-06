
const creatDropDownList = (key, array) => {
  const selectDropDown = document.createElement('div');
  selectDropDown.classList.add('select-dropdown', `select-dropdown--${key}`);
  const selectDropDownButton = document.createElement('button');
  selectDropDownButton.classList.add('select-dropdown__button', `select-dropdown__text--${key}`);
  const selectDropDownText = document.createElement('span');
  selectDropDownText.classList.add('select-dropdown__text', `select-dropdown__text--${key}`);
  selectDropDownText.textContent = 'Выберите элемент';
  selectDropDownButton.prepend(selectDropDownText);
  selectDropDown.prepend(selectDropDownButton);
  const selectDropDownList = document.createElement('ul');
  selectDropDownList.classList.add('select-dropdown__list', `select-dropdown__list--${key}`);
  const selectDropDownListItemAdd = array.forEach((item) => {
    const selectDropDownListItem = document.createElement('li');
    selectDropDownListItem.classList.add('select-dropdown__list-item"');
    selectDropDownListItem.dataset.value = item.value;
    selectDropDownListItem.textContent = `${item.text}`;
    selectDropDownList.append(selectDropDownListItem);
  })
  selectDropDown.append(selectDropDownList);
  

  return selectDropDown;
}

class CustomSelect {
  #id;
  #options;
  #currentSelectedOption;

  constructor(id, options) {
    this.#id = id;
    this.#options = options;
  }

  render(container) {
    // const knotDom = document.querySelector(`${container}`);
    const knotDom = container;
    container.append(creatDropDownList(this.#id, this.#options));
    this.#addEvents();
  }

  #addEvents() {
    const eventButton = document.querySelector('.select-dropdown__button');
    eventButton.addEventListener('click', (event) => {
      event.preventDefault();
      const trueClass = document.querySelector('ul');
      if (trueClass.classList.contains('active')) {
        trueClass.classList.remove('active');
      } else {
        trueClass.classList.add('active');
      }
    });

    const evenLinksUl = document.querySelector('ul');
    evenLinksUl.addEventListener('click', (event) => {
      event.preventDefault();
      const listUl = document.querySelector(`.select-dropdown__list--${this.#id}`);
      
      const allLi = listUl.querySelectorAll('li');
      allLi.forEach(item => {
        if (item.classList.contains('selected')) {
          item.classList.remove('selected');
        }
      });
    
      const liLinks = event.target.closest('li');
      if (liLinks) {
        liLinks.classList.add('selected');
        const idLi = +liLinks.dataset.value;
        this.#currentSelectedOption = this.#options.find(item => {
          if (item.value === idLi) return item
        });
        const selectorCastom = document.querySelector(`.select-dropdown__text--${this.#id}`);
        selectorCastom.textContent = this.#currentSelectedOption.text;
        console.log(this.selectedValue); //test
      }
    });
  }

  get selectedValue () {
    return this.#currentSelectedOption;
  }
}

const options = [
  { value: 1, text: 'JavaScript' },
  { value: 2, text: 'NodeJS' },
  { value: 3, text: 'ReactJS' },
  { value: 4, text: 'HTML' },
  { value: 5, text: 'CSS' }
];
const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container'); 
customSelect.render(mainContainer);