// Appel de l'API


fetch(`http://localhost:3000/api/products/`)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log(value);

      let panier = JSON.parse(localStorage.getItem('panier'));
      console.log(panier);

      const calculPrice = [];

      for (let i = 0; i < panier.length; i++) {

    // Récupération du localStorage panier
      pageBuilder();
      changeQuantity();
      removeProduct();
      sommeTotal();
    }
    })

      function pageBuilder() {
        // Connexion de la section id=cart__items à javascript
        let sectionCartItems = document.querySelector("#cart__items");

        // Article cart__item | articleCartItem in sectionCartItems
        let articleCartItem = document.createElement("article");
        articleCartItem.classList.add("cart__item");
        sectionCartItems.appendChild(articleCartItem);
        articleCartItem.dataset.id = panier[i].id;
        articleCartItem.dataset.color = panier[i].color;

        // Div cart__item__img | divCartImg in articleCartItem
        let divCartImg = document.createElement("div");
        divCartImg.classList.add("cart__item__img");
        articleCartItem.appendChild(divCartImg);

        // Balise img | imgCanap in divCartImg
        let imgCanap = document.createElement("img");
        divCartImg.appendChild(imgCanap);
        imgCanap.src = panier[i].img;
        imgCanap.alt = panier[i].altTxt;

        // Div cart__item__content | divCartDescription in articleCartItem
        let divCartDescription = document.createElement("div");
        divCartDescription.classList.add("cart__item__content_description");
        articleCartItem.appendChild(divCartDescription);

        // h2 in divCartDescription
        let h2Description = document.createElement("h2")
        divCartDescription.appendChild(h2Description);
        h2Description.textContent = panier[i].name;

        // paragraphName in divCartDescription
        let colorDescription = document.createElement("p")
        divCartDescription.appendChild(colorDescription);
        colorDescription.textContent = panier[i].color;

        // priceParagraph in divCartDescription
        let priceProduct = document.createElement("p")
        divCartDescription.appendChild(priceProduct);

        // Fonctions Panier

        // Div cart__item__content__settings | divCartSettings in articleCartItem
        let divCartSettings = document.createElement("div");
        divCartSettings.classList.add("cart__item__content__settings");
        articleCartItem.appendChild(divCartSettings);

        // Div cart__item__content__settings_quantity | divCartQuantitySettings in divCartSettings
        let divCartQuantitySettings = document.createElement("div");
        divCartQuantitySettings.classList.add("cart__item_content__settings__quantity");
        divCartSettings.appendChild(divCartQuantitySettings);

        // Paragraph dans le divCartQuantitySettings | paragraphSettings in divCartQuantitySettings
        let quantityProduct = document.createElement("p")
        divCartQuantitySettings.appendChild(quantityProduct);
        quantityProduct.textContent = "Qté : " + panier[i].quantity;

        // Input dans le divCartQuantitySettings | inputSettings in divCartQuantitySettings
        let quantitySettings = document.createElement("input");
        quantitySettings.type = ("type", "number");
        quantitySettings.className = "itemQuantity";
        divCartQuantitySettings.appendChild(quantitySettings);
        quantityCanape = {}
        nameCanape = {}

        // Div cart__item__content__settings__delete | divCartDelete dans le divCartSettings
        let divCartDelete = document.createElement("div");
        divCartDelete.classList.add("cart__item__content__settings__delete");
        divCartSettings.appendChild(divCartDelete);

        // pararaph deleteItem | paragraphDelete dans le divCartDelete
        let deleteArticle = document.createElement("p");
        deleteArticle.classList.add("deleteItem");
        deleteArticle.textContent = "Supprimer";
        divCartDelete.appendChild(deleteArticle);

        quantitySettings.addEventListener('change', changeQuantity)
      }

        // Changement de quantité
        function changeQuantity() {
          if (quantitySettings.value >= 0) {
              quantityProduct.textContent = `Qté : ${quantitySettings.value}`
              alert('La quantité a été mis à jour')
          }
          else if (quantitySettings.value <= 0) {
              alert("Pour supprimer le produit, appuyez sur supprimer")
          }
      
          let newQuantity = quantitySettings.value
      
          panier[i].quantity = newQuantity
      
          console.log(`Il y a ${panier[i].quantity} ${panier[i].name}`)
      
          localStorage.setItem("panier", JSON.stringify(panier))

          window.location.reload();
      }
      
      quantitySettings.addEventListener('change', changeQuantity)

      // Fonction suppression du produit + refresh
      function removeProduct() {
        panier = panier.filter(p => p != panier[i]);
        localStorage.setItem("panier", JSON.stringify(panier))
        window.location.reload()
      }

        // Targeting du click et lancement de fonction
        deleteArticle.addEventListener('click', () => {
          removeProduct()
        })

        // Affichage du prix par rapport au fetch
        function sommeTotal() {
          for (let p = 0; p < value.length; p++) {
            if (panier[i].id == value[p]._id) {
              priceProduct.textContent = value[p].price + "€";
  
              priceArticle = value[p].price;
              console.log(priceArticle);

              let sommeProduct = panier[i].quantity * priceArticle;
              console.log(sommeProduct);

              calculPrice.push(sommeProduct);
              console.log(calculPrice);
              
              const sum = calculPrice.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              );
              console.log(sum);

              let totalPrice = document.getElementById("totalPrice");
              totalPrice.textContent = sum;
            }
          }
        }