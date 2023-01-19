const BURGER = document.querySelector(".burger_menu_pets");
const LIST_MENU = document.querySelector("#menu_list");
const HTML = document.querySelector("html");
const zone = document.querySelector("#zone");
const HEAD_STICKY = document.querySelector(".header_sticky");
const LOGO_H1 =  document.querySelector(".logo h1");
const LOGO_P =  document.querySelector(".logo p");
const BURGER_LI = document.querySelectorAll(".burger_menu_pets li");

//burger our pets
const showMenu = () => {
    BURGER.classList.remove('rotate_burger_pets');   
    LIST_MENU.classList.remove('slide_in');
    LIST_MENU.classList.add('slide_out');
    zone.classList.remove('opacity_zone');
    LIST_MENU.style.right = "-320px";
    LOGO_H1.style.color = '#545454';
    LOGO_P.style.color = '#292929';
    for (let item of BURGER_LI){
        item.style.backgroundColor = 'black';
    }
    HTML.style.overflow = "scroll";
}
const hiddMenu = () => {
    BURGER.classList.add('rotate_burger_pets');
    LIST_MENU.classList.remove('slide_out');
    LIST_MENU.classList.add('slide_in');
    zone.classList.add('opacity_zone');
    LIST_MENU.style.right = "0px";
    LOGO_H1.style.color = '#F1CDB3';
    LOGO_P.style.color = '#FFF';
    for (let item of BURGER_LI){
        item.style.backgroundColor = '#F1CDB3';
    }
    HTML.style.overflow = "hidden";
}
const clickBurger = () =>{
    if (BURGER.classList.contains('rotate_burger_pets')){ 
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
HEAD_STICKY.addEventListener("click", clickStartScreen);

import {pets} from '../../assets/js/pets.js';

//погинация
const PETS_CARD_CONTEINER = document.querySelector('.pets_cards_conteiner');
let currentCounter = 1;
let PETS_NAV = document.querySelector('.pets_nav');
let PEGE_NUMBER = document.querySelector('#page_number');
let BTN_LEFT = document.querySelector('#btn-left');
let BTN_RIGHT = document.querySelector('#btn-right');
let BTN_LEFT_END = document.querySelector('#btn-left-end');
let BTN_RIGHT_END = document.querySelector('#btn-right-end'); 
const PETS_WRAPPER = document.querySelector('.pets_wrapper');

let arrayPets48 = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
//определяем кол-во карточек на странице
function countCardsInPage() {
    const screenWidth = window.screen.width
    if(screenWidth >= 1280) {
        return 8;
    }
    if(screenWidth < 1280 && screenWidth >= 768) {
        return 6;
    }
    if(screenWidth < 768) {
        return 3;
    }
}

function startPage() {   
    let arrayZero = shuffle(pets);
    let arrayRepeat = [];
    for(let i = 0; i < 6; i++) {
      arrayRepeat = arrayRepeat.concat(arrayZero)
    }
    let count = countCardsInPage();
    for (let i = 0; i < 48/count; i++) {
        arrayPets48 = arrayPets48.concat(shuffle(arrayRepeat.splice(0, count)))
    }
    addCards();
}
startPage();

function addCards(){
    changeBtnState();
    PETS_CARD_CONTEINER.innerHTML = "";
    PEGE_NUMBER.innerText = currentCounter;
    const count = countCardsInPage()
        for (let i=(currentCounter-1) * count; i <= currentCounter*count-1; i++){
            const card = document.createElement('div');
                card.classList.add('card');
                card.id = `${arrayPets48[i].id}`;
            const img = document.createElement('img');
                img.src = `${arrayPets48[i].imgPets}`;
            const card_p = document.createElement('p');
                card_p.classList.add('card_p');
                card_p.innerText = `${arrayPets48[i].name}`;
            const card_btn = document.createElement('button');
                card_btn.classList.add('card_btn');
                card_btn.innerText = 'Learn more';
            card.appendChild(img);
            card.appendChild(card_p);
            card.appendChild(card_btn);
            PETS_CARD_CONTEINER.append(card);
        }
}

function changeBtnState (){
    BTN_RIGHT.removeAttribute('disabled');
    BTN_RIGHT_END.removeAttribute('disabled');
    BTN_LEFT.removeAttribute('disabled');
    BTN_LEFT_END.removeAttribute('disabled');    
    if (currentCounter >= arrayPets48.length/countCardsInPage()){
        BTN_RIGHT.setAttribute('disabled', 'true');
        BTN_RIGHT_END.setAttribute('disabled', 'true');
        BTN_RIGHT.removeEventListener('click', clickBtnRight);
        BTN_LEFT.addEventListener('click', clickBtnLeft);
        BTN_RIGHT_END.removeEventListener('click', clickBtnRightEnd);
        BTN_LEFT_END.addEventListener('click', clickBtnLeftEnd);
    }
    else if (currentCounter == 1){
        BTN_LEFT.setAttribute('disabled', 'true');
        BTN_LEFT.removeEventListener('click', clickBtnLeft);
        BTN_LEFT_END.setAttribute('disabled', 'true'); 
        BTN_LEFT_END.removeEventListener('click', clickBtnLeftEnd);
        BTN_RIGHT.addEventListener('click', clickBtnRight);
        BTN_RIGHT_END.addEventListener('click', clickBtnRightEnd);     
    } else {  
        BTN_RIGHT.addEventListener('click', clickBtnRight);
        BTN_LEFT.addEventListener('click', clickBtnLeft);
        BTN_RIGHT_END.addEventListener('click', clickBtnRightEnd);
        BTN_LEFT_END.addEventListener('click', clickBtnLeftEnd);
    }
}

function clickBtnRight() {
    currentCounter++;
    addCards();
}
function clickBtnLeft() {
    currentCounter--;
    addCards();
}

function clickBtnRightEnd() {
    currentCounter = arrayPets48.length/countCardsInPage() ;
    addCards();
}

function clickBtnLeftEnd() {
    currentCounter = 1;
    addCards();
}
//popup 
const POPUP_IMG = document.querySelector('.popup-img');
const POPUP_INFO = document.querySelector('.popup-info');
const POPUP_CONTEINER = document.querySelector('.popup-conteiner');
const POPUP_CLOSE_BTN = document.querySelector('.close');

const closeModalWin = (event) => {
    if (!event.target.closest('.popup-content')){
        POPUP_CONTEINER.classList.remove('show-element');
        POPUP_CONTEINER.classList.add('hidd-element');
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

PETS_CARD_CONTEINER.addEventListener('click', function(element){
    if (element.target.closest('.card')){
        POPUP_CONTEINER.classList.remove('hidd-element');
        POPUP_CONTEINER.classList.add('show-element');
        HTML.style.overflow = "hidden";
        let cardId = element.target.closest('.card').id;
        let n;
        for (let i in pets){
            if (pets[i].id == cardId){
                n = i;
            }
        }
        const img  = document.createElement('img');
        img.src = `${pets[n].imgPets}`;
        img.classList.add('popup-img');
        img.alt = `${pets[n].name}`;

        const petsName =  document.createElement('h3');
        petsName.classList.add('popup-info-name');
        petsName.innerText = `${pets[n].name}`;

        const typeInfo = document.createElement('p');
        typeInfo.classList.add('popup-info-type');
        typeInfo.innerText = `${pets[n].type} - ${pets[n].breed}`;
        
        const petDirection = document.createElement('p');
        petDirection.classList.add('popup-pet-direction');
        petDirection.innerText = `${pets[n].description}`;

        const infoList = document.createElement('ul');

        const infoListAge = document.createElement('li');
        infoListAge.innerHTML = '<strong>Age: </strong>' + `${pets[n].age}`;
        const infoListInocul = document.createElement('li');
        infoListInocul.innerHTML = '<strong>Inoculations: </strong>' + `${pets[n].inoculations}`;
        const infoListDiseases = document.createElement('li');
        infoListDiseases.innerHTML = '<strong>Diseases: </strong>' + `${pets[n].diseases}`;
        const infoListParasites = document.createElement('li');
        infoListParasites.innerHTML = '<strong>Parasites: </strong>' + `${pets[n].parasites}`;

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
