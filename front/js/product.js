// Récupération de l'id via les paramètres de l'url
const searchParams = new URLSearchParams(document.location.search);
const id = searchParams.get("_id");
console.log(id);

// Appel de mon API
fetch('http://localhost:3000/api/products/' + id) 
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
   
      // Création de l'image fiche produit
      let logoItem = document.createElement("img");
      document.querySelector(".item__img").appendChild(logoItem);
      logoItem.src = value.imageUrl;
      logoItem.alt = value.altTxt;

      // Titre fiche produit
      let h1Titre = document.querySelector("#title").textContent = value.name;

      // Prix fiche produit
      let prix = document.querySelector("#price").textContent = value.price;

      // Description fiche produit
      let description = document.querySelector("#description").textContent = value.description;

      // Colors fiche produit
      for (const color of value.colors) {
        let optionCreate = document.createElement("option")
        optionCreate.value = color
        optionCreate.text = color
        document.querySelector("#colors").appendChild(optionCreate)
    }
  })

/* 1- récupérer l'identifiant
let urlProduct = window.location.href;
let url = nouvelleURL (urlProduct);
let idProduct = url.searchParams.get ("_id");
console.log (idProduct);

   function canap(value) {
    for (let i = 0; i < value.length; i++) {
        document.querySelector("#title").textContent = value[i].name;
        document.querySelector("#price").textContent = value[i].price;
        document.querySelector("#description").textContent = value[i].description;

        document.querySelector("#colors").appendChild = value[i].colors;
    }
} */

/* création des options value
let valueVert = document.createElement("option");
let valueBlanc = document.createElement("option");
document.querySelector("#colors").appendChild(valueVert);
document.querySelector("#colors").appendChild(valueBlanc);
valueVert.value = "vert";
valueVert.text = "vert";
valueBlanc.value = "blanc";
valueBlanc.text = "blanc";
*/

/*
// Insérer le titre du produit
document.querySelector("#title").textContent = value[i].name;

// Insérer le prix du produit
document.querySelector("#price").textContent = value[i].price;

// Description du produit
document.querySelector ("#description").textContent = value[i].description;
*/