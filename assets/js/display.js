
export default class Display {

    showData(element) {
        const receipeData = JSON.parse(window.localStorage.getItem(element.getAttribute('data-uniqueId')));

        const receipeResult = document.querySelector('.result');

        const headingNode = this.createNode('h2', receipeResult, receipeData['name']);
        const receipeDivNode = this.createNode('div', receipeResult, '');
        const receipeHeadingNode = this.createNode('h3', receipeDivNode, 'steps for getting the receipe done');
        const receipeParaNode = this.createNode('p', receipeDivNode, receipeData['receipe']);
        const ingredientDivNode = this.createNode('div', receipeResult, '');
        const ingredientHeadingNode = this.createNode('h3', ingredientDivNode, 'ingredients');
        const ingredientUlNode = this.createNode('ul', ingredientDivNode, '');

        receipeData['AvailableIngredient'].forEach(element => {
            const ingredientLiNode = this.createNode('li', ingredientUlNode, element);
        });

        receipeData['NonAvailableIngredient'].forEach(element => {
            const ingredientLiNode = this.createNode('li', ingredientUlNode, element);
        });

        const controlDiv = this.createNode('div', receipeResult, '');
        const editAnchorNode =  this.createNode('a', controlDiv, 'edit');
        const deleteAnchorNode =  this.createNode('a', controlDiv, 'delete');

        receipeDivNode.setAttribute('class', 'receipe');
        ingredientDivNode.setAttribute('class', 'ingredients');
        controlDiv.setAttribute('class', 'receipe-controls');
        editAnchorNode.setAttribute('href', '#FIXME');
        editAnchorNode.setAttribute('id', 'edit');
        editAnchorNode.setAttribute('data-uniqueId', element.getAttribute('data-uniqueId'));
        deleteAnchorNode.setAttribute('href', '#FIXME');
        deleteAnchorNode.setAttribute('id', 'delete');
        deleteAnchorNode.setAttribute('data-uniqueId', element.getAttribute('data-uniqueId'));

        deleteAnchorNode.addEventListener('click', () => {
            window.localStorage.removeItem(element.getAttribute('data-uniqueId'));
            receipeResult.innerHTML = '';
            receipeResult.classList.remove('active');
        })

        receipeResult.classList.add('active');
    }

    createIngredient(ingredientInput, ingredient) {
        const ingredientResult = document.querySelector('.form-group ul');

        const liNode = this.createNode('li', ingredientResult, '');
        const inputNode = this.createNode('input', liNode, '');
        const spanNode = this.createNode('span', liNode, ingredient);
        const anchorNode = this.createNode('a', liNode, 'delete');

        inputNode.setAttribute('type', 'checkbox');
        inputNode.setAttribute('name', 'ingredient');
        inputNode.setAttribute('value', ingredient);
        anchorNode.setAttribute('href', '#FIXME');
        anchorNode.setAttribute('id', 'delete-ingredient');

        anchorNode.addEventListener('click', () => {
            const parent = anchorNode.parentNode;
            const superParent = parent.parentNode;
            superParent.removeChild(parent);
            if (superParent.children.length <= 0) {
                superParent.classList.remove('active');
                ingredientInput.parentNode.classList.remove('success');
            }
        });

        ingredientInput.value = "";
        ingredientInput.parentNode.classList.add('success');
        ingredientResult.classList.add('active');
    }

    // function for creating elements
    createNode(node, place, text) {
        var elementNode = document.createElement(node);
        elementNode.innerHTML = text;
        place.appendChild(elementNode);

        return elementNode;
    }
}