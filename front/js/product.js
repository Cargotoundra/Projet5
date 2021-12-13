// Récupération de l'id du produit depuis l'URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

const colorAddProduct = document.getElementById("colors");
const quantityAddProduct = document.getElementById("quantity");

seeProduct();


//Récupération des info du produit ayant l'id = id
function seeProduct() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        return res.json();
    })
    //Affichage des infos dans la console 
    .then(async function (resultatAPI) {
        products = await resultatAPI;
        console.table(products);
            //lancement de la fonction getInDom (Mise en page)
            getInDom(products);
    })
    .catch(function(err){
        console.log('Err :' + err);
    })
}

//Mise en forme des infos du produit dans le DOM
function getInDom(products){

                //Création de la photo
                let newProductImg = document.createElement('img');
                let productImg = document.querySelector('.item__img');
                productImg.appendChild(newProductImg);
                newProductImg.src = products.imageUrl;
                newProductImg.alt = products.altTxt;

                //Ajout du <title>
                let productName = document.getElementById('title');
                productName.innerHTML = products.name;

                //Ajout du price
                let productPrice = document.getElementById('price');
                productPrice.innerHTML = products.price;

                //Ajout de <p>
                let ProductP = document.getElementById('description');
                ProductP.innerHTML = products.description;

                //Ajout des options colors
                for (let colors of products.colors){
                    console.table(colors);
                    let productColors = document.createElement("option");
                    let newproductColors = document.getElementById('colors');
                    newproductColors.appendChild(productColors);
                    productColors.value = colors;
                    productColors.innerHTML = colors;
                }
                click(products);
            }

//Au clic sur le btn
function click (products){
    const addCart = document.getElementById('addToCart');
    addCart.addEventListener('click', addPanier);
}

function addPanier (products){
        //Si la quantité n'est pas égale à 0 alors
        if (quantityAddProduct.value > 0 && quantityAddProduct.value <=100 && colorAddProduct.value !=""){
                //Création des données à exporter
                let detailsArticle = {
                    idArticle: id,
                    colorArticle: colorAddProduct.value,
                    quantityArticle: Number(quantityAddProduct.value),
                    nameArticle: (document.getElementById('title')).innerText, 
                    priceArticle: (document.getElementById('price')).innerText,
                    descriptionArticle: (document.getElementById('description')).innerText,
                    imgArticle: (document.querySelector('.item__img img')).src,
                    altImgArticle: (document.querySelector('.item__img img')).alt,
                };
                //Création espace de stockage
                let ourLocalStorage = JSON.parse(localStorage.getItem("article"));

                    if (ourLocalStorage){
                        const cartNotEmpty = ourLocalStorage.find((article) => article.idArticle === id && article.colorArticle === (colorAddProduct.value));
                            //Si l'article ds le panier == nouvel article alors on change juste la quantité
                            if (cartNotEmpty){
                                let addQuantity = (detailsArticle.quantityArticle) + (cartNotEmpty.quantityArticle);
                                cartNotEmpty.quantityArticle = addQuantity;
                                localStorage.setItem("article", JSON.stringify(ourLocalStorage));
                                console.table(ourLocalStorage);
                            }
                            // Sinon ajout d'un nouvel article ds le panier
                            else {
                                ourLocalStorage.push(detailsArticle);
                                localStorage.setItem("article", JSON.stringify(ourLocalStorage));
                                console.table(ourLocalStorage);
                            }
                        //Si aucun article ds le panier (étape 1 de base)
                        } else {
                            //Création d'un tableau de la local storage
                            ourLocalStorage =[];
                            ourLocalStorage.push(detailsArticle);
                            //On pousse les données en JSON ds le localstorage en chaine de caractère
                            localStorage.setItem("article", JSON.stringify(ourLocalStorage));
                            console.table(ourLocalStorage);
                    }
                    } else {
                        console.log('Erreur de quantité');
                    }}

