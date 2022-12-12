// Récupération de l'id via les paramètres de l'url
const searchParams = new URLSearchParams(document.location.search);
const id = searchParams.get("_id");
console.log(id);

// Je créer les variables dont j'ai besoin

let titre = document.querySelector("#title");
let prix = document.querySelector("#price");
let description = document.querySelector("#description");
let logoItem = document.querySelector(".item__img");
let colorCanape = document.querySelector("#colors");

let logoItemSrc = "";
let logoItemAlt = "";

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
      logoItem = document.createElement("img");
      document.querySelector(".item__img").appendChild(logoItem);
      logoItem.src = value.imageUrl;
      logoItem.alt = value.altTxt;

      logoItemSrc = value.imageUrl;
      logoItemAlt = value.altTxt;

      // Titre fiche produit
      titre.textContent = value.name;
      console.log(titre);

      // Prix fiche produit
      prix.textContent = value.price;

      // Description fiche produit
      description.textContent = value.description;

      // Colors fiche produit
      for (colorCanape of value.colors) {
        const optionCreate = document.createElement("option")
        optionCreate.value = colorCanape
        optionCreate.text = colorCanape
        document.querySelector("#colors").appendChild(optionCreate)
    }
     // Création de la condition si le panier n'existe pas alors créer un panier

     if (localStorage.getItem('panier') === null) {
      localStorage.setItem('panier', '[]')
  }
})
    
  const panier = JSON.parse(localStorage.getItem("panier"));

// Je récupère les valeurs nécessaires à la création du bouton
    
    let boutonAddPanier = document.querySelector("#addToCart");
    selectedQuantity = document.querySelector("#quantity");
    selectedColors = document.querySelector("#colors") ;

    boutonAddPanier.addEventListener('click', () => {

      const canapeSelected = {
        id:id, 
        quantity: selectedQuantity.value, 
        color: selectedColors.value, 
        name: titre.textContent,        // on créer la variable 'canapeSelected' avec les valeurs nécessaires
        description: description.textContent,
        img: logoItem.src, 
        altTxt: logoItem.alt,
      }

      // Variable qui permet de convertir les données en objet

      let canapeInPanier = JSON.parse(localStorage.getItem('panier'));

      // J'ajoute les produits choisit dans le localStorage

      const addToPanier = () => {

        canapeInPanier.push(canapeSelected);
        localStorage.setItem('panier', JSON.stringify(canapeInPanier));
      }

      // Notification produit ajouté

      let confirmPanier = () => {
        alert('Le produit a été ajouté au panier');
      }

      // Notification mise à jour du panier

      let updatePanier = () => {
        alert('Le panier a été mis à jour');
      }

      // Création de la variable mise à jour du panier afin d'éviter les doublons

      let update = false;

      // Conditions du bouton (choisir couleur, choisir nombre, ajouter la quantité si id et color correspondent)

       if (selectedColors.value == '') {
          alert("Veuillez choisir une couleur");
      } else if (selectedQuantity.value == '0') {
          alert("Veuillez choisir un nombre de canapé");
      } else if (canapeInPanier) {
        canapeInPanier.forEach (function (panierProduct, key) {
          if (panierProduct.id == id && panierProduct.color == selectedColors.value) {
              canapeInPanier[key].quantity = parseInt(panierProduct.quantity) + parseInt(selectedQuantity.value);
              localStorage.setItem('panier', JSON.stringify(canapeInPanier));
              update = true;
              updatePanier();
      }
    })
    if (!update) {
      addToPanier();
      confirmPanier();
    }
}  else {
      canapeInPanier = [];
      addToPanier();
      confirmPanier();
    }
});

// Product terminé