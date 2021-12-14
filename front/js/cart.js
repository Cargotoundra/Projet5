//On récupère les infos du localstorage
var viewCart = JSON.parse(localStorage.getItem("article"));
console.table(viewCart);

getInDom();
totalQte();
totalPrice();

function getInDom(){
    for (let article in viewCart){

        //création de Article
        let articleHTML = document.getElementById('cart__items');
        let newArticleHTML = document.createElement('article');
        articleHTML.appendChild(newArticleHTML);
        newArticleHTML.classList.add('cart__item');
        newArticleHTML.setAttribute('data-id', viewCart[article].idArticle);

        //création de la div
        let div = document.createElement('div');
        newArticleHTML.appendChild(div);
        div.classList.add('cart__item__img');

        //intégration de l'img
        let newImgHTML = document.createElement('img');
        div.appendChild(newImgHTML);
        newImgHTML.src = viewCart[article].imgArticle;
        newImgHTML.alt = viewCart[article].altImgArticle;

        //création de la div2
        let div2 = document.createElement('div');
        newArticleHTML.appendChild(div2);
        div2.classList.add('cart__item__content');

        //création de la div description
        let divD = document.createElement('div');
        div2.appendChild(divD);
        divD.classList.add('cart__item__content__description');

        //création du h2
        let h2 = document.createElement('h2');
        divD.appendChild(h2);
        h2.innerText = viewCart[article].nameArticle;

        //création de la couleur
        let pDivD = document.createElement('p');
        divD.appendChild(pDivD);
        pDivD.innerText = viewCart[article].colorArticle;

        //création de price
        let price = document.createElement('p');
        divD.appendChild(price);
        price.innerText = (viewCart[article].priceArticle) + ' €';

        //création de la div settings
        let divS = document.createElement('div');
        div2.appendChild(divS);
        divS.classList.add('cart__item__content__settings');

        //création de la div quantity
        let divQ = document.createElement('div');
        divS.appendChild(divQ);
        divQ.classList.add('cart__item__content__settings__quantity');

        //création de la quantité
        let qte = document.createElement('p');
        divQ.appendChild(qte);
        qte.innerText = 'Qté : ';

        //insertion value
        let value = document.createElement('input');
        divQ.appendChild(value);
        value.classList.add('itemQuantity');
        value.setAttribute('type','number');
        value.setAttribute('name','ItemQuantity');
        value.setAttribute('min','1');
        value.setAttribute('max','100');
        value.value = viewCart[article].quantityArticle;

        //création de la div delete
        let divDelete = document.createElement('div');
        divS.appendChild(divDelete);
        divQ.classList.add('cart__item__content__settings__delete');

        //création du pDelete
        let pDelete = document.createElement('p');
        divDelete.appendChild(pDelete);
        divDelete.classList.add('deleteItem');
        divDelete.innerText = 'Supprimer';

    }}

function totalQte(){

    //création total quantité
    let totalQte = document.getElementById('totalQuantity');
    let quantityTotal = document.querySelectorAll('.itemQuantity');
    let qte = 0;
    //additionne chaque valeur présente dans une div ayant pour class 'itemQuantity
    quantityTotal.forEach(e => {qte += Number(e.value);} )
    console.log(qte);
    return totalQte.innerText = qte;
}

function totalPrice() {

    let totalPrice = document.getElementById('totalPrice');
    let quantityTotal = document.querySelectorAll('.itemQuantity');
    let price = 0;

    //additionne chaque quantité par son prix
     for (var i = 0; i < (quantityTotal.length); ++i) {
        price += (quantityTotal[i].valueAsNumber * viewCart[i].priceArticle);
    }
    console.log(price);
    return totalPrice.innerText = price;
}
        
function changeQte(){


}


// FORMULAIRE

function regex(){

    //création des variables et regex
    let error = "Données incorrectes";
    let form = document.querySelector(".cart__order__form");

    let nameRegex = new RegExp ("^[a-z ,.'-]+$");
    let emailRegex = new RegExp ('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let adressRegex = new RegExp ("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");

    //Ecoute des événements 
    //Firstname
    form.firstName.addEventListener('change', function() {
        const firstName = function(inputFirstName) {
    
            if (nameRegex.test(inputFirstName.value)) {
                (document.getElementById('firstNameErrorMsg')).innerHTML = '';
            } else {
                (document.getElementById('firstNameErrorMsg')).innerHTML = error;
            }
        };
        firstName(this);
    });

    //LastName
    form.lastName.addEventListener('change', function() {
        const lastName = function(inputLastName) {
    
            if (nameRegex.test(inputLastName.value)) {
                (document.getElementById('lastNameErrorMsg')).innerHTML = '';
            } else {
                (document.getElementById('lastNameErrorMsg')).innerHTML = error;
            }
        };
        lastName(this);
    });

    //Address
    form.address.addEventListener('change', function() {
        const address = function(inputAddress) {
    
            if (adressRegex.test(inputAddress.value)) {
                (document.getElementById('addressErrorMsg')).innerHTML = '';
            } else {
                (document.getElementById('addressErrorMsg')).innerHTML = error;
            }
        };
        address(this);
    });

    //City
    form.city.addEventListener('change', function() {
        const city = function(inputCity) {
    
            if (adressRegex.test(inputCity.value)) {
                (document.getElementById('cityErrorMsg')).innerHTML = '';
            } else {
                (document.getElementById('cityErrorMsg')).innerHTML = error;
            }
        };
        city(this);
    });

    //City
    form.email.addEventListener('change', function() {
        const email = function(inputEmail) {
    
            if (emailRegex.test(inputEmail.value)) {
                (document.getElementById('emailErrorMsg')).innerHTML = '';
            } else {
                (document.getElementById('emailErrorMsg')).innerHTML = error;
            }
        };
        email(this);
    });
}

regex();