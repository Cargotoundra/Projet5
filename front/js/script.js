showProduct();

//Récupération des infos de l'API
async function result() {
        var productsArray = await fetch("http://localhost:3000/api/products")
        return await productsArray.json();
    }

//Intégration des résultats dans le DOM
async function showProduct(){
    var results = await result()
        .then(function (apiResults){
            const products = apiResults;
            console.table(products);
            for (let product in products){

                //Création du <a>
                let newProductLink = document.createElement('a');
                let productLink = document.getElementById('items');
                productLink.appendChild(newProductLink);
                newProductLink.href =`product.html?id=${apiResults[product]._id}`;

                //Création de <article>
                let newProductArticle = document.createElement('article');
                newProductLink.appendChild(newProductArticle);

                //Création de <img>
                let newProductImage = document.createElement('img');
                newProductArticle.appendChild(newProductImage);
                newProductImage.src = apiResults[product].imageUrl;
                newProductImage.alt = apiResults[product].altTxt; 

                //Création de <h3>
                let newProductH = document.createElement('h3');
                newProductArticle.appendChild(newProductH);
                newProductH.classList.add('productName');
                newProductH.innerHTML = apiResults[product].name;

                //Création de <p>
                let newProductP = document.createElement('p');
                newProductArticle.appendChild(newProductP);
                newProductP.classList.add('productDescription');
                newProductP.innerHTML = apiResults[product].description;

            }
        })
        .catch(function(err){
            console.log('Err :' + err);
        });
}

