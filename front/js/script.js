// Appel de mon API
fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    canap(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

  function canap(value) {
    for (let i = 0; i < value.length; i++) {
        
        // création de la balise a
        let lienItems = document.createElement("a");
        document.querySelector("#items").appendChild(lienItems);
        lienItems.href += "./product.html?_id=" + value[i]._id;

        // création de la balise article
        let articleItems = document.createElement("article");
        lienItems.appendChild(articleItems);

        // création de la balise img
        let imgItems = document.createElement ("img");
        articleItems.appendChild(imgItems);
        imgItems.src = value[i].imageUrl;
        imgItems.alt = value[i].altTxt;

        // création de la balise h3
        let h3Items = document.createElement("h3");
        articleItems.appendChild(h3Items);
        h3Items.classList.add("productName");
        h3Items.textContent = value[i].name;

        // création de la balise p
        let paragraphItems = document.createElement("p");
        articleItems.appendChild(paragraphItems);
        paragraphItems.classList.add("productDescription");
        paragraphItems.textContent = value[i].description;
    }
  }