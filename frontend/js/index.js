// AFFICHAGE HTML PRODUITS INDEX
productsView = (item) => {
  container = document.getElementById("container");
  container.innerHTML += `<div class="col mb-5">
                      <div class="card h-100">
                          <img class="card-img-top" src=${
                            item.imageUrl
                          } alt="..." />
                          <div class="card-body p-4">
                              <div class="text-center">
                                  <h5 class="fw-bolder">${item.name}</h5>
                                  <span>${item.price / 100}€</span>
                              </div>
                          </div>
                          <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="./pages/item_page.html?id=${
                                item.id
                              }">Voir fiche produit</a></div>
                          </div>
                      </div>
                  </div>`;
};

// REQUETE API
fetch("http://localhost:3000/api/cameras")
  .then((res) => res.json())
  .then(function (ProductsList) {
    for (let product of ProductsList) {
      let item = new Product(product);
      productsView(item);
    }
  })
  .catch(function (err) {
    console.log("fetch Error");
    alert("Désolé aucun produit n'a été trouvé !");
  });
