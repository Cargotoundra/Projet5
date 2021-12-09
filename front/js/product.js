let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);

seeProduct();

function seeProduct() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
        return res.json();
    })
    .then(async function (resultatAPI) {
        products = await resultatAPI;
        console.table(products);
            getInDom(products);
    })
    .catch(function(err){
        console.log('Err :' + err);
    })
}

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

                //Ajout des options
                for (let colors of products.colors){
                    console.table(colors);
                    let productColors = document.createElement("option");
                    let newproductColors = document.getElementById('colors');
                    newproductColors.appendChild(productColors);
                    productColors.value = colors;
                    productColors.innerHTML = colors;
                }
            }