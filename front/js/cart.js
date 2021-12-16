//On récupère les infos du localstorage
var viewCart = JSON.parse(localStorage.getItem("article"));
console.table(viewCart);


getInDom();
totalQte();
totalPrice();
regex();

function getInDom(){
    for (let article in viewCart){

        //création de Article
        let articleHTML = document.getElementById('cart__items');
        let newArticleHTML = document.createElement('article');
        articleHTML.appendChild(newArticleHTML);
        newArticleHTML.classList.add('cart__item');
        newArticleHTML.setAttribute('data-id', viewCart[article].idArticle);
        newArticleHTML.setAttribute('data-color', viewCart[article].colorArticle);

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


        //Changement de la quantité ds le panier
        //ecoute l'évènement de l'input
        value.addEventListener("change",(e)=>{
            e.preventDefault();
            if (localStorage.getItem('article')) {
                //je récupère l'Index de l'article sur lequel je suis
                let newQte = viewCart.findIndex((e=> e.id === article.idArticle && e.color === article.colorArticle))
                //J'intègre la quantité rentrée dans le DOM dans le localstorage
                viewCart[newQte].quantityArticle = value.value;
            }
            //MAJ du localstorage
            localStorage.setItem("article",JSON.stringify(viewCart));
            totalQte();
            totalPrice();
        })

        //fonction supprimer
        //ecoute l'évènement de l'input
        divDelete.addEventListener("click",(e)=>{
            e.preventDefault();
            if (article.id === article.id){
            let colorIndex = newArticleHTML.getAttribute('data-color');
            let idIndex = newArticleHTML.getAttribute('data-id');
            var indexOfItemToDelete = viewCart.findIndex(i => i.colorArticle === colorIndex && i.idArticle === idIndex);
            console.log(indexOfItemToDelete);
            //Supprime visuellement l'article du panier
            articleHTML.removeChild(newArticleHTML);
            //Supprime l'article du localstorage
            viewCart.splice(indexOfItemToDelete, 1);
            console.table(viewCart);};
            //Mise à jour du local
            localStorage.setItem("article",JSON.stringify(viewCart));
            console.table(viewCart);
            totalQte();
            totalPrice();
        })
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
        price += (quantityTotal[i].valueAsNumber * (viewCart[i].priceArticle));
    }
    console.log(price);
    return totalPrice.innerText = price;
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

    //email
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

function clickPost(){

    const postBtn = document.getElementById('order');
    postBtn.addEventListener('click', (event)=>{

    event.preventDefault();

    //Récupération des infos client
    let contact = {
        firstName : (document.getElementById('firstName')).value,
        lastName : (document.getElementById('lastName')).value,
        address : (document.getElementById('address')).value,
        city : (document.getElementById('city')).value,
        email : (document.getElementById('email')).value,
    }
    console.table(contact);

    //vérification du remplissage du formulaire
    if (firstName.value === ""|| lastName.value === ""|| address.value === "" || city.value === "" || email.value === "") {
        window.confirm("Veuillez renseigner les champs manquants")
        // la page ne se réactualise pas 
        window.onbeforeunload;
   
    //si ok
    }else{
    //création du tableau dans le local storage
    let products = [];

    viewCart.forEach(order => {
        products.push(order.idArticle)
        });
    console.table(products);

    let articleOrder = {contact , products};
    console.log(articleOrder);

    //envoi des données via API
    fetch('http://localhost:3000/api/products/order',{
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(articleOrder),
            })
            //récupération des données
            .then((res) => {
                return res.json();
            })
            //on récupère l'orderId données par l'API
            .then((data)=>{
                console.log(data);
                //Mise à zéro du localstorage
                //localStorage.clear();
                //redirection vers la page confirmation avec l'ID dans l'URL
                document.location.href =`confirmation.html?orderId=${data.orderId}`;
            })
            .catch((err)=>{
                alert(err);
            });
        }})
}

clickPost();
