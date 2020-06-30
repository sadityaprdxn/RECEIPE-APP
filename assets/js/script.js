'use strict'
import validate from './validation.js';
import StoreData from './store.js';
import Display from './display.js';



window.onload = () => {

    const validation = new validate;
    const display = new Display;
    const page = document.querySelector('.container');
    const regex = {
        receipeNameRegex: /^([a-zA-Z]){2,20}$/,
        receipeRegex: /^([a-zA-Z0-9 ]){300,500}$/,
    };

    if (page.classList.contains('index-page')) {
        console.log('hi');

        const receipeName = document.querySelector('#receipe-name');

        // event for validating receipeName
        receipeName.addEventListener('keyup', () => {
            validation.validate(receipeName, regex.receipeNameRegex);
            const receipeDropdown = document.querySelector('.dropdown');
            receipeDropdown.innerHTML = "";

            if ( receipeName.parentNode.classList.contains('success')) {
                for (let key in window.localStorage) {
                    if (key.includes('receipe')) {
                        let receipeData = JSON.parse(window.localStorage[key]);
                        if (receipeData['name'].indexOf(receipeName.value.toLowerCase()) > -1) {
        
                            const liNode = display.createNode('li', receipeDropdown, receipeData['name']);
        
                            liNode.setAttribute('data-uniqueId', key);
                            liNode.addEventListener('click', () => {
                                receipeDropdown.classList.remove('active');
                                receipeName.value = "";
                                display.showData(liNode);
                            });
                        }
                    }
                }
                receipeDropdown.classList.add('active');
            } else { receipeDropdown.classList.remove('active'); }
        });

    } else if (page.classList.contains('home-page')) {
        console.log('hii');


        const receipeName = document.querySelector('#receipe-name');
        const receipe = document.querySelector('.add-receipe-form textarea');
        const ingredientInput = document.querySelector('#ingredient');
        const addIngredientButton = document.querySelector('.form-group button');
        const receipeSubmitButton = document.querySelector('.form-controls button');

        // event for validating receipeName
        receipeName.addEventListener('keyup', () => {
            validation.validate(receipeName, regex.receipeNameRegex);
        });

        // event for validating receipe
        receipe.addEventListener('keyup', () => {
            validation.validate(receipe, regex.receipeRegex);
        });

        addIngredientButton.addEventListener('click', (e) => {
            e.preventDefault();
            const ingredient = ingredientInput.value;

            if (ingredient !== "" && ingredient.length > 2) {
                display.createIngredient(ingredientInput , ingredient);
            }
        });

        receipeSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();

            const formGroupArray = Array.from(document.querySelectorAll('.add-receipe-form .form-group'));
            let allFieldsRight = null;

            for (let i = 0; i < formGroupArray.length; i++) {
                if (!formGroupArray[i].classList.contains('success')) {
                    allFieldsRight = false;
                    alert('PLEASE FILL THE ENTIRE FORM AND THEN SUBMIT');
                    break;
                } else {
                    allFieldsRight = true;
                }
            }

            if (allFieldsRight) {

                const newReceipeName = receipeName.value.toLowerCase();
                const procedure = receipe.value;
                const igredientsArray = document.querySelectorAll('.form-group ul li input');

                debugger;
                const data = new StoreData(newReceipeName, procedure, igredientsArray);

                const receipeUniqeId = `receipe${window.localStorage.length}`;

                window.localStorage.setItem(receipeUniqeId, JSON.stringify(data));


                document.querySelector('.form-group ul').innerHTML = "";
                document.querySelector('.form-group ul').classList.remove('active');

                formGroupArray.forEach(element => {
                    element.classList.remove('success');
                });

                document.querySelector('.add-receipe-form form').reset();
            }
        });
    }
}

















