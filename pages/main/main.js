const START_SCREEN = document.querySelector(".start_screen");
const BURGER = document.querySelector(".burger_menu");
const LIST_MENU = document.querySelector("#menu_list");
const HTML = document.querySelector("html");
const zone = document.querySelector("#zone");

//burger main
const showMenu = () => {
    BURGER.classList.remove('rotate_burger');   
    LIST_MENU.classList.remove('slide_in');
    LIST_MENU.classList.add('slide_out');
    zone.classList.remove('opacity_zone');
    LIST_MENU.style.right = "-320px"
    HTML.style.overflow = "scroll";
}
const hiddMenu = () => {
    BURGER.classList.add('rotate_burger');
    LIST_MENU.classList.remove('slide_out');
    LIST_MENU.classList.add('slide_in');
    zone.classList.add('opacity_zone');
    LIST_MENU.style.right = "0px"
    HTML.style.overflow = "hidden";
}
const clickBurger = () =>{
    if (BURGER.classList.contains('rotate_burger')){ 
        showMenu();
    } else {
        hiddMenu();
    }
} 

const clickStartScreen = (event) => {
        if (event.target.classList.contains('opacity_zone') || event.target.tagName == 'A' ){
            showMenu();
        }
}
BURGER.addEventListener("click", clickBurger);
START_SCREEN.addEventListener("click", clickStartScreen);

//карусель 
import {pets} from '../../assets/js/pets.js';
const BTN_LEFT = document.querySelector('#btn-left');
const BTN_RIGHT = document.querySelector('#btn-right');
const CAROUSEL = document.querySelector('#carousel');
const ITEM_LEFT = document.querySelector('#item-left');
const ITEM_RIGHT = document.querySelector('#item-right');

let currentItem = [];
let activeItem;
let noActiveItem = ITEM_LEFT;

activeItem = Array.from(document.querySelector('#item-active').children);
activeItem.forEach((el) => {currentItem.push(Number(el.id))});

const newItem = [];

const setCards = (num, car) => {
    if (newItem.includes(num) == false && currentItem.includes(num) == false){
        const img = document.createElement('img');
        img.src = `${pets[num].img}`;
        const card_p = document.createElement('p');
        card_p.classList.add('card_p');
        card_p.innerText = `${pets[num].name}`
        const card_btn = document.createElement('button');
        card_btn.classList.add('card_btn');
        card_btn.innerText = 'Learn more';
        car.appendChild(img);
        car.appendChild(card_p);
        car.appendChild(card_btn);
        newItem.push(num);
        car.id = `${num}`;
        noActiveItem.appendChild(car);
    }
    ITEM_RIGHT.innerHTML = noActiveItem.innerHTML;
} 

const createCardTemplate = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    return card;
}

if (CAROUSEL.clientWidth == '990'){
    while (noActiveItem.children.length !=3){
        const card = createCardTemplate();
        let rand = Math.floor(Math.random() * 8);
        setCards(rand, card);
    }
}
else if (CAROUSEL.clientWidth == '580'){
    while (noActiveItem.children.length !=2){
        const card = createCardTemplate();
        let rand = Math.floor(Math.random() * 8);
        setCards(rand, card);
    }
}
else if (CAROUSEL.clientWidth == '270'){
    while (noActiveItem.children.length !=1){
        const card = createCardTemplate();
        let rand = Math.floor(Math.random() * 8);
        setCards(rand, card);
    }
}

const moveLeft = () => {
    CAROUSEL.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft); 
    BTN_RIGHT.removeEventListener('click', moveRight);
}
const moveRight = () => {
    CAROUSEL.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
}

CAROUSEL.addEventListener('animationend', (event) => {
    let changedItem;
    let currentItem = [];
    let activeItem;

    if (event.animationName === "move-left"){
        CAROUSEL.classList.remove('transition-left');
        changedItem = ITEM_LEFT;
        document.querySelector('#item-active').innerHTML = ITEM_LEFT.innerHTML;
    }
    else{
        CAROUSEL.classList.remove('transition-right');
        changedItem = ITEM_RIGHT;
        document.querySelector('#item-active').innerHTML = ITEM_RIGHT.innerHTML;      
    }
    activeItem = Array.from(document.querySelector('#item-active').children);
    activeItem.forEach((el) => {currentItem.push(Number(el.id))});

    changedItem.innerHTML = '';

    const newItem = [];
    const setCards = (num, car) => {
        if (newItem.includes(num) == false && currentItem.includes(num) == false){
            const img = document.createElement('img');
            img.src = `${pets[num].img}`;
            const card_p = document.createElement('p');
            card_p.classList.add('card_p');
            card_p.innerText = `${pets[num].name}`
            const card_btn = document.createElement('button');
            card_btn.classList.add('card_btn');
            card_btn.innerText = 'Learn more';
            car.appendChild(img);
            car.appendChild(card_p);
            car.appendChild(card_btn);
            newItem.push(num);
            car.id = `${num}`;
            changedItem.appendChild(car);
        }
    }
    if (CAROUSEL.clientWidth == '990'){
        while (changedItem.children.length !=3){
            const card = createCardTemplate();
            let rand = Math.floor(Math.random() * 8);
            setCards(rand, card);
        }
    }
    else if (CAROUSEL.clientWidth == '580'){
        while (changedItem.children.length !=2){
            const card = createCardTemplate();
            let rand = Math.floor(Math.random() * 8);
            setCards(rand, card);
        }
    }
    else if (CAROUSEL.clientWidth == '270'){
        while (changedItem.children.length !=1){
            const card = createCardTemplate();
            let rand = Math.floor(Math.random() * 8);
            setCards(rand, card);
        }
    }

    if (event.animationName === "move-left"){
        ITEM_RIGHT.innerHTML = changedItem.innerHTML;
    }
    else{
        ITEM_LEFT.innerHTML = changedItem.innerHTML;
    }

    BTN_LEFT.addEventListener('click', moveLeft); 
    BTN_RIGHT.addEventListener('click', moveRight);
})

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

//popup
const ITEM_ACTIVE = document.querySelector('#item-active');
const POPUP_IMG = document.querySelector('.popup-img');
const POPUP_INFO = document.querySelector('.popup-info');
const POPUP_CONTEINER = document.querySelector('.popup-conteiner');
const POPUP_CLOSE_BTN = document.querySelector('.close');


const closeModalWin = (event) => {
    if (!event.target.closest('.popup-content')){
        POPUP_CONTEINER.classList.remove('show-element');
        POPUP_CONTEINER.classList.add('hidd-element');
        POPUP_CONTEINER.classList.remove('popup-show');
        HTML.style.overflow = "scroll";
        POPUP_IMG.innerHTML = '';
        POPUP_INFO.innerHTML = '';
    }
}

const addHoverEffect = (event) => {
    if (!event.target.closest('.popup-content')){
        POPUP_CLOSE_BTN.classList.add('close-effect');
    }
    else {
        POPUP_CLOSE_BTN.classList.remove('close-effect');
    }
}

ITEM_ACTIVE.addEventListener('click', function(element){
    if (element.target.closest('.card')){
        POPUP_CONTEINER.classList.remove('hidd-element');
        POPUP_CONTEINER.classList.add('show-element');
        POPUP_CONTEINER.classList.add('popup-show');
        HTML.style.overflow = "hidden";
        let cardId = element.target.closest('.card').id;

        const img  = document.createElement('img');
        img.src = `${pets[cardId].img}`;
        img.classList.add('popup-img');
        img.alt = `${pets[cardId].name}`;

        const petsName =  document.createElement('h3');
        petsName.classList.add('popup-info-name');
        petsName.innerText = `${pets[cardId].name}`;

        const typeInfo = document.createElement('p');
        typeInfo.classList.add('popup-info-type');
        typeInfo.innerText = `${pets[cardId].type} - ${pets[cardId].breed}`;
        
        const petDirection = document.createElement('p');
        petDirection.classList.add('popup-pet-direction');
        petDirection.innerText = `${pets[cardId].description}`;

        const infoList = document.createElement('ul');

        const infoListAge = document.createElement('li');
        infoListAge.innerHTML = '<strong>Age: </strong>' + `${pets[cardId].age}`;
        const infoListInocul = document.createElement('li');
        infoListInocul.innerHTML = '<strong>Inoculations: </strong>' + `${pets[cardId].inoculations}`;
        const infoListDiseases = document.createElement('li');
        infoListDiseases.innerHTML = '<strong>Diseases: </strong>' + `${pets[cardId].diseases}`;
        const infoListParasites = document.createElement('li');
        infoListParasites.innerHTML = '<strong>Parasites: </strong>' + `${pets[cardId].parasites}`;

        infoList.append(infoListAge);
        infoList.append(infoListInocul);
        infoList.append(infoListDiseases);
        infoList.append(infoListParasites);

        infoListDiseases

        POPUP_IMG.append(img);
        POPUP_INFO.append(petsName);
        POPUP_INFO.append(typeInfo);
        POPUP_INFO.append(petDirection);
        POPUP_INFO.append(infoList);
    }
}, true);

POPUP_CONTEINER.addEventListener('click', closeModalWin, true);
POPUP_CONTEINER.addEventListener('mouseover', addHoverEffect);

